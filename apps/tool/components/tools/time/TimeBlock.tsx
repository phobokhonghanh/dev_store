import type { ReactNode } from 'react'

type TimeBlockProps = {
  label: string
  value: ReactNode
}

export default function TimeBlock({ label, value }: TimeBlockProps) {
  return (
    <div className="border-border flex min-w-[60px] flex-col items-center justify-center rounded-2xl border p-2 sm:min-w-[80px] sm:p-4">
      <span className="text-2xl leading-none font-bold tabular-nums sm:text-4xl">
        {value}
      </span>
      <span className="text-muted-foreground mt-1 text-xs tracking-wide sm:text-sm">
        {label}
      </span>
    </div>
  )
}
