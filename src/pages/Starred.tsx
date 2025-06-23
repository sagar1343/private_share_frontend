import Heading from "@/components/Heading";
import GenericFileContainer from "@/components/GenericFileContainer";
import FileCard from "@/components/FileCard";
import FilesSkeleton from "@/components/FilesSkeleton";

export default function Starred() {
  return (
    <div>
      <Heading
        heading="Starred"
        content="Quickly access important items you've marked as starred."
      />
      <div className="mt-8">
        <GenericFileContainer
          endpoint="api/starred-files"
          queryKey={["starred-files"]}
          CardComponent={FileCard}
          skeleton={<FilesSkeleton />}
          getCardProps={(file) => ({ file })}
          containerClassName="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
        />
      </div>
    </div>
  );
}
