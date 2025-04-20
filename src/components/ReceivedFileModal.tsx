import DownLoadFileButton from "@/components/DownloadFileButton";
import { IReceivedFile } from "@/types/ReceivedFile";
import { X } from "lucide-react";

export default function FileModal({
  file,
  onClose,
}: {
  file: IReceivedFile;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-xl max-w-lg w-full shadow-xl relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <DownLoadFileButton
          size={60}
          isProtected={file.is_protected}
          fileId={file.id}
        />

        <h2 className="text-xl font-semibold text-center mb-2">
          {file.file_name}
        </h2>
        <p className="text-lg text-center text-gray-400 mb-4">
          Sender: {file.sender.email} • Size: {file.size}
        </p>
      </div>
    </div>
  );
}
