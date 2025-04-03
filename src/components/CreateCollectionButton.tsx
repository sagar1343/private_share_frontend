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
      <FolderPlus size={82} cursor="pointer" />
      <p>Create New</p>
    </button>
  );
}
