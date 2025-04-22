import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import api from "@/services/api";
import { IFile } from "@/types/File";
import { Pencil, SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FormData {
  file_name: string;
}

interface Props {
  fileId: number;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

export default function FileNameUpdate({
  fileName,
  fileId,
  setFileName,
}: Props) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    defaultValues: { file_name: fileName },
  });
  const queryClient = useQueryClient();

  const nameMutation = useMutation({
    mutationFn: async (data: FieldValues) => {
      const response = await api.patch<IFile>(`/api/files/${fileId}/`, data);
      return response.data;
    },
    onSuccess: (data) => {
      setFileName(data.file_name);
      toast.success("File name updated");
      setOpen(false);
      reset({ file_name: data.file_name });
      queryClient.invalidateQueries({ queryKey: ["files", { id: fileId }] });
    },
    onError: () => {
      toast.error("Failed to update the name");
      setOpen(false);
    },
  });

  function onSubmit(data: FieldValues) {
    if (data.file_name.trim() === fileName) {
      toast.info("No changes detected");
      setOpen(false);
      return;
    }
    nameMutation.mutate(data);
  }

  useEffect(() => {
    if (formState.errors.file_name)
      toast.error(formState.errors.file_name.message);
  }, [formState]);

  return (
    <Popover open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <PopoverTrigger>
        <Pencil className="hover:text-primary cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent align="start">
        <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-4">
          <Input
            {...register("file_name", {
              required: "File name is required",
              minLength: {
                value: 3,
                message: "File name must be at least 3 characters",
              },
              maxLength: {
                value: 120,
                message: "File name must be at most 120 characters",
              },
            })}
            type="text"
            disabled={nameMutation.isPending}
          />
          <Button
            className="cursor-pointer"
            disabled={formState.isSubmitting || nameMutation.isPending}
            type="submit"
          >
            <SendHorizontal />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
