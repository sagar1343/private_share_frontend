import api from "@/services/api";
import { IFile } from "@/types/File";
import { LockOpen, RemoveFormatting, SendHorizonal, X } from "lucide-react";
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

  async function updatePassword(data: FieldValues) {
    if (formState.isValid) {
      try {
        const response = await api.patch<IFile>(`/api/files/${id}/`, {
          password: data.password ? data.password : null,
        });
        setProtected(response.data.is_protected);
        toast.success("Updated password security");
      } catch (error) {
        toast.error("Failed to update password");
      } finally {
        setShow(false);
      }
    }
  }

  async function handleUnsecure() {
    await updatePassword({ password: null });
    setProtected(false);
    setShow(false);
    toast.success("Disabled password encryption");
  }

  useEffect(() => {
    if (formState.errors.password)
      toast.error(formState.errors.password?.message);
  }, [formState]);

  return (
    <form
      onSubmit={handleSubmit(updatePassword)}
      className="flex items-center gap-2"
    >
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
        disabled={formState.isSubmitting}
      >
        <LockOpen />
      </Button>
      <Button
        type="submit"
        className="cursor-pointer"
        disabled={formState.isSubmitting}
      >
        <SendHorizonal />
      </Button>
    </form>
  );
}
