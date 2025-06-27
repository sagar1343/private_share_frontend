import api from "./api";
import { INotification, NotificationResponse } from "@/types/Notification";

export const fetchNotifications = async (
  page: number = 1
): Promise<NotificationResponse> => {
  const response = await api.get(`/api/notification/`, {
    params: {
      page,
    },
  });
  return response.data;
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  await api.post(`/api/notification/${notificationId}/read/`);
};

export const markNotificationAsUnread = async (notificationId: string): Promise<void> => {
  await api.post(`/api/notification/${notificationId}/unread/`);
};

export const deleteNotification = async (notificationId: string): Promise<void> => {
  await api.delete(`/api/notification/${notificationId}/`);
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  await api.post(`/api/notifications/mark_all_read/`);
}; 