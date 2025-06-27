import LogCard from "./LogCard";
import { IAccessLogs } from "@/types/AccessLogs";

export default function LogsList({ logs }: { logs: IAccessLogs[] }) {
  return <div className="flex flex-col gap-4">{logs.map((log) => <LogCard key={log.id} log={log} />)}</div>;
} 