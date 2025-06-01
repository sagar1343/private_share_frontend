import notification_sound from "@/assets/audio/notification_sound.mp3";
import { INotification } from "@/types/Notification";
import { useCallback, useEffect, useRef, useState } from "react";

interface TokenPair {
  access: string;
  refresh: string;
}

export default function useNotifications(): [
  INotification[],
  React.Dispatch<React.SetStateAction<INotification[]>>
] {
  const audio = new Audio(notification_sound);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>(null);

  const [notifications, setNotifications] = useState<INotification[]>(() =>
    getStoredNotifications()
  );

  const connect = useCallback(() => {
    const tokensStr = localStorage.getItem("tokens");
    if (!tokensStr) {
      console.log("No tokens available");
      return;
    }

    try {
      const tokens: TokenPair = JSON.parse(tokensStr);
      console.log("Attempting to connect to WebSocket...");
      console.log("Token:", tokens.access);

      const wsUrl = `${import.meta.env.VITE_WS_URL}ws/notifications/?token=${tokens.access}`;
      console.log("WebSocket URL:", wsUrl);

      if (wsRef.current) {
        wsRef.current.close();
      }

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected successfully");
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
      };

      ws.onclose = (event) => {
        console.log("WebSocket disconnected:", event.code, event.reason);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.event === "notifications") {
          audio.play();
          setNotifications((prevNotfications) => [data.message, ...prevNotfications]);
        }
        console.log("Received message:", data);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Error setting up WebSocket:", error);
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connect]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  return [notifications, setNotifications];
}

function getStoredNotifications(): INotification[] {
  const stored = localStorage.getItem("notifications");
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}
