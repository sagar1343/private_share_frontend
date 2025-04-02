import FileSkeleton from "@/components/FileSkeleton";
import Heading from "@/components/Heading";
import ReceivedFileCard from "@/components/ReceivedFileCard";
import useFetch from "@/hooks/useFetch";
import { PaginatedResponse } from "@/types/Pagination";
import { IReceivedFile } from "@/types/ReceivedFile";
import { useEffect, useState } from "react";

export default function RecievedFiles() {
  const [files, setFiles] = useState<IReceivedFile[]>();
  const { data, loading } =
    useFetch<PaginatedResponse<IReceivedFile>>("api/fileshare");

  useEffect(() => {
    setFiles(data?.results);
  }, [data]);

  if (loading) {
    return (
      <div className="space-y-4 mt-12">
        {Array.from({ length: 5 }).map((_, index) => (
          <FileSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!files || files.length === 0) {
    return (
      <p className="mt-12 text-center text-gray-500">No files recieved yet.</p>
    );
  }

  return (
    <>
      <Heading asHeading>Received Files</Heading>
      <div className="space-y-4 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <ReceivedFileCard key={file.id} file={file} />
        ))}
      </div>
    </>
  );
}
