import Heading from "@/components/Heading";
import useFileSize from "@/hooks/useFileSize";
import { IFile } from "@/types/File";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import FileNameUpdate from "./FileNameUpdate";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZone: "UTC",
};

export default function FileDetailsHeader({ file }: { file: IFile }) {
  const getFileSize = useFileSize();
  const [fileName, setFileName] = useState(file.file_name);
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    if (file) getFileSize(file.file).then((data) => setSize(data.toFixed(2)));
  }, [file]);

  const date = new Date(file.created_at);

  return (
    <Heading>
      <div className="flex items-center gap-4">
        <span>{fileName} </span>
        <FileNameUpdate
          fileName={fileName}
          fileId={file.id}
          setFileName={setFileName}
        />
      </div>
      <div className="mt-2 text-sm font-normal flex items-center">
        <span>File size {size} MB</span>
        <Dot />
        <span>Added on {date.toLocaleString("en-US", options)}</span>
      </div>
    </Heading>
  );
}
