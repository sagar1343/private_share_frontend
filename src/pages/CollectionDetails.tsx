import FileContainer from "@/components/FileContainer";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import { useAuthContext } from "@/context/AuthContext";
import useFetch from "@/hooks/useFetch";
import { ICollection } from "@/types/Collection";
import { useParams } from "react-router-dom";

export default function CollectionDetails() {
  const { authenticatedUser } = useAuthContext();
  const { id: collectionId } = useParams();

  const { data: collection, loading } = useFetch<ICollection>(
    `api/users/${authenticatedUser?.id}/collections/${collectionId}`
  );

  if (loading) return <Loader />;
  return (
    <div>
      <Heading className="capitalize flex items-center justify-between">
        {collection?.title}
      </Heading>
      <FileContainer className="mt-12" collectionId={collection?.id!} />
    </div>
  );
}
