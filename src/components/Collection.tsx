import { ICollection } from "@/types/Collection";
import { Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ContextMenuComponent from "../components/ContextMenu";
import RenameInput from "../components/RenameCollectionInput";

interface Props {
  active?: boolean;
  collection: ICollection;
}

export default function Collection({ collection, collectionId }: Props) {
  const navigate = useNavigate();

  const [renamingCollectionId, setRenamingCollectionId] = useState<
    number | null
  >(null);

  return (
    <ContextMenuComponent
      collectionId={collectionId}
      setRenamingCollectionId={setRenamingCollectionId}
    >
      <figure
      className="flex flex-col items-center cursor-pointer p-2 rounded-xl"
      onDoubleClick={() => navigate(`/collections/${collection.id}`)}
    >
        <Folder size={82} fill="#008CFC" stroke="1" />
        {renamingCollectionId === collectionId ? (
          <RenameInput
            title={collection.title}
            collectionId={collectionId}
            onRenameComplete={() => setRenamingCollectionId(null)}
          />
        ) : (
          <figcaption className="max-w-[100px] overflow-hidden whitespace-nowrap overflow-ellipsis">
            {collection.title}
          </figcaption>
        )}
      </figure>
    </ContextMenuComponent>
  );
}
