"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

interface NotifyProps {
  type: string;
  message: string;
  onClose?: () => void;
}

const Notification: React.FC<NotifyProps> = ({ type, message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 2000); // Auto-dismiss after 2 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const Icon = type === "success" ? FaCheckCircle : FaExclamationCircle;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-2 text-sm font-medium`}
        >
          <Icon className="text-white" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
