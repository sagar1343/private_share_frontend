import useFetch from "@/hooks/useFetch";
import { IFile } from "@/types/File";
import { PaginatedResponse } from "@/types/Pagination";
import clsx from "clsx";
import { useEffect, useState } from "react";
import FileCard from "./FileCard";
import FileSkeleton from "./FileSkeleton";
import Pagination from "./Pagination";

interface Props {
  collectionId: number;
  className: string;
}

export default function FileContainer({ className, collectionId }: Props) {
  const [files, setFiles] = useState<IFile[]>();
  const [page, setPage] = useState(1);
  const { data, loading } = useFetch<PaginatedResponse<IFile>>(
    collectionId ? `api/files/?collections=${collectionId}&page=${page}` : ""
  );

  const onNext = () => {
    if (data && data.next) setPage((page) => page + 1);
  };

  const onPrevious = () => {
    if (data && data.previous) setPage((page) => page - 1);
  };

  useEffect(() => {
    if (data) setFiles(data.results);
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
    return <p className="mt-12 text-center text-gray-500">No files found.</p>;
  }

  return (
    <>
      <div
        className={clsx(
          "space-y-4 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          className
        )}
      >
        {files.map((file) => (
          <FileCard key={file.id} file={file} collectionId={collectionId} />
        ))}
      </div>
      <div className="flex justify-end my-12">
        <Pagination
          count={data?.count!}
          currentPage={page}
          handleNext={onNext}
          handlePrevious={onPrevious}
          pageSize={12}
        />
      </div>
    </>
  );
}
