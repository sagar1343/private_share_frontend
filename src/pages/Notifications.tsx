import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import NotificationContainer from "@/components/NotificationContainer";
import useNotifications from "@/hooks/useNotifications";

export default function Notifications() {
  const {
    notifications,
    isLoading,
    error,
    unreadCount,
    hasMore,
    markAsRead,
    markAsUnread,
    deleteNotification,
    loadMore,
  } = useNotifications();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Loader />
        <h2 className="text-xl font-medium mb-2">Error loading notifications</h2>
        <p className="text-muted-foreground">Please try refreshing the page</p>
      </div>
    );
  }

  return (
    <>
      <Heading heading="Notifications" content="Get real-time updates — never miss a thing." />
      <div className="mt-8">
        <NotificationContainer
          notifications={notifications}
          isLoading={isLoading}
          unreadCount={unreadCount}
          markAsRead={markAsRead}
          markAsUnread={markAsUnread}
          deleteNotification={deleteNotification}
          loadMore={loadMore}
          hasMore={hasMore}
        />
      </div>
    </>
  );
}
