import CollectionGrid from "@/components/CollectionGrid";
import Heading from "@/components/Heading";

export default function Collections() {
  return (
    <div className="w-full">
      <div className="hidden sm:block">
        <Heading asHeading>Collections</Heading>
        <CollectionGrid />
      </div>
      <div className="sm:hidden flex flex-col h-screen">
        <div className="h-[40vh] flex items-center justify-center bg-gradient-to-b from-background to-background/80">
          <h1 className="text-4xl font-bold text-center">Collections</h1>
        </div>
        <div className="h-[60vh] overflow-y-auto px-4 pb-4 pt-6 bg-background rounded-t-3xl -mt-6 shadow-lg">
          <CollectionGrid />
        </div>
      </div>
    </div>
  );
}
