import { FolderPlus } from "lucide-react";

interface Props {
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateCollectionButton({ setCreating }: Props) {
  return (
    <FolderPlus
      onClick={() => setCreating(true)}
      size={32}
      cursor="pointer"
      className="hover:text-primary"
    />
  );
}
