import { ColorPicker, Field, Select } from '@/components/Form'
import { UseQRAppearanceResult } from '@/lib/hooks/useQRAppearance'

interface QRAppearanceFormProps {
  appearance: UseQRAppearanceResult
  className?: string
}

/**
 * Reusable form component for configuring QR Code appearance settings.
 * Includes controls for Size, Error Correction Level, and Colors.
 */
export function QRAppearanceForm({
  appearance,
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

  return (
    <div className={className}>
      {/* Slider & Level */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
        <Field label={`Size: ${size}px`} className="flex-1">
          <input
            type="range"
            min="128"
            max="1024"
            step="32"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-green-600"
          />
        </Field>
        <Field label="Error Correction" className="flex-1">
          <Select
            className="h-9"
            value={level}
            onChange={(e) => setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </Select>
        </Field>
      </div>

      {/* Colors */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Foreground Color (Dots)">
          <ColorPicker value={fgColor} onChange={setFgColor} />
        </Field>
        <Field label="Background Color">
          <ColorPicker value={bgColor} onChange={setBgColor} />
        </Field>
      </div>
    </div>
  )
}
