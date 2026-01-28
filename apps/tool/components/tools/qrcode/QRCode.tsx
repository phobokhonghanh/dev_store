import { QRCodeCanvas } from 'qrcode.react'

/** Configuration constants for QR Code display */
const QR_CONFIG = {
  /** Default ratio for center logo relative to QR size */
  LOGO_SIZE_RATIO: 0.2,
  /** Maximum length of text to show below the QR before truncating */
  MAX_TEXT_DISPLAY_LENGTH: 100,
}

/** Props for the QRCode display component */
interface QRCodeDisplayProps {
  /** The raw data to encode in the QR code */
  value: string
  /** Human-readable text to display below the QR (falls back to value) */
  displayText?: string
  /** Whether to render the descriptive text below the QR */
  renderText?: boolean
  /** Resolution size in pixels */
  size: number
  /** Foreground color (dots) */
  fgColor: string
  /** Background color */
  bgColor: string
  /** Error correction level: Low, Medium, Quartile, High */
  level: 'L' | 'M' | 'Q' | 'H'
  /** Whether to include a quiet zone margin */
  includeMargin: boolean
  /** Optional URL for center logo image */
  imageSrc?: string
  /** Optional explicit size for the center logo */
  imageSize?: number
  /** Whether to remove QR dots behind the logo */
  imageExcavate?: boolean
  /** Optional text for a frame (e.g., 'SCAN ME') */
  frameText?: string
}

/**
 * Enhanced QR Code component that renders a canvas with an optional logo and text description.
 * Uses 'qrcode.react' for high-quality client-side generation.
 */
export default function QRCode({
  value,
  displayText,
  renderText = true,
  size,
  fgColor,
  bgColor,
  level,
  includeMargin,
  imageSrc,
  imageSize,
  imageExcavate = true,
  frameText,
}: QRCodeDisplayProps) {
  // Configure logo settings if an image source is provided
  const imageSettings = imageSrc
    ? {
        src: imageSrc,
        height: imageSize || size * QR_CONFIG.LOGO_SIZE_RATIO,
        width: imageSize || size * QR_CONFIG.LOGO_SIZE_RATIO,
        excavate: imageExcavate,
      }
    : undefined

  const finalDisplayText = displayText ?? value

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="border-border bg-background relative flex w-full max-w-xs flex-col items-center justify-center rounded-lg border p-4 shadow-sm transition-all sm:max-w-sm sm:p-6">
        {frameText && (
          <div className="bg-primary absolute -top-3 rounded-full px-3 py-1 shadow-sm">
            <span className="text-primary-foreground text-[10px] font-black tracking-widest uppercase">
              {frameText}
            </span>
          </div>
        )}
        <QRCodeCanvas
          value={value}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
          includeMargin={includeMargin}
          imageSettings={imageSettings}
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
          }}
        />
        {frameText && (
          <div className="mt-3 flex items-center justify-center sm:mt-4">
            <span className="text-muted-foreground/60 text-[10px] font-bold tracking-tight uppercase sm:text-xs">
              {frameText}
            </span>
          </div>
        )}
      </div>

      {renderText && finalDisplayText && (
        <p className="text-muted-foreground min-h-[20px] max-w-full px-2 text-center text-[10px] break-all whitespace-pre-wrap sm:text-xs">
          {finalDisplayText.length > QR_CONFIG.MAX_TEXT_DISPLAY_LENGTH
            ? finalDisplayText.substring(0, QR_CONFIG.MAX_TEXT_DISPLAY_LENGTH) +
              '...'
            : finalDisplayText}
        </p>
      )}
    </div>
  )
}
