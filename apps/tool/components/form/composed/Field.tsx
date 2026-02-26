'use client'

import { cn } from '@origini/libs/utils'
import React from 'react'
import { Label } from '../primitives'

/** Props for a Form Field wrapper */
export interface FieldProps {
    /** The label text to display */
    label?: string
    /** Additional class for the wrapper div */
    className?: string
    /** The actual input/content */
    children: React.ReactNode
    /** Optional help or error text */
    description?: string
}

/**
 * Field wrapper that associates a Label with its content (Input/Select)
 * and handles vertical layout spacing.
 */
export const Field = ({
    label,
    className,
    children,
    description,
}: FieldProps) => {
    return (
        <div className={cn('flex flex-col gap-1.5', className)}>
            {label && <Label>{label}</Label>}
            {children}
            {description && (
                <p className="text-muted-foreground text-[10px] italic">
                    {description}
                </p>
            )}
        </div>
    )
}
