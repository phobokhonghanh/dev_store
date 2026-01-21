import { ColorPicker, Field, Input, Select, Switch } from '@/components/Form'
import { UseQRAppearanceResult } from '@/lib/hooks/useQRAppearance'
import { ChevronDown, ChevronUp, Settings2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

interface QRAppearanceFormProps {
  appearance: UseQRAppearanceResult
  frameText: string
  onFrameTextChange: (text: string) => void
  onToggleShowLogo: (show: boolean) => void
  showLogo: boolean
  renderText: boolean
  onToggleRenderText: (render: boolean) => void
  autoDetectEnabled?: boolean
  onToggleAutoDetect?: (enabled: boolean) => void
  qrType?: string
  advancedContent?: React.ReactNode
  className?: string
}

/**
 * Reusable form component for configuring QR Code appearance settings.
 * Includes controls for Size, Error Correction Level, and Colors.
 */
export function QRAppearanceForm({
  appearance,
  frameText,
  onFrameTextChange,
  onToggleShowLogo,
  showLogo,
  renderText,
  onToggleRenderText,
  autoDetectEnabled,
  onToggleAutoDetect,
  qrType,
  advancedContent,
  className,
}: QRAppearanceFormProps) {
  const {
    size,
    setSize,
    fgColor,
    setFgColor,
    bgColor,
    setBgColor,
    level,
    setLevel,
  } = appearance

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const framePresets = ['SCAN ME', 'FOLLOW ME', 'VISIT US', 'WIFI']

  return (
    <div className={className}>
      {/* 1. Configuration Toggles (TOP) */}
      <div className="border-border bg-muted/20 mb-6 grid grid-cols-1 items-center gap-4 rounded-xl border p-4 sm:grid-cols-2 lg:grid-cols-3">
        <Switch
          checked={showLogo}
          onCheckedChange={onToggleShowLogo}
          label="Display Logo"
        />
        <Switch
          checked={renderText}
          onCheckedChange={onToggleRenderText}
          label="Display Text"
        />
        {qrType === 'url' && onToggleAutoDetect && (
          <Switch
            checked={!!autoDetectEnabled}
            onCheckedChange={onToggleAutoDetect}
            label="Auto Detect"
          />
        )}
      </div>

      {/* 2. Basic Settings: Visual Frame */}
      <div className="border-border bg-muted/30 space-y-4 rounded-xl border p-4">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-primary" />
          <h4 className="text-muted-foreground/60 text-[10px] font-black tracking-widest uppercase">
            Visual Frame
          </h4>
        </div>

        <Field label="Frame Text">
          <Input
            placeholder="e.g. SCAN ME"
            value={frameText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onFrameTextChange(e.currentTarget.value)
            }
            className="h-9"
          />
        </Field>

        <div className="flex flex-wrap gap-2">
          {framePresets.map((p) => (
            <button
              key={p}
              onClick={() => onFrameTextChange(p)}
              className={`rounded-md border px-3 py-1 text-[11px] font-bold transition-all ${
                frameText === p
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-primary'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => onFrameTextChange('')}
            className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-bold text-red-600 hover:bg-red-100"
          >
            Clear Frame
          </button>
        </div>
      </div>

      {/* 3. Advanced Settings (Collapsible) */}
      <div className="mt-8">
        <button
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="hover:bg-muted/50 border-border bg-background flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-semibold transition-colors"
        >
          <div className="flex items-center gap-2">
            <Settings2 size={18} className="text-primary" />
            <span>Advanced Customization</span>
          </div>
          {isAdvancedOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isAdvancedOpen && (
          <div className="animate-in fade-in slide-in-from-top-2 border-border bg-muted/5 mt-4 space-y-8 rounded-lg border p-6 duration-200">
            {/* 1. Size & Colors Grouped */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Field label={`QR Code Size: ${size}px`}>
                <input
                  type="range"
                  min="128"
                  max="1024"
                  step="32"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="mt-2 w-full accent-green-600"
                />
              </Field>

              <div className="flex gap-4">
                <Field label="Dots Color" className="flex-1">
                  <ColorPicker value={fgColor} onChange={setFgColor} />
                </Field>
                <Field label="Background" className="flex-1">
                  <ColorPicker value={bgColor} onChange={setBgColor} />
                </Field>
              </div>
            </div>

            {/* 2. Custom Logo Upload Slot */}
            {advancedContent && <div>{advancedContent}</div>}

            {/* 3. Error Correction Grouped */}
            <Field label="Error Correction Precision">
              <div className="space-y-2">
                <Select
                  className="h-10"
                  value={level}
                  onChange={(e) =>
                    setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')
                  }
                >
                  <option value="L">Low (7% recovery)</option>
                  <option value="M">Medium (15% recovery)</option>
                  <option value="Q">Quartile (25% recovery)</option>
                  <option value="H">High (30% recovery)</option>
                </Select>
                <p className="text-muted-foreground text-[10px] italic">
                  Higher precision allows the QR code to survive damage or large
                  logos.
                </p>
              </div>
            </Field>
          </div>
        )}
      </div>
    </div>
  )
}
