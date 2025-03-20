import { IAccessLogs } from "@/types/AccessLogs";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function LogCard({ log }: { log: IAccessLogs }) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  };

  return (
    <Card className="border-0 py-2">
      <CardHeader className="px-0 border-b">
        <CardTitle>
          <span className="font-light text-green-700 dark:text-green-400">
            {log.access_by}
          </span>
        </CardTitle>
        <CardDescription>
          <p>
            {new Date(log.access_time).toLocaleDateString("en-US", options)}
          </p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
