import AllowedUsers from "@/components/AllowedUsers";
import EmailInput from "@/components/EmailInput";
import InfoButton from "@/components/InfoButton";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import { isValidEmail } from "@/lib/utils";
import api from "@/services/api";
import type { IFilePermission } from "@/types/FilePermission";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback, useState, type KeyboardEvent } from "react";
import { toast } from "sonner";

export default function FilePermissions({ fileId }: { fileId: number }) {
  const queryClient = useQueryClient();
  const [emailInput, setEmailInput] = useState("");
  const [showAll, setShowAll] = useState(false);

  const { data: permission, isLoading: isPermissionLoading } =
    useFetch<IFilePermission>(
      ["permission", { fileId }],
      `/api/files/${fileId}/permission/`
    );

  const allowedUsers = permission?.allowed_users || [];

  const mutation = useMutation({
    mutationFn: (emails: string[]) => {
      return api.patch(`/api/files/${fileId}/permission/`, {
        allowed_users: emails,
      });
    },
    onSuccess: () => {
      toast.success("Updated Permission");
      queryClient.invalidateQueries({ queryKey: ["permission", { fileId }] });
      queryClient.invalidateQueries({ queryKey: ["fileshare"] });
    },
    onError: () => {
      toast.error("Failed to update the permission");
    },
  });

  const debouncedPermissionChange = useCallback(
    debounce((emails: string[]) => {
      mutation.mutate(emails);
    }, 1500),
    [fileId]
  );

  const addEmail = () => {
    const trimmedEmail = emailInput.trim().toLowerCase();

    if (!trimmedEmail) return;
    if (!isValidEmail(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (allowedUsers.includes(trimmedEmail)) {
      toast.error("Email already added");
      return;
    }

    const updatedUsers = [...allowedUsers, trimmedEmail];
    debouncedPermissionChange(updatedUsers);
    setEmailInput("");
  };

  const removeEmail = (emailToRemove: string) => {
    const updatedUsers = allowedUsers.filter(
      (email) => email !== emailToRemove
    );
    debouncedPermissionChange(updatedUsers);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addEmail();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-semibold flex items-center gap-2">
        Set file permission
        <InfoButton message="Grant permission to limited users only." />
      </h2>

      {isPermissionLoading ? (
        <Skeleton className="max-w-80 h-10" />
      ) : (
        <div className="max-w-80 space-y-3">
          <EmailInput
            emailInput={emailInput}
            setEmailInput={setEmailInput}
            onAddEmail={addEmail}
            onKeyPress={handleKeyPress}
          />
          <AllowedUsers
            allowedUsers={allowedUsers}
            removeEmail={removeEmail}
            showAll={showAll}
            setShowAll={setShowAll}
          />
        </div>
      )}
    </div>
  );
}
