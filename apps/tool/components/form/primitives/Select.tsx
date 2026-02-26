'use client'

import { cn } from '@origini/libs/utils'
import React from 'react'

/** Props for the base Select component */
export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

/**
 * Reusable Select component with consistent border and focus styles.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <select
                className={cn(
                    'border-input bg-background focus-visible:ring-ring flex h-10 w-full cursor-pointer rounded-md border px-3 py-2 text-sm transition-all focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                ref={ref}
                {...props}
            >
                {children}
            </select>
        )
    },
)
Select.displayName = 'Select'
