'use client'

import { cn } from '@origini/libs/utils'
import React from 'react'

/** Props for the Textarea component */
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

/**
 * Reusable Textarea component with consistent border and focus styles.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                ref={ref}
                {...props}
            />
        )
    },
)
Textarea.displayName = 'Textarea'
