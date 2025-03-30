import { AppDispatch, RootState } from "@/app/store";
import Loader from "@/components/Loader";
import {
  CollectionActionStatus,
  fetchCollections,
} from "@/features/collection/collectionSlice";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Collection from "./Collection";
import CollectionInput from "./CollectionInput";
import CreateCollectionButton from "./CreateCollectionButton";
import { useAuthContext } from "@/context/AuthContext";

export default function CollectionGrid() {
  const { collections, isLoading, actionStatus } = useSelector(
    (state: RootState) => state.UserCollections
  );
  const dispatch = useDispatch<AppDispatch>();
  const { authenticatedUser } = useAuthContext();
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (authenticatedUser?.id && actionStatus === CollectionActionStatus.IDLE)
      dispatch(fetchCollections(authenticatedUser.id));
  }, [authenticatedUser, actionStatus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node))
        setActive(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <ul
      ref={containerRef}
      className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 items-center justify-items-center gap-6"
    >
      <li>
        {actionStatus === CollectionActionStatus.CREATING ? (
          <CollectionInput />
        ) : (
          <CreateCollectionButton />
        )}
      </li>
      {collections.map((collection) => (
        <li
          key={collection.id}
          onClick={(e) => {
            e.stopPropagation();
            setActive(active === collection.id ? null : collection.id);
          }}
          className={clsx(
            "rounded-md cursor-pointer transition-all",
            active === collection.id
              ? "bg-white/20 shadow-lg"
              : "bg-transparent"
          )}
        >
          <Collection collection={collection} />
        </li>
      ))}
    </ul>
  );
}
