'use client'

import { cn } from '@origini/libs/utils'
import React from 'react'
import { Label } from '../primitives'

/** Props for the Switch (Toggle) component */
export interface SwitchProps {
    /** Whether the switch is checked */
    checked: boolean
    /** Callback fired when the switch changes */
    onCheckedChange: (checked: boolean) => void
    /** Optional label for the switch */
    label?: string
    /** Optional unique ID */
    id?: string
    /** Additional class for the wrapper */
    className?: string
}

/**
 * A modern Switch (Toggle) component.
 */
export const Switch = ({
    checked,
    onCheckedChange,
    label,
    id,
    className,
}: SwitchProps) => {
    const switchId = id || React.useId()
    return (
        <div className={cn('flex items-center gap-3', className)}>
            <button
                type="button"
                id={switchId}
                role="switch"
                aria-checked={checked}
                onClick={() => onCheckedChange(!checked)}
                className={cn(
                    'focus-visible:ring-primary relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                    checked ? 'bg-primary' : 'bg-muted',
                )}
            >
                <span
                    className={cn(
                        'bg-background pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform',
                        checked ? 'translate-x-4' : 'translate-x-1',
                    )}
                />
            </button>
            {label && (
                <Label htmlFor={switchId} className="cursor-pointer select-none">
                    {label}
                </Label>
            )}
        </div>
    )
}
