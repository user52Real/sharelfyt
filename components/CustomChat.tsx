"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, X } from "lucide-react";
import NotificationManager from "./NotificationManager";
import { Socket } from "socket.io";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    text: "Hi! I'm ShareFlyt's assistant. How can I help you today?",
    isUser: false,
    timestamp: new Date(),
  },
];

const QUICK_RESPONSES = [
  {
    text: "Tell me about your services",
    response:
      "I offer web development, mobile development, and cloud solutions. Would you like to know more about any specific service?",
  },
  {
    text: "How can we work together?",
    response:
      "We can start by discussing your project needs. Would you like to schedule a consultation?",
  },
  {
    text: "What's your pricing?",
    response:
      "Pricing varies based on project requirements. Let's discuss your specific needs to provide an accurate quote.",
  },
];

const MotionDiv = motion.create('div')

export default function CustomChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleNotificationClick = useCallback(() => {
    setIsOpen(true);
    scrollToBottom();
  }, [scrollToBottom]); 

  const handleSendMessage = (text: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        text,
        isUser: true,
        timestamp: new Date(),
      },
    ]);    

    // Find matching quick response or generate default response
    const matchingResponse = QUICK_RESPONSES.find((r) =>
      text.toLowerCase().includes(r.text.toLowerCase()),
    );

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text:
            matchingResponse?.response ||
            "Thanks for your message! How else can I help you?",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }, 1000);

    setMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      handleSendMessage(message);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <>
      <NotificationManager
        socket={socket}
        onNotificationClick={handleNotificationClick}
      />
      <div className="fixed bottom-4 right-4 z-50">
        <MotionDiv
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex flex-col"
        >
          {isOpen && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-4 flex h-[500px] w-[350px] flex-col rounded-lg border border-gray-800 bg-white/10 shadow-xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between rounded-t-lg bg-gradient-to-r from-blue-600 to-emerald-600 p-4">
                <h3 className="font-bold text-white">ShareFlyt Assistant</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      msg.isUser ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block rounded-lg p-3 ${
                        msg.isUser
                          ? "bg-blue-600 text-white"
                          : "bg-white/5 text-white"
                      } max-w-[80%]`}
                    >
                      {msg.text}
                      <div className="mt-1 text-xs opacity-70">
                        {msg.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={handleSubmit}
                className="border-t border-gray-800 p-4"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-700 bg-white/5 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </MotionDiv>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-14 w-14 items-center justify-center self-end rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg transition-all hover:opacity-90"
          >
            {isOpen ? <X className="h-6 w-6" /> : "💬"}
          </button>
        </MotionDiv>
      </div>
    </>
  );
}
