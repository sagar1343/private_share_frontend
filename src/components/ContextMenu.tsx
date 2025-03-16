import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useCollections } from "@/context/CollectionsContext";
import { useState } from "react";
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

  const handleRenaming = () => {
    setUpdating(true);
    setRenamingCollectionId(collectionId);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Open</ContextMenuItem>
          <ContextMenuItem onClick={() => setIsDialogOpen(true)}>
            Delete
          </ContextMenuItem>
          <ContextMenuItem onClick={handleRenaming}>Rename</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <DeleteCollectionDialog
        collectionId={collectionId}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
