'use client'

import { cn } from '@origini/libs/utils'
import React from 'react'

/** Props for the base Label component */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    /** Whether the label should have the standard small, medium-weight styling */
    variant?: 'default' | 'small'
}

/**
 * Reusable Label component with consistent typography and spacing.
 */
export const Label = ({
    className,
    variant = 'default',
    ...props
}: LabelProps) => (
    <label
        className={cn(
            'leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            variant === 'default' ? 'text-sm' : 'mb-1 block text-xs',
            className,
        )}
        {...props}
    />
)
