"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-6 right-6 z-[100] flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-gray-100 min-w-[300px] max-w-[420px]"
        >
          {toast.type === "success" && (
            <CheckCircle2 size={20} className="text-[#10B981] shrink-0" />
          )}
          {toast.type === "error" && (
            <AlertCircle size={20} className="text-[#EF4444] shrink-0" />
          )}
          {toast.type === "info" && (
            <Info size={20} className="text-[#6656D9] shrink-0" />
          )}

          <span className="flex-1 text-[14px] font-semibold text-[#1F2937]">
            {toast.message}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
