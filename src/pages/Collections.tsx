import { useState } from "react";
import { FolderPlus } from "lucide-react";
import CollectionModal from "../components/CollectionModal";

export default function Collections() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = () => {
    setIsModalOpen(false);
    setTitle("");
    setSelectedFile(null);
  };

  return (
    <div className="flex items-center justify-center p-6 gap-3">
      <div className="text-3xl font-semibold text-zinc-500 mb-3">
        Collections
      </div>
      <button
        className="text-blue-500 hover:text-blue-700 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <FolderPlus className="w-6 h-6" />
      </button>

      <CollectionModal
        isOpen={isModalOpen}
        title={title}
        setTitle={setTitle}
        setSelectedFile={setSelectedFile}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}
