import CreateCollectionDialog from "@/components/CreateCollectionDialog";
import FileUploadAction from "@/components/FileUploadAction";
import Heading from "@/components/Heading";
import MatricsGrid, { MetricsGridSkeleton } from "@/components/MetricsGrid";
import RecentFiles from "@/components/RecentFiles";
import RecentFilesSkeleton from "@/components/RecentFilesSkeleton";
import StorageStats, { StorageStatsSkeleton } from "@/components/StorageStats";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardSummary } from "@/context/DashboardContext";

export default function Dashboard() {
  const [data, loading] = useDashboardSummary();

  if (loading && !data) {
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
          <FileUploadAction />
        </div>
      </div>
      <section className="mt-8 space-y-8">
        <MatricsGrid data={data!} />
        <div className="grid lg:grid-cols-2 items-start max-lg:space-y-8 lg:gap-4">
          <StorageStats data={data!} />
          <RecentFiles />
        </div>
      </section>
    </div>
  );
}
