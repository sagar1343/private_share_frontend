import CreateCollectionDialog from "@/components/CreateCollectionDialog";
import Heading from "@/components/Heading";
import MatricsGrid, { MetricsGridSkeleton } from "@/components/MetricsGrid";
import RecentFiles from "@/components/RecentFiles";
import RecentFilesSkeleton from "@/components/RecentFilesSkeleton";
import StorageStats, { StorageStatsSkeleton } from "@/components/StorageStats";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import { DashboardResponse } from "@/types/DashboardResponse";
import { Upload } from "lucide-react";

export default function Dashboard() {
  const { data, isLoading } = useFetch<DashboardResponse>(["dashboard"], "api/dashboard");

  if (isLoading && !data) {
    return (
      <div>
        <div className="flex flex-wrap gap-y-4 items-center justify-between">
          <div>
            <Heading heading="Dashboard" content="Manage your collections and files efficiently" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>
        <section className="mt-8 space-y-8">
          <MetricsGridSkeleton />
          <div className="grid lg:grid-cols-2 items-start gap-4">
            <StorageStatsSkeleton />
            <RecentFilesSkeleton />
          </div>
        </section>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-wrap gap-y-4 items-center justify-between">
        <div>
          <Heading heading="Dashboard" content="Manage your collections and files efficiently" />
        </div>
        <div className="flex gap-3">
          <CreateCollectionDialog />
          <Button>
            <Upload /> File Upload
          </Button>
        </div>
      </div>
      <section className="mt-8 space-y-8">
        <MatricsGrid data={data!} />
        <div className="grid lg:grid-cols-2 items-start gap-4">
          <StorageStats data={data!} />
          <RecentFiles />
        </div>
      </section>
    </div>
  );
}
