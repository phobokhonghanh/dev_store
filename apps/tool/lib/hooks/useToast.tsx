'use client'

import { CheckCircle2, X } from 'lucide-react'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

// ============================================================================
// TYPES
// ============================================================================
interface ToastState {
  message: string
  visible: boolean
}

interface ToastContextType {
  /** Show a toast notification with the given message */
  showToast: (message: string) => void
  /** Hide the current toast */
  hideToast: () => void
}

// ============================================================================
// CONTEXT
// ============================================================================
const ToastContext = createContext<ToastContextType | null>(null)

/** Default display duration for the toast */
const DEFAULT_TOAST_DURATION = 3000

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================
interface ToastProviderProps {
  children: React.ReactNode
  /** Duration in milliseconds before auto-hiding (default: 3000) */
  duration?: number
}

/**
 * ToastProvider - Provides toast notification context to the entire app.
 * Wrap your app root with this component to enable useToast() hook anywhere.
 *
 * @example
 * ```tsx
 * // In layout.tsx or _app.tsx
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // In any component
 * const { showToast } = useToast()
 * showToast('Copied to clipboard!')
 * ```
 */
export function ToastProvider({
  children,
  duration = DEFAULT_TOAST_DURATION,
}: ToastProviderProps) {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    visible: false,
  })

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true })
  }, [])

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  // Auto-hide timer
  useEffect(() => {
    if (!toast.visible) return

    const timer = setTimeout(() => {
      hideToast()
    }, duration)

    return () => clearTimeout(timer)
  }, [toast.visible, duration, hideToast])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastUI
        message={toast.message}
        visible={toast.visible}
        duration={duration}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  )
}

// ============================================================================
// HOOK
// ============================================================================
/**
 * useToast - Hook to access toast notification functions.
 * Must be used within a ToastProvider.
 *
 * @returns Object with showToast and hideToast functions
 * @throws Error if used outside of ToastProvider
 *
 * @example
 * ```tsx
 * const { showToast } = useToast()
 * const handleCopy = () => {
 *   navigator.clipboard.writeText(text)
 *   showToast('Copied!')
 * }
 * ```
 */
export function useToast(): ToastContextType {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// ============================================================================
// TOAST UI COMPONENT (Internal)
// ============================================================================
interface ToastUIProps {
  message: string
  visible: boolean
  duration: number
  onClose: () => void
}

function ToastUI({ message, visible, duration, onClose }: ToastUIProps) {
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
          from { width: 100%; }
          to { width: 0%; }
        }
      `,
        }}
      />
    </div>
  )
}
