import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useCollections } from "@/context/CollectionsContext";
import { ExternalLink, FolderPen, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import DeleteCollectionDialog from "../components/DeleteCollectionModal";

interface ContextMenuProps {
  children: React.ReactNode;
  collectionId: number;
  setRenamingCollectionId: (id: number | null) => void;
}

export default function ContextMenuComponent({
  children,
  collectionId,
  setRenamingCollectionId,
}: ContextMenuProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setUpdating } = useCollections();
  const navigate = useNavigate();
  const handleRenaming = () => {
    setUpdating(true);
    setRenamingCollectionId(collectionId);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => navigate("/")}>
            <ExternalLink /> Open
          </ContextMenuItem>
          <ContextMenuItem onClick={handleRenaming}>
            <FolderPen />
            Rename
          </ContextMenuItem>
          <ContextMenuItem onClick={() => setIsDialogOpen(true)}>
            <Trash2 />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <DeleteCollectionDialog
        collectionId={collectionId}
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
