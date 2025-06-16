import FileBreadCrumb from "@/components/FileBreadCrumb";
import FileNameUpdate from "@/components/FileNameUpdate";
import Heading from "@/components/Heading";
import { useAuthContext } from "@/context/AuthContext";
import useFetch from "@/hooks/useFetch";
import { ICollection } from "@/types/Collection";
import { IFile } from "@/types/File";
import { Dot } from "lucide-react";
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
    <Heading>
      <div className="flex justify-between items-center gap-4">
        <FileBreadCrumb
          collectionId={parseInt(collectionId!)}
          fileId={file.id}
          fileTitle={fileName}
          collectionTitle={collection?.title}
        />
        <div className="flex gap-2 items-center">
          <FileNameUpdate fileName={fileName} fileId={file.id} setFileName={setFileName} />
          <FileDeleteButton fileId={file.id} collectionId={collection?.id!} />
        </div>
      </div>
      <div className="mt-2 text-sm font-normal flex flex-col sm:flex-row sm:items-center max-sm:space-y-2">
        <Badge variant="secondary">File size {file.size}</Badge>
        <div className="flex items-center">
          <Dot size={30} className="hidden sm:inline text-green-500" />
          <Badge variant="secondary">Added on {date.toLocaleString("en-US", options)}</Badge>
        </div>
      </div>
    </Heading>
  );
}
