import AccessLogsTable from "@/components/AccessLogsTable";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import useFetch from "@/hooks/useFetch";
import { IAccessLogs } from "@/types/AccessLogs";
import { PaginatedResponse } from "@/types/Pagination";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type TabKey = "all" | "today" | "yesterday";

type GroupedLogs = {
  today: IAccessLogs[];
  yesterday: IAccessLogs[];
  earlier: IAccessLogs[];
};

export default function AccessLogs() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const { data, isLoading } = useFetch<PaginatedResponse<IAccessLogs>>(
    ["logs", { fileId: id }],
    `api/files/${id}/logs/?page=${page}`
  );
  const [logs, setLogs] = useState<IAccessLogs[]>([]);

  useEffect(() => {
    if (data) setLogs(data.results);
  }, [data]);

  const onNext = () => {
    if (data?.next) setPage((p) => p + 1);
  };

  const onPrevious = () => {
    if (data?.previous) setPage((p) => p - 1);
  };

  const filteredLogs = logs.filter((log) =>
    log.access_by.toLowerCase().includes(filter.toLowerCase())
  );

  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  const groupedLogs: GroupedLogs = {
    today: filteredLogs.filter(
      (log) => new Date(log.access_time).toDateString() === today
    ),
    yesterday: filteredLogs.filter(
      (log) => new Date(log.access_time).toDateString() === yesterday
    ),
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

  const logsToShow =
    activeTab === "all"
      ? [...groupedLogs.today, ...groupedLogs.yesterday, ...groupedLogs.earlier]
      : activeGroupedLogs[activeTab];

  if (isLoading) return <Loader />;

  if (logs.length === 0) {
    return (
      <p className="mt-12 text-center text-gray-500">
        No access logs available.
      </p>
    );
  }

  return (
    <>
      <AccessLogsTable
        groupedLogs={activeGroupedLogs}
        filter={filter}
        setFilter={setFilter}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {logsToShow.length > 0 && (
        <div className="flex justify-center my-12">
          <Pagination
            count={data?.count!}
            currentPage={page}
            handleNext={onNext}
            handlePrevious={onPrevious}
            pageSize={12}
          />
        </div>
      )}
    </>
  );
}
