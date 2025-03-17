import useFetch from "@/hooks/useFetch";
import { IFile } from "@/types/File";
import { useParams } from "react-router-dom";
import FileDetailsHeader from "./FileDetailsHeader";
import Loader from "./Loader";

export default function FileDetails() {
  const { id } = useParams();
  const { data: file, loading } = useFetch<IFile>(`api/files/${id}`);

  if (loading) return <Loader />;
  if (!file) return <p>File not found!</p>;

  return (
    <div>
      <FileDetailsHeader file={file} />
    </div>
  );
}
