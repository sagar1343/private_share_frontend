import EmptyStateModal from "@/components/EmptyStateModal";
import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import ReceivedFileCard from "@/components/ReceivedFileCard";
import FileModal from "@/components/ReceivedFileModal";
import SearchComponent from "@/components/SearchComponent";
import SharedFilesSkeleton from "@/components/SharedFilesSkeleton";
import SortDropdown from "@/components/SortDropdown";
import GenericFileContainer from "@/components/GenericFileContainer";

export default function SharedFiles() {
  return (
    <>
      <Heading heading="Shared Files" />
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
