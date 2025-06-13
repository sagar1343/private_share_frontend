import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import api from "@/services/api";
import type { IFile } from "@/types/File";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
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
    <Popover open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <Pencil className="h-4 w-4 text-primary hover:text-primary/80" />
          <span className="sr-only">Rename file</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3" align="start">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Rename File</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
                disabled={nameMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-primary hover:bg-primary/90"
                disabled={formState.isSubmitting || nameMutation.isPending}
              >
                {nameMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
