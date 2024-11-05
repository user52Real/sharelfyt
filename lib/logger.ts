type LogLevel = "info" | "warn" | "error";

interface LogMessage {
  message: string;
  timestamp: string;
  level: LogLevel;
  [key: string]: any;
}

class Logger {
  private static instance: Logger;
  private readonly isDevelopment = process.env.NODE_ENV === "development";

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    meta?: object,
  ): LogMessage {
    return {
      message,
      timestamp: new Date().toISOString(),
      level,
      ...meta,
    };
  }

  private async sendToLoggingService(logMessage: LogMessage) {
    if (this.isDevelopment) {
      console.log(JSON.stringify(logMessage, null, 2));
      return;
    }

    try {
      // Replace with your preferred logging service (e.g., Sentry, LogRocket, etc.)
      await fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logMessage),
      });
    } catch (error) {
      console.error("Failed to send log:", error);
    }
  }

  info(message: string, meta?: object) {
    const logMessage = this.formatMessage("info", message, meta);
    this.sendToLoggingService(logMessage);
  }

  warn(message: string, meta?: object) {
    const logMessage = this.formatMessage("warn", message, meta);
    this.sendToLoggingService(logMessage);
  }

  error(message: string, meta?: object) {
    const logMessage = this.formatMessage("error", message, meta);
    this.sendToLoggingService(logMessage);
  }
}

export const logger = Logger.getInstance();
