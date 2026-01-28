'use client'

import { AutoBreadcrumbs } from '@/components/AutoBreadcrumbs'
import { EmbedSection } from '@/components/EmbedSection'
import { Toast } from '@/components/Toast'
import { QRAppearanceForm } from '@/components/tools/qrcode/QRAppearanceForm'
import { CONFIG } from '@/lib/config'
import { useLocale } from '@/lib/hooks/useLocale'
import { useQRAppearance } from '@/lib/hooks/useQRAppearance'
import { getAppDict } from '@/lib/i18n'
import { getQRTypes } from '@/lib/qr-types'
import { getToolsRoutes } from '@/lib/tools-routes'
import { ExternalLink, HelpCircle, Settings2, Sheet } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'

export default function QRGuidePage() {
  const appearance = useQRAppearance()
  const { size, fgColor, bgColor, level } = appearance

  // i18n
  const { locale } = useLocale()
  const dict = useMemo(() => getAppDict(locale), [locale])
  const routes = useMemo(() => getToolsRoutes(dict), [dict])
  const qrTypes = useMemo(() => getQRTypes(dict), [dict])
  const t = dict.qrGuidePage

  // Guide-specific states
  const [frameText, setFrameText] = useState('')
  const [showLogo, setShowLogo] = useState(false)
  const [renderText, setRenderText] = useState(true)
  const [activeTab, setActiveTab] = useState('url')

  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  })

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true })
  }, [])

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  const activeType = qrTypes.find((type) => type.id === activeTab) || qrTypes[0]

  // Generate dynamic API example with current appearance settings
  const dynamicExample = useMemo(() => {
    const baseExample = activeType.example
    const params = new URLSearchParams()
    params.set('size', size.toString())
    params.set('dark', fgColor.replace('#', ''))
    params.set('light', bgColor.replace('#', ''))
    params.set('level', level)

    // Append appearance params to example
    const separator = baseExample.includes('?') ? '&' : '?'
    return `${baseExample}${separator}${params.toString()}`
  }, [activeType.example, size, fgColor, bgColor, level])

  // Appearance params data for the table
  const appearanceParams = useMemo(
    () => [
      {
        name: 'size',
        type: 'number',
        default: '256',
        desc: t.sizeDesc,
        current: size,
      },
      {
        name: 'dark',
        type: 'hex',
        default: '000000',
        desc: t.darkDesc,
        current: fgColor.replace('#', ''),
      },
      {
        name: 'light',
        type: 'hex',
        default: 'ffffff',
        desc: t.lightDesc,
        current: bgColor.replace('#', ''),
      },
      {
        name: 'level',
        type: 'enum',
        default: 'M',
        desc: t.levelDesc,
        current: level,
      },
    ],
    [t, size, fgColor, bgColor, level],
  )

  // Advanced params data for the table
  const advancedParams = useMemo(
    () => [
      {
        name: 'text',
        type: 'string',
        default: '(empty)',
        desc: t.textDesc,
        current: frameText || '(empty)',
      },
      {
        name: 'renderText',
        type: 'boolean',
        default: '1',
        desc: t.renderTextDesc,
        current: renderText ? '1' : '0',
      },
      {
        name: 'logo',
        type: 'boolean',
        default: '0',
        desc: t.logoDesc,
        current: showLogo ? '1' : '0',
      },
      {
        name: 'logoUrl',
        type: 'string',
        default: '(empty)',
        desc: t.logoUrlDesc,
        current: '(your-logo-url)',
      },
    ],
    [t, frameText, renderText, showLogo],
  )

  // Full API URL with all params
  const fullApiUrl = useMemo(() => {
    const params = new URLSearchParams()
    params.set('type', activeTab)
    params.set('size', size.toString())
    params.set('dark', fgColor.replace('#', ''))
    params.set('light', bgColor.replace('#', ''))
    params.set('level', level)
    if (frameText) params.set('text', frameText)
    params.set('renderText', renderText ? '1' : '0')
    params.set('logo', showLogo ? '1' : '0')
    return `${CONFIG.API_BASE}?${params.toString()}`
  }, [
    activeTab,
    size,
    fgColor,
    bgColor,
    level,
    frameText,
    renderText,
    showLogo,
  ])

  return (
    <div className="mx-auto max-w-5xl overflow-hidden p-3 sm:p-4 md:p-8">
      <div className="mb-4">
        <AutoBreadcrumbs routes={routes} />
      </div>

      {/* Header */}
      <div className="mb-6 text-center sm:mb-10">
        <div className="bg-primary/10 text-primary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl sm:mb-4 sm:h-12 sm:w-12 sm:rounded-2xl">
          <HelpCircle size={24} className="sm:hidden" />
          <HelpCircle size={28} className="hidden sm:block" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
          {t.title}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm sm:mt-4 sm:text-base md:text-lg">
          {t.description}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {qrTypes.map((type) => {
          const Icon = type.icon
          return (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === type.id
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-background hover:border-primary/50 text-muted-foreground hover:text-primary'
              }`}
            >
              <Icon size={14} />
              {type.id.toUpperCase()}
            </button>
          )
        })}
      </div>

      {/* Active Tab Content */}
      <section className="bg-card overflow-hidden rounded-xl border p-3 shadow-sm sm:rounded-2xl sm:p-5 md:p-8">
        <div className="mb-4 flex items-center gap-2 sm:mb-6 sm:gap-3">
          <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10 sm:rounded-xl">
            <activeType.icon size={18} className="sm:hidden" />
            <activeType.icon size={22} className="hidden sm:block" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-bold sm:text-xl">
              {activeType.title}
            </h2>
            <p className="text-muted-foreground line-clamp-2 text-xs sm:text-sm">
              {activeType.description}
            </p>
          </div>
        </div>

        {/* API Parameters */}
        <div className="mb-4 sm:mb-6">
          <h3 className="mb-2 text-xs font-bold sm:mb-3 sm:text-sm">
            {t.apiParams}
          </h3>
          <div className="-mx-3 overflow-x-auto sm:mx-0 sm:rounded-xl sm:border">
            <table className="w-full min-w-[400px] text-left text-[10px] sm:min-w-0 sm:text-xs">
              <thead className="bg-muted">
                <tr>
                  <th className="px-2 py-2 font-bold sm:px-4 sm:py-2.5">
                    {t.paramCol}
                  </th>
                  <th className="px-2 py-2 font-bold sm:px-4 sm:py-2.5">
                    {t.typeCol}
                  </th>
                  <th className="px-2 py-2 font-bold sm:px-4 sm:py-2.5">
                    {t.descCol}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {activeType.params.map((p) => (
                  <tr key={p.name}>
                    <td className="text-primary px-4 py-2.5 font-mono font-semibold">
                      {p.name}
                    </td>
                    <td className="text-muted-foreground px-4 py-2.5 font-mono">
                      {p.type}
                    </td>
                    <td className="px-4 py-2.5">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Example URLs */}
        <div className="space-y-4">
          <EmbedSection
            title={t.apiExample}
            content={dynamicExample}
            onToast={showToast}
          />
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
            <h4 className="mb-2 flex items-center gap-2 text-xs font-bold text-green-600 dark:text-green-400">
              <Sheet size={14} /> {t.sheetsFormula}
            </h4>
            <code className="bg-muted block overflow-x-auto rounded p-2 font-mono text-[10px]">
              {activeType.sheetsExample}
            </code>
            <p className="text-muted-foreground mt-2 text-[10px]">
              {t.sheetsFormulaNote}
            </p>
          </div>
        </div>
      </section>

      {/* Appearance Settings Section */}
      <section className="bg-card mt-8 overflow-hidden rounded-2xl border p-5 shadow-sm md:p-8">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-bold">
          <Settings2 size={20} className="text-primary" />
          {t.customizeSection}
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">{t.customizeDesc}</p>

        <QRAppearanceForm
          appearance={appearance}
          frameText={frameText}
          onFrameTextChange={setFrameText}
          onToggleShowLogo={setShowLogo}
          showLogo={showLogo}
          renderText={renderText}
          onToggleRenderText={setRenderText}
          locale={locale}
        />

        {/* Appearance API Params Table */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-bold">{t.apiParams}</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2.5 font-bold">{t.paramCol}</th>
                  <th className="px-4 py-2.5 font-bold">{t.typeCol}</th>
                  <th className="px-4 py-2.5 font-bold">{t.defaultCol}</th>
                  <th className="px-4 py-2.5 font-bold">{t.descCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {appearanceParams.map((p) => (
                  <tr key={p.name}>
                    <td className="text-primary px-4 py-2.5 font-mono font-semibold">
                      {p.name}
                    </td>
                    <td className="text-muted-foreground px-4 py-2.5 font-mono">
                      {p.type}
                    </td>
                    <td className="text-muted-foreground px-4 py-2.5 font-mono">
                      {p.default}
                    </td>
                    <td className="px-4 py-2.5">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live API URL with appearance settings */}
        <div className="mt-6">
          <EmbedSection
            title={`${t.apiExample} (${t.customizeSection})`}
            content={fullApiUrl}
            onToast={showToast}
          />
        </div>
      </section>

      {/* Advanced Options Section */}
      <section className="bg-card mt-8 overflow-hidden rounded-2xl border p-5 shadow-sm md:p-8">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-bold">
          <Settings2 size={20} className="text-primary" />
          {t.advancedSection}
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">{t.advancedDesc}</p>

        {/* Advanced API Params Table */}
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2.5 font-bold">{t.paramCol}</th>
                <th className="px-4 py-2.5 font-bold">{t.typeCol}</th>
                <th className="px-4 py-2.5 font-bold">{t.defaultCol}</th>
                <th className="px-4 py-2.5 font-bold">{t.descCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {advancedParams.map((p) => (
                <tr key={p.name}>
                  <td className="text-primary px-4 py-2.5 font-mono font-semibold">
                    {p.name}
                  </td>
                  <td className="text-muted-foreground px-4 py-2.5 font-mono">
                    {p.type}
                  </td>
                  <td className="text-muted-foreground px-4 py-2.5 font-mono">
                    {p.default}
                  </td>
                  <td className="px-4 py-2.5">{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Logo Note */}
        <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-xs text-amber-700 dark:text-amber-400">
            <strong>💡 {t.advancedSection}:</strong> {t.logoNote}
          </p>
        </div>
      </section>

      {/* Back Link */}
      <div className="mt-8 text-center">
        <Link
          href="/tools/free/qrcode"
          className="text-primary inline-flex items-center gap-2 font-bold hover:underline"
        >
          {t.try} <ExternalLink size={16} />
        </Link>
      </div>

      <Toast
        visible={toast.visible}
        message={toast.message}
        onClose={hideToast}
      />
    </div>
  )
}
