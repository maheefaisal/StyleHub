"use client"

import { ReactNode } from "react"

export type ToastVariant = "default" | "destructive" | "success"

export interface ToastProps {
  title?: string
  description?: ReactNode
  variant?: ToastVariant
  duration?: number
}

const toastState = {
  toasts: [] as { id: string; props: ToastProps }[],
  listeners: new Set<() => void>(),
}

export function toast(props: ToastProps) {
  const id = Math.random().toString(36).substring(2, 9)
  
  toastState.toasts = [
    ...toastState.toasts,
    { id, props: { ...props, duration: props.duration ?? 3000 } },
  ]
  
  toastState.listeners.forEach((listener) => listener())
  
  return {
    id,
    dismiss: () => dismissToast(id),
    update: (props: ToastProps) => updateToast(id, props),
  }
}

export function dismissToast(id: string) {
  toastState.toasts = toastState.toasts.filter((toast) => toast.id !== id)
  toastState.listeners.forEach((listener) => listener())
}

export function updateToast(id: string, props: ToastProps) {
  toastState.toasts = toastState.toasts.map((toast) => {
    if (toast.id === id) {
      return { id, props: { ...toast.props, ...props } }
    }
    return toast
  })
  toastState.listeners.forEach((listener) => listener())
}

export function useToast() {
  return {
    toast,
    dismiss: dismissToast,
    update: updateToast,
    toasts: toastState.toasts,
    subscribe: (callback: () => void) => {
      toastState.listeners.add(callback)
      return () => {
        toastState.listeners.delete(callback)
      }
    },
  }
} 