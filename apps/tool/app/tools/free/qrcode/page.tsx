'use client'

import { AutoBreadcrumbs } from '@/components/layout'
import { EmbedSection, FAQSection } from '@/components/tools/shared'
import { Toast } from '@/components/ui'
import {
  QRCode,
  QRCodeTabs,
  QRAppearanceForm,
  QRType,
} from '@/components/tools/qrcode'
import { useLocale } from '@/lib/hooks/useLocale'
import { getAppDict } from '@/lib/i18n'
import { useQRCodeTool } from '@/lib/qr/hooks/useQRCodeTool'
import { useFAQ } from '@/lib/hooks/useFAQ'
import { useQREmbed } from '@/lib/qr/hooks/useQREmbed'
import { getToolsRoutes } from '@/lib/tools-routes'
import { Copy, Download } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import type { SupportedLocale } from '@/lib/config'

export default function QRCodePage() {
  const { locale } = useLocale()
  // Cast locale to SupportedLocale to satisfy getAppDict strict typing
  const dict = useMemo(() => getAppDict(locale as SupportedLocale), [locale])
  const routes = useMemo(() => getToolsRoutes(dict), [dict]) // Pass dict, not locale!

  const {
    // Content
    qrType,
    setQrType,
    qrValue,
    setQrValue,
    // Appearance
    appearance,
    frameText,
    setFrameText,
    showLogo,
    setShowLogo,
    renderText,
    setRenderText,
    effectiveLogo,
    // Logo state (separated for upload vs auto-detect)
    setUploadedLogo,
    setDetectedLogo,
    // Utils
    toast,
    showToast,
    hideToast,
    handleDownload,
    copyToClipboard,
    qrRef
  } = useQRCodeTool()

  const { data: faqData } = useFAQ()

  const currentFAQ = useMemo(() => {
    if (!faqData) return []
    // Allow fallback to default if specific tab not found
    return faqData[qrType] || faqData['default'] || []
  }, [faqData, qrType])
  const { embedUrl, sheetsFormula, method } = useQREmbed({
    value: qrValue,
    type: qrType,
    size: appearance.size,
    fgColor: appearance.fgColor,
    bgColor: appearance.bgColor,
    domain: true,
  })

  // --- Keyboard Shortcuts ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Enter → Download
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        handleDownload()
      }
      // Ctrl+Shift+C → Copy QR value
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        copyToClipboard(qrValue)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleDownload, copyToClipboard, qrValue])

  return (
    <div className="container mx-auto max-w-5xl space-y-8 p-4 pt-6 pb-20 md:p-6 md:pt-8">
      {/* Header & Breadcrumbs */}
      <div className="space-y-4">
        <AutoBreadcrumbs routes={routes} />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {dict.sidebar.qrCodeGenerator}
          </h1>
          <p className="text-muted-foreground text-lg">
            {dict.sidebar.qrCodeGeneratorDesc}
          </p>
        </div>
      </div>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onClose={hideToast}
      />

      {/* Main Grid: Left (Tabs/Form) - Right (Preview/Actions) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

        {/* Left Column: Input Forms */}
        <div className="space-y-6 lg:col-span-7 xl:col-span-8">
          {/* Unified Generator Panel */}
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <div className="px-4 pt-4 pb-3">
              <QRCodeTabs
                activeTab={qrType}
                onTabChange={setQrType}
                onCodeChange={(result, type) => {
                  setQrValue(result)
                }}
                locale={locale}
                onDetectLogo={(url) => {
                  setDetectedLogo(url)
                  if (url) setShowLogo(true)
                }}
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-border/50 mx-6 my-2" />

            {/* Appearance Section */}
            <div>
              <QRAppearanceForm
                appearance={appearance}
                frameText={frameText}
                onFrameTextChange={setFrameText}
                onToggleShowLogo={setShowLogo}
                showLogo={showLogo}
                renderText={renderText}
                onToggleRenderText={setRenderText}
                qrType={qrType}
                locale={locale as SupportedLocale}
                effectiveLogo={(effectiveLogo as string) || undefined}
                setCustomLogoUrl={setUploadedLogo}
                className="pt-2 pb-4"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Preview & Actions */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <div className="sticky top-24 space-y-4">
            {/* QR Code Block - No Card Wrapper */}
            <div className="flex justify-center" ref={qrRef}>
              <QRCode
                value={qrValue}
                displayText={undefined}
                renderText={false}
                size={appearance.size}
                fgColor={appearance.fgColor}
                bgColor={appearance.bgColor}
                level={appearance.level}
                includeMargin={true}
                imageSrc={(effectiveLogo as string) || undefined}
                imageSize={appearance.size * 0.2}
                imageExcavate={true}
                frameText={frameText}
              />
            </div>

            {/* Text Display Block - Separate from QR */}
            {renderText && qrValue && (
              <div className="text-center px-2">
                <p className="text-muted-foreground text-xs break-all whitespace-pre-wrap leading-relaxed">
                  {qrValue.length > 100 ? qrValue.substring(0, 100) + '...' : qrValue}
                </p>
              </div>
            )}

            {/* Action Buttons Block */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownload}
                title="Ctrl+Enter"
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors shadow-sm cursor-pointer group"
              >
                <Download size={16} />
                <span className="flex items-center gap-1.5">
                  {dict.qrTabs.download}
                  <kbd className="hidden group-hover:inline-flex items-center rounded border border-primary-foreground/20 bg-primary-foreground/10 px-1 py-0.5 text-[9px] font-mono">⌘↵</kbd>
                </span>
              </button>
              <button
                onClick={() => copyToClipboard(qrValue)}
                title="Ctrl+Shift+C"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors border shadow-sm cursor-pointer group"
              >
                <Copy size={16} />
                <span className="flex items-center gap-1.5">
                  {dict.qrTabs.copy}
                  <kbd className="hidden group-hover:inline-flex items-center rounded border border-border bg-muted/50 px-1 py-0.5 text-[9px] font-mono">⌘⇧C</kbd>
                </span>
              </button>
            </div>

            {/* Embed & Integrations */}
            <div className="bg-card rounded-xl border shadow-sm p-4 space-y-3">
              <EmbedSection
                title={dict.qrCodePage.embedTitle}
                content={embedUrl}
                sheetsFormula={sheetsFormula}
                method={method}
                onToast={showToast}
                dict={dict.embedSection}
              />

              {/* Reuse FAQSection component */}
              <FAQSection
                title={dict.qrCodePage.faqTitle}
                items={currentFAQ}
                viewGuideText={dict.qrCodePage.viewGuide}
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
