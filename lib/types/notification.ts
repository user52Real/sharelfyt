export interface NotificationMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export type NotificationState = NotificationMessage | null;
