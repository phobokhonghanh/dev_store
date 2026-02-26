'use client'

import {
  Pause as IconPlayerPause,
  Play as IconPlayerPlay,
  RotateCcw as IconRotate,
  X as IconX,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { AutoBreadcrumbs } from '@/components/layout'
import { Field, Input } from '@/components/form'
import Fullscreen from '@/components/layout/FullscreenWrapper'
import Timer, { TimeData } from '@/components/tools/time/Timer'
import { useLocale } from '@/lib/hooks/useLocale'
import { getAppDict } from '@/lib/i18n'
import { getToolsRoutes } from '@/lib/tools-routes'

/**
 * Countdown Timer Tool Page.
 * Allows users to set a specific duration and count down, with keyboard shortcuts support.
 */
export default function ToolsCountdownPage() {
  const { locale } = useLocale()
  const dict = useMemo(() => getAppDict(locale), [locale])
  const routes = useMemo(() => getToolsRoutes(dict), [dict])
  const t = dict.countdownPage

  const [isLoading] = useState(false)
  const [showMS, setShowMS] = useState(false)

  /** Target duration set by the user */
  const [target, setTarget] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  /** Remaining milliseconds in the active countdown */
  const [timeLeftMS, setTimeLeftMS] = useState(0)
  /** Whether the timer is currently ticking */
  const [running, setRunning] = useState(false)

  /** Core timer effect: decrements timeLeftMS every 10ms when running */
  useEffect(() => {
    if (!running) return

    const startTime = Date.now()
    const initialTimeLeft = timeLeftMS

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const nextTimeLeft = Math.max(0, initialTimeLeft - elapsed)

      setTimeLeftMS(nextTimeLeft)

      if (nextTimeLeft <= 0) {
        setRunning(false)
        clearInterval(interval)
      }
    }, 10)

    return () => clearInterval(interval)
  }, [running]) // Removed timeLeftMS from deps to avoid frequent interval resets

  /** Calculates total milliseconds from the 'target' state object */
  const calcTotalMS = useCallback(
    () =>
      (target.days * 86400 +
        target.hours * 3600 +
        target.minutes * 60 +
        target.seconds) *
      1000,
    [target],
  )

  /** Starts or resumes the countdown */
  const start = useCallback(() => {
    const totalMS = calcTotalMS()
    if (totalMS <= 0) return

    if (timeLeftMS > 0) {
      setRunning(true)
      return
    }

    setTimeLeftMS(totalMS)
    setRunning(true)
  }, [calcTotalMS, timeLeftMS])

  /** Pauses the active countdown */
  const pause = useCallback(() => setRunning(false), [])

  /** Resets the timer to the beginning of the last set duration */
  const reset = useCallback(() => {
    setRunning(false)
    setTimeLeftMS(0)
  }, [])

  /** Clears all target inputs and resets the timer */
  const clear = () => {
    setTarget({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })

    setRunning(false)
    setTimeLeftMS(0)
  }

  /** Register global keyboard shortcuts for the timer */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const activeElement = document.activeElement
      const isInput =
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.getAttribute('contenteditable') === 'true'

      if (isInput) return

      if (e.code === 'Space') {
        e.preventDefault()
        if (running) {
          pause()
        } else {
          start()
        }
      }
      if (e.key.toLowerCase() === 'r') {
        reset()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [running, start, pause, reset])

  /**
   * Converts raw milliseconds into a structured TimeData object.
   * @param totalMS Total milliseconds
   * @returns Structured TimeData
   */
  const formatTime = (totalMS: number): TimeData => {
    // Add 50ms epsilon so the timer feels "fuller"
    let remaining = totalMS + 50

    const y = 0
    const mo = 0

    const d = Math.floor(remaining / (86400 * 1000))
    remaining %= 86400 * 1000

    const h = Math.floor(remaining / (3600 * 1000))
    remaining %= 3600 * 1000

    const m = Math.floor(remaining / (60 * 1000))
    remaining %= 60 * 1000

    const s = Math.floor(remaining / 1000)
    const ms = remaining % 1000

    return { y, mo, d, h, m, s, ms }
  }

  /** The time object passed to the visual Timer display */
  const timeObj =
    !running && timeLeftMS === 0
      ? {
        y: 0,
        mo: 0,
        d: target.days,
        h: target.hours,
        m: target.minutes,
        s: target.seconds,
        ms: 0,
      }
      : formatTime(timeLeftMS)

  return (
    <div className="p-4 md:p-8">
      {isLoading && (
        <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      )}
      <div className="mb-4">
        <AutoBreadcrumbs routes={routes} />
      </div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-500">
            {t.title}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">{t.description}</p>
        </div>

        {/* Visibility Toggles */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm font-medium">{t.showMilliseconds}</span>
            <button
              onClick={() => setShowMS(!showMS)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${showMS ? 'bg-primary' : 'bg-muted'
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showMS ? 'translate-x-6' : 'translate-x-1'
                  }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card text-card-foreground mb-8 rounded-xl border p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Field label={t.days}>
            <Input
              type="number"
              value={target.days}
              onChange={(e) =>
                setTarget({ ...target, days: Math.max(0, Number(e.target.value) || 0) })
              }
              min={0}
            />
          </Field>
          <Field label={t.hours}>
            <Input
              type="number"
              value={target.hours}
              onChange={(e) =>
                setTarget({ ...target, hours: Math.max(0, Number(e.target.value) || 0) })
              }
              min={0}
            />
          </Field>
          <Field label={t.minutes}>
            <Input
              type="number"
              value={target.minutes}
              onChange={(e) =>
                setTarget({ ...target, minutes: Math.max(0, Number(e.target.value) || 0) })
              }
              min={0}
            />
          </Field>
          <Field label={t.seconds}>
            <Input
              type="number"
              value={target.seconds}
              onChange={(e) =>
                setTarget({ ...target, seconds: Math.max(0, Number(e.target.value) || 0) })
              }
              min={0}
            />
          </Field>
        </div>
      </div>

      {/* Visual Timer & Controls */}
      <div
        id="timer-root"
        className="bg-card text-card-foreground relative flex min-h-[400px] flex-col items-center justify-center rounded-xl border p-8 shadow-md"
      >
        <Fullscreen targetId="timer-root" />

        <div className="mb-4 scale-90 sm:scale-110 md:scale-125">
          <Timer
            time={timeObj}
            showMilliseconds={showMS}
          />
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {!running && timeLeftMS === 0 && (
            <>
              <button
                onClick={start}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-12 min-w-[140px] items-center justify-center rounded-full px-8 text-sm font-bold shadow-lg transition-all hover:scale-105"
              >
                <IconPlayerPlay className="mr-2 h-5 w-5" /> {t.start}
              </button>

              <button
                onClick={clear}
                className="border-border bg-background hover:bg-accent inline-flex h-12 min-w-[140px] items-center justify-center rounded-full border px-8 text-sm font-bold shadow-sm transition-all hover:scale-105"
              >
                <IconX className="mr-2 h-5 w-5" /> {t.clear}
              </button>
            </>
          )}

          {!running && timeLeftMS > 0 && (
            <>
              <button
                onClick={start}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-12 min-w-[140px] items-center justify-center rounded-full px-8 text-sm font-bold shadow-lg transition-all hover:scale-105"
              >
                <IconPlayerPlay className="mr-2 h-5 w-5" /> {t.continue}
              </button>
              <button
                onClick={reset}
                className="border-border bg-background hover:bg-accent inline-flex h-12 min-w-[140px] items-center justify-center rounded-full border px-8 text-sm font-bold shadow-sm transition-all hover:scale-105"
              >
                <IconRotate className="mr-2 h-5 w-5" /> {t.reset}
              </button>
            </>
          )}

          {running && (
            <>
              <button
                onClick={pause}
                className="bg-background inline-flex h-12 min-w-[140px] items-center justify-center rounded-full border border-red-200 px-8 text-sm font-bold text-red-600 shadow-sm transition-all hover:scale-105 hover:bg-red-50"
              >
                <IconPlayerPause className="mr-2 h-5 w-5" /> {t.pause}
              </button>
              <button
                onClick={reset}
                className="border-border bg-background hover:bg-accent inline-flex h-12 min-w-[140px] items-center justify-center rounded-full border px-8 text-sm font-bold shadow-sm transition-all hover:scale-105"
              >
                <IconRotate className="mr-2 h-5 w-5" /> {t.reset}
              </button>
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center gap-1">
          <p className="text-muted-foreground text-center text-[10px] font-bold tracking-widest uppercase">
            {t.keyboardShortcuts}
          </p>
          <p className="text-muted-foreground text-center text-xs">
            <span className="bg-muted rounded border px-1.5 py-0.5 text-[10px]">
              Space
            </span>{' '}
            {t.toggleStartPause} •{' '}
            <span className="bg-muted rounded border px-1.5 py-0.5 text-[10px]">
              R
            </span>{' '}
            {t.reset}
          </p>
        </div>
      </div>
    </div>
  )
}
