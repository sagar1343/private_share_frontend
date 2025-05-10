import FileBreadCrumb from "@/components/FileBreadCrumb";
import FileContainer from "@/components/FileContainer";
import FileUploadDialog from "@/components/FileUploadDialog";
import Loader from "@/components/Loader";
import { useAuthContext } from "@/context/AuthContext";
import useFetch from "@/hooks/useFetch";
import { ICollection } from "@/types/Collection";
import { useParams } from "react-router-dom";

export default function CollectionDetails() {
  const { id } = useParams();
  const { authenticatedUser } = useAuthContext();
  const { data: collection, isLoading } = useFetch<ICollection>(["collections", { id }], `api/users/${authenticatedUser?.id}/collections/${id}`);

  if (isLoading) return <Loader />;
  return (
    <div>
      <div className="flex items-center justify-between">
        <FileBreadCrumb collectionId={parseInt(id!)} collectionTitle={collection?.title!} />
        <FileUploadDialog collectionId={collection?.id!} />
      </div>
      <FileContainer className="mt-12" collectionId={collection?.id!} />
    </div>
  );
}
