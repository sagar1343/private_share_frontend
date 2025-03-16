import { IFile } from "@/types/File";
import axios from "axios";
import { ChevronRight, Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface Props {
  file: IFile;
  collectionId: number;
}

export default function FileCard({ file, collectionId }: Props) {
  const [fileSize, setFileSize] = useState<number | null>(null);
  const navigate = useNavigate();

  async function getFileDetails(url: string) {
    const response = await axios.get(url, { responseType: "blob" });
    const size_in_MB = response.data.size / (1024 * 1024);
    setFileSize(size_in_MB);
  }

  useEffect(() => {
    getFileDetails(file.file);
  }, []);

  return (
    <Card className="flex-row justify-between">
      <CardHeader className="grow">
        <CardTitle>{file.file_name}</CardTitle>
        <CardDescription className="flex items-center max-sm:hidden">
          <span className="max-lg:hidden">
            Added on {new Date(file.created_at).toDateString()}
          </span>
          <Dot className="max-lg:hidden" />
          <span>{fileSize?.toFixed(2)} MB</span>
          <Dot />
          <span className="text-red-400">
            Expires in {new Date(file.expiration_time).toDateString()}
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() =>
            navigate(`/collections/${collectionId}/files/${file.id}`)
          }
        >
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
