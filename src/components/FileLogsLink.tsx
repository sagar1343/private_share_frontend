import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function FileLogsLink({ collectionId, id }: { collectionId: number; id: number }) {
  const navigate = useNavigate();
  return (
    <Button
      variant="link"
      className="cursor-pointer"
      onClick={() => navigate(`/dashboard/collections/${collectionId}/files/${id}/logs`)}
    >
      View file logs
    </Button>
  );
}
