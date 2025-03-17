import Heading from "@/components/Heading";
import useFileSize from "@/hooks/useFileSize";
import { IFile } from "@/types/File";
import { Dot, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function FileDetailsHeader({ file }: { file: IFile }) {
  const getFileSize = useFileSize();
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    if (file) getFileSize(file.file).then((data) => setSize(data.toFixed(2)));
  }, [file]);

  const date = new Date(file.created_at);

  return (
    <Heading>
      <div className="flex items-center gap-4">
        <span>{file.file_name} </span>
        <Pencil className="hover:text-primary cursor-pointer" />
      </div>
      <div className="mt-2 text-sm font-normal flex items-center">
        <span>File size {size} MB</span>
        <Dot />
        <span>
          Added on {date.toDateString()} at{" "}
          {date.toLocaleTimeString().slice(0, 5)}
        </span>
      </div>
    </Heading>
  );
}
