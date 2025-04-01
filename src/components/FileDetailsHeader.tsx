import FileBreadCrumb from "@/components/FileBreadCrumb";
import FileNameUpdate from "@/components/FileNameUpdate";
import Heading from "@/components/Heading";
import { useAuthContext } from "@/context/AuthContext";
import useFetch from "@/hooks/useFetch";
import useFileSize from "@/hooks/useFileSize";
import { ICollection } from "@/types/Collection";
import { IFile } from "@/types/File";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { Params, useParams } from "react-router";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZone: "UTC",
};

export default function FileDetailsHeader({ file }: { file: IFile }) {
  const getFileSize = useFileSize();
  const [fileName, setFileName] = useState(file.file_name);
  const [size, setSize] = useState<string | null>(null);
  const { collectionId }: Params = useParams();

  const { authenticatedUser } = useAuthContext();
  const { data: collection } = useFetch<ICollection>(
    `api/users/${authenticatedUser?.id}/collections/${collectionId}`
  );

  useEffect(() => {
    if (file) getFileSize(file.file).then((data) => setSize(data.toFixed(2)));
  }, [file]);

  const date = new Date(file.created_at);

  return (
    <Heading>
      <div className="flex items-center gap-4">
        <FileBreadCrumb
          collectionId={parseInt(collectionId!)}
          fileId={file.id}
          fileTitle={fileName}
          collectionTitle={collection?.title}
        />
        <FileNameUpdate
          fileName={fileName}
          fileId={file.id}
          setFileName={setFileName}
        />
      </div>
      <div className="mt-2 text-sm font-normal flex items-center">
        <span>File size {size} MB</span>
        <Dot />
        <span>Added on {date.toLocaleString("en-US", options)}</span>
      </div>
    </Heading>
  );
}
