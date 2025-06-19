import { IFile } from "@/types/File";
import { ExternalLink, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface Props {
  file: IFile;
  collectionId: number;
}

export default function FileCard({ file, collectionId }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 rounded-lg w-full mb-4 shadow-md">
      <div className="flex items-center overflow-hidden">
        <FileText
          className="text-zinc-500 bg-gray-200 dark:text-gray-300 p-2  dark:bg-gray-600 rounded-lg flex-shrink-0"
          size={40}
        />
        <div className="ml-3 truncate">
          <p className="font-normal text-lg truncate">{file.file_name}</p>
          <span className="text-gray-400 text-sm">File size {file.size}</span>
        </div>
      </div>
      <Button
        className="cursor-pointer"
        onClick={() => navigate(`/dashboard/collections/${collectionId}/files/${file.id}`)}
      >
        <ExternalLink className="size-5" />
      </Button>
    </div>
  );
}
