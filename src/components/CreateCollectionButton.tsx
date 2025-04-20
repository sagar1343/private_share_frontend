import { AppDispatch } from "@/app/store";
import {
  CollectionActionStatus,
  setActionStatus,
} from "@/app/features/collection/collectionSlice";
import { FolderPlus } from "lucide-react";
import { useDispatch } from "react-redux";

export default function CreateCollectionButton() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <button
      onClick={() => dispatch(setActionStatus(CollectionActionStatus.CREATING))}
      className="hover:text-primary"
    >
      <figure className="flex flex-col items-center cursor-pointer p-2 rounded-xl">
        <FolderPlus size={82} cursor="pointer" />
        <figcaption className="h-9">Create New</figcaption>
      </figure>
    </button>
  );
}
