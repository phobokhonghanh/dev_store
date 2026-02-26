'use client'

import { cn } from '@origini/libs/utils'
import React from 'react'
import { Input } from '../primitives'

/** Props for the ColorPicker component */
export interface ColorPickerProps {
    /** The current hex color value */
    value: string
    /** Callback fired when the color changes */
    onChange: (value: string) => void
    /** Additional class for the wrapper div */
    className?: string
}

/**
 * A combined color picker component that includes a visual color input
 * and a synchronized hex text input.
 */
export const ColorPicker = ({
    value,
    onChange,
    className,
}: ColorPickerProps) => {
    return (
        <div className={cn('flex gap-2', className)}>
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-background border-input h-10 w-16 cursor-pointer rounded border p-1"
            />
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="font-mono uppercase"
                placeholder="#000000"
            />
        </div>
    )
}
