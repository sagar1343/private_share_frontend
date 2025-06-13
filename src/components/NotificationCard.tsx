import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { INotification } from "@/types/Notification";
import { AlertTriangle, Bell, CheckCircle, Clock, Info, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  unreadCount: number;
  notifications: INotification[];
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
}
export default function NotificationCard({
  unreadCount,
  notifications,
  markAsRead,
  deleteNotification,
}: Props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Heading className="flex items-center gap-2">
          Notifications
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300">
              {unreadCount} unread
            </span>
          )}
        </Heading>
      </div>
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
                                navigate(notification.action_url!);
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
                            {!notification.read && (
                              <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                Mark as read
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
          </div>
        )}
      </>
    </>
  );
}

function getNotificationIcon(type: INotification["type"]) {
  switch (type) {
    case "file_expiration":
      return <Clock className="h-5 w-5 text-amber-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
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
