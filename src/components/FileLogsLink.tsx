import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function FileLogsLink({ collectionId, id }: { collectionId: number; id: number }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center">
      <h2 className="font-semibold flex items-center gap-2">File Logs</h2>
      <Button
        variant="link"
        className="cursor-pointer"
        onClick={() => navigate(`/dashboard/collections/${collectionId}/files/${id}/logs`)}
      >
        View file logs
      </Button>
    </div>
  );
}
