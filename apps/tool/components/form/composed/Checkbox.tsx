'use client'

import { cn } from '@origini/libs/utils'
import React from 'react'
import { Label } from '../primitives'

/** Props for the Checkbox component */
export interface CheckboxProps {
    /** Whether the checkbox is checked */
    checked: boolean
    /** Callback fired when the checkbox changes */
    onCheckedChange: (checked: boolean) => void
    /** Optional label for the checkbox */
    label?: string
    /** Optional unique ID */
    id?: string
    /** Additional class for the wrapper */
    className?: string
}

/**
 * A styled Checkbox component matching the design system.
 */
export const Checkbox = ({
    checked,
    onCheckedChange,
    label,
    id,
    className,
}: CheckboxProps) => {
    const checkboxId = id || React.useId()
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <input
                type="checkbox"
                id={checkboxId}
                checked={checked}
                onChange={(e) => onCheckedChange(e.target.checked)}
                className="border-input h-4 w-4 cursor-pointer rounded transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            />
            {label && (
                <Label htmlFor={checkboxId} className="cursor-pointer select-none">
                    {label}
                </Label>
            )}
        </div>
    )
}
