import { AppDispatch, RootState } from "@/app/store";
import Collection from "@/components/Collection";
import CollectionInput from "@/components/CollectionInput";
import CreateCollectionButton from "@/components/CreateCollectionButton";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import { useAuthContext } from "@/context/AuthContext";
import {
  CollectionActionStatus,
  fetchCollections,
} from "@/features/collection/collectionSlice";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Collections() {
  const { authenticatedUser } = useAuthContext();
  const dispatch = useDispatch<AppDispatch>();
  const { collections, isLoading, actionStatus } = useSelector(
    (state: RootState) => state.UserCollections
  );
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node))
        setActive(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  useEffect(() => {
    if (authenticatedUser?.id && actionStatus === CollectionActionStatus.IDLE) {
      dispatch(fetchCollections(authenticatedUser.id));
    }
  }, [authenticatedUser, actionStatus, dispatch]);
  if (isLoading) return <Loader />;

  return (
    <>
      <div>
        <Heading className="flex items-center gap-2">
          Collections <CreateCollectionButton />
        </Heading>
      </div>
      <ul
        ref={containerRef}
        className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 justify-items-center gap-6"
      >
        {actionStatus === CollectionActionStatus.CREATING && (
          <li>
            <CollectionInput />
          </li>
        )}

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
    </>
  );
}
