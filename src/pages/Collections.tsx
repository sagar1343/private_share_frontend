import CollectionGrid from "@/components/CollectionGrid";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";

export default function Collections() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading heading="Collections" content="Organize your files into collections." />
        <Button>New Collection</Button>
      </div>
      <div className="mt-8">
        <CollectionGrid />
      </div>
    </div>
  );
}
