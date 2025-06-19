import FileContainer from "@/components/FileContainer";
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
        <FileContainer className="sm:mt-12" collectionId={collection?.id!} />
      </div>
    </div>
  );
}
