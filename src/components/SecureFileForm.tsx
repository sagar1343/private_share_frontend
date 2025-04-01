import { DateTimePicker } from "@/components/DateTimePicker";
import FileUplaod from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSecureFile from "@/hooks/useSecureFile";
import { FormData } from "@/types/FileCreateFormData";
import { Lock, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "sonner";

interface Params {
  collectionId?: string;
}

export default function SecureFileForm() {
  const { collectionId }: Params = useParams();
  const { onSubmit, errors } = useSecureFile();
  const { register, handleSubmit, control, setValue, reset } =
    useForm<FormData>({
      defaultValues: {
        collections: collectionId ? parseInt(collectionId) : [],
      },
    });

  useEffect(() => {
    console.log(errors);
    if (errors == null) {
      reset();
    }
    if (errors?.file) toast.error(errors.file[0]);
    if (errors?.file_name) toast.error(`file name: ${errors.file_name[0]}`);
  }, [errors]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-20"
    >
      <div className="space-y-10">
        <div className="space-y-3">
          <Label htmlFor="file-name">File Name</Label>
          <Input
            {...register("file_name")}
            id="file-name"
            type="text"
            placeholder="File name"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="file-password">Set Password (optional)</Label>
          <Input
            {...register("password")}
            minLength={6}
            maxLength={16}
            pattern="^\S+$"
            id="file-password"
            type="password"
            placeholder="*******"
          />
        </div>
        <div className="space-y-3">
          <Controller
            name="expiration_time"
            render={({ field }) => (
              <>
                <Label htmlFor="file-expiration">
                  Set Expiration (optional)
                </Label>
                <DateTimePicker {...field} setDefault={errors === null} />
              </>
            )}
            control={control}
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="file-download-limit">Download Limit</Label>
          <Input
            {...register("max_download_count")}
            id="file-download-limit"
            type="number"
            min={1}
            placeholder="Default 3"
          />
        </div>
      </div>
      <div>
        <FileUplaod setValue={setValue} setDefault={errors === null} />
      </div>
      <div className="flex justify-between max-lg:mb-20 mt-4">
        <Button type="reset" variant="secondary" className="cursor-pointer">
          <RotateCcw />
          Reset
        </Button>
        <Button type="submit" className="cursor-pointer">
          <Lock />
          Secure File
        </Button>
      </div>
    </form>
  );
}
