import { CollectionActionStatus } from "@/app/features/collection/collectionSlice";
import { RootState } from "@/app/store";
import CollectionCreatingItem from "@/components/CollectionCreatingItem";
import CreateCollectionButton from "@/components/CreateCollectionButton";
import Loader from "@/components/Loader";
import useClickOutside from "@/hooks/useClickOutside";
import useFetchCollections from "@/hooks/useFetchCollections";
import { ICollection } from "@/types/Collection";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CollectionItem from "./CollectionItem";
import Pagination from "./Pagination";

export default function CollectionGrid() {
  const { paginatedCollections, isLoading, actionStatus } = useSelector(
    (state: RootState) => state.UserCollections
  );
  const [collections, setCollections] = useState<ICollection[]>();
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useClickOutside<HTMLUListElement>(() => setActive(null));
  useFetchCollections(actionStatus, page);

  const handleNext = () => {
    if (paginatedCollections && paginatedCollections.next)
      setPage((page) => page + 1);
  };

  const handlePrevious = () => {
    if (paginatedCollections && paginatedCollections.previous)
      setPage((page) => page - 1);
  };

  useEffect(() => {
    if (paginatedCollections) setCollections(paginatedCollections.results);
  }, [paginatedCollections]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <ul
        ref={containerRef}
        className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 items-center justify-items-center gap-6"
      >
        <li>
          {actionStatus === CollectionActionStatus.CREATING ? (
            <CollectionCreatingItem />
          ) : (
            <CreateCollectionButton />
          )}
        </li>
        {collections &&
          collections.map((collection) => (
            <CollectionItem
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
      {paginatedCollections && (
        <div className="flex justify-end my-12">
          <Pagination
            count={paginatedCollections.count}
            currentPage={page}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            pageSize={17}
          />
        </div>
      )}
    </div>
  );
}
