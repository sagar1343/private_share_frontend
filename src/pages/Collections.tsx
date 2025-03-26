import Collection from "@/components/Collection";
import CollectionInput from "@/components/CollectionInput";
import CreateCollectionButton from "@/components/CreateCollectionButton";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import { useCollections } from "@/context/CollectionsContext";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function Collections() {
  const { collections, isLoading, isCreating } = useCollections();
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
        {isCreating && (
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
