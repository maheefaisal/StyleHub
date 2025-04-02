"use client";

import { createContext, useContext } from "react"
import { toast as showToastNotification } from "@/components/ui/use-toast"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const showToast = (message: string, type: ToastType = "info") => {
    const variant = type === "error" ? "destructive" : "default"
    showToastNotification({
      title: type.charAt(0).toUpperCase() + type.slice(1),
      description: message,
      variant,
    })
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
} 