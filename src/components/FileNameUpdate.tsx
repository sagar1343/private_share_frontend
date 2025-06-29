import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import type { IFile } from "@/types/File";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { useEffect, useState } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
  file_name: string;
}

interface Props {
  fileId: number;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

export default function FileNameUpdate({ fileName, fileId, setFileName }: Props) {
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
    if (formState.errors.file_name) toast.error(formState.errors.file_name.message);
  }, [formState]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
            <DialogDescription>
              Give your file a new name. Changes will be saved instantly.
            </DialogDescription>
          </DialogHeader>

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
            className="border-primary/20 focus-visible:ring-primary"
            placeholder="Enter file name"
            autoFocus
            disabled={nameMutation.isPending}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={nameMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90"
              disabled={formState.isSubmitting || nameMutation.isPending}
            >
              {nameMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
