'use client'

import { cn } from '@origini/libs/utils'
import React from 'react'

/**
 * Variant types for the action button.
 * Using Strategy pattern to allow flexible styling.
 */
type ButtonVariant = 'destructive' | 'primary' | 'secondary' | 'ghost'

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual variant of the button */
    variant?: ButtonVariant
    /** Icon to display before the label */
    icon?: React.ReactNode
    /** Button label */
    children: React.ReactNode
    /** Additional CSS classes */
    className?: string
}

/**
 * Reusable Action Button Component.
 * 
 * Follows Open/Closed Principle - open for extension via variants,
 * closed for modification of core behavior.
 * 
 * Usage:
 * ```tsx
 * <ActionButton variant="destructive" icon={<Trash2 size={14} />}>
 *   Remove
 * </ActionButton>
 * ```
 */
export function ActionButton({
    variant = 'primary',
    icon,
    children,
    className,
    ...props
}: ActionButtonProps) {
    const baseStyles = 'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[11px] font-bold transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

    const variantStyles: Record<ButtonVariant, string> = {
        destructive: 'border border-destructive/20 bg-destructive/5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border shadow-sm',
        ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground',
    }

    return (
        <button
            className={cn(baseStyles, variantStyles[variant], className)}
            {...props}
        >
            {icon}
            {children}
        </button>
    )
}

/**
 * Preset: Destructive Action Button.
 * Convenience wrapper for common destructive actions (delete, remove).
 */
export function DestructiveButton({
    icon,
    children,
    className,
    ...props
}: Omit<ActionButtonProps, 'variant'>) {
    return (
        <ActionButton variant="destructive" icon={icon} className={className} {...props}>
            {children}
        </ActionButton>
    )
}

/**
 * Preset: Secondary Action Button.
 * Convenience wrapper for alternative/secondary actions.
 */
export function SecondaryButton({
    icon,
    children,
    className,
    ...props
}: Omit<ActionButtonProps, 'variant'>) {
    return (
        <ActionButton variant="secondary" icon={icon} className={className} {...props}>
            {children}
        </ActionButton>
    )
}

/**
 * Preset: Ghost Action Button.
 * Convenience wrapper for subtle, low-emphasis actions.
 */
export function GhostButton({
    icon,
    children,
    className,
    ...props
}: Omit<ActionButtonProps, 'variant'>) {
    return (
        <ActionButton variant="ghost" icon={icon} className={className} {...props}>
            {children}
        </ActionButton>
    )
}
