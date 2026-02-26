'use client'

import { CheckCircle2, X } from 'lucide-react'
import { useEffect } from 'react'

/** Props for the Toast notification component */
interface ToastProps {
  /** The message content to display */
  message: string
  /** Duration in milliseconds before auto-hiding (default: 3000) */
  duration?: number
  /** Callback function to trigger closing the toast */
  onClose: () => void
  /** Whether the toast is currently visible */
  visible: boolean
}

/** Default display duration for the toast */
const DEFAULT_TOAST_DURATION = 3000

/**
 * A standard non-blocking notification toast with an auto-hide timer
 * and a visual progress bar.
 */
export function Toast({
  message,
  duration = DEFAULT_TOAST_DURATION,
  onClose,
  visible,
}: ToastProps) {
  // Log visibility changes for debugging tracking
  console.log('Toast visible:', visible, 'message:', message)

  useEffect(() => {
    if (!visible) return

    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [visible, duration, onClose])

  if (!visible) return null

  return (
    <div
      className={`pointer-events-auto fixed right-6 bottom-6 z-[99999] transform transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="flex min-w-[300px] items-center gap-3 rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white shadow-2xl">
        <CheckCircle2 size={20} className="shrink-0 text-green-400" />
        <div className="flex-1 text-sm font-medium">{message}</div>
        <button
          onClick={onClose}
          className="text-white/50 transition-colors hover:text-white"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>

      {/* Countdown progress bar at the bottom of the toast */}
      <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden rounded-b-lg bg-green-500">
        <div
          className="h-full bg-green-300/30"
          style={{
            width: '100%',
            animation: `shrinkWidth ${duration}ms linear forwards`,
          }}
        />
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shrinkWidth {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `,
        }}
      />
    </div>
  )
}
