import GenericFileContainer from "@/components/GenericFileContainer";
import Heading from "@/components/Heading";
import ReceivedFileCard from "@/components/ReceivedFileCard";
import SharedFilesSkeleton from "@/components/SharedFilesSkeleton";

export default function SharedFiles() {
  return (
    <>
      <Heading heading="Shared Files" content="These are the files others have shared with you. " />
      <div className="mt-8 w-full flex flex-col">
        <GenericFileContainer
          endpoint="api/fileshare"
          queryKey={["fileshare"]}
          CardComponent={ReceivedFileCard}
          skeleton={<SharedFilesSkeleton />}
          getCardProps={(file) => ({ file })}
          containerClassName="flex flex-col gap-4"
        />
      </div>
    </>
  );
}
