"use client";

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const ToastContext = {
  toasts: [] as Toast[],
  showToast: (message: string, type: Toast['type'] = 'info', duration: number = 3000) => {},
  removeToast: (id: string) => {},
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast['type'] = 'info', duration: number = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
  };

  const removeToast = (id: string) => {
    if (!toasts) return;
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Provide the context value to children
  useEffect(() => {
    ToastContext.toasts = toasts;
    ToastContext.showToast = showToast;
    ToastContext.removeToast = removeToast;
  }, [toasts]);

  return (
    <>
      {children}
      <Toaster toasts={toasts} removeToast={removeToast} />
    </>
  );
}

export function Toaster({ 
  toasts, 
  removeToast 
}: { 
  toasts: Toast[]; 
  removeToast: (id: string) => void 
}) {
  useEffect(() => {
    if (!toasts) return;
    
    toasts.forEach((toast) => {
      if (toast.duration) {
        const timer = setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration);
        
        return () => clearTimeout(timer);
      }
    });
  }, [toasts, removeToast]);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${
            toast.type === 'success'
              ? 'bg-green-500'
              : toast.type === 'error'
              ? 'bg-red-500'
              : toast.type === 'warning'
              ? 'bg-yellow-500'
              : 'bg-blue-500'
          } text-white p-4 rounded-md shadow-lg flex justify-between items-center min-w-[300px] max-w-[400px]`}
        >
          <p>{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-white hover:text-gray-200"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
} 