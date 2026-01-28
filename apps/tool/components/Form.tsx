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
          'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
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
          'border-input bg-background focus-visible:ring-ring flex h-10 w-full cursor-pointer rounded-md border px-3 py-2 text-sm transition-all focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
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
/** Props for the Switch (Toggle) component */
interface SwitchProps {
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

/** Props for the Checkbox component */
interface CheckboxProps {
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
