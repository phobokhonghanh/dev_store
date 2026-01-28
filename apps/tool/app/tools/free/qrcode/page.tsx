'use client'

import { AutoBreadcrumbs } from '@/components/AutoBreadcrumbs'
import { EmbedSection } from '@/components/EmbedSection'
import FileUploader from '@/components/FileUpload'
import Fullscreen from '@/components/FullscreenWrapper'
import { Toast } from '@/components/Toast'
import { LogoManager } from '@/components/tools/qrcode/LogoManager'
import { QRAppearanceForm } from '@/components/tools/qrcode/QRAppearanceForm'
import QRCode from '@/components/tools/qrcode/QRCode'
import QRCodeTabs, { QRType } from '@/components/tools/qrcode/QRCodeTabs'
import { useClipboard } from '@/lib/hooks/useClipboard'
import { useDownload } from '@/lib/hooks/useDownload'
import { useFileUpload } from '@/lib/hooks/useFileUpload'
import { useLocale } from '@/lib/hooks/useLocale'
import { useQRAppearance } from '@/lib/hooks/useQRAppearance'
import { useQREmbed } from '@/lib/hooks/useQREmbed'
import { getAppDict } from '@/lib/i18n'
import { getToolsRoutes } from '@/lib/tools-routes'
import { ChevronDown, Copy, Download, HelpCircle, Zap } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

/**
 * Main Content Component for the QR Code Tool.
 * Handles state management for QR data, appearance, and integration options.
 */
