import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardResponse } from "@/types/DashboardResponse";
import { Skeleton } from "./ui/skeleton";
import parseSize from "filesize-parser";

export default function StorageStats({ data }: { data: DashboardResponse }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Storage Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Used Storage</span>
            <span className="text-sm text-muted-foreground">{data.storage_used}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-[#0089FA] h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (parseSize(data.storage_used || "0B") /
                    parseSize(data.max_allowed_storage || "1B")) *
                  100
                }%`,
              }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>0 MB</span>
            <span>{data.max_allowed_storage}</span>
          </div>
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#0089FA] rounded-full" />
                <span>Files</span>
              </div>
              <span>{data.total_files}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>Collections</span>
              </div>
              <span>{data.total_collection}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#8f00ff] rounded-full" />
                <span>Shared</span>
              </div>
              <span>{data.total_shared_files}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span>Recently Expired Files</span>
              </div>
              <span>{data.recently_expired_files}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full" />
                <span>Starred Files</span>
              </div>
              <span>{data.starred_files}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StorageStatsSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Storage Usage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
}
