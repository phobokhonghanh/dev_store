'use client'

import {
  Pause as IconPlayerPause,
  Play as IconPlayerPlay,
  RotateCcw as IconRotate,
  X as IconX,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import Fullscreen from '@/components/common/FullscreenWrapper'
import { AutoBreadcrumbs } from '@/components/layout/AutoBreadcrumbs'
import Timer, { TimeData } from '@/components/tools/time/Timer'
import { toolsRoutes } from '@/data/tools'

export default function ToolsCountdownPage() {
  const [isLoading] = useState(false)
  const [target, setTarget] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [timeLeft, setTimeLeft] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [running])

  const calcSeconds = useCallback(
    () =>
      target.days * 86400 +
      target.hours * 3600 +
      target.minutes * 60 +
      target.seconds,
    [target],
  )

  const start = useCallback(() => {
    const sec = calcSeconds()
    if (sec <= 0) return

    if (timeLeft > 0) {
      setRunning(true)
      return
    }

    setTimeLeft(sec)
    setRunning(true)
  }, [calcSeconds, timeLeft])

  const pause = useCallback(() => setRunning(false), [])

  const reset = useCallback(() => {
    setRunning(false)
    setTimeLeft(0)
  }, [])

  const clear = () => {
    setTarget({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })

    setRunning(false)
    setTimeLeft(0)
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (running) {
          pause()
        } else {
          start()
        }
      }
      if (e.key.toLowerCase() === 'r') reset()
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [running, start, pause, reset])

  // Convert seconds -> TimeData object
  const formatTime = (sec: number): TimeData => {
    const d = Math.floor(sec / 86400)
    const h = Math.floor((sec % 86400) / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60

    return {
      y: 0,
      mo: 0,
      d,
      h,
      m,
      s,
      ms: 0,
    }
  }

  const timeObj =
    !running && timeLeft === 0
      ? {
          y: 0,
          mo: 0,
          d: target.days,
          h: target.hours,
          m: target.minutes,
          s: target.seconds,
          ms: 0,
        }
      : formatTime(timeLeft)

  return (
    <div className="p-4 md:p-8">
      {isLoading && (
        <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      )}
      <div className="mb-4">
        <AutoBreadcrumbs routes={toolsRoutes} />
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-500">
          Countdown Timer
        </h2>
        <p className="text-muted-foreground mt-1">
          Set any duration and count down in real time.
        </p>
      </div>

      <div className="bg-card text-card-foreground mb-6 rounded-lg border p-6 shadow">
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Days</label>
            <input
              type="number"
              className="border-input bg-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
              value={target.days}
              onChange={(e) =>
                setTarget({ ...target, days: Number(e.target.value) || 0 })
              }
              min={0}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Hours</label>
            <input
              type="number"
              className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
              value={target.hours}
              onChange={(e) =>
                setTarget({ ...target, hours: Number(e.target.value) || 0 })
              }
              min={0}
              max={23}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Minutes</label>
            <input
              type="number"
              className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
              value={target.minutes}
              onChange={(e) =>
                setTarget({ ...target, minutes: Number(e.target.value) || 0 })
              }
              min={0}
              max={59}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Seconds</label>
            <input
              type="number"
              className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
              value={target.seconds}
              onChange={(e) =>
                setTarget({ ...target, seconds: Number(e.target.value) || 0 })
              }
              min={0}
              max={59}
            />
          </div>
        </div>
      </div>

      <div
        id="timer-root"
        className="bg-card text-card-foreground relative flex min-h-[300px] flex-col items-center justify-center rounded-lg border p-6 shadow"
      >
        <Fullscreen targetId="timer-root" />
        <div className="mt-4">
          <Timer time={timeObj} />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {!running && timeLeft === 0 && (
            <>
              <button
                onClick={start}
                className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border border-green-200 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <IconPlayerPlay className="mr-2 h-4 w-4" /> Start
              </button>

              <button
                onClick={clear}
                className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <IconX className="mr-2 h-4 w-4" /> Clear
              </button>
            </>
          )}

          {!running && timeLeft > 0 && (
            <>
              <button
                onClick={start}
                className="border-input bg-background inline-flex h-10 items-center justify-center rounded-md border border-green-200 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50"
              >
                <IconPlayerPlay className="mr-2 h-4 w-4" /> Continue
              </button>
              <button
                onClick={reset}
                className="border-input bg-background hover:bg-accent inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
              >
                <IconRotate className="mr-2 h-4 w-4" /> Reset
              </button>
            </>
          )}

          {running && (
            <>
              <button
                onClick={pause}
                className="focus-visible:ring-ring border-input bg-background inline-flex h-10 items-center justify-center rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <IconPlayerPause className="mr-2 h-4 w-4" /> Pause
              </button>
              <button
                onClick={reset}
                className="border-input bg-background hover:bg-accent inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
              >
                <IconRotate className="mr-2 h-4 w-4" /> Reset
              </button>
            </>
          )}
        </div>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Shortcuts: <b>Space</b> (Start/Pause), <b>R</b> (Reset)
        </p>
      </div>
    </div>
  )
}
