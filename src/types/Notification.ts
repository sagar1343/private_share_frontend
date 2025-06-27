export interface INotification {
  id: string;
  recipient: number;
  title: string;
  type: string;
  message: string;
  read: boolean;
  action_url: string;
  timestamp: string;
}

export interface NotificationResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: INotification[];
}
