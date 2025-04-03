import useFetch from "@/hooks/useFetch";
import api from "@/services/api";
import { IFilePermission } from "@/types/FilePermission";
import { IUser } from "@/types/User";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import InfoButton from "./InfoButton";
import { Avatar, AvatarImage } from "./ui/avatar";
import { MultiSelect } from "./ui/multiselect";
import { Skeleton } from "./ui/skeleton";

interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{
    className?: string;
  }>;
}

export default function FilePermissions({ fileId }: { fileId: number }) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [usersList, setUsersList] = useState<Option[]>();
  const { data: users, loading } = useFetch<IUser[]>("/api/users");
  const { data: permission, loading: permissionLoading } =
    useFetch<IFilePermission>(`/api/files/${fileId}/permission/`);

  useEffect(() => {
    if (permission) setSelectedUsers(permission.allowed_users);
  }, [permission]);

  useEffect(() => {
    if (users) setUsersList(() => MappedUser(users));
  }, [users]);

  const debbounceHandlePermission = useCallback(
    () =>
      debounce(async function handlePermission(selectedUsers: string[]) {
        if (users) {
          const data = getSelectedUsersIds(users, selectedUsers);
          const response = await api.patch<IFilePermission>(
            `/api/files/${fileId}/permission/`,
            { allowed_users: data }
          );
          setSelectedUsers(response.data.allowed_users);
          toast.success("Updated Permission");
        }
      }, 2000),
    [fileId, users]
  );

  return (
    <div className="mb-20">
      <h2 className="font-semibold flex items-center gap-2">
        Set file permissions
        <InfoButton message="Grant permission to limited users only." />
      </h2>
      {loading && permissionLoading ? (
        <Skeleton className="max-w-80 h-10 mt-2" />
      ) : (
        <div className="max-w-80 mt-2">
          {usersList && (
            <MultiSelect
              options={usersList}
              onValueChange={debbounceHandlePermission}
              defaultValue={selectedUsers}
              placeholder="Select Users"
              variant="secondary"
              maxCount={2}
            />
          )}
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
  return allUsers
    .filter((user) => selectedSet.has(user.email))
    .map((user) => user.id);
}
