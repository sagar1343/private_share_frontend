import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import MatricsGrid from "@/components/MetricsGrid";
import StorageStats from "@/components/StorageStats";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { DashboardResponse } from "@/types/DashboardResponse";
import { Folder, Upload } from "lucide-react";

export default function Dashboard() {
  const { data, isLoading } = useFetch<DashboardResponse>(["dashboard"], "api/dashboard");
  if (isLoading && !data) return <Loader />;
  return (
    <div>
      <div className="flex flex-wrap gap-y-4 items-center justify-between">
        <div>
          <Heading heading="Dashboard" content="Manage your collections and files efficiently" />
        </div>
        <div className="flex gap-3">
          <Button>
            <Folder /> New Collection
          </Button>
          <Button>
            <Upload /> File Upload
          </Button>
        </div>
      </div>
      <section className="mt-8 space-y-8">
        <MatricsGrid data={data!} />
        <div className="grid lg:grid-cols-2 gap-4">
          <StorageStats data={data!} />
        </div>
      </section>
    </div>
  );
}
