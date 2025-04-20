import DownLoadFileButton from "@/components/DownloadFileButton";
import { IReceivedFile } from "@/types/ReceivedFile";
import { FileText } from "lucide-react";

interface Props {
  file: IReceivedFile;
}

export default function ReceivedFileCard({ file }: Props) {
  return (
    <div className="space-x-2 flex items-center justify-between bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 rounded-lg w-full mb-4 shadow-md">
      <div className="flex items-center overflow-hidden">
        <FileText
          className="text-zinc-500 bg-gray-200 dark:text-gray-300 p-2  dark:bg-gray-600 rounded-lg flex-shrink-0"
          size={40}
        />
        <div className="ml-3 truncate">
          <p className="font-normal text-lg truncate">
            {file.file_name}{" "}
            <span className="text-gray-400 text-sm"> ({file.size}) </span>
          </p>
          <p className="text-gray-400 text-sm truncate">{file.sender.email}</p>
        </div>
      </div>

      <DownLoadFileButton isProtected={file.is_protected} fileId={file.id} />
    </div>
  );
}
