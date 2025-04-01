import FileBreadCrumb from "@/components/FileBreadCrumb";
import FileContainer from "@/components/FileContainer";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import useFetch from "@/hooks/useFetch";
import { ICollection } from "@/types/Collection";
import { FilePlus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function CollectionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authenticatedUser } = useAuthContext();
  const { data: collection, loading } = useFetch<ICollection>(
    `api/users/${authenticatedUser?.id}/collections/${id}`
  );

  if (loading) return <Loader />;
  return (
    <div>
      <FileBreadCrumb
        collectionId={parseInt(id!)}
        collectionTitle={collection?.title!}
      />
      <div className="flex justify-end">
        <Button
          onClick={() => navigate(`/collections/${collection?.id}/files`)}
          size="default"
          className="cursor-pointer"
        >
          <FilePlus /> Add File
        </Button>
      </div>
      <FileContainer className="mt-12" collectionId={collection?.id!} />
    </div>
  );
}
