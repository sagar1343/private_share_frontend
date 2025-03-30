import { useCollections } from "@/context/CollectionsContext";
import { FolderPlus } from "lucide-react";

export default function CreateCollectionButton() {
  const { setCreating } = useCollections();
  return (
    <button onClick={() => setCreating(true)} className="hover:text-primary">
      <FolderPlus size={82} cursor="pointer" />
      <p>Create New</p>
    </button>
  );
}
