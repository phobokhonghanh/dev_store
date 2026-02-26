'use client'

import { cn } from '@origini/libs/utils'
import React from 'react'

interface PresetGroupProps<T extends string> {
    presets: T[]
    value: T
    onChange: (value: T) => void
    onClear?: () => void
    clearLabel?: string
    className?: string
}

/**
 * A reusable button group for choosing from a list of predefined string presets.
 */
export function PresetGroup<T extends string>({
    presets,
    value,
    onChange,
    onClear,
    clearLabel,
    className,
}: PresetGroupProps<T>) {
    return (
        <div className={cn('flex flex-wrap gap-2', className)}>
            {presets.map((p) => {
                const isActive = value === p
                return (
                    <button
                        key={p}
                        type="button"
                        onClick={() => onChange(p)}
                        className={cn(
                            'rounded-lg border px-3.5 py-1.5 text-[11px] font-bold transition-all active:scale-95 cursor-pointer',
                            isActive
                                ? 'border-primary bg-primary text-primary-foreground shadow-md'
                                : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/50 hover:text-primary'
                        )}
                        aria-pressed={isActive}
                    >
                        {p}
                    </button>
                )
            })}

            {onClear && (
                <button
                    type="button"
                    onClick={onClear}
                    className="rounded-lg border border-destructive/20 bg-destructive/5 px-3.5 py-1.5 text-[11px] font-bold text-red-600 transition-colors hover:bg-red-100 cursor-pointer"
                >
                    {clearLabel || 'Clear'}
                </button>
            )}
        </div>
    )
}
