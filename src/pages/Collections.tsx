import CollectionGrid from "@/components/CollectionGrid";
import Heading from "@/components/Heading";

export default function Collections() {
  return (
    <div className="w-full">
      <div className="h-[30vh] sm:h-auto flex sm:block items-center justify-center">
        <Heading asHeading>Collections</Heading>
      </div>
      <div>
        <CollectionGrid />
      </div>
    </div>
  );
}
