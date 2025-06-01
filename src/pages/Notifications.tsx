import NotificationCard from "@/components/NotificationCard";
import { INotification } from "@/types/Notification";
import { useOutletContext } from "react-router-dom";

interface NotificationsContext {
  notifications: INotification[];
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
}

export default function Notifications() {
  const { notifications, setNotifications } = useOutletContext<NotificationsContext>();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationCard
      unreadCount={unreadCount}
      notifications={notifications}
      markAsRead={markAsRead}
      deleteNotification={deleteNotification}
    />
  );
}
