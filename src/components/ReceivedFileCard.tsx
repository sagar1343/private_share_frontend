import { IReceivedFile } from "@/types/ReceivedFile";
import { FileText } from "lucide-react";
import DownLoadFileButton from "./DownloadFileButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface Props {
  file: IReceivedFile;
}
export default function ReceivedFileCard({ file }: Props) {
  return (
    <div className="flex items-center justify-between bg-gray-900 text-white px-3 py-5 rounded-lg w-full mb-4">
      <div className="flex items-center overflow-hidden">
        <FileText
          className="text-gray-300 p-2 bg-gray-600 rounded-lg flex-shrink-0"
          size={40}
        />
        <div className="ml-3 truncate">
          <p className="font-semibold text-lg truncate">{file.file_name}</p>
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

      <DownLoadFileButton fileId={file.id} />
    </div>
  );
}
