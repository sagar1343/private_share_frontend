import notification_sound from "@/assets/audio/notification_sound.mp3";
import {
  deleteNotification,
  fetchNotifications,
  markNotificationAsRead,
  markNotificationAsUnread,
} from "@/services/notificationService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface TokenPair {
  access: string;
  refresh: string;
}

export default function useNotifications() {
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: notificationsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["notifications", page],
    queryFn: () => fetchNotifications(page),
    staleTime: 30000,
  });

  const notifications = notificationsData?.results || [];
  const totalCount = notificationsData?.count || 0;

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error("Failed to mark notification as read");
      console.error("Error marking notification as read:", error);
    },
  });

  const markAsUnreadMutation = useMutation({
    mutationFn: markNotificationAsUnread,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error("Failed to mark notification as unread");
      console.error("Error marking notification as unread:", error);
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Notification deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete notification");
      console.error("Error deleting notification:", error);
    },
  });

  const markAsRead = useCallback(
    (id: string) => {
      markAsReadMutation.mutate(id);
    },
    [markAsReadMutation]
  );

  const markAsUnread = useCallback(
    (id: string) => {
      markAsUnreadMutation.mutate(id);
    },
    [markAsUnreadMutation]
  );

  const deleteNotificationHandler = useCallback(
    (id: string) => {
      deleteNotificationMutation.mutate(id);
    },
    [deleteNotificationMutation]
  );

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isLoading]);

  const connect = useCallback(() => {
    const audio = new Audio(notification_sound);
    const tokensStr = localStorage.getItem("tokens");
    if (!tokensStr) {
      console.log("No tokens available");
      return;
    }

    try {
      const tokens: TokenPair = JSON.parse(tokensStr);
      console.log("Attempting to connect to WebSocket...");

      const wsUrl = `${import.meta.env.VITE_WS_URL}ws/notifications/?token=${tokens.access}`;
      console.log("WebSocket URL:", wsUrl);

      if (wsRef.current) {
        wsRef.current.close();
      }

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected successfully");
      };

      ws.onclose = (event) => {
        console.log("WebSocket disconnected:", event.code, event.reason);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "send_notification") {
          audio.play().catch(() => {});
          queryClient.invalidateQueries({ queryKey: ["notifications"] });
          toast.success("New notification received");
        }
        console.log("Received message:", data);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Error setting up WebSocket:", error);
    }
  }, [queryClient]);

  useEffect(() => {
    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  useEffect(() => {
    if (notificationsData) {
      setHasMore(Boolean(notificationsData.next));
    }
  }, [notificationsData]);

  return {
    notifications,
    isLoading,
    error,
    unreadCount: notifications.filter((n) => !n.read).length,
    totalCount,
    hasMore,
    markAsRead,
    markAsUnread,
    deleteNotification: deleteNotificationHandler,
    loadMore,
    refetch,
  };
}
