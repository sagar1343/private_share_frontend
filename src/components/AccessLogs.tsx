import useFetch from "@/hooks/useFetch";
import { IAccessLogs } from "@/types/AccessLogs";
import { PaginatedResponse } from "@/types/Pagination";
import { useEffect, useState } from "react";
import LogCard from "./LogCard";
import { ScrollArea } from "./ui/scroll-area";

export default function AccessLogs({ fileId }: { fileId: number }) {
  const { data } = useFetch<PaginatedResponse<IAccessLogs>>(
    ["logs", { fileId }],
    `api/files/${fileId}/logs`
  );
  const [logs, setLogs] = useState<IAccessLogs[]>([]);

  useEffect(() => {
    if (data) setLogs(data.results);
  }, [data]);

  return (
    <div>
      <h2 className="font-semibold flex items-center">File logs</h2>
      <ul className="mt-2">
        <ScrollArea className="h-[174px]">
          {[...logs, ...logs].map((log) => (
            <li key={log.id}>
              <LogCard log={log} />
            </li>
          ))}
        </ScrollArea>
      </ul>
    </div>
  );
}
