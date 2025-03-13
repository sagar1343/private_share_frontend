import { Input } from "@/components/ui/input";

interface CollectionModalProps {
  isOpen: boolean;
  title: string;
  setTitle: (title: string) => void;
  setSelectedFile: (file: File | null) => void;
  onClose: () => void;
  onUpload: () => void;
}

export default function CollectionModal({
  isOpen,
  title,
  setTitle,
  setSelectedFile,
  onClose,
  onUpload,
}: CollectionModalProps) {
  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Collection</h2>
        <Input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md mb-3"
        />
        <Input type="file" onChange={handleFileChange} className="mb-3" />
        <div className="flex justify-around">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={onUpload}
            disabled={!title}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
