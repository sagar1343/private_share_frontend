import CollectionBreadCrumb from "@/components/CollectionBreadCrumb";
import FileContainer from "@/components/FileContainer";
import Loader from "@/components/Loader";
import { useAuthContext } from "@/context/AuthContext";
import useFetch from "@/hooks/useFetch";
import { ICollection } from "@/types/Collection";
import { useParams } from "react-router-dom";

export default function CollectionDetails() {
  const { authenticatedUser } = useAuthContext();
  const { id } = useParams();

  const { data: collection, loading,errors } = useFetch<ICollection>(
    `api/users/${authenticatedUser?.id}/collections/${id}`
  );

  if(errors) console.log(errors)
  if (loading) return <Loader />;
  return (
    <div>
      <CollectionBreadCrumb id={id} title={collection?.title!} />
      <FileContainer className="mt-12" collectionId={collection?.id!} />
    </div>
  );
}
