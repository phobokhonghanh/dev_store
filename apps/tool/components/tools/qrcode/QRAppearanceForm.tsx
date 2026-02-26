import { ColorPicker, Field, Input, Select, Switch } from '@/components/form'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/config'
import { UseQRAppearanceResult } from '@/lib/qr/hooks/useQRAppearance'
import { getAppDict } from '@/lib/i18n'
import { Settings2, Sparkles } from 'lucide-react'
import React, { useMemo, useCallback } from 'react'
import { ToolSection } from '@/components/tools/shared'
import { PresetGroup } from '../shared/PresetGroup'
import { TogglesGrid } from '@/components/tools/shared'
import { LogoManager } from './LogoManager'

/**
 * Interface for QRAppearanceForm props
 */
interface QRAppearanceFormProps {
  /** Object containing appearance state and setters from useQRAppearance hook */
  appearance: UseQRAppearanceResult
  /** Current text to be displayed in the decorative frame */
  frameText: string
  /** Callback to update the frame text */
  onFrameTextChange: (text: string) => void
  /** Callback to toggle logo visibility */
  onToggleShowLogo: (show: boolean) => void
  /** Current state of logo visibility */
  showLogo: boolean
  /** Whether to render secondary text in the QR code */
  renderText: boolean
  /** Callback to toggle secondary text rendering */
  onToggleRenderText: (render: boolean) => void
  /** Type of QR code (e.g., 'url', 'wifi') to condition some fields */
  qrType?: string
  /** Slot for additional content to be rendered inside the advanced section */
  advancedContent?: React.ReactNode
  /** Custom CSS classes for the container */
  className?: string
  /** Current locale for translations */
  locale?: SupportedLocale
  /** Logo selected from presets or auto-detected */
  effectiveLogo?: string
  /** Callback to update the custom logo URL */
  setCustomLogoUrl: (url: string | null) => void
}

export function QRAppearanceForm({
  appearance,
  frameText,
  onFrameTextChange,
  onToggleShowLogo,
  showLogo,
  renderText,
  onToggleRenderText,
  qrType,
  advancedContent,
  className,
  locale = DEFAULT_LOCALE,
  effectiveLogo,
  setCustomLogoUrl,
}: QRAppearanceFormProps) {
  // Memoize dictionary to optimize heavy i18n lookups
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

  // Stable reference for static presets
  const framePresets = useMemo(
    () => ['SCAN ME', 'FOLLOW ME', 'VISIT US', 'WIFI'],
    [],
  )

  /**
   * Memoized event handlers
   */
  const handleFrameTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFrameTextChange(e.currentTarget.value)
    },
    [onFrameTextChange],
  )

  const handleSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSize(Number(e.target.value))
    },
    [setSize],
  )

  const handleLevelChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')
    },
    [setLevel],
  )

  return (
    <div className={className}>
      {/* 1. Global Toggles - now integrated cleaner */}
      <div className="mb-6 px-4">
        <TogglesGrid className="border-none shadow-none bg-transparent p-0">
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
        </TogglesGrid>
      </div>

      {/* 2. Visual Frame Section - Flatted, no heavy border */}
      <div className="space-y-4 px-4 pb-6">
        {/* <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-primary" />
          <span className="text-sm font-semibold text-foreground/80">{dict.visualFrame}</span>
        </div> */}

        <Field label={dict.frameText}>
          <Input
            placeholder={dict.frameTextPlaceholder}
            value={frameText}
            onChange={handleFrameTextChange}
            className="h-10"
          />
        </Field>

        <PresetGroup
          presets={framePresets}
          value={frameText}
          onChange={onFrameTextChange}
          onClear={() => onFrameTextChange('')}
          clearLabel={dict.clearFrame}
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-border/50 mx-6 mb-6" />

      {/* 4. Advanced Customization - Using standard ToolSection but styled to blend in */}
      <div className="px-4 pb-4">
        <ToolSection
          collapsible
          defaultOpen={false}
          title={dict.advancedCustomization}
          icon={Settings2}
          className="shadow-sm"
        >
          <div className="space-y-8 pt-6 pb-2">
            {/* Size & Colors */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <Field label={`${dict.qrCodeSize}: ${size}px`} className="space-y-3">
                <input
                  type="range"
                  min="128"
                  max="1024"
                  step="32"
                  value={size}
                  onChange={handleSizeChange}
                  className="mt-2 w-full accent-primary transition-all hover:scale-[1.01]"
                />
              </Field>

              <div className="flex gap-6">
                <Field label={dict.dotsColor} className="flex-1">
                  <ColorPicker value={fgColor} onChange={setFgColor} />
                </Field>
                <Field label={dict.background} className="flex-1">
                  <ColorPicker value={bgColor} onChange={setBgColor} />
                </Field>
              </div>
            </div>

            {/* Logo Manager - Now inside Advanced */}
            {qrType === 'url' && showLogo && (
              <div className="border-t pt-6 animate-in fade-in slide-in-from-top-2 duration-500">
                <LogoManager
                  showLogo={showLogo}
                  currentLogo={effectiveLogo}
                  onSelectLogo={(url: string | null) => {
                    setCustomLogoUrl(url)
                  }}
                />
              </div>
            )}

            {/* Custom Content Slot */}
            {advancedContent && (
              <div className="border-t pt-8">{advancedContent}</div>
            )}

            {/* Recovery Level */}
            <Field label={dict.errorCorrection} className="border-t pt-8">
              <div className="space-y-3">
                <Select
                  className="h-11"
                  value={level}
                  onChange={handleLevelChange}
                >
                  <option value="L">{dict.errorCorrectionLow}</option>
                  <option value="M">{dict.errorCorrectionMedium}</option>
                  <option value="Q">{dict.errorCorrectionQuartile}</option>
                  <option value="H">{dict.errorCorrectionHigh}</option>
                </Select>
                <p className="text-muted-foreground text-xs leading-relaxed opacity-70">
                  {dict.errorCorrectionNote}
                </p>
              </div>
            </Field>
          </div>
        </ToolSection>
      </div>
    </div>
  )
}
