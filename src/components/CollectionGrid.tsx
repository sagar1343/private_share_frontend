import { CollectionActionStatus } from "@/app/features/collection/collectionSlice";
import { RootState } from "@/app/store";
import CollectionCreatingItem from "@/components/CollectionCreatingItem";
import CollectionItem from "@/components/CollectionItem";
import CreateCollectionButton from "@/components/CreateCollectionButton";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import useClickOutside from "@/hooks/useClickOutside";
import useFetchCollections from "@/hooks/useFetchCollections";
import { ICollection } from "@/types/Collection";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CollectionItem from "./CollectionItem";
import EmptyStateModal from "./EmptyStateModal";
import Pagination from "./Pagination";
import SearchComponent from "./SearchComponent";

export default function CollectionGrid() {
  const { paginatedCollections, isLoading, actionStatus } = useSelector((state: RootState) => state.UserCollections);
  const [collections, setCollections] = useState<ICollection[]>();
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const containerRef = useClickOutside<HTMLUListElement>(() => setActive(null));
  useFetchCollections(actionStatus, page);

  const handleNext = () => {
    if (paginatedCollections && paginatedCollections.next) setPage((page) => page + 1);
  };

  const handlePrevious = () => {
    if (paginatedCollections && paginatedCollections.previous) setPage((page) => page - 1);
  };

  useEffect(() => {
    if (paginatedCollections) setCollections(paginatedCollections.results);
  }, [paginatedCollections]);

  if (isLoading) return <Loader />;

  const filteredCollections = collections?.filter((collection) =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-6">
        <SearchComponent
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={"Search collections..."}
        />
        {filteredCollections && (
          <Pagination
            count={filteredCollections.length}
            currentPage={page}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            pageSize={17}
          />
        )}
      </div>
      <hr className="mb-6" />
      {filteredCollections?.length == 0 && searchTerm ? (
        <EmptyStateModal title={"collections"} searchTerm={searchTerm} />
      ) : (
        <ul
          ref={containerRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center"
        >
          <li>
            {actionStatus === CollectionActionStatus.CREATING ? (
              <CollectionCreatingItem />
            ) : (
              <CreateCollectionButton />
            )}
          </li>

          {filteredCollections?.map((collection) => (
            <CollectionItem
              key={collection.id}
              collection={collection}
              isActive={
                active === collection.id &&
                actionStatus !== CollectionActionStatus.RENAMING
              }
              onClick={() =>
                setActive(active === collection.id ? null : collection.id)
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
}
