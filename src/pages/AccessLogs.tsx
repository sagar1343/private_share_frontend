import AccessLogsTable from "@/components/AccessLogsTable";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import useFetch from "@/hooks/useFetch";
import usePagination from "@/hooks/usePagination";
import { buildPaginatedEndpoint } from "@/lib/apiUtils";
import { IAccessLogs } from "@/types/AccessLogs";
import { PaginatedResponse } from "@/types/Pagination";
import { useState } from "react";
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
  const pageSize = 12;

  const { page, onNext, onPrevious } = usePagination({
    dependencies: [],
  });

  const { data, isLoading } = useFetch<PaginatedResponse<IAccessLogs>>(
    ["logs", { fileId: id, page }],
    buildPaginatedEndpoint({
      baseUrl: `api/files/${id}/logs/`,
      page,
    })
  );

  if (isLoading) return <Loader />;

  if (!data?.results || data.results.length === 0) {
    return (
      <>
        <Heading heading="Access Logs" />
        <p className="mt-12 text-center text-gray-500">No access logs available.</p>
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
      <AccessLogsTable
        fileTitle={data.results[0]?.private_file}
        groupedLogs={activeGroupedLogs}
        filter={filter}
        setFilter={setFilter}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {data.count > pageSize && (
        <div className="flex justify-center my-12">
          <Pagination
            count={data.count}
            currentPage={page}
            handleNext={() => onNext(!!data.next)}
            handlePrevious={() => onPrevious(!!data.previous)}
            pageSize={pageSize}
          />
        </div>
      )}
    </>
  );
}
