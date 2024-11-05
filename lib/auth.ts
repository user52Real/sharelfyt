import { verify } from "jsonwebtoken";

export interface AuthenticatedSocket extends WebSocket {
  userId?: string;
}

export function authenticateSocket(token: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!process.env.JWT_SECRET) {
      reject(new Error("JWT_SECRET not configured"));
      return;
    }

    verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) reject(err);
      else resolve((decoded as any).userId);
    });
  });
}
