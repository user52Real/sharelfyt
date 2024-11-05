export interface ChatMessage {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    type: "user" | "admin" | "bot";
  };
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

export interface ChatUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isOnline: boolean;
  lastSeen: Date;
}
