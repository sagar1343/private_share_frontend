import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { INotification } from "@/types/Notification";
import { AlertTriangle, Bell, CheckCircle, Clock, Info, MoreVertical, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

interface Props {
  notifications: INotification[];
  isLoading?: boolean;
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  deleteNotification: (id: string) => void;
  loadMore?: () => void;
  hasMore?: boolean;
}

export default function NotificationContainer({
  notifications,
  isLoading = false,
  markAsRead,
  markAsUnread,
  deleteNotification,
  loadMore,
  hasMore = false,
}: Props) {
  const navigate = useNavigate();

  if (isLoading && notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Loader />
        <h2 className="text-xl font-medium mb-2">Loading notifications...</h2>
      </div>
    );
  }

  return (
    <>
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">No notifications</h2>
          <p className="text-muted-foreground">You don't have any notifications yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`group relative p-4 rounded-lg border ${
                !notification.read ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-base font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <p className="text-xs text-muted-foreground">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                        {notification.action_url && (
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-xs"
                            onClick={() => {
                              markAsRead(notification.id);
                              navigate(`/dashboard/${notification.action_url}`);
                            }}
                          >
                            View details
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          {!notification.read ? (
                            <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                              Mark as read
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => markAsUnread(notification.id)}>
                              Mark as unread
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-600 dark:text-red-400"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={loadMore} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load more notifications"
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function getNotificationIcon(type: string) {
  switch (type) {
    case "file_expiration":
    case "warning":
      return <Clock className="h-5 w-5 text-amber-500" />;
    case "file_deletion":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
}

const formatTimestamp = (timestampString: string) => {
  const now = new Date();
  const timestamp = new Date(timestampString);
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};
