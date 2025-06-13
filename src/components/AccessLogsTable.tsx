import Heading from "@/components/Heading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Calendar, ChevronRight, Clock, Search } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "./ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import { IAccessLogs } from "@/types/AccessLogs";

type TabKey = "all" | "today" | "yesterday";

interface Props {
  fileTitle: String | undefined;
  groupedLogs: {
    today: IAccessLogs[];
    yesterday: IAccessLogs[];
    earlier: IAccessLogs[];
  };
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<TabKey>>;
}

export default function AccessLogsTable({
  fileTitle,
  groupedLogs,
  filter,
  setFilter,
  activeTab,
  setActiveTab,
}: Props) {
  const getInitials = (name: string) => {
    return name
      .split("@")[0]
      .split(".")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  const { collectionId, id: fileId } = useParams();
  const formatRelativeTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? "" : "s"} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderLogItem = (log: IAccessLogs) => {
    const date = new Date(log.access_time);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <div
        key={log.id}
        className="flex items-center gap-4 p-4 border-b last:border-0 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
      >
        <Avatar className="h-10 w-10 border">
          <AvatarFallback className="bg-gray-100 text-gray-600">
            {getInitials(log.access_by)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-medium truncate">{log.access_by}</p>
            <Badge variant="outline" className="ml-2 text-xs">
              {formattedTime}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatRelativeTime(log.access_time)}
          </p>
        </div>
      </div>
    );
  };

  const renderSection = (title: string, logs: IAccessLogs[]) => {
    if (logs.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-500">
          <Calendar className="h-4 w-4" />
          <h3>{title}</h3>
        </div>
        <Card>
          <CardContent className="p-0">{logs.map(renderLogItem)}</CardContent>
        </Card>
      </div>
    );
  };

  const EmptyState = () => (
    <Card className="w-full border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-gray-100 p-3 mb-4">
          <AlertCircle className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No access logs found</h3>
        <p className="text-gray-500 max-w-sm">
          {filter
            ? `No logs matching "${filter}" were found. Try a different search term.`
            : "When users access private files, their activity will appear here."}
        </p>
      </CardContent>
    </Card>
  );

  const allEmpty =
    groupedLogs.today.length === 0 &&
    groupedLogs.yesterday.length === 0 &&
    groupedLogs.earlier.length === 0;

  return (
    <div className="w-full">
      <Card className="border-0">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Breadcrumb>
                <BreadcrumbList className="mt-6 mb-12 flex items-center">
                  <BreadcrumbItem className="max-md:hidden">
                    <Link to={`/collections/${collectionId}/files/${fileId}`}>
                      {" "}
                      <Heading className="mt-0! mb-0! max-w-[12ch] truncate leading-relaxed max-md:hidden">
                        {fileTitle}
                      </Heading>
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem className="items-center max-md:hidden">
                    <ChevronRight size="28" />
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      <Heading className="mt-0! mb-0!">Access Logs</Heading>
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TabKey)}
            className="w-full"
          >
            <div className="flex flex-col justify-between sm:flex-row gap-6">
              <div className="relative sm:w-1/3 w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by email..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <TabsList className="grid w-full grid-cols-3 sm:w-auto mb-6 ">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
                  >
                    All Logs
                  </TabsTrigger>
                  <TabsTrigger
                    value="today"
                    className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
                  >
                    Today
                  </TabsTrigger>
                  <TabsTrigger
                    value="yesterday"
                    className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
                  >
                    Yesterday
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <TabsContent value="all" className="mt-0 ">
              {allEmpty ? (
                <EmptyState />
              ) : (
                <>
                  {renderSection("Today", groupedLogs.today)}
                  {renderSection("Yesterday", groupedLogs.yesterday)}
                  {renderSection("Earlier", groupedLogs.earlier)}
                </>
              )}
            </TabsContent>

            <TabsContent value="today" className="mt-0">
              {groupedLogs.today.length > 0 ? (
                renderSection("Today", groupedLogs.today)
              ) : (
                <EmptyState />
              )}
            </TabsContent>

            <TabsContent value="yesterday" className="mt-0">
              {groupedLogs.yesterday.length > 0 ? (
                renderSection("Yesterday", groupedLogs.yesterday)
              ) : (
                <EmptyState />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
