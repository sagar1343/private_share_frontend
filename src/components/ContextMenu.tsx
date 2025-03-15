import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import DeleteCollectionDialog from "../components/DeleteCollectionModal";

interface ContextMenuProps {
  children: React.ReactNode;
  collectionId: number;
}

export default function ContextMenuComponent({
  children,
  collectionId,
}: ContextMenuProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Open</ContextMenuItem>
          <ContextMenuItem onClick={() => setIsDialogOpen(true)}>
            Delete
          </ContextMenuItem>
          <ContextMenuItem>Rename</ContextMenuItem>
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
