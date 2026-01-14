'use client'

import FileUploader from '@/components/common/FileUpload'
import Fullscreen from '@/components/common/FullscreenWrapper'
import { AutoBreadcrumbs } from '@/components/layout/AutoBreadcrumbs'
import QRCode from '@/components/tools/qrcode/QRCode'
import QRCodeTabs, { QRType } from '@/components/tools/qrcode/QRCodeTabs'
import { toolsRoutes } from '@/data/tools'
import { useDownload } from '@/hooks/tools/io/useDownload'
import { useFileUpload } from '@/hooks/tools/io/useFileUpload'
import { useClipboard } from '@/hooks/useClipboard'
import { Check, Copy, Download } from 'lucide-react'
import { useRef, useState } from 'react'

export default function QRCodeToolPage() {
  // State: QR Content
  const {
    file: logoFile,
    fileContent: logoSrc,
    handleFileSelect: onSelectLogo,
    clearFile: onClearLogo,
    error: logoError,
  } = useFileUpload({
    accept: 'image/*',
    readAs: 'DataURL',
  })
  const [qrValue, setQrValue] = useState('')
  const [qrType, setQrType] = useState<QRType>('url')

  // State: Appearance Config
  const [size, setSize] = useState<number>(256)
  const [fgColor, setFgColor] = useState<string>('#000000')
  const [bgColor, setBgColor] = useState<string>('#ffffff')
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M')

  const clipboard = useClipboard({ timeout: 2000 })
  const { downloadCanvas } = useDownload()
  const qrRef = useRef<HTMLDivElement>(null)
  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas')
    if (canvas) {
      downloadCanvas(canvas, `qrcode-${qrType}-${Date.now()}`, 'png')
    }
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header & Nav */}
      <div className="mb-4">
        <AutoBreadcrumbs routes={toolsRoutes} />
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-500">
          QR Code Generator
        </h2>
        <p className="text-muted-foreground mt-1">
          Generate customized QR codes for URLs, WiFi networks, VCards, and
          more.
        </p>
      </div>

      {/* Main Tool Container */}
      <div className="bg-card text-card-foreground rounded-lg border p-6 shadow">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* LEFT COLUMN: Inputs & Config */}
          <div className="space-y-6 md:col-span-7">
            {/* 1. Input Tabs */}
            <QRCodeTabs
              onCodeChange={(code, type) => {
                setQrValue(code)
                setQrType(type)
              }}
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="border-border w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background text-muted-foreground px-2">
                  Display Settings
                </span>
              </div>
            </div>

            {/* 2. Configuration */}
            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-sm font-medium">Size: {size}px</label>
                <input
                  type="range"
                  min="128"
                  max="1024"
                  step="32"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-sm font-medium">Error Correction</label>
                <select
                  className="border-input bg-background focus-visible:ring-ring flex h-9 w-full rounded-md border px-2 py-1 text-sm focus-visible:ring-2 focus-visible:outline-none"
                  value={level}
                  onChange={(e) =>
                    setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')
                  }
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Foreground Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="h-10 w-16 cursor-pointer rounded border p-1"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm uppercase"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Background Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-10 w-16 cursor-pointer rounded border p-1"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm uppercase"
                  />
                </div>
              </div>
            </div>

            <FileUploader
              label="Center Logo"
              description="Logo will be displayed in the center of the QR code"
              file={logoFile}
              previewSrc={logoSrc as string}
              accept="image/*"
              onFileSelect={onSelectLogo}
              onClear={onClearLogo}
              error={logoError}
            />
          </div>

          {/* RIGHT COLUMN: Display */}
          <div
            className="relative md:col-span-5"
            id="qrcode-tool-root"
            ref={qrRef}
          >
            <Fullscreen targetId="qrcode-tool-root" />
            <QRCode
              value={qrValue}
              size={size}
              fgColor={fgColor}
              bgColor={bgColor}
              level={level}
              includeMargin={true}
              imageSrc={logoSrc as string | undefined}
            />

            <div className="mt-8 flex gap-3">
              <button
                className="border-input bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 flex-1 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
                onClick={handleDownload}
                disabled={!qrValue}
              >
                <Download size={18} className="mr-2" /> Download PNG
              </button>

              <button
                className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 flex-1 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
                onClick={() => clipboard.copy(qrValue)}
                disabled={!qrValue}
              >
                {clipboard.copied ? (
                  <Check size={18} className="mr-2 text-green-500" />
                ) : (
                  <Copy size={18} className="mr-2" />
                )}
                {clipboard.copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
