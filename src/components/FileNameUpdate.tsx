import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import api from "@/services/api";
import { Pencil, SendHorizontal } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

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
  const { register, handleSubmit, formState } = useForm<FormData>({
    defaultValues: { file_name: fileName },
  });
  async function onSubmit(data: FieldValues) {
    if (data.file_name.trim() === fileName) {
      toast.info("No changes detected");
      setOpen(false);
      return;
    }
    try {
      await api.patch(`/api/files/${fileId}/`, data);
      setFileName(data.file_name);
      toast.success("File name updated");
    } catch (error) {
      toast.error("Failed to update the name");
    } finally {
      setOpen(false);
    }
  }

  return (
    <Popover open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <PopoverTrigger>
        <Pencil className="hover:text-primary cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent align="start">
        <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-4">
          <Input {...register("file_name")} type="text" />
          <Button className="cursor-pointer" disabled={formState.isSubmitting}>
            <SendHorizontal />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
