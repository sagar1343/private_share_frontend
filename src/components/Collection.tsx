import useManageCollection from "@/hooks/useManageCollection";
import { ICollection } from "@/types/Collection";
import { Folder } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContextMenuComponent from "../components/ContextMenu";
import CollectionInput from "./CollectionInput";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { CollectionActionStatus } from "@/app/features/collection/collectionSlice";

interface Props {
  isActive: boolean;
  collection: ICollection;
}

export default function Collection({ collection, isActive }: Props) {
  const navigate = useNavigate();
  const [renameId, setRenameId] = useState<number | null>(null);
  const { handleRename } = useManageCollection();
  const { actionStatus } = useSelector((state: RootState) => state.UserCollections);
  function handleDoubleClick() {
    if (actionStatus !== CollectionActionStatus.RENAMING) navigate(`/collections/${collection.id}`);
  }
  return (
    <ContextMenuComponent
      collectionId={collection.id}
      setRenameId={setRenameId}
      isActive={isActive}
    >
      <figure
        className="flex flex-col items-center cursor-pointer p-2 rounded-xl"
        onDoubleClick={() => handleDoubleClick()}
      >
        <Folder size={82} fill="#008CFC" stroke="1" />
        {renameId === collection.id ? (
          <CollectionInput
            key={renameId}
            defaultValues={collection}
            onSubmit={(data) => handleRename(collection, setRenameId, data)}
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
