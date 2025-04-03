import { RootState } from "@/app/store";
import CollectionCreatingItem from "@/components/CollectionCreatingItem";
import CreateCollectionButton from "@/components/CreateCollectionButton";
import Loader from "@/components/Loader";
import { CollectionActionStatus } from "@/app/features/collection/collectionSlice";
import useClickOutside from "@/hooks/useClickOutside";
import useFetchCollections from "@/hooks/useFetchCollections";
import { useState } from "react";
import { useSelector } from "react-redux";
import CollectionItem from "./CollectionItem";

export default function CollectionGrid() {
  const { collections, isLoading, actionStatus } = useSelector(
    (state: RootState) => state.UserCollections
  );
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useClickOutside<HTMLUListElement>(() => setActive(null));
  useFetchCollections(actionStatus);

  if (isLoading) return <Loader />;

  return (
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
      {collections.map((collection) => (
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
  );
}
