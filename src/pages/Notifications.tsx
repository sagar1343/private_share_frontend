import Heading from "@/components/Heading";
import NotificationContainer from "@/components/NotificationContainer";
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
      <div className="mt-8">
        <NotificationContainer
          unreadCount={unreadCount}
          notifications={notifications}
          markAsRead={markAsRead}
          deleteNotification={deleteNotification}
        />
      </div>
    </>
  );
}
