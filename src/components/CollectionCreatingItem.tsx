import CollectionInput from "@/components/CollectionInput";
import useManageCollection from "@/hooks/useManageCollection";
import { Folder } from "lucide-react";

export default function CollectionCreatingItem() {
  const { handleCreate } = useManageCollection();
  return (
    <div className="flex flex-col items-center">
      <Folder size={82} fill="#008CFC" stroke="1" />
      <CollectionInput onSubmit={handleCreate} />
    </div>
  );
}
