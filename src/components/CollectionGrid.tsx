import { CollectionActionStatus } from "@/app/features/collection/collectionSlice";
import { RootState } from "@/app/store";
import CollectionCreatingItem from "@/components/CollectionCreatingItem";
import CollectionItem from "@/components/CollectionItem";
import CreateCollectionButton from "@/components/CreateCollectionButton";
import EmptyStateModal from "@/components/EmptyStateModal";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import SearchComponent from "@/components/SearchComponent";
import SortDropdown from "@/components/SortDropdown";
import useClickOutside from "@/hooks/useClickOutside";
import useFetchCollections from "@/hooks/useFetchCollections";
import { ICollection } from "@/types/Collection";
import { orderBy } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CollectionGrid() {
  const { paginatedCollections, isLoading, actionStatus } = useSelector(
    (state: RootState) => state.UserCollections
  );
  const [collections, setCollections] = useState<ICollection[]>();
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("date-desc");
  const pageSize = 17;

  const containerRef = useClickOutside<HTMLUListElement>(() => setActive(null));
  useFetchCollections(actionStatus, page);

  useEffect(() => {
    if (paginatedCollections) {
      setCollections(paginatedCollections.results);
    }
  }, [paginatedCollections]);

  useEffect(() => {
    setPage(page);
  }, [sort, searchTerm]);

  if (isLoading) return <Loader />;
  const filteredCollections = collections?.filter((collection) =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCollections = orderBy(
    filteredCollections || [],
    [
      (collection) => {
        if (sort.startsWith("title")) return collection.title.toLowerCase();
        if (sort.startsWith("date")) return new Date(collection.created_at).getTime();
        return collection.title.toLowerCase();
      },
    ],
    [sort.endsWith("asc") ? "asc" : "desc"]
  );

  const onNext = () => {
    if (paginatedCollections && paginatedCollections.next) setPage((page) => page + 1);
  };
  const onPrevious = () => {
    if (paginatedCollections && paginatedCollections.previous) {
      setPage((page) => page - 1);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-6">
        <SearchComponent
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={"Search collections..."}
        />
        <SortDropdown sort={sort} setSort={setSort} context="collections" />
      </div>
      {sortedCollections.length === 0 && searchTerm ? (
        <EmptyStateModal title={"collections"} searchTerm={searchTerm} />
      ) : (
        <ul
          ref={containerRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 justify-items-center md:justify-items-start"
        >
          <li>
            {actionStatus === CollectionActionStatus.CREATING ? (
              <CollectionCreatingItem />
            ) : (
              <CreateCollectionButton />
            )}
          </li>

          {sortedCollections.map((collection) => (
            <CollectionItem
              key={collection.id}
              collection={collection}
              isActive={
                active === collection.id && actionStatus !== CollectionActionStatus.RENAMING
              }
              onClick={() => setActive(active === collection.id ? null : collection.id)}
            />
          ))}
        </ul>
      )}
      {sortedCollections.length > 0 && (
        <div className="flex justify-center my-12">
          <Pagination
            count={paginatedCollections?.count ?? 0}
            currentPage={page}
            handleNext={onNext}
            handlePrevious={onPrevious}
            pageSize={pageSize}
          />
        </div>
      )}
    </div>
  );
}
