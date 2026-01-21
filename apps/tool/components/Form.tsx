'use client'

import { cn } from '@origini/libs/utils'
import React from 'react'

/** Props for the base Label component */
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
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

/** Props for the base Input component */
type InputProps = React.InputHTMLAttributes<HTMLInputElement>

/**
 * Reusable Input component with consistent border, focus, and background styles.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

/** Props for the base Select component */
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

/**
 * Reusable Select component with consistent border and focus styles.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          'border-input bg-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  },
)
Select.displayName = 'Select'

/** Props for a Form Field wrapper */
interface FieldProps {
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

/** Props for the ColorPicker component */
interface ColorPickerProps {
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
