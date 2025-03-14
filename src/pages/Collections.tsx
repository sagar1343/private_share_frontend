import Collection from "@/components/Collection";
import CollectionInput from "@/components/CollectionInput";
import CreateCollectionButton from "@/components/CreateCollectionButton";
import Heading from "@/components/Heading";
import useCollection from "@/hooks/useCollections";
import { useState } from "react";

export default function Collections() {
  const { collections } = useCollection();
  const [isCreating, setCreating] = useState(false);
  return (
    <>
      <div>
        <Heading className="flex items-center gap-2">
          Collections <CreateCollectionButton setCreating={setCreating} />
        </Heading>
      </div>
      <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 justify-items-center gap-6">
        {isCreating && <CollectionInput setCreating={setCreating} />}

        {collections.map((collection) => (
          <Collection key={collection.id} title={collection.title} />
        ))}
      </div>
    </>
  );
}
