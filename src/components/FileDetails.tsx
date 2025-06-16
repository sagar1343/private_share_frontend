import Share from "@/components/Share";
import DownlaodSection from "@/components/DownlaodsSection";
import ExpirationSection from "@/components/ExpirationSection";
import FileDetailsHeader from "@/components/FileDetailsHeader";
import FileNotFound from "@/components/FileNotFound";
import FilePermissions from "@/components/FilePermissions";
import Loader from "@/components/Loader";
import MaxDownlaodSection from "@/components/MaxDownloadSection";
import PasswordSection from "@/components/PasswordSection";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { IFile } from "@/types/File";
import { useNavigate, useParams } from "react-router-dom";

export default function FileDetails() {
  const { id, collectionId } = useParams();
  const navigate = useNavigate();

  const { data: file, isLoading } = useFetch<IFile>(["files", { id }], `api/files/${id}`);
  if (isLoading) return <Loader />;
  if (!file) return <FileNotFound />;

  return (
    <div>
      <FileDetailsHeader file={file} />
      <div>
        <Share id={file.id} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 max-lg:space-y-12">
        <div className="mt-12 space-y-12">
          <ExpirationSection date={file.expiration_time} />
          <PasswordSection isProtected={file.is_protected} />
          <DownlaodSection totalDownloads={file.download_count} />
          <MaxDownlaodSection maxDownloads={file.max_download_count} />
        </div>
        <div className="lg:mt-12 space-y-12">
          <FilePermissions fileId={file.id} />
          <div className="flex items-center">
            <h2 className="font-semibold flex items-center gap-2">File Logs</h2>
            <Button
              variant="link"
              className="cursor-pointer"
              onClick={() => navigate(`/collections/${collectionId}/files/${id}/logs`)}
            >
              View file logs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
