import { AppDispatch } from "@/app/store";
import {
  CollectionActionStatus,
  setActionStatus,
} from "@/features/collection/collectionSlice";
import { FolderPlus } from "lucide-react";
import { useDispatch } from "react-redux";

export default function CreateCollectionButton() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <FolderPlus
      onClick={() => dispatch(setActionStatus(CollectionActionStatus.CREATING))}
      size={32}
      cursor="pointer"
      className="hover:text-primary"
    />
  );
}
