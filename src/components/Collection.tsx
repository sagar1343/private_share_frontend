import { Folder } from "lucide-react";
import { useState } from "react";
import ContextMenuComponent from "../components/ContextMenu";
import RenameInput from "../components/RenameCollectionInput";

interface Props {
  title: string;
  collectionId: number;
}

export default function Collection({ title, collectionId }: Props) {
  const [renamingCollectionId, setRenamingCollectionId] = useState<
    number | null
  >(null);

  return (
    <ContextMenuComponent
      collectionId={collectionId}
      setRenamingCollectionId={setRenamingCollectionId}
    >
      <figure className="flex flex-col items-center p-4 rounded-lg shadow-md">
        <Folder size={82} fill="#008CFC" stroke="1" />
        {renamingCollectionId === collectionId ? (
          <RenameInput
            title={title}
            collectionId={collectionId}
            onRenameComplete={() => setRenamingCollectionId(null)}
          />
        ) : (
          <figcaption className="mt-2 text-lg font-semibold">
            {title}
          </figcaption>
        )}
      </figure>
    </ContextMenuComponent>
  );
}
