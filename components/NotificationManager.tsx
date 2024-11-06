"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";
import {
  NotificationMessage,
  NotificationState,
} from "@/lib/types/notification";

interface NotificationManagerProps {
  socket: any; 
  onNotificationClick: () => void;
}

export default function NotificationManager({
  socket,
  onNotificationClick,
}: NotificationManagerProps) {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [notification, setNotification] = useState<NotificationState>(null);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((perm) => {
        setPermission(perm);
      });
    }

    socket?.on("message", (message: any) => {
      if (document.hidden) {
        showNotification(message);
      }
    });

    return () => {
      socket?.off("message");
    };
  }, [socket]);

  const showNotification = (message: any) => {
    if (permission === "granted") {
      const browserNotification = new Notification("New Message", {
        body: message.text,
        icon: "/logo.png",
      });

      browserNotification.onclick = () => {
        window.focus();
        onNotificationClick();
      };
    }

    // Create new notification state
    const newNotification: NotificationMessage = {
      id: crypto.randomUUID(),
      type: "info",
      title: "New Message",
      message: message.text,
      timestamp: new Date(),
      read: false,
    };

    setNotification(newNotification);
  };

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed right-4 top-4 z-50 max-w-sm rounded-lg border border-gray-800 bg-white/10 p-4 shadow-lg backdrop-blur-lg"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Bell className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">
                {notification.title}
              </h3>
              <p className="mt-1 text-sm text-gray-300">
                {notification.message}
              </p>
              <button
                onClick={() => {
                  onNotificationClick();
                  setNotification(null);
                }}
                className="mt-2 text-sm text-blue-400 hover:text-blue-300"
              >
                View message
              </button>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
