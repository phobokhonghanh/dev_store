import { QRCodeCanvas } from 'qrcode.react'

interface QRCodeDisplayProps {
  value: string
  size: number
  fgColor: string
  bgColor: string
  level: 'L' | 'M' | 'Q' | 'H'
  includeMargin: boolean
  imageSrc?: string
  imageSize?: number
  imageExcavate?: boolean
}

export default function QRCode({
  value,
  size,
  fgColor,
  bgColor,
  level,
  includeMargin,
  imageSrc,
  imageSize,
  imageExcavate = true,
}: QRCodeDisplayProps) {
  const imageSettings = imageSrc
    ? {
        src: imageSrc,
        height: imageSize || size * 0.2,
        width: imageSize || size * 0.2,
        excavate: imageExcavate,
      }
    : undefined

  return (
    <div className="flex h-full min-w-[300px] flex-col items-center justify-center gap-4">
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
            maxWidth: '250px',
            maxHeight: '250px',
          }}
        />
      </div>

      <p className="text-muted-foreground min-h-[20px] max-w-[300px] text-center text-xs break-all">
        {value.length > 50
          ? value.substring(0, 50) + '...'
          : value || 'No data'}
      </p>
    </div>
  )
}
