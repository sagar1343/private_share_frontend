import CollectionGrid from "@/components/CollectionGrid";
import Heading from "@/components/Heading";

export default function Collections() {
  return (
    <div>
      <Heading heading="Collections" content="Organize your files into collections" />
      <div>
        <CollectionGrid />
      </div>
    </div>
  );
}
