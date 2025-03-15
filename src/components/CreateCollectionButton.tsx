import { useCollections } from "@/context/CollectionsContext";
import { FolderPlus } from "lucide-react";

export default function CreateCollectionButton() {
  const { setCreating } = useCollections();
  return (
    <FolderPlus
      onClick={() => setCreating(true)}
      size={32}
      cursor="pointer"
      className="hover:text-primary"
    />
  );
}
