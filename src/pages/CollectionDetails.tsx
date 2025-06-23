import GenericFileContainer from "@/components/GenericFileContainer";
import FileCard from "@/components/FileCard";
import FilesSkeleton from "@/components/FilesSkeleton";
import FileUploadDialog from "@/components/FileUploadDialog";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import { useAuthContext } from "@/context/AuthContext";
import useFetch from "@/hooks/useFetch";
import type { ICollection } from "@/types/Collection";
import { useParams } from "react-router-dom";

export default function CollectionDetails() {
  const { id } = useParams();
  const { authenticatedUser } = useAuthContext();
  const { data: collection, isLoading } = useFetch<ICollection>(
    ["collections", { id }],
    `api/users/${authenticatedUser?.id}/collections/${id}`
  );

  if (isLoading) return <Loader />;

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <Heading
          heading={collection?.title!}
          content="Easily manage all your uploaded and received files in one place."
        />
        <FileUploadDialog collectionId={collection?.id!} />
      </div>
      <div className="mt-8">
        <GenericFileContainer
          endpoint="api/files/"
          queryKey={["files", { collectionId: collection?.id! }]}
          queryParams={{ collection: collection?.id.toString()! }}
          CardComponent={FileCard}
          skeleton={<FilesSkeleton />}
          getCardProps={(file) => ({ file, collectionId: collection?.id! })}
          containerClassName="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
        />
      </div>
    </div>
  );
}
