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
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function RecievedFiles() {
  const [files, setFiles] = useState<IReceivedFile[]>();
  const [selectedFile, setSelectedFile] = useState<IReceivedFile | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("title-asc");

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
  const onNext = () => {
    if (data && data.next) setPage((page) => page + 1);
  };

  const onPrevious = () => {
    if (data && data.previous) setPage((page) => page - 1);
  };
  if (isLoading) return <Loader />;

  if (!files || files.length === 0) {
    return (
      <p className="mt-12 text-center text-gray-500">No files received yet.</p>
    );
  }

  const filteredFiles = files?.filter((file) =>
    file.file_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedFiles = [...(filteredFiles || [])].sort((a, b) => {
    if (sort === "title-asc") return a.file_name.localeCompare(b.file_name);
    if (sort === "title-desc") return b.file_name.localeCompare(a.file_name);
    if (sort === "size-asc")
      return parseFileSize(a.size) - parseFileSize(b.size);
    if (sort === "size-desc")
      return parseFileSize(b.size) - parseFileSize(a.size);
    return 0;
  });
  return (
    <>
      <Heading asHeading>Received Files</Heading>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-6">
        <SearchComponent
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={"Search files..."}
        />
        <SortDropdown sort={sort} setSort={setSort} context="received" />
      </div>

      <hr className="mb-6" />
      {filteredFiles.length == 0 ? (
        <EmptyStateModal title={"files"} searchTerm={searchTerm} />
      ) : (
        <div className="space-y-4 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedFiles.map((file) => (
            <div key={file.id}>
              <ReceivedFileCard file={file} />
            </div>
          ))}
        </div>
      )}
      {selectedFile && (
        <FileModal file={selectedFile} onClose={() => setSelectedFile(null)} />
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
