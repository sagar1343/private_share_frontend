import api from "@/services/api";
import { IFile } from "@/types/File";
import { Dot, FileText, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeAgo from "react-timeago";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface Props {
  file: IFile;
  collectionId?: number;
}

export default function FileCard({ file }: Props) {
  const navigate = useNavigate();
  const [starred, setStarred] = useState(file.starred);

  async function handleUpdate() {
    setStarred((prev) => !prev);

    await api.patch(`api/files/${file.id}/`, {
      starred: !file.starred,
    });
  }

  return (
    <Card className="group border-l-2 border-l-primary flex flex-row w-full p-3 rounded-md">
      <div className="w-full flex items-center gap-3">
        <FileText className="p-2 text-primary bg-primary/10 rounded-md" size={40} />
        <div>
          <h4
            onClick={() => navigate(`/dashboard/collections/${file.collection}/files/${file.id}`)}
            className="cursor-pointer font-medium max-w-[20ch] truncate"
          >
            {file.file_name}
          </h4>
          <div className="text-muted-foreground text-xs flex items-center">
            <span>{file.size}</span>
            <Dot size={14} />
            <TimeAgo live={false} date={file.updated_at} />
          </div>
        </div>
        <Button onClick={handleUpdate} variant="ghost" size="icon" className="ml-auto">
          {starred === true ? (
            <Star fill="oklch(0.828 0.189 84.429)" className="size-4 text-amber-400" />
          ) : (
            <Star className="size-4 text-muted group-hover:flex hidden" />
          )}
        </Button>
      </div>
    </Card>
  );
}
