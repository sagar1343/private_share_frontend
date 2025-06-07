export interface INotification {
  id: string;
  type: "file_expiration" | "system" | "success" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action_url: string;
}
