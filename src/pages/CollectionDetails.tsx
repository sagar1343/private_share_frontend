import FileBreadCrumb from "@/components/FileBreadCrumb";
import FileContainer from "@/components/FileContainer";
import FileUploadDialog from "@/components/FileUploadDialog";
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
      <div className="flex justify-end mt-6 sm:hidden">
        <FileUploadDialog collectionId={collection?.id!} />
      </div>
      <div className="h-[20vh] sm:h-auto flex sm:block items-center justify-center px-4 sm:px-0">
        <div className="w-full flex items-center justify-center sm:justify-between">
          <FileBreadCrumb
            collectionId={Number.parseInt(id!)}
            collectionTitle={collection?.title!}
          />
          <div className="hidden sm:block">
            <FileUploadDialog collectionId={collection?.id!} />
          </div>
        </div>
      </div>
      <div className="h-[80vh] sm:h-auto overflow-y-auto sm:overflow-visible px-4 sm:px-0">
        <FileContainer className="mt-12" collectionId={collection?.id!} />
      </div>
    </div>
  );
}
