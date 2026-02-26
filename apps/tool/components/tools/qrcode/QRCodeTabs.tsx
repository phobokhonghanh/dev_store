import { useLocale } from '@/lib/hooks/useLocale'
import { getAppDict } from '@/lib/i18n'
import { QR_TAB_REGISTRY } from '@/lib/qr/tabs/registry'
import { detectPlatform } from '@/lib/social-platforms'
import { useCallback, useEffect, useMemo, useState } from 'react'
import DynamicTabs, { TabItem } from '@/components/ui/DynamicTabs'
import type { QRType } from '@/lib/qr/types'
import type { SupportedLocale } from '@/lib/config'

/** Type representing the available QR code categories */
export type { QRType }

/** Component properties */
interface QRCodeTabsProps {
  /** Callback triggered whenever the generated QR code or its metadata changes */
  onCodeChange: (
    code: string,
    type: QRType,
    displayText?: string,
    rawData?: any
  ) => void
  /** Current error correction level for capacity limits */
  level?: 'L' | 'M' | 'Q' | 'H'
  /** Controlled active tab */
  activeTab?: QRType
  /** Callback for tab change */
  onTabChange?: (tab: QRType) => void
  /** Locale for i18n */
  locale?: SupportedLocale
  /** Callback for auto-detected logo URL */
  onDetectLogo?: (url: string) => void
}

/**
 * Main Tabs component for the QR Code Generator.
 * Uses a Registry Pattern for easy extensibility.
 */
export function QRCodeTabs({
  onCodeChange,
  level = 'M',
  activeTab: controlledTab,
  onTabChange,
  onDetectLogo
}: QRCodeTabsProps) {
  const { locale } = useLocale()
  const dict = useMemo(() => getAppDict(locale), [locale])

  const [internalTab, setInternalTab] = useState<QRType>('url')
  const activeTab = controlledTab || internalTab

  const handleTabChange = useCallback((val: QRType) => {
    if (onTabChange) {
      onTabChange(val)
    } else {
      setInternalTab(val)
    }
  }, [onTabChange])

  // Consolidate all tab data into a single state object initialized from registry
  const [tabsData, setTabsData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {}
    QR_TAB_REGISTRY.forEach(tab => {
      initial[tab.id] = tab.getInitialData()
    })
    return initial
  })

  const updateTabData = useCallback((id: string, data: any) => {
    setTabsData(prev => ({ ...prev, [id]: data }))
  }, [])

  // Synchronize generated code with parent whenever any input state changes
  useEffect(() => {
    const config = QR_TAB_REGISTRY.find(t => t.id === activeTab)
    if (!config) return

    const data = tabsData[activeTab]
    const result = config.generateString(data)
    const display = config.generateDisplay(data)

    // Transform rawData for URL tab (special case for platform detection)
    let rawData = data
    if (activeTab === 'url') {
      rawData = { url: data, platform: detectPlatform(data) }
    }

    onCodeChange(result, activeTab, display, rawData)
  }, [activeTab, tabsData, onCodeChange])

  const tabItems: TabItem[] = useMemo(
    () => QR_TAB_REGISTRY.map(tab => ({
      value: tab.id,
      label: (dict.qrTabs as any)[tab.labelKey],
      icon: <tab.icon size={16} />,
      content: null,
    })),
    [dict]
  )

  const activeConfig = useMemo(
    () => QR_TAB_REGISTRY.find(t => t.id === activeTab),
    [activeTab]
  )

  return (
    <>
      <DynamicTabs
        items={tabItems}
        defaultValue="url"
        value={activeTab}
        onChange={(value: string) => handleTabChange(value as QRType)}
      />
      <div className="mt-4">
        {activeConfig && (
          <activeConfig.Form
            data={tabsData[activeTab]}
            onChange={(data) => updateTabData(activeTab, data)}
            locale={locale}
            level={level}
            {...(activeTab === 'url' ? { onDetectLogo } : {})}
          />
        )}
      </div>
    </>
  )
}
