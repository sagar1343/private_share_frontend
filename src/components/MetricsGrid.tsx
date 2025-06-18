import { FileText, FolderOpen, Share2, User2 } from "lucide-react";
import { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DashboardMatric {
  label: string;
  value: string | number;
  extras: string;
  logo: ReactElement;
}

const dashboardMatrics: DashboardMatric[] = [
  {
    label: "Total Collections",
    value: 12,
    extras: "+2 from last month",
    logo: <FolderOpen className="size-4" />,
  },
  {
    label: "Total Files",
    value: 248,
    extras: "+18 from last week",
    logo: <FileText className="size-4" />,
  },
  {
    label: "Shared Files",
    value: 32,
    extras: "+4 from yesterday",
    logo: <Share2 className="size-4" />,
  },
  {
    label: "Storage Used",
    value: "2.4 GB",
    extras: "of 10 GB available",
    logo: <User2 className="size-4" />,
  },
];

export default function MatricsGrid() {
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
