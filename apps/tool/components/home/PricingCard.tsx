'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'

interface PricingCardProps {
  title: string
  price: string
  period: string
  description: string
  features: string[]
  buttonLabel: string
  href?: string
  isPrimary?: boolean
  isDisabled?: boolean
}

/**
 * Feature Pricing Card component with highlighted state support.
 */
export const PricingCard = ({
  title,
  price,
  period,
  description,
  features,
  buttonLabel,
  href = '#',
  isPrimary = false,
  isDisabled = false,
}: PricingCardProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-10 shadow-xl backdrop-blur-xl transition-all hover:scale-[1.01] ${
        isPrimary
          ? 'border-primary/30 bg-white/80 dark:bg-slate-900/60'
          : 'hover:border-primary/30 border-slate-200 bg-white/40 opacity-80 grayscale-[0.8] hover:opacity-100 hover:grayscale-0 dark:border-white/5 dark:bg-white/5'
      }`}
    >
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
      <div
        className={`mt-4 flex items-baseline text-6xl font-extrabold tracking-tight ${isPrimary ? 'text-primary' : 'text-slate-900 dark:text-white'}`}
      >
        {price}
        <span className="text-muted-foreground ml-2 text-xl font-medium">
          / {period}
        </span>
      </div>
      <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
        {description}
      </p>

      <div
        className={`via-primary/30 my-8 h-px w-full bg-gradient-to-r from-transparent to-transparent`}
      />

      <ul className="space-y-5">
        {features.map((item) => (
          <li
            key={item}
            className="flex items-center gap-4 text-slate-700 dark:text-slate-200"
          >
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 ${isPrimary ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              <Check size={14} strokeWidth={isPrimary ? 4 : 2} />
            </div>
            <span className={`text-base ${isPrimary ? 'font-medium' : ''}`}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {isDisabled ? (
        <button
          disabled
          className="text-muted-foreground mt-10 flex w-full cursor-not-allowed items-center justify-center rounded-2xl border border-slate-200 bg-white py-4 text-center text-lg font-medium dark:border-white/10 dark:bg-white/5"
        >
          {buttonLabel}
        </button>
      ) : (
        <Link
          href={href}
          className="bg-primary hover:shadow-primary/20 mt-10 flex w-full items-center justify-center rounded-2xl border border-slate-200 py-4 text-center text-lg font-bold shadow-md transition-all hover:bg-emerald-500 hover:shadow-lg"
        >
          {buttonLabel}
        </Link>
      )}
    </div>
  )
}

export default PricingCard
