import api from "@/services/api";
import { IFile } from "@/types/File";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LockOpen, SendHorizonal } from "lucide-react";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Params, useParams } from "react-router";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface FormData {
  password: string;
}

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setProtected: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PasswordUpdateForm({ setProtected, setShow }: Props) {
  const { id }: Params = useParams();
  const { register, handleSubmit, formState } = useForm<FormData>();
  const queryClient = useQueryClient();

  const passwordMutation = useMutation({
    mutationFn: async (data: FieldValues) => {
      const response = await api.patch<IFile>(`/api/files/${id}/`, {
        password: data.password ? data.password : null,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setProtected(data.is_protected);
      toast.success(
        data.is_protected
          ? "Updated password security"
          : "Disabled password encryption"
      );
      setShow(false);
      queryClient.invalidateQueries({ queryKey: ["files", { id }] });
    },
    onError: () => {
      toast.error("Failed to update password");
      setShow(false);
    },
  });

  function onSubmit(data: FieldValues) {
    passwordMutation.mutate(data);
  }

  function handleUnsecure() {
    passwordMutation.mutate({ password: null });
  }

  useEffect(() => {
    if (formState.errors.password)
      toast.error(formState.errors.password?.message);
  }, [formState]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
      <Input
        placeholder="********"
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
          maxLength: {
            value: 16,
            message: "Password must be at most 16 characters",
          },
          pattern: { value: /^\S+$/, message: "Spaces are not allowed" },
        })}
        className="max-w-60 mt-2"
      />
      <Button
        onClick={handleUnsecure}
        className="cursor-pointer"
        variant="secondary"
        type="button"
        disabled={passwordMutation.isPending}
      >
        <LockOpen />
      </Button>
      <Button
        type="submit"
        className="cursor-pointer"
        disabled={passwordMutation.isPending}
      >
        <SendHorizonal />
      </Button>
    </form>
  );
}
