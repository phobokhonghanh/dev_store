import {
  Link as IconLink,
  Plus as IconPlus,
  Trash as IconTrash,
  Type as IconTypography,
  User as IconUser,
  Wifi as IconWifi,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import DynamicTabs, { TabItem } from '../../layout/tab/DynamicTabs'

export type QRType = 'text' | 'url' | 'wifi' | 'custom'

interface QRCodeTabsProps {
  onCodeChange: (code: string, type: QRType) => void
}

interface WiFiData {
  ssid: string
  password: string
  encryption: 'WPA' | 'WEP' | 'nopass'
  hidden: boolean
}

interface CustomField {
  id: string
  key: string
  value: string
  label: string
}

const PREDEFINED_KEYS = [
  { value: 'FN', label: 'Full Name' },
  { value: 'TEL', label: 'Phone' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'URL', label: 'Website' },
  { value: 'ADR', label: 'Address' },
  { value: 'ORG', label: 'Company' },
  { value: 'TITLE', label: 'Job Title' },
  { value: 'NOTE', label: 'Note' },
]

const generateWifiString = (data: WiFiData): string => {
  if (!data.ssid) return ''
  return `WIFI:T:${data.encryption};S:${data.ssid};P:${data.password};H:${data.hidden};;`
}

const generateVCardString = (fields: CustomField[]): string => {
  if (fields.length === 0) return ''
  let vcard = 'BEGIN:VCARD\nVERSION:4.0\n'
  fields.forEach((field) => {
    if (field.value.trim()) {
      vcard += `${field.key}:${field.value}\n`
    }
  })
  vcard += 'END:VCARD'
  return vcard
}

export default function QRCodeTabs({ onCodeChange }: QRCodeTabsProps) {
  const [activeTab, setActiveTab] = useState<QRType>('url')
  const [textValue, setTextValue] = useState('')
  const [urlValue, setUrlValue] = useState('')
  const [wifiData, setWifiData] = useState<WiFiData>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  })
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: '1', key: 'FN', value: '', label: 'Full Name' },
    { id: '2', key: 'TEL', value: '', label: 'Phone' },
  ])

  useEffect(() => {
    let result = ''
    switch (activeTab) {
      case 'url':
        result = urlValue
        break
      case 'wifi':
        result = generateWifiString(wifiData)
        break
      case 'custom':
        result = generateVCardString(customFields)
        break
      case 'text':
      default:
        result = textValue
        break
    }
    onCodeChange(result, activeTab)
  }, [activeTab, urlValue, wifiData, customFields, textValue, onCodeChange])

  const addCustomField = useCallback(() => {
    setCustomFields((prev) => [
      ...prev,
      { id: Date.now().toString(), key: 'NOTE', value: '', label: 'Note' },
    ])
  }, [])

  const removeCustomField = useCallback((id: string) => {
    setCustomFields((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const updateCustomField = useCallback(
    (id: string, field: keyof CustomField, newValue: string) => {
      setCustomFields((fields) =>
        fields.map((f) => {
          if (f.id !== id) return f
          if (field === 'key') {
            const predefined = PREDEFINED_KEYS.find((k) => k.value === newValue)
            return {
              ...f,
              key: newValue,
              label: predefined ? predefined.label : newValue,
            }
          }
          return { ...f, [field]: newValue }
        }),
      )
    },
    [],
  )

  const tabItems: TabItem[] = useMemo(
    () => [
      {
        value: 'url',
        label: 'URL',
        icon: <IconLink size={16} />,
        content: (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Website URL</label>
            <input
              className="border-input bg-background ring-offset-colorm focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              placeholder="https://example.com"
              value={urlValue}
              onChange={(e) => setUrlValue(e.currentTarget.value)}
            />
          </div>
        ),
      },
      {
        value: 'wifi',
        label: 'WiFi',
        icon: <IconWifi size={16} />,
        content: (
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">SSID (Network Name)</label>
              <input
                className="border-input bg-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                placeholder="My Wifi"
                value={wifiData.ssid}
                onChange={(e) =>
                  setWifiData({ ...wifiData, ssid: e.currentTarget.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="border-input bg-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                placeholder="Password"
                value={wifiData.password}
                onChange={(e) =>
                  setWifiData({ ...wifiData, password: e.currentTarget.value })
                }
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-1">
                <label className="text-sm font-medium">Encryption</label>
                <select
                  className="border-input bg-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                  value={wifiData.encryption}
                  onChange={(e) =>
                    setWifiData({
                      ...wifiData,
                      encryption: e.target.value as 'WPA' | 'WEP' | 'nopass',
                    })
                  }
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">No Password</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="hidden-wifi"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={wifiData.hidden}
                  onChange={(e) =>
                    setWifiData({
                      ...wifiData,
                      hidden: e.currentTarget.checked,
                    })
                  }
                />
                <label
                  htmlFor="hidden-wifi"
                  className="cursor-pointer text-sm font-medium"
                >
                  Hidden Network
                </label>
              </div>
            </div>
          </div>
        ),
      },
      {
        value: 'custom',
        label: 'VCard',
        icon: <IconUser size={16} />,
        content: (
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">
              Create a contact card (VCard).
            </p>
            {customFields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-2">
                <div className="w-[140px]">
                  {index === 0 && (
                    <label className="mb-1 block text-xs font-medium">
                      Type
                    </label>
                  )}
                  <select
                    className="border-input bg-background focus-visible:ring-ring flex h-9 w-full rounded-md border px-2 py-1 text-sm focus-visible:ring-2 focus-visible:outline-none"
                    value={
                      PREDEFINED_KEYS.find((k) => k.value === field.key)
                        ? field.key
                        : 'CUSTOM'
                    }
                    onChange={(e) => {
                      const val = e.target.value
                      if (val === 'CUSTOM')
                        updateCustomField(field.id, 'key', 'X-CUSTOM')
                      else if (val) updateCustomField(field.id, 'key', val)
                    }}
                  >
                    {PREDEFINED_KEYS.map((k) => (
                      <option key={k.value} value={k.value}>
                        {k.label}
                      </option>
                    ))}
                    <option value="CUSTOM">Custom</option>
                  </select>
                </div>
                {field.key === 'X-CUSTOM' && (
                  <div className="w-[100px]">
                    {index === 0 && (
                      <label className="mb-1 block text-xs font-medium">
                        Key
                      </label>
                    )}
                    <input
                      className="border-input bg-background flex h-9 w-full rounded-md border px-2 py-1 text-sm"
                      placeholder="KEY"
                      onChange={(e) =>
                        updateCustomField(
                          field.id,
                          'key',
                          e.currentTarget.value,
                        )
                      }
                    />
                  </div>
                )}
                <div className="flex-1">
                  {index === 0 && (
                    <label className="mb-1 block text-xs font-medium">
                      Content
                    </label>
                  )}
                  <input
                    className="border-input bg-background flex h-9 w-full rounded-md border px-2 py-1 text-sm"
                    placeholder={`Enter ${field.label}`}
                    value={field.value}
                    onChange={(e) =>
                      updateCustomField(
                        field.id,
                        'value',
                        e.currentTarget.value,
                      )
                    }
                  />
                </div>
                <button
                  onClick={() => removeCustomField(field.id)}
                  disabled={customFields.length <= 1}
                  className="mb-1 rounded p-2 text-red-500 hover:bg-red-50"
                  title="Remove field"
                >
                  <IconTrash size={16} />
                </button>
              </div>
            ))}
            <button
              className="border-input hover:bg-muted mt-2 flex w-full items-center justify-center gap-2 rounded-md border py-2 text-sm font-medium transition-colors"
              onClick={addCustomField}
            >
              <IconPlus size={16} /> Add Field
            </button>
          </div>
        ),
      },
      {
        value: 'text',
        label: 'Text',
        icon: <IconTypography size={16} />,
        content: (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Text Content</label>
            <input
              className="border-input bg-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
              placeholder="Enter text..."
              value={textValue}
              onChange={(e) => setTextValue(e.currentTarget.value)}
            />
          </div>
        ),
      },
    ],
    [
      urlValue,
      wifiData,
      customFields,
      textValue,
      addCustomField,
      removeCustomField,
      updateCustomField,
    ],
  )

  return (
    <DynamicTabs
      items={tabItems}
      defaultValue="url"
      onChange={(value: string) => setActiveTab(value as QRType)}
    />
  )
}
