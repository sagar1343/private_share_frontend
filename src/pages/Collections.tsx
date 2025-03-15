import Collection from "@/components/Collection";
import CollectionInput from "@/components/CollectionInput";
import CreateCollectionButton from "@/components/CreateCollectionButton";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import { useCollections } from "@/context/CollectionsContext";

export default function Collections() {
  const { collections, isLoading, isCreating } = useCollections();

  if (isLoading) return <Loader />;
  return (
    <>
      <div>
        <Heading className="flex items-center gap-2">
          Collections <CreateCollectionButton />
        </Heading>
      </div>
      <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 justify-items-center gap-6">
        {isCreating && <CollectionInput />}

        {collections.map((collection) => (
          <Collection
            key={collection.id}
            collectionId={collection.id}
            title={collection.title}
          />
        ))}
      </div>
    </>
  );
}
