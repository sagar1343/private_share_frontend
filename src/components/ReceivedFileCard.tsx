import DownLoadFileButton from "@/components/DownloadFileButton";
import { Card } from "@/components/ui/card";
import { IReceivedFile } from "@/types/ReceivedFile";
import { Dot, FileText, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  file: IReceivedFile;
}

export default function ReceivedFileCard({ file }: Props) {
  return (
    <Card className="border-l-2 border-l-primary flex flex-row w-full p-3 rounded-md">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <FileText className="p-2 text-primary bg-primary/10 rounded-md" size={40} />
          <div>
            <h4 className="flex gap-1 items-center font-medium max-w-[24ch] truncate">
              {file.file_name}
              {file.is_protected && <Lock size={12} className="text-primary w-6" />}
            </h4>

            <div className="text-muted-foreground text-xs sm:text-sm flex items-center">
              <span className="text-nowrap">{file.size}</span>
              <Dot size={14} />
              <div className="flex items-center gap-1">
                <Avatar className="max-sm:hidden rounded-md size-4">
                  <AvatarImage src={file.sender.profile_pic} />
                  <AvatarFallback className="bg-primary/10 hover:bg-primary/20 rounded-md text-primary">
                    {file.sender.first_name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{file.sender.email}</span>
              </div>
            </div>
          </div>
        </div>

        <DownLoadFileButton isProtected={file.is_protected} fileId={file.id} />
      </div>
    </Card>
  );
}
