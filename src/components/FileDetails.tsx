import CopyLink from "@/components/CopyLink";
import FileDetailsHeader from "@/components/FileDetailsHeader";
import Loader from "@/components/Loader";
import useFetch from "@/hooks/useFetch";
import { IFile } from "@/types/File";
import { useParams } from "react-router-dom";
import DownlaodSection from "./DownlaodsSection";
import ExpirationSection from "./ExpirationSection";
import FilePermissions from "./FilePermissions";
import MaxDownlaodSection from "./MaxDownloadSection";
import PasswordSection from "./PasswordSection";

export default function FileDetails() {
  const { id } = useParams();
  const { data: file, loading } = useFetch<IFile>(`api/files/${id}`);
  if (loading) return <Loader />;
  if (!file) return <p>File not found!</p>;

  return (
    <div>
      <FileDetailsHeader file={file} />
      <CopyLink id={file.id} />
      <hr />
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 max-lg:space-y-12">
        <div className="mt-12 space-y-12">
          <ExpirationSection date={file.expiration_time} />
          <PasswordSection isProtected={file.is_protected} />
          <DownlaodSection totalDownloads={file.download_count} />
          <MaxDownlaodSection maxDownloads={file.max_download_count} />
        </div>
        <div className="lg:mt-12">
          <FilePermissions fileId={file.id} />
        </div>
      </div>
    </div>
  );
}
