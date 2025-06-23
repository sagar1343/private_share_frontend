import { FileText, FolderOpen, Share2, User2 } from "lucide-react";
import { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DashboardResponse } from "@/types/DashboardResponse";
import { Skeleton } from "./ui/skeleton";

interface DashboardMatric {
  label: string;
  value: string | number;
  extras: string;
  logo: ReactElement;
}

export default function MatricsGrid({ data }: { data: DashboardResponse }) {
  const dashboardMatrics: DashboardMatric[] = [
    {
      label: "Total Collections",
      value: data.total_collection,
      extras: "+2 from last month",
      logo: <FolderOpen className="size-4" />,
    },
    {
      label: "Total Files",
      value: data.total_files,
      extras: "+18 from last week",
      logo: <FileText className="size-4" />,
    },
    {
      label: "Shared Files",
      value: data.total_shared_files,
      extras: "+4 from yesterday",
      logo: <Share2 className="size-4" />,
    },
    {
      label: "Storage Used",
      value: data.storage_used,
      extras: `of ${data.max_allowed_storage} available`,
      logo: <User2 className="size-4" />,
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dashboardMatrics.map((metric) => (
        <Card className="gap-2">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="font-medium text-sm">{metric.label}</CardTitle>
            <span className="text-muted-foreground">{metric.logo}</span>
          </CardHeader>
          <CardContent>
            <h2 className="font-bold text-2xl">{metric.value}</h2>
            <p className="text-xs text-muted-foreground">{metric.extras}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function MetricsGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="gap-2">
          <CardHeader className="flex justify-between items-center">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-6 w-6" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
