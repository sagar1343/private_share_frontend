import EmptyStateModal from "@/components/EmptyStateModal";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import SearchComponent from "@/components/SearchComponent";
import SortDropdown from "@/components/SortDropdown";
import { useAuthContext } from "@/context/AuthContext";
import useClickOutside from "@/hooks/useClickOutside";
import { useCollections } from "@/services/collectionService";
import { useState } from "react";
import Collection from "./CollectionItem";

export default function CollectionGrid() {
  const { authenticatedUser } = useAuthContext();
  const [_active, setActive] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("-created_at");
  const [page, setPage] = useState(1);

  const containerRef = useClickOutside<HTMLUListElement>(() => setActive(null));

  const { data: paginatedCollections, isLoading } = useCollections(
    authenticatedUser?.id!,
    page,
    searchTerm,
    sort
  );

  if (isLoading) return <Loader />;

  return (
    <div className="w-full flex flex-col h-full">
      <div className="sticky top-0 sm:static z-10 bg-background sm:bg-transparent border-b sm:border-b-0 border-border/20 sm:border-transparent pb-4 sm:pb-0 mb-4 sm:mb-6">
        <div className="flex gap-2">
          <SearchComponent
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={"Search collections..."}
          />
          <SortDropdown sort={sort} setSort={setSort} context="collections" />
        </div>
      </div>
      {(!paginatedCollections?.results || paginatedCollections.results.length === 0) && (
        <>
          {searchTerm ? (
            <EmptyStateModal title="collection" />
          ) : (
            <p className="text-muted-foreground text-center">No collections found.</p>
          )}
        </>
      )}
      <div className="flex-1 overflow-y-auto sm:overflow-visible">
        <ul
          ref={containerRef}
          className="grid grid-cols-3 lg:grid-cols-6 gap-x-6 justify-items-center items-center sm:justify-items-start"
        >
          {paginatedCollections?.results.map((collection) => (
            <Collection key={collection.id} collection={collection} />
          ))}
        </ul>

        {paginatedCollections?.count && paginatedCollections?.count > 0 ? (
          <div className="flex justify-center my-12">
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(paginatedCollections.count / paginatedCollections.page_size)}
              onPageChange={setPage}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
