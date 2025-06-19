import CircularProgressIndicator from "@/components/CircularProgress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import clsx from "clsx";
import { CloudUpload, FilePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  collectionId: number;
}

export default function FileUploadDialog({ collectionId }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  const upload = useMutation({
    mutationKey: ["upload"],
    mutationFn: uploadFile,
  });

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 105 * 1024 * 1024,
    multiple: false,
  });

  useEffect(() => {
    if (uploadComplete) {
      const timer = setTimeout(() => {
        setOpen(false);
        setUploadComplete(false);
        setProgress(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [uploadComplete]);

  async function uploadFile(file: File) {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("collections", collectionId.toString());
    formdata.append("file_name", file.name);

    try {
      return await api.post("/api/files/", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress(progressEvent) {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(percent);
          }
        },
      });
    } catch (error) {
      throw error;
    }
  }

  function onDrop(acceptedFiles: File[], fileRejection: FileRejection[]) {
    if (fileRejection.length) {
      const error = fileRejection[0]?.errors[0];
      toast.error(error?.message || "File upload failed");
      return;
    }

    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setFileName(file.name);
    setProgress(0);
    setUploadComplete(false);

    upload.mutate(file, {
      onSuccess: (response) => {
        toast.success("File uploaded successfully");
        setUploadComplete(true);
        queryClient.invalidateQueries({
          queryKey: ["files", { collectionId }],
          exact: false,
        });
        navigate(`/dashboard/collections/${collectionId}/files/${response.data.id}`);
      },
      onError: (error) => {
        console.log(error);
        toast.error(
          error instanceof AxiosError
            ? error.response?.data.file
            : "Failed to upload the file"
        );
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="default" className="cursor-pointer gap-2">
          <FilePlus className="size-4" /> Add File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        {upload.isPending || uploadComplete ? (
          <div className="flex flex-col items-center justify-center w-full py-10">
            <CircularProgressIndicator
              progress={progress}
              fileName={fileName || ""}
              complete={uploadComplete}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full mt-4">
            <div
              {...getRootProps()}
              className={clsx(
                "flex flex-col items-center justify-center w-full min-h-[300px] border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200",
                {
                  "border-muted-foreground/30 bg-muted/50 hover:bg-muted/80 hover:border-muted-foreground/50":
                    !isDragActive,
                  "border-primary bg-primary/10": isDragActive,
                }
              )}
            >
              <div
                className={clsx(
                  "flex flex-col items-center justify-center pt-5 pb-6",
                  {
                    "text-muted-foreground": !isDragActive,
                    "text-primary": isDragActive,
                  }
                )}
              >
                <CloudUpload
                  className={clsx("size-16 mb-4", {
                    "text-muted-foreground/70": !isDragActive,
                    "text-primary": isDragActive,
                  })}
                />
                <p className="mb-2 text-sm font-medium">
                  <span className="font-semibold">
                    {isDragActive ? "Drop the file here" : "Click to upload"}
                  </span>
                  {!isDragActive && " or drag and drop"}
                </p>
                <p className="text-xs text-muted-foreground">
                  SVG, PNG, JPG, PDF etc. (MAX SIZE 100MB)
                </p>
              </div>
              <input {...getInputProps()} className="hidden" />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
