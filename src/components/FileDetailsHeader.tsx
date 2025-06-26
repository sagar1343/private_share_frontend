import FileNameUpdate from "@/components/FileNameUpdate";
import Heading from "@/components/Heading";
import { useAuthContext } from "@/context/AuthContext";
import useFetch from "@/hooks/useFetch";
import { ICollection } from "@/types/Collection";
import { IFile } from "@/types/File";
import { useState } from "react";
import { Params, useParams } from "react-router";
import FileDeleteButton from "./FileDeleteButton";
import { Badge } from "./ui/badge";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZone: "UTC",
};

export default function FileDetailsHeader({ file }: { file: IFile }) {
  const [fileName, setFileName] = useState(file.file_name);
  const { collectionId }: Params = useParams();

  const { authenticatedUser } = useAuthContext();
  const { data: collection } = useFetch<ICollection>(
    ["collections", { userId: authenticatedUser?.id, collectionId }],
    `api/users/${authenticatedUser?.id}/collections/${collectionId}`
  );

  const date = new Date(file.created_at);

  return (
    <div>
      <div className="group flex flex-wrap items-center gap-4">
        <Heading heading={fileName} />
        <div className="group-hover:flex hidden items-center">
          <FileNameUpdate fileName={fileName} fileId={file.id} setFileName={setFileName} />
          <FileDeleteButton fileId={file.id} collectionId={collection?.id!} />
        </div>
      </div>
      <div className="mt-2 text-sm font-normal flex flex-col sm:flex-row sm:items-center gap-2">
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          File size {file.size}
        </Badge>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          Added on {date.toLocaleString("en-US", options)}
        </Badge>
      </div>
    </div>
  );
}
