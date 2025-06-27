import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { IAccessLogs } from "@/types/AccessLogs";
import { getInitials, formatRelativeTime } from "../utils/accessLogUtils";

export default function LogCard({ log }: { log: IAccessLogs }) {
  const date = new Date(log.access_time);
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <Card className="border-l-2 border-l-primary flex flex-row w-full p-3 rounded-md">
      <div className="flex items-center gap-3 w-full">
        <Avatar className="h-10 w-10 border">
          <AvatarFallback className="bg-primary/10 text-primary">
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
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatRelativeTime(log.access_time)}
          </p>
        </div>
      </div>
    </Card>
  );
}
