import EmptyStateModal from "@/components/EmptyStateModal";
import Pagination from "@/components/Pagination";
import SearchComponent from "@/components/SearchComponent";
import SortDropdown from "@/components/SortDropdown";
import useFetch from "@/hooks/useFetch";
import { buildPaginatedEndpoint } from "@/lib/apiUtils";
import { PaginatedResponse } from "@/types/Pagination";
import clsx from "clsx";
import React, { useState } from "react";

interface Props {
  className?: string;
  endpoint: string;
  queryParams?: Record<string, string | number>;
  queryKey: any[];
  CardComponent: React.ComponentType<any>;
  skeleton: React.ReactNode;
  getCardProps?: (file: any) => object;
  emptyStateTitle?: string;
  containerClassName?: string;
}

export default function GenericFileContainer({
  className = "",
  endpoint,
  queryParams,
  queryKey,
  CardComponent,
  skeleton,
  getCardProps = (file) => ({ file }),
  emptyStateTitle = "files",
  containerClassName = "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4",
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("-created_at");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useFetch<PaginatedResponse<any>>(
    [...queryKey, { page, searchTerm, sort }],
    buildPaginatedEndpoint({
      baseUrl: endpoint,
      page,
      searchTerm,
      sort,
      additionalParams: queryParams,
    })
  );

  if (isLoading) return skeleton;

  return (
    <>
      <div className="mb-4 sm:mb-6">
        <div className="flex gap-2">
          <SearchComponent
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={"Search files..."}
          />
          <SortDropdown sort={sort} setSort={setSort} context="files" />
        </div>
      </div>

      {!data?.results || data.results.length === 0 ? (
        searchTerm ? (
          <EmptyStateModal title={emptyStateTitle} />
        ) : (
          <p className="text-muted-foreground text-center">No results found.</p>
        )
      ) : (
        <div className={clsx(containerClassName, className)}>
          {data.results.map((file: any) => (
            <CardComponent key={file.id} {...getCardProps(file)} />
          ))}
        </div>
      )}

      {data && data.count > 0 && (
        <div className="flex justify-center my-12">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(data.count / data.page_size)}
            onPageChange={setPage}
          />
        </div>
      )}
    </>
  );
}
