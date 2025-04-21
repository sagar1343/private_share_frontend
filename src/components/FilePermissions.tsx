import InfoButton from "@/components/InfoButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MultiSelect } from "@/components/ui/multiselect";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import api from "@/services/api";
import { IFilePermission } from "@/types/FilePermission";
import { IUser } from "@/types/User";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{
    className?: string;
  }>;
}

export default function FilePermissions({ fileId }: { fileId: number }) {
  const queryClient = useQueryClient();
  const [usersList, setUsersList] = useState<Option[]>([]);

  const { data: users, isLoading: isUsersLoading } = useFetch<IUser[]>(["users"], "/api/users");
  const { data: permission, isLoading: isPermissionLoading } = useFetch<IFilePermission>(["permission", { fileId }], `/api/files/${fileId}/permission/`);

  useEffect(() => {
    if (users) setUsersList(MappedUser(users));
  }, [users]);

  const mutation = useMutation({
    mutationFn: (emails: string[]) => {
      const userIds = getSelectedUsersIds(users || [], emails);
      return api.patch(`/api/files/${fileId}/permission/`, { allowed_users: userIds });
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
    [users, fileId]
  );

  return (
    <div className="mb-20">
      <h2 className="font-semibold flex items-center gap-2">
        Set file permission
        <InfoButton message="Grant permission to limited users only." />
      </h2>

      {isUsersLoading || isPermissionLoading ? (
        <Skeleton className="max-w-80 h-10 mt-2" />
      ) : (
        <div className="max-w-80 mt-2">
          <MultiSelect options={usersList} onValueChange={(emails) => debouncedPermissionChange(emails)} defaultValue={permission?.allowed_users} placeholder="Select Users" variant="secondary" maxCount={2} />
        </div>
      )}
    </div>
  );
}

function UserIcon(user: IUser) {
  return (
    <Avatar>
      <AvatarImage src={user.profile_pic ?? undefined} />
      <AvatarFallback>{user.email.slice(0, 1).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}

function MappedUser(users: IUser[]) {
  return users.map((user) => ({
    label: user.email,
    value: user.email,
    icon: () => UserIcon(user),
  }));
}

function getSelectedUsersIds(allUsers: IUser[], selectedUsers: string[]) {
  const selectedSet = new Set(selectedUsers);
  return allUsers.filter((user) => selectedSet.has(user.email)).map((user) => user.id);
}
