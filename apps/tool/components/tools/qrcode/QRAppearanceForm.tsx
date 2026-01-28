import { ColorPicker, Field, Input, Select, Switch } from '@/components/Form'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/config'
import { UseQRAppearanceResult } from '@/lib/hooks/useQRAppearance'
import { getAppDict } from '@/lib/i18n'
import { ChevronDown, ChevronUp, Settings2, Sparkles } from 'lucide-react'
import React, { useMemo, useState } from 'react'

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
  locale?: SupportedLocale
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
  locale = DEFAULT_LOCALE,
}: QRAppearanceFormProps) {
  const dict = useMemo(() => getAppDict(locale).qrAppearance, [locale])
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
          label={dict.displayLogo}
        />
        <Switch
          checked={renderText}
          onCheckedChange={onToggleRenderText}
          label={dict.displayText}
        />
        {qrType === 'url' && onToggleAutoDetect && (
          <Switch
            checked={!!autoDetectEnabled}
            onCheckedChange={onToggleAutoDetect}
            label={dict.autoDetect}
          />
        )}
      </div>

      {/* 2. Basic Settings: Visual Frame */}
      <div className="border-border bg-muted/30 space-y-4 rounded-xl border p-4">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-primary" />
          <h4 className="text-muted-foreground/60 text-[10px] font-black tracking-widest uppercase">
            {dict.visualFrame}
          </h4>
        </div>

        <Field label={dict.frameText}>
          <Input
            placeholder={dict.frameTextPlaceholder}
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
            {dict.clearFrame}
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
            <span>{dict.advancedCustomization}</span>
          </div>
          {isAdvancedOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isAdvancedOpen && (
          <div className="animate-in fade-in slide-in-from-top-2 border-border bg-muted/5 mt-4 space-y-8 rounded-lg border p-6 duration-200">
            {/* 1. Size & Colors Grouped */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Field label={`${dict.qrCodeSize}: ${size}px`}>
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
                <Field label={dict.dotsColor} className="flex-1">
                  <ColorPicker value={fgColor} onChange={setFgColor} />
                </Field>
                <Field label={dict.background} className="flex-1">
                  <ColorPicker value={bgColor} onChange={setBgColor} />
                </Field>
              </div>
            </div>

            {/* 2. Custom Logo Upload Slot */}
            {advancedContent && <div>{advancedContent}</div>}

            {/* 3. Error Correction Grouped */}
            <Field label={dict.errorCorrection}>
              <div className="space-y-2">
                <Select
                  className="h-10"
                  value={level}
                  onChange={(e) =>
                    setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')
                  }
                >
                  <option value="L">{dict.errorCorrectionLow}</option>
                  <option value="M">{dict.errorCorrectionMedium}</option>
                  <option value="Q">{dict.errorCorrectionQuartile}</option>
                  <option value="H">{dict.errorCorrectionHigh}</option>
                </Select>
                <p className="text-muted-foreground text-[10px] italic">
                  {dict.errorCorrectionNote}
                </p>
              </div>
            </Field>
          </div>
        )}
      </div>
    </div>
  )
}
