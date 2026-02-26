'use client'

import { Maximize, Minimize } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/** Configuration constants for the Fullscreen component */
const FULLSCREEN_CONFIG = {
  /** Width threshold for mobile-specific layout/icons */
  MOBILE_BREAKPOINT: 480,
}

/**
 * A floating button component that toggles fullscreen mode for a target element.
 *
 * @param targetId - The HTML ID of the element to be focused in fullscreen
 */
export default function Fullscreen({ targetId }: { targetId: string }) {
  const [isFull, setIsFull] = useState(false)
  const targetRef = useRef<HTMLElement | null>(null)

  // Determine if the current viewport is considered mobile
  const isMobile =
    typeof window !== 'undefined' &&
    window.innerWidth < FULLSCREEN_CONFIG.MOBILE_BREAKPOINT

  useEffect(() => {
    // Late-binding target reference to handle client-side document availability
    targetRef.current = document.getElementById(targetId)

    const onChange = () => {
      setIsFull(Boolean(document.fullscreenElement))
    }

    // Sync internal state with browser fullscreen events
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [targetId])

  /**
   * Toggles the browser's fullscreen mode for the target component
   */
  const toggle = () => {
    if (!document.fullscreenElement) {
      targetRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div
      className={`absolute z-[9999] ${isMobile ? 'top-1 right-1' : 'top-5 right-5'}`}
    >
      <button
        onClick={toggle}
        className="rounded-full border border-gray-200 bg-white/80 p-2 text-gray-700 shadow-sm transition-colors hover:bg-white"
        title={isFull ? 'Exit Fullscreen' : 'Fullscreen'}
      >
        {isFull ? (
          <Minimize size={isMobile ? 12 : 20} />
        ) : (
          <Maximize size={isMobile ? 12 : 20} />
        )}
      </button>
    </div>
  )
}
