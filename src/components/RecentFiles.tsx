import useFetch from "@/hooks/useFetch";
import { IFile } from "@/types/File";
import { PaginatedResponse } from "@/types/Pagination";
import FileCard from "./FileCard";
import RecentFilesSkeleton from "./RecentFilesSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function RecentFiles() {
  const { data } = useFetch<PaginatedResponse<IFile>>(["files", "recent"], "api/recent-files");
  if (!data) return <RecentFilesSkeleton />;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Recent Files</CardTitle>
      </CardHeader>
      <CardContent>
        {data.count > 0 ? (
          <ul className="flex flex-col gap-4">
            {data.results.map((file) => (
              <FileCard file={file} />
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No files in your collections</p>
        )}
      </CardContent>
    </Card>
  );
}
