'use client'

import { useMemo } from 'react'
import TimeBlock from './TimeBlock'

export type TimeData = {
  y: number
  mo: number
  d: number
  h: number
  m: number
  s: number
  ms: number
  [key: string]: number // Add index signature to allow access by variable key
}

const TIME_CONFIG = [
  { key: 'y', label: 'Years', pad: 0, forceShow: false },
  { key: 'mo', label: 'Months', pad: 2, forceShow: false },
  { key: 'd', label: 'Days', pad: 2, forceShow: false },
  { key: 'h', label: 'Hours', pad: 2, forceShow: true },
  { key: 'm', label: 'Minutes', pad: 2, forceShow: true },
  { key: 's', label: 'Seconds', pad: 2, forceShow: true },
  {
    key: 'ms',
    label: 'Milliseconds',
    pad: 3,
    separator: '.',
    forceShow: false,
  },
] as const

export default function Timer({ time }: { time: TimeData }) {
  const visibleParts = useMemo(() => {
    return TIME_CONFIG.map((config) => {
      const value = time[config.key]
      return { ...config, value }
    }).filter((part) => part.forceShow || part.value > 0)
  }, [time])

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
      {visibleParts.map((part, index) => {
        const isLast = index === visibleParts.length - 1
        const nextPart = !isLast ? visibleParts[index + 1] : null
        const separator = nextPart?.key === 'ms' ? '.' : ':'

        return (
          <div key={part.key} className="flex items-center gap-2">
            <TimeBlock
              label={part.label}
              value={String(part.value).padStart(part.pad, '0')}
            />

            {!isLast && (
              <span
                className={`-mt-1 text-2xl font-bold sm:text-4xl ${
                  separator === '.'
                    ? 'text-muted-foreground'
                    : 'text-foreground'
                }`}
              >
                {separator}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
