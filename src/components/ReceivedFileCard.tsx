import DownLoadFileButton from "@/components/DownloadFileButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IReceivedFile } from "@/types/ReceivedFile";
import { FileText } from "lucide-react";

interface Props {
  file: IReceivedFile;
}

export default function ReceivedFileCard({ file }: Props) {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-5 rounded-lg w-full mb-4 shadow-md">
      <div className="flex items-center overflow-hidden">
        <FileText
          className="text-zinc-500 bg-gray-200 dark:text-gray-300 p-2  dark:bg-gray-600 rounded-lg flex-shrink-0"
          size={40}
        />
        <div className="ml-3 truncate">
          <p className="font-normal text-lg truncate">{file.file_name}</p>
          <HoverCard>
            <HoverCardTrigger asChild>
              <p className="text-gray-400 text-sm truncate cursor-pointer">
                {file.sender.email}
              </p>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src={file.sender.profile_pic} />
                  <AvatarFallback>
                    {file.sender.first_name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p>{file.sender.email}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      <DownLoadFileButton isProtected={file.is_protected} fileId={file.id} />
    </div>
  );
}
