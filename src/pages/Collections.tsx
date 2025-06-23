import CollectionGrid from "@/components/CollectionGrid";
import CreateCollectionDialog from "@/components/CreateCollectionDialog";
import Heading from "@/components/Heading";

export default function Collections() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading heading="Collections" content="Organize your files into collections." />
        <CreateCollectionDialog />
      </div>
      <div className="mt-8">
        <CollectionGrid />
      </div>
    </div>
  );
}
