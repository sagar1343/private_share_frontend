import { IAccessLogs } from "@/types/AccessLogs";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import AccessLogsFilter from "./AccessLogsFilter";
import EmptyState from "./EmptyState";
import LogsList from "./LogsList";
import Pagination from "./Pagination";
import SearchComponent from "./SearchComponent";

interface Props {
  fileTitle: string | undefined;
  groupedLogs: {
    today: IAccessLogs[];
    yesterday: IAccessLogs[];
    earlier: IAccessLogs[];
  };
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<"all" | "today" | "yesterday">>;
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AccessLogsContainer({
  groupedLogs,
  filter,
  setFilter,
  isLoading = false,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const [logFilter, setLogFilter] = useState("all");

  useEffect(() => {
    onPageChange(1);
  }, [logFilter, filter]);

  let logs: IAccessLogs[] = [];
  if (logFilter === "all") {
    logs = [...groupedLogs.today, ...groupedLogs.yesterday, ...groupedLogs.earlier];
  } else if (logFilter === "today") {
    logs = groupedLogs.today;
  } else if (logFilter === "yesterday") {
    logs = groupedLogs.yesterday;
  }
  const allEmpty = logs.length === 0;
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Loader2 className="h-12 w-12 text-muted-foreground mb-4 animate-spin" />
        <h2 className="text-xl font-medium mb-2">Loading access logs...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 sm:mb-6">
        <div className="flex gap-2 items-center">
          <SearchComponent value={filter} onChange={setFilter} placeholder="Search by email..." />
          <AccessLogsFilter value={logFilter} onChange={setLogFilter} />
        </div>
      </div>
      {allEmpty ? (
        <EmptyState
          filter={filter}
          title="No access logs found"
          message="When users access private files, their activity will appear here."
        />
      ) : (
        <LogsList logs={logs} />
      )}
      {logs.length > 0 && totalPages > 0 && (
        <div className="flex justify-center pt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
}
