'use client'

import { cn } from '@origini/libs/utils'
import React from 'react'

interface FormGridProps {
    children: React.ReactNode
    className?: string
    gap?: 2 | 4 | 6 | 8
}

/**
 * A responsive grid for form fields that handles column count 
 * automatically based on child count and screen size.
 */
export function FormGrid({
    children,
    className,
    gap = 4,
}: FormGridProps) {
    const gapClass = {
        2: 'gap-2',
        4: 'gap-4',
        6: 'gap-6',
        8: 'gap-8',
    }[gap]

    return (
        <div className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2',
            gapClass,
            className
        )}>
            {children}
        </div>
    )
}
