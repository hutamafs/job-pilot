"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

interface NotificationContextType {
  type: string;
  message: string;
  setNotif: (type: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotifProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  // A ref to store the timeout ID, so we can clear/restart it if needed
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Sets the notification with type + message,
   * and auto-hides after 3 seconds.
   */
  const setNotif = (notifType: string, notifMessage: string) => {
    // Clear any existing timer so we don't stack them
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Show the notification
    setVisible(true);
    setType(notifType);
    setMessage(notifMessage);

    // Auto-hide after 3s
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  // Cleanup on unmount (avoid memory leaks if component unmounts)
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Compute background color and icon based on notification type
  let bgColor: string;
  let Icon: React.ElementType;

  switch (type) {
    case "success":
      bgColor = "bg-green-500";
      Icon = FaCheckCircle;
      break;
    case "error":
      bgColor = "bg-red-500";
      Icon = FaExclamationCircle;
      break;
    default:
      bgColor = "bg-blue-500";
      Icon = FaInfoCircle;
      break;
  }

  return (
    <NotificationContext.Provider value={{ type, message, setNotif }}>
      {/* The Notification UI */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="notification"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-5 left-1/3 md:left-1/2 transform -translate-x-1/2 ${bgColor} 
              text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-2 
              text-sm font-medium z-50`}
          >
            <Icon className="text-white" />
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </NotificationContext.Provider>
  );
};

export const useNotif = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotif must be used within a NotifProvider");
  }
  return context;
};
