import ExpirationSection from "@/components/ExpirationSection";
import FileDetailsHeader from "@/components/FileDetailsHeader";
import FileNotFound from "@/components/FileNotFound";
import FilePermissions from "@/components/FilePermissions";
import Loader from "@/components/Loader";
import MaxDownlaodSection from "@/components/MaxDownloadSection";
import PasswordSection from "@/components/PasswordSection";
import Share from "@/components/Share";
import useFetch from "@/hooks/useFetch";
import type { IFile } from "@/types/File";
import { BarChart3, Settings, Shield } from "lucide-react";
import { useParams } from "react-router-dom";
import FileLogsLink from "./FileLogsLink";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

export default function FileDetails() {
  const { id, collectionId } = useParams();

  const { data: file, isLoading } = useFetch<IFile>(["files", { id }], `api/files/${id}`);

  if (isLoading) return <Loader />;
  if (!file) return <FileNotFound />;

  return (
    <div className="space-y-6">
      <FileDetailsHeader file={file} />
      <div className="my-12">
        <Share id={file.id} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 xl:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="w-5 h-5 text-primary" />
                File Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ExpirationSection date={file.expiration_time} />
              <Separator />
              <PasswordSection isProtected={file.is_protected} />
              <Separator />
              <MaxDownlaodSection maxDownloads={file.max_download_count} />
            </CardContent>
          </Card>

          <Card className="hidden xl:flex">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-primary" />
                Analytics & Logs
                <FileLogsLink collectionId={Number.parseInt(collectionId!)} id={file.id} />
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-primary" />
                Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FilePermissions fileId={file.id} />
            </CardContent>
          </Card>
        </div>

        <Card className="flex xl:hidden xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="w-5 h-5 text-primary" />
              Analytics & Logs
              <FileLogsLink collectionId={Number.parseInt(collectionId!)} id={file.id} />
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
