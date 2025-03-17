import { ICollection } from "@/types/Collection";
import { Folder } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContextMenuComponent from "../components/ContextMenu";
import RenameInput from "../components/RenameCollectionInput";

interface Props {
  active?: boolean;
  collection: ICollection;
}

export default function Collection({ collection }: Props) {
  const navigate = useNavigate();

  const [renamingCollectionId, setRenamingCollectionId] = useState<
    number | null
  >(null);

  return (
    <ContextMenuComponent
      collectionId={collection.id}
      setRenamingCollectionId={setRenamingCollectionId}
    >
      <figure
        className="flex flex-col items-center cursor-pointer p-2 rounded-xl"
        onDoubleClick={() => navigate(`/collections/${collection.id}`)}
      >
        <Folder size={82} fill="#008CFC" stroke="1" />
        {renamingCollectionId === collection.id ? (
          <RenameInput
            title={collection.title}
            collectionId={collection.id}
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
