import Heading from "@/components/Heading";
import NotificationCard from "@/components/NotificationCard";
import useNotifications from "@/hooks/useNotifications";

export default function Notifications() {
  const [notifications, setNotifications] = useNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <>
      <Heading heading="Notifications" content="Get real-time updates — never miss a thing." />
      <NotificationCard
        unreadCount={unreadCount}
        notifications={notifications}
        markAsRead={markAsRead}
        deleteNotification={deleteNotification}
      />
    </>
  );
}