function QRCodeToolContent() {
  const searchParams = useSearchParams()
  const { locale } = useLocale()
  const dict = useMemo(() => getAppDict(locale), [locale])
  const routes = useMemo(() => getToolsRoutes(dict), [dict])

  // --- State: QR Content ---

  /** Hook for handling logo file uploads */
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

  /** The generated QR value/string */
  const [qrValue, setQrValue] = useState('')
  /** The text displayed below the QR code (if enabled) */
  const [displayText, setDisplayText] = useState('')
  /** The active QR type (url, wifi, vcard, etc.) */
  const [qrType, setQrType] = useState<QRType>('url')
  /** Whether to render the descriptive text below the QR code */
  const [renderText, setRenderText] = useState(true)
  /** Optional text for a frame (e.g., 'SCAN ME') */
  const [frameText, setFrameText] = useState('')

  // --- State: Logo Management ---
  /** Whether to show any logo at all */
  const [showLogo, setShowLogo] = useState(true)
  /** Whether to automatically detect logo from URL */
  const [autoDetectEnabled, setAutoDetectEnabled] = useState(true)
  /** Logo selected from presets or auto-detected */
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null)

  /** Initialize state from URL search parameters */
  useEffect(() => {
    const text = searchParams.get('text')
    const url = searchParams.get('url')

    if (text) {
      setQrValue(text)
      setDisplayText(text)
    } else if (url) {
      setQrValue(url)
      setDisplayText(url)
    }
  }, [searchParams])

  // --- State: Appearance & Config (Refactored to Hook) ---
  const {
    size,
    setSize,
    fgColor,
    setFgColor,
    bgColor,
    setBgColor,
    level,
    setLevel,
  } = useQRAppearance()

  /** Toast notification state */
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  })

  const { downloadCanvas } = useDownload()

  /** Displays a transient toast message */
  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true })
  }, [])

  /** Clipboard hook with toast integration */
  const { copy: copyToClipboard } = useClipboard({
    onSuccess: () => showToast('Content copied to clipboard!'),
    onError: () => showToast('Failed to copy content.'),
    timeout: 1500,
  })

  /** Hides the active toast */
  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  // Updated handleCopy to use the hook
  const handleCopy = useCallback(
    (text: string) => {
      copyToClipboard(text)
    },
    [copyToClipboard],
  )

  // --- Embed Logic (Refactored to Hook) ---
  const { embedUrl, sheetsFormula } = useQREmbed({
    value: qrValue,
    type: qrType,
    size,
    fgColor,
    bgColor,
  })

  const effectiveLogo = showLogo
    ? logoSrc || (qrType === 'url' ? customLogoUrl : undefined)
    : undefined

  const qrRef = useRef<HTMLDivElement>(null)

  /** Triggers PNG download of the current QR code */
  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas') || null
    downloadCanvas(canvas, `qrcode-${qrType}-${Date.now()}`, 'png')
  }

  return (
    <div className="p-3 sm:p-4 md:p-8">
      {/* Header & Nav */}
      <div className="mb-4">
        <AutoBreadcrumbs routes={routes} />
      </div>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl font-bold text-green-600 sm:text-2xl dark:text-green-500">
          {dict.sidebar.qrCodeGenerator}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          {dict.sidebar.qrCodeGeneratorDesc}
        </p>
      </div>

      {/* Main Tool Container */}
      <div className="bg-card text-card-foreground rounded-lg border p-3 shadow sm:p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {/* LEFT COLUMN: Inputs & Config */}
          <div className="space-y-4 sm:space-y-6 md:col-span-7">
            {/* 1. Input Tabs */}
            <QRCodeTabs
              onCodeChange={useCallback(
                (
                  code: string,
                  type: QRType,
                  display?: string,
                  rawData?: unknown,
                ) => {
                  const data = rawData as any // eslint-disable-line @typescript-eslint/no-explicit-any
                  setQrValue(code)
                  setQrType(type)
                  setDisplayText(display || code)

                  // Auto-detect platform logo if enabled and on URL tab
                  if (type === 'url' && autoDetectEnabled) {
                    setCustomLogoUrl(data?.platform?.logo || null)
                  }
                },
                [autoDetectEnabled],
              )}
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="border-border w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-bold tracking-widest uppercase">
                <span className="bg-background text-muted-foreground px-4">
                  {dict.common.displaySettings}
                </span>
              </div>
            </div>
            {/* 2. Configuration */}
            <div className="space-y-6">
              {qrType === 'url' && showLogo && (
                <LogoManager
                  showLogo={showLogo}
                  currentLogo={effectiveLogo as string}
                  onSelectLogo={(url: string | null) => {
                    setCustomLogoUrl(url)
                    if (url) setAutoDetectEnabled(false)
                  }}
                />
              )}

              <QRAppearanceForm
                appearance={{
                  size,
                  setSize,
                  fgColor,
                  setFgColor,
                  bgColor,
                  setBgColor,
                  level,
                  setLevel,
                }}
                frameText={frameText}
                onFrameTextChange={setFrameText}
                showLogo={showLogo}
                onToggleShowLogo={(val) => {
                  setShowLogo(val)
                  if (!val) setAutoDetectEnabled(false)
                }}
                renderText={renderText}
                onToggleRenderText={setRenderText}
                autoDetectEnabled={autoDetectEnabled}
                onToggleAutoDetect={(val) => {
                  setAutoDetectEnabled(val)
                  if (val) setShowLogo(true)
                }}
                qrType={qrType}
                locale={locale}
                advancedContent={
                  showLogo && (
                    <FileUploader
                      label={dict.qrCodePage.customLogoLabel}
                      description={dict.qrCodePage.customLogoDesc}
                      file={logoFile}
                      previewSrc={logoSrc as string}
                      accept="image/*"
                      onFileSelect={onSelectLogo}
                      onClear={onClearLogo}
                      error={logoError}
                    />
                  )
                }
              />
            </div>
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
              displayText={displayText}
              renderText={renderText}
              size={size}
              fgColor={fgColor}
              bgColor={bgColor}
              level={level}
              includeMargin={true}
              imageSrc={effectiveLogo as string | undefined}
              frameText={frameText}
            />

            <div className="relative mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:gap-3">
              <button
                className="border-input bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center rounded-md border px-3 py-2 text-xs font-medium transition-colors sm:flex-1 sm:px-4 sm:text-sm"
                onClick={handleDownload}
                disabled={!qrValue}
              >
                <Download size={16} className="mr-1.5 sm:mr-2" />{' '}
                {dict.qrCodePage.downloadPng}
              </button>

              <button
                className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-full items-center justify-center rounded-md border px-3 py-2 text-xs font-medium transition-colors sm:flex-1 sm:px-4 sm:text-sm"
                disabled={!qrValue}
                onClick={(e) => {
                  e.stopPropagation()
                  handleCopy(qrValue)
                }}
              >
                <Copy size={16} className="mr-1.5 sm:mr-2" />
                {dict.qrCodePage.copy}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: FAQ & Embed Parallel */}
        <div className="mt-12 border-t pt-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* FAQ Side */}
            <div>
              <h5 className="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-widest text-green-600 uppercase dark:text-green-500">
                <HelpCircle
                  size={14}
                  className="text-green-600 dark:text-green-500"
                />{' '}
                {dict.qrCodePage.faqTitle}
              </h5>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  {
                    q: dict.qrCodePage.faq1,
                    h: '/tools/free/qrcode/guide',
                  },
                  {
                    q: dict.qrCodePage.faq2,
                    h: '/tools/free/qrcode/guide',
                  },
                  {
                    q: dict.qrCodePage.faq3,
                    h: '/tools/free/qrcode/guide',
                  },
                  {
                    q: dict.qrCodePage.faq4,
                    h: '/tools/free/qrcode/guide',
                  },
                ].map((faq, i) => (
                  <li key={i}>
                    <Link
                      href={faq.h}
                      className="group bg-card hover:border-primary/50 hover:bg-primary/5 flex h-full flex-col justify-between rounded-xl border p-4 shadow-sm transition-all hover:shadow-md"
                    >
                      <span className="group-hover:text-primary text-xs leading-snug font-bold transition-colors">
                        {faq.q}
                      </span>
                      <div className="text-muted-foreground group-hover:text-primary/70 mt-2 flex items-center text-[10px] transition-colors">
                        {dict.qrCodePage.viewGuide}{' '}
                        <ChevronDown
                          size={12}
                          className="ml-1 rotate-[-90deg]"
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Embed Side (Refactored to Component) */}
            <div>
              <h4 className="text-muted-foreground mb-4 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase">
                <Zap size={10} className="text-yellow-500" />{' '}
                {dict.qrCodePage.embedTitle}
              </h4>
              <div className="space-y-4">
                {/* Google Sheets Formula */}
                <EmbedSection
                  title={dict.qrCodePage.sheetFormula}
                  content={sheetsFormula}
                  onToast={showToast}
                />

                {/* Direct URL */}
                <EmbedSection
                  title={dict.qrCodePage.directUrl}
                  content={embedUrl}
                  onToast={showToast}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Component */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        onClose={hideToast}
      />
    </div>
  )
}

/**
 * QR Code Generator Page Wrapper with Suspense helper.
 */
export default function QRCodeToolPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <QRCodeToolContent />
    </Suspense>
  )
}
