'use client'

import Link from 'next/link'
import React from 'react'

interface NavButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

/**
 * Reusable navigation button for consistent hero and CTA actions.
 * Supports both internal Link and external 'a' tags automatically.
 */
export const NavButton = ({
  href,
  children,
  variant = 'primary',
  className = '',
}: NavButtonProps) => {
  const baseClasses =
    'group inline-flex h-14 min-w-[180px] items-center justify-center rounded-full px-8 font-bold transition-all hover:scale-105 shadow-lg'
  const variants = {
    primary:
      'bg-primary dark:bg-gradient-to-r dark:from-primary dark:to-emerald-600 text-white',
    secondary:
      'border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white backdrop-blur-md hover:border-primary/50 hover:text-primary',
  }

  const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`

  if (href.startsWith('http')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={combinedClasses}>
      {children}
    </Link>
  )
}

export default NavButton
