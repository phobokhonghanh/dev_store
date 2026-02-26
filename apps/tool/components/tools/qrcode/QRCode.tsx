import { QRCodeCanvas } from 'qrcode.react'
import React, { useMemo } from 'react'
import { QR_LIMITS } from '@/lib/qr/constants'
import { cn } from '@origini/libs/utils'

/** Configuration constants for QR Code display */
const QR_CONFIG = {
  /** Default ratio for center logo relative to QR size */
  LOGO_SIZE_RATIO: 0.2,
  /** Maximum length of text to show below the QR before truncating */
  MAX_TEXT_DISPLAY_LENGTH: 100,
}

class QRCodeErrorBoundary extends React.Component<
  { children: React.ReactNode, onError?: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode, onError?: (error: Error) => void }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('QR Rendering Error:', error, errorInfo)
    this.props.onError?.(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
          <span className="text-destructive mb-2 text-2xl">⚠️</span>
          <p className="text-muted-foreground text-xs font-medium">Content too large</p>
          <p className="text-muted-foreground/60 text-[10px]">Please reduce data</p>
        </div>
      )
    }

    return this.props.children
  }
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
  /** Additional CSS classes */
  className?: string
}

/**
 * Enhanced QR Code component that renders a canvas with an optional logo and text description.
 * Uses 'qrcode.react' for high-quality client-side generation.
 * 
 * Wrapped with React.memo to prevent unnecessary re-renders when parent state changes
 * but QR-related props remain the same.
 */
export const QRCode = React.memo(function QRCode({
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
  className,
}: QRCodeDisplayProps) {
  // Memoize logo settings to prevent re-computation
  const imageSettings = useMemo(() => (
    imageSrc
      ? {
        src: imageSrc,
        height: imageSize || size * QR_CONFIG.LOGO_SIZE_RATIO,
        width: imageSize || size * QR_CONFIG.LOGO_SIZE_RATIO,
        excavate: imageExcavate,
      }
      : undefined
  ), [imageSrc, imageSize, size, imageExcavate])

  const finalDisplayText = displayText ?? value

  // Force re-render error boundary when value changes
  const key = `${value}-${level}-${size}`

  // Proactive Validation: Check if value fits in QR Version 40
  const maxLimit = QR_LIMITS[level] || 2331
  const isTooLong = value.length > maxLimit

  // Empty state placeholder
  if (!value) {
    return (
      <div className={cn("flex h-full w-full flex-col items-center justify-center gap-4", className)}>
        <div className="border-border bg-background relative flex w-full max-w-xs flex-col items-center justify-center rounded-lg border p-4 shadow-sm sm:max-w-sm sm:p-6">
          <div className="flex flex-col items-center justify-center gap-3 py-8 animate-pulse">
            <div className="h-32 w-32 rounded-lg bg-muted/40" />
            <div className="h-3 w-24 rounded bg-muted/30" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex h-full w-full flex-col items-center justify-center gap-4", className)}>
      <div className="border-border bg-background relative flex w-full max-w-xs flex-col items-center justify-center rounded-lg border p-4 shadow-sm transition-all sm:max-w-sm sm:p-6">
        {frameText && (
          <div className="bg-primary absolute -top-3 rounded-full px-3 py-1 shadow-sm">
            <span className="text-primary-foreground text-[10px] font-black tracking-widest uppercase">
              {frameText}
            </span>
          </div>
        )}

        {isTooLong ? (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
            <span className="text-destructive mb-2 text-2xl">⚠️</span>
            <p className="text-muted-foreground text-xs font-medium">Content too large</p>
            <p className="text-muted-foreground/60 text-[10px]">
              {value.length} / {maxLimit} chars
            </p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            <QRCodeErrorBoundary key={key}>
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
            </QRCodeErrorBoundary>
          </div>
        )}

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
})
