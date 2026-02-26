'use client'

import { cn } from '@origini/libs/utils'
import React from 'react'

interface TogglesGridProps {
    children: React.ReactNode
    className?: string
    columns?: number
}

/**
 * A consistent grid layout for tool configuration switches/toggles.
 */
export function TogglesGrid({
    children,
    className,
    columns = 3,
}: TogglesGridProps) {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

    return (
        <div className={cn(
            'border-border bg-muted/20 grid items-center gap-4 rounded-xl border p-4 shadow-sm',
            gridCols,
            className
        )}>
            {children}
        </div>
    )
}
