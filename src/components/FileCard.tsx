import { IFile } from "@/types/File";
import { Dot, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";

interface Props {
  file: IFile;
  collectionId?: number;
}

export default function FileCard({ file, collectionId }: Props) {
  const navigate = useNavigate();

  return (
    <Card className="border-l-2 border-l-primary flex flex-row w-full p-3 rounded-md">
      <div className="flex items-center gap-3">
        <FileText className="p-2 text-primary bg-primary/10 rounded-md" size={40} />
        <div>
          <h4
            onClick={() => navigate(`/dashboard/collections/${collectionId}/files/${file.id}`)}
            className="cursor-pointer font-medium max-w-[24ch] truncate"
          >
            {file.file_name}
          </h4>
          <div className="text-muted-foreground text-xs flex items-center">
            <span>{file.size}</span>
            <Dot size={14} />
            <span>{new Date(file.created_at).toDateString()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
