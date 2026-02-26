'use client'

import { useDict } from '@/lib/hooks/useDict'
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

export default function Timer({
  time,
  showMilliseconds = false,
}: {
  time: TimeData
  showMilliseconds?: boolean
}) {
  const dict = useDict()
  const { timer: t } = dict

  const visibleParts = useMemo(() => {
    const config = [
      { key: 'd', label: t.days, pad: 0, visible: true },
      { key: 'h', label: t.hours, pad: 2, visible: true },
      { key: 'm', label: t.minutes, pad: 2, visible: true },
      { key: 's', label: t.seconds, pad: 2, visible: true },
      {
        key: 'ms',
        label: t.milliseconds,
        pad: 3,
        separator: '.',
        visible: showMilliseconds,
      },
    ]

    return config
      .map((c) => ({ ...c, value: time[c.key] }))
      .filter((part) => {
        if (part.key === 'ms') {
          return part.visible
        }
        return part.value > 0 || part.key === 'h' || part.key === 'm' || part.key === 's'
      })
  }, [time, t, showMilliseconds])

  return (
    <div className="flex flex-wrap justify-center gap-y-6 gap-x-2 sm:gap-x-4 md:gap-x-6">
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
                className={`-mt-1 text-xl font-bold sm:text-2xl md:text-3xl ${separator === '.' ? 'text-muted-foreground' : 'text-foreground'
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
