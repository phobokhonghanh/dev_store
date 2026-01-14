'use client'

import { Maximize, Minimize } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Fullscreen({ targetId }: { targetId: string }) {
  const [isFull, setIsFull] = useState(false)
  const targetRef = useRef<HTMLElement | null>(null)

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 480

  useEffect(() => {
    targetRef.current = document.getElementById(targetId)

    const onChange = () => {
      setIsFull(Boolean(document.fullscreenElement))
    }

    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [targetId])

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
