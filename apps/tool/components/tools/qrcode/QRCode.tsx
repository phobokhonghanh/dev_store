import { QRCodeCanvas } from 'qrcode.react'

/** Configuration constants for QR Code display */
const QR_CONFIG = {
  /** Default ratio for center logo relative to QR size */
  LOGO_SIZE_RATIO: 0.2,
  /** Minimum width of the display container */
  MIN_CONTAINER_WIDTH: '300px',
  /** Maximum size for the QR preview in the UI */
  MAX_PREVIEW_SIZE: '250px',
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
    <div
      className="flex h-full flex-col items-center justify-center gap-4"
      style={{ minWidth: QR_CONFIG.MIN_CONTAINER_WIDTH }}
    >
      <div className="border-border flex items-center justify-center rounded-lg border bg-gray-100 p-6">
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
            maxWidth: QR_CONFIG.MAX_PREVIEW_SIZE,
            maxHeight: QR_CONFIG.MAX_PREVIEW_SIZE,
          }}
        />
      </div>

      {renderText && finalDisplayText && (
        <p
          className="text-muted-foreground min-h-[20px] text-center text-xs break-all whitespace-pre-wrap"
          style={{ maxWidth: QR_CONFIG.MIN_CONTAINER_WIDTH }}
        >
          {finalDisplayText.length > QR_CONFIG.MAX_TEXT_DISPLAY_LENGTH
            ? finalDisplayText.substring(0, QR_CONFIG.MAX_TEXT_DISPLAY_LENGTH) +
              '...'
            : finalDisplayText}
        </p>
      )}
    </div>
  )
}
