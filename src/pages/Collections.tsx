import Collection from "@/components/Collection";
import CollectionInput from "@/components/CollectionInput";
import CreateCollectionButton from "@/components/CreateCollectionButton";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import { useCollections } from "@/context/CollectionsContext";
import clsx from "clsx";
import { useState } from "react";

export default function Collections() {
  const { collections, isLoading, isCreating } = useCollections();
  const [active, setActive] = useState(-1);

  if (isLoading) return <Loader />;
  return (
    <>
      <div>
        <Heading className="flex items-center gap-2">
          Collections <CreateCollectionButton />
        </Heading>
      </div>
      <ul className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 justify-items-center gap-6">
        {isCreating && (
          <li>
            <CollectionInput />
          </li>
        )}

        {collections.map((collection) => (
          <li
            onClick={() => setActive(collection.id)}
            className={clsx("rounded-md", {
              "bg-white/20": active === collection.id,
            })}
          >
            <Collection key={collection.id} collection={collection} />
          </li>
        ))}
      </ul>
    </>
  );
}
