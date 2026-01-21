'use client'

import { AutoBreadcrumbs } from '@/components/AutoBreadcrumbs'
import { EmbedSection } from '@/components/EmbedSection'
import { Toast } from '@/components/Toast'
import { QRAppearanceForm } from '@/components/tools/qrcode/QRAppearanceForm'
import { useQRAppearance } from '@/lib/hooks/useQRAppearance'
import { useQREmbed } from '@/lib/hooks/useQREmbed'
import { toolsRoutes } from '@/lib/tools-routes'
import { ExternalLink, HelpCircle, Info, Layout, Sheet } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'

export default function QRGuidePage() {
  const {
    size,
    setSize,
    fgColor: dark,
    setFgColor: setDark,
    bgColor: light,
    setBgColor: setLight,
    level,
    setLevel,
  } = useQRAppearance()

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

  // Use hook to generate real-time embed examples with payment default
  const { embedUrl, sheetsFormula } = useQREmbed({
    domain: false,
    params_default: true,
    value: 'VCB|123456789|100000|Thanh toan', // Example value representing payment data
    type: 'payment',
    size,
    fgColor: dark,
    bgColor: light,
  })

  // Manually tweak the embedUrl for the payment example to show the correct API parameters
  // since useQREmbed currently generalizes non-URL types
  const paymentApiUrl = embedUrl.replace(
    'type=text&data=',
    'type=payment&bank=VCB&account=123456789&amount=100000&content=',
  )
  const paymentSheetsFormula = sheetsFormula.replace(
    'type=text&data=',
    'type=payment&bank=VCB&account=123456789&amount=100000&content=',
  )

  return (
    <div className="mx-auto max-w-4xl overflow-hidden p-4 md:p-8">
      <div className="mb-4">
        <AutoBreadcrumbs routes={toolsRoutes} />
      </div>

      <div className="mb-10 text-center">
        <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl">
          <HelpCircle size={28} />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          QR Integration Guide
        </h1>
        <p className="text-muted-foreground mt-4 text-base md:text-lg">
          Learn how to embed dynamic QR codes into your spreadsheets, websites,
          and external apps.
        </p>
      </div>

      <div className="grid gap-8">
        {/* 1. Developer API Reference */}
        <section className="bg-card overflow-hidden rounded-2xl border p-5 shadow-sm md:p-8">
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
                <Info size={18} className="text-primary" /> Endpoint
              </h3>
              <div className="bg-muted overflow-x-auto rounded-lg border p-3">
                <p className="font-mono text-xs whitespace-nowrap">
                  GET https://tuitenpho-tool.vercel.app/api/qrcode
                </p>
              </div>
            </div>

            {/* Detailed Parameters Table - MOVED UP */}
            <div>
              <h3 className="mb-3 text-sm font-bold">Query Parameters</h3>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full min-w-[600px] text-left text-xs">
                  <thead className="bg-muted">
                    <tr>
                      <th className="w-[120px] px-4 py-3 font-bold">
                        Parameter
                      </th>
                      <th className="w-[80px] px-4 py-3 font-bold">Type</th>
                      <th className="px-4 py-3 font-bold">
                        Description & Usage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="bg-primary/5">
                      <td className="text-primary px-4 py-3 font-mono font-bold">
                        type
                      </td>
                      <td className="px-4 py-3 font-mono">enum</td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <p>Determines the QR content format. Options:</p>
                          <div className="flex flex-wrap gap-1">
                            {['payment', 'wifi', 'url', 'vcard', 'text'].map(
                              (t) => (
                                <span
                                  key={t}
                                  className="bg-background rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase"
                                >
                                  {t}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* URL-Specific */}
                    <tr>
                      <td className="text-primary px-4 py-3 font-mono font-semibold">
                        weburl
                      </td>
                      <td className="px-4 py-3 font-mono">string</td>
                      <td className="px-4 py-3">
                        <span className="mr-2 rounded bg-slate-100 px-1 text-[10px] font-bold uppercase dark:bg-slate-800">
                          For URL
                        </span>
                        The absolute website URL (e.g., https://google.com).
                      </td>
                    </tr>
                    {/* Payment-Specific */}
                    <tr>
                      <td className="text-primary px-4 py-3 font-mono font-semibold">
                        bank, account, amount, content
                      </td>
                      <td className="px-4 py-3 font-mono">mixed</td>
                      <td className="px-4 py-3">
                        <span className="mr-2 rounded bg-slate-100 px-1 text-[10px] font-bold uppercase dark:bg-slate-800">
                          For Payment
                        </span>
                        <ul className="mt-1 list-inside list-disc space-y-0.5">
                          <li>
                            `bank`: Bank Bin or ShortName (e.g. VCB, MB, TCB).
                          </li>
                          <li>`account`: Bank account number.</li>
                          <li>`amount`: (Optional) Amount in VND.</li>
                          <li>`content`: (Optional) Transfer message.</li>
                        </ul>
                      </td>
                    </tr>
                    {/* WiFi-Specific */}
                    <tr>
                      <td className="text-primary px-4 py-3 font-mono font-semibold">
                        ssid, password, encryption, hidden
                      </td>
                      <td className="px-4 py-3 font-mono">mixed</td>
                      <td className="px-4 py-3">
                        <span className="mr-2 rounded bg-slate-100 px-1 text-[10px] font-bold uppercase dark:bg-slate-800">
                          For WiFi
                        </span>
                        <ul className="mt-1 list-inside list-disc space-y-0.5">
                          <li>`ssid`: Network name.</li>
                          <li>`encryption`: WPA (default), WEP, or nopass.</li>
                          <li>`hidden`: 1 (true) or 0 (false).</li>
                        </ul>
                      </td>
                    </tr>
                    {/* VCard/Custom */}
                    <tr>
                      <td className="text-primary px-4 py-3 font-mono font-semibold">
                        Custom Keys
                      </td>
                      <td className="px-4 py-3 font-mono">string</td>
                      <td className="px-4 py-3">
                        <span className="mr-2 rounded bg-slate-100 px-1 text-[10px] font-bold uppercase dark:bg-slate-800">
                          For VCard
                        </span>
                        Use standard VCard keys (FN, TEL, EMAIL, etc). <br />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive Appearance & Settings - MOVED DOWN */}
            <div className="bg-muted/10 rounded-xl border p-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
                <Layout size={18} className="text-purple-500" /> Appearance &
                Settings
              </h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Adjust the appearance parameters below. These will be added to
                your API request to customize the generated QR code.
              </p>
              <QRAppearanceForm
                appearance={{
                  size,
                  setSize,
                  fgColor: dark,
                  setFgColor: setDark,
                  bgColor: light,
                  setBgColor: setLight,
                  level,
                  setLevel,
                }}
                className="text-muted-foreground mb-6 text-sm"
              />

              {/* Defaults Table */}
              <div className="mb-6 overflow-x-auto">
                <table className="bg-background/50 w-full rounded-lg border text-left text-[11px]">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-3 py-2 font-bold">Parameter</th>
                      <th className="px-3 py-2 font-bold">Default Value</th>
                      <th className="px-3 py-2 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-3 py-2 font-mono">size</td>
                      <td className="px-3 py-2 font-mono">256</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        Image size in pixels (W x H)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-mono">dark</td>
                      <td className="px-3 py-2 font-mono">#000000</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        Hex code for the QR dots/foreground
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-mono">light</td>
                      <td className="px-3 py-2 font-mono">#ffffff</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        Hex code for the background
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-mono">level</td>
                      <td className="px-3 py-2 font-mono">M</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        ECC Level: L (7%), M (15%), Q (25%), H (30%)
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-muted-foreground mt-2 px-1 text-[10px] italic">
                  * If a parameter is not included in the API request, these
                  default values will be used.
                </p>
              </div>

              <div className="space-y-6">
                <EmbedSection
                  title="Direct API Usage (Payment Example)"
                  content={paymentApiUrl}
                  onToast={showToast}
                />

                <div>
                  <div className="mt-4 rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold text-green-600 dark:text-green-400">
                      <Sheet size={14} /> How to use in Google Sheets
                    </h4>
                    <ul className="text-muted-foreground list-inside list-decimal space-y-2 text-[11px]">
                      <li>Copy the formula above.</li>
                      <li>Paste it into any cell in your spreadsheet.</li>
                      <li>
                        To make it dynamic, replace the values with cell
                        references. For example:
                        <code className="bg-muted mt-1 block overflow-x-auto rounded p-2 font-mono text-[10px] whitespace-nowrap">
                          =IMAGE("https://.../api/qrcode?type=payment&bank=VCB&account="
                          & A2 & "&amount=" & B2)
                        </code>
                      </li>
                      <li>
                        The QR code will automatically update whenever the data
                        in referenced cells change.
                      </li>
                    </ul>
                  </div>
                  <EmbedSection
                    className="mt-4"
                    title="Google Sheets Formula"
                    content={paymentSheetsFormula}
                    onToast={showToast}
                  />
                </div>
              </div>
            </div>

            <div className="border-primary/20 rounded-2xl border border-dashed bg-slate-50 p-4 md:p-6 dark:bg-slate-900">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
                <Info size={18} className="text-primary" /> Supported Bank Short
                Names
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'VCB',
                  'MB',
                  'TCB',
                  'CTG',
                  'BIDV',
                  'AGR',
                  'TPB',
                  'VPB',
                  'OCB',
                  'STB',
                  'ACB',
                  'ABB',
                  'HDB',
                  'VIB',
                  'SCB',
                  'SEAB',
                  'NAB',
                  'EIB',
                  'SHB',
                  'VAB',
                ].map((b) => (
                  <span
                    key={b}
                    className="bg-background text-primary rounded-md border px-2 py-1 font-mono text-[10px] font-bold"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground mt-3 text-[10px] italic">
                * Case-insensitive.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-6 text-center">
          <Link
            href="/tools/free/qrcode"
            className="text-primary inline-flex items-center gap-2 font-bold hover:underline"
          >
            Back to QR Generator <ExternalLink size={16} />
          </Link>
        </div>
      </div>

      <Toast
        visible={toast.visible}
        message={toast.message}
        onClose={hideToast}
      />
    </div>
  )
}
