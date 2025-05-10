import EmptyStateModal from "@/components/EmptyStateModal";
import FileCard from "@/components/FileCard";
import FilesSkeleton from "@/components/FilesSkeleton";
import Pagination from "@/components/Pagination";
import SearchComponent from "@/components/SearchComponent";
import SortDropdown from "@/components/SortDropdown";
import useFetch from "@/hooks/useFetch";
import parseFileSize from "@/lib/parseFileSize";
import { IFile } from "@/types/File";
import { PaginatedResponse } from "@/types/Pagination";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  collectionId: number;
  className: string;
}

export default function FileContainer({ className, collectionId }: Props) {
  const [files, setFiles] = useState<IFile[]>();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("date-desc");
  const { data, isLoading } = useFetch<PaginatedResponse<IFile>>(
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

  if (isLoading) return <FilesSkeleton />;

  if (!files || files.length === 0) {
    return <p className="mt-12 text-center text-gray-500">No files found.</p>;
  }
  const filteredFiles = files?.filter((file) =>
    file.file_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFiles = [...(filteredFiles || [])].sort((a, b) => {
    if (sort === "title-asc") return a.file_name.localeCompare(b.file_name);
    if (sort === "title-desc") return b.file_name.localeCompare(a.file_name);
    if (sort === "date-asc")
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    if (sort === "date-desc")
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    if (sort === "size-asc")
      return parseFileSize(a.size) - parseFileSize(b.size);
    if (sort === "size-desc")
      return parseFileSize(b.size) - parseFileSize(a.size);
    return 0;
  });
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-6">
        <SearchComponent
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={"Search files..."}
        />
        <SortDropdown sort={sort} setSort={setSort} context="files" />
      </div>

      <hr className="mb-6" />
      {filteredFiles.length == 0 ? (
        <EmptyStateModal title={"files"} searchTerm={searchTerm} />
      ) : (
        <div
          className={clsx(
            "space-y-4 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
            className
          )}
        >
          {sortedFiles.map((file) => (
            <FileCard key={file.id} file={file} collectionId={collectionId} />
          ))}
        </div>
      )}
      {sortedFiles && (
        <div className="flex justify-center my-12">
          <Pagination
            count={filteredFiles.length}
            currentPage={page}
            handleNext={onNext}
            handlePrevious={onPrevious}
            pageSize={12}
          />
        </div>
      )}
    </>
  );
}
