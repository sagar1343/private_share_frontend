import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import ReceivedFileCard from "@/components/ReceivedFileCard";
import FileModal from "@/components/ReceivedFileModal";
import useFetch from "@/hooks/useFetch";
import useHashId from "@/hooks/useHash";
import { PaginatedResponse } from "@/types/Pagination";
import { IReceivedFile } from "@/types/ReceivedFile";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function RecievedFiles() {
  const [files, setFiles] = useState<IReceivedFile[]>();
  const [selectedFile, setSelectedFile] = useState<IReceivedFile | null>(null);

  const { data, isLoading } =
    useFetch<PaginatedResponse<IReceivedFile>>("api/fileshare");

  const [searchParams] = useSearchParams();
  const encodedId = searchParams.get("id");
  const { decodeId } = useHashId();
  const decodedId = encodedId ? decodeId(encodedId) : null;

  useEffect(() => {
    setFiles(data?.results);

    if (data?.results && decodedId) {
      const file = data.results.find((f) => f.id === decodedId);
      if (file) setSelectedFile(file);
    }
  }, [data, decodedId]);

  if (isLoading) return <Loader />;

  if (!files || files.length === 0) {
    return (
      <p className="mt-12 text-center text-gray-500">No files received yet.</p>
    );
  }

  return (
    <>
      <Heading asHeading>Received Files</Heading>
      <div className="space-y-4 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <div key={file.id}>
            <ReceivedFileCard file={file} />
          </div>
        ))}
      </div>

      {selectedFile && (
        <FileModal file={selectedFile} onClose={() => setSelectedFile(null)} />
      )}
    </>
  );
}
