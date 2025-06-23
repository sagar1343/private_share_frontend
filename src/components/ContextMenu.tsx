import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ExternalLink, FolderPen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import DeleteCollectionDialog from "../components/DeleteCollectionModal";

interface Props {
  children: React.ReactNode;
  collectionId: number;
  setRenameId: React.Dispatch<React.SetStateAction<number | null>>;
  isActive: boolean;
}

export default function ContextMenuComponent({
  children,
  collectionId,
  setRenameId,
  isActive,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleRenaming = () => {
    setRenameId(collectionId);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger disabled={!isActive}>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="cursor-pointer"
            onClick={() => navigate(`/dashboard/collections/${collectionId}`)}
          >
            <ExternalLink /> Open
          </ContextMenuItem>
          <ContextMenuItem className="cursor-pointer" onClick={handleRenaming}>
            <FolderPen />
            Rename
          </ContextMenuItem>
          <ContextMenuItem
            className="cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
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
