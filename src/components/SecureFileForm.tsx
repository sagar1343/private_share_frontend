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
  const { register, handleSubmit, control, setValue, reset, formState } =
    useForm<FormData>({
      defaultValues: {
        collections: collectionId ? parseInt(collectionId) : [],
      },
    });

  useEffect(() => {
    if (errors === null) reset();
    if (errors?.file) toast.error(errors.file[0]);
    if (formState.errors.file_name)
      toast.error(formState.errors.file_name.message);
    if (formState.errors.max_download_count)
      toast.error(formState.errors.max_download_count.message);
    if (formState.errors.password)
      toast.error(formState.errors.password.message);
  }, [errors, formState]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-20"
    >
      <div className="space-y-10">
        <div className="space-y-3">
          <Label htmlFor="file-name">File Name</Label>
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
            id="file-name"
            type="text"
            placeholder="File name"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="file-password">Set Password (optional)</Label>
          <Input
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
            {...register("max_download_count", {
              min: { value: 1, message: " Download limit must be at least 1" },
              max: { value: 10, message: "Downlaod limit must be at most 10" },
            })}
            id="file-download-limit"
            type="number"
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
