import useFileSize from "@/hooks/useFileSize";
import { IFile } from "@/types/File";
import { ChevronRight, Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Props {
  file: IFile;
  collectionId: number;
}

export default function FileCard({ file, collectionId }: Props) {
  const [fileSize, setFileSize] = useState<string | null>(null);
  const navigate = useNavigate();
  const getFileSize = useFileSize();

  useEffect(() => {
    getFileSize(file.file).then((data) => setFileSize(data.toFixed(2)));
  }, [file]);

  return (
    <Card className="flex-row items-center justify-between border-primary">
      <CardHeader className="grow">
        <CardTitle>{file.file_name}</CardTitle>
        <CardDescription className="flex items-center max-sm:hidden">
          <span className="max-lg:hidden">
            Added on {new Date(file.created_at).toDateString()}
          </span>
          <Dot className="max-lg:hidden" />
          <span>{fileSize} MB</span>
          {file.expiration_time && <Dot />}
          <span className="text-primary">
            {file.expiration_time ? (
              <em>
                Expires in {new Date(file.expiration_time).toDateString()}
              </em>
            ) : null}
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant="default"
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
