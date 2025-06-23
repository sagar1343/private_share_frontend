import { FormData } from "@/types/FileCreateFormData";
import clsx from "clsx";
import { CheckCheck, CloudUpload } from "lucide-react";
import { useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  setValue: UseFormSetValue<FormData>;
  setDefault: boolean;
}

export default function FileUplaod({ setValue, setDefault }: Props) {
  const [isUploaded, setUploaded] = useState(false);

  function onDrop(acceptedFiles: File[], fileRejection: FileRejection[]) {
    if (fileRejection.length) {
      return;
    }

    if (acceptedFiles) {
      setValue("file", acceptedFiles[0]);
      setUploaded(true);
    }
  }

  useEffect(() => {
    if (setDefault) setUploaded(false);
  }, [setDefault]);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="flex h-full items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        {...getRootProps()}
        className={clsx(
          "h-full min-h-[300px] flex flex-col items-center justify-center w-full border-2  border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600",
          {
            "border-gray-300 dark:border-gray-600 dark:hover:border-gray-500": !isDragActive,
            "border-primary": isDragActive,
          }
        )}
      >
        <div
          className={clsx("flex flex-col items-center justify-center pt-5 pb-6", {
            "text-gray-500 dark:text-gray-400": !isDragActive,
            "text-primary dark:text-primary": isDragActive,
          })}
        >
          {isUploaded ? (
            <>
              <CheckCheck className="size-16 mb-4 text-green-500" />
              <p className="mb-2 text-sm">Uploaded Successfully</p>
            </>
          ) : (
            <>
              <CloudUpload className="size-16 mb-4" />
              <p className="mb-2 text-sm">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs">SVG, PNG, JPG , PDF etc. (MAX SIZE 100MB)</p>
            </>
          )}
        </div>
        <input {...getInputProps()} id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
}
