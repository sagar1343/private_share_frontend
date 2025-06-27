import AccessLogsContainer from "@/components/AccessLogsContainer";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import useFetch from "@/hooks/useFetch";
import { buildPaginatedEndpoint } from "@/lib/apiUtils";
import { IAccessLogs } from "@/types/AccessLogs";
import { PaginatedResponse } from "@/types/Pagination";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type TabKey = "all" | "today" | "yesterday";

interface GroupedLogs {
  today: IAccessLogs[];
  yesterday: IAccessLogs[];
  earlier: IAccessLogs[];
}

export default function AccessLogs() {
  const { id } = useParams();
  const [filter, setFilter] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useFetch<PaginatedResponse<IAccessLogs>>(
    ["logs", { fileId: id, page }],
    buildPaginatedEndpoint({
      baseUrl: `api/files/${id}/logs/`,
      page,
    })
  );

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Loader />
        <h2 className="text-xl font-medium mb-2">Loading access logs...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-red-500 mb-4">
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-medium mb-2">Error loading access logs</h2>
        <p className="text-muted-foreground">Please try refreshing the page</p>
      </div>
    );
  }

  if (!data?.results || data.results.length === 0) {
    return (
      <>
        <Heading heading="Access Logs" content="Track who accessed your files and when." />
        <div className="mt-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-muted-foreground mb-4">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">No access logs available</h3>
            <p className="text-muted-foreground">
              When users access this file, their activity will appear here.
            </p>
          </div>
        </div>
      </>
    );
  }

  const filteredLogs = data.results.filter((log) =>
    log.access_by.toLowerCase().includes(filter.toLowerCase())
  );

  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  const groupedLogs: GroupedLogs = {
    today: filteredLogs.filter((log) => new Date(log.access_time).toDateString() === today),
    yesterday: filteredLogs.filter((log) => new Date(log.access_time).toDateString() === yesterday),
    earlier: filteredLogs.filter((log) => {
      const logDate = new Date(log.access_time).toDateString();
      return logDate !== today && logDate !== yesterday;
    }),
  };

  const activeGroupedLogs =
    activeTab === "all"
      ? groupedLogs
      : {
          today: activeTab === "today" ? groupedLogs.today : [],
          yesterday: activeTab === "yesterday" ? groupedLogs.yesterday : [],
          earlier: [],
        };

  return (
    <>
      <Heading heading="Access Logs" content="Track who accessed your files and when." />
      <div className="mt-8">
        <AccessLogsContainer
          fileTitle={data.results[0]?.private_file}
          groupedLogs={activeGroupedLogs}
          filter={filter}
          setFilter={setFilter}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLoading={isLoading}
          currentPage={page}
          totalPages={Math.ceil(data.count / data.page_size)}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
