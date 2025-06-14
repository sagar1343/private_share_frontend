import EmptyStateModal from "@/components/EmptyStateModal";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import ReceivedFileCard from "@/components/ReceivedFileCard";
import FileModal from "@/components/ReceivedFileModal";
import SearchComponent from "@/components/SearchComponent";
import SortDropdown from "@/components/SortDropdown";
import useFetch from "@/hooks/useFetch";
import useHashId from "@/hooks/useHash";
import parseFileSize from "@/lib/parseFileSize";
import { PaginatedResponse } from "@/types/Pagination";
import { IReceivedFile } from "@/types/ReceivedFile";
import { orderBy } from "lodash";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function RecievedFiles() {
  const [files, setFiles] = useState<IReceivedFile[]>();
  const [selectedFile, setSelectedFile] = useState<IReceivedFile | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("title-asc");

  const { data, isLoading } = useFetch<PaginatedResponse<IReceivedFile>>(
    ["fileshare", { page }],
    `api/fileshare?page=${page}`
  );

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

  const onNext = () => {
    if (data && data.next) setPage((page) => page + 1);
  };

  const onPrevious = () => {
    if (data && data.previous) setPage((page) => page - 1);
  };
  if (isLoading) return <Loader />;

  if (!files || files.length === 0) {
    return (
      <>
        <Heading asHeading>Received Files</Heading>
        <p className="mt-12 text-center text-gray-500">No files received yet.</p>
      </>
    );
  }

  const filteredFiles = files?.filter((file) =>
    file.file_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedFiles = orderBy(
    filteredFiles || [],
    [
      (file) => {
        if (sort.startsWith("title")) return file.file_name.toLowerCase();
        if (sort.startsWith("size")) return parseFileSize(file.size);
        return file.file_name.toLowerCase();
      },
    ],
    [sort.endsWith("asc") ? "asc" : "desc"]
  );

  return (
    <>
      <div className="h-[30vh] sm:h-auto flex sm:block items-center justify-center">
        <Heading asHeading>Received Files</Heading>
      </div>
      <div className="h-[70vh] w-full flex flex-col">
        <div className="sticky top-0 sm:static z-10 bg-background sm:bg-transparent border-b sm:border-b-0 border-border/20 sm:border-transparent pb-4 sm:pb-0 mb-4 sm:mb-6">
          <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 sm:pt-0">
            <SearchComponent
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={"Search files..."}
            />
            <SortDropdown sort={sort} setSort={setSort} context="files" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto sm:overflow-visible">
          {filteredFiles.length == 0 ? (
            <EmptyStateModal title={"files"} searchTerm={searchTerm} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
              {sortedFiles.map((file) => (
                <div key={file.id}>
                  <ReceivedFileCard file={file} />
                </div>
              ))}
            </div>
          )}
          {selectedFile && <FileModal file={selectedFile} onClose={() => setSelectedFile(null)} />}
          {sortedFiles && (
            <div className="flex justify-center my-12">
              <Pagination
                count={data?.count ?? 0}
                currentPage={page}
                handleNext={onNext}
                handlePrevious={onPrevious}
                pageSize={12}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
