"use client";

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { dismissToast, ToastProps, useToast } from "./use-toast"

export type ToastType = 'success' | 'error' | 'info' | 'warning';

const ICONS = {
  success: <div className="w-5 h-5 text-green-500">✓</div>,
  error: <div className="w-5 h-5 text-red-500">✗</div>,
  info: <div className="w-5 h-5 text-blue-500">i</div>,
  warning: <div className="w-5 h-5 text-yellow-500">!</div>,
}

const BACKGROUNDS = {
  success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
}

const TEXT_COLORS = {
  success: 'text-green-700 dark:text-green-400',
  error: 'text-red-700 dark:text-red-400',
  info: 'text-blue-700 dark:text-blue-400',
  warning: 'text-yellow-700 dark:text-yellow-400',
}

export function Toaster() {
  const { toasts, subscribe } = useToast()
  const [localToasts, setLocalToasts] = useState(toasts)

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setLocalToasts([...toasts])
    })
    return unsubscribe
  }, [toasts, subscribe])

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {localToasts.map(({ id, props }) => (
        <Toast key={id} id={id} {...props} />
      ))}
    </div>
  )
}

function Toast({
  id,
  title,
  description,
  variant = "default",
  duration = 3000,
}: ToastProps & { id: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      dismissToast(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration])

  // Determine the toast type based on title or variant
  let type: ToastType = "info"
  if (title?.toLowerCase().includes("success")) type = "success"
  else if (title?.toLowerCase().includes("error") || variant === "destructive") type = "error"
  else if (title?.toLowerCase().includes("warning")) type = "warning"

  return (
    <div
      className={`${
        BACKGROUNDS[type]
      } border rounded-md shadow-lg p-4 flex items-start gap-3 w-[350px] relative overflow-hidden`}
    >
      <div className="flex-shrink-0">{ICONS[type]}</div>
      <div className="flex-1">
        {title && <div className={`font-medium ${TEXT_COLORS[type]}`}>{title}</div>}
        {description && <div className="text-sm mt-1 text-gray-500 dark:text-gray-400">{description}</div>}
      </div>
      <button
        onClick={() => dismissToast(id)}
        className="text-gray-400 hover:text-gray-500 focus:outline-none"
      >
        <X size={18} />
      </button>
    </div>
  )
} 