import {
  CustomField,
  PaymentData,
  WiFiData,
  generatePaymentString,
  generateVCardString,
  generateWifiString,
} from '@/lib/qrcode-utils'
import { BANKS } from '@/lib/vietqr'
import {
  CreditCard as IconCreditCard,
  Link as IconLink,
  Plus as IconPlus,
  Trash as IconTrash,
  User as IconUser,
  Wifi as IconWifi,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import DynamicTabs, { TabItem } from '../../DynamicTabs'
import { Field, Input, Label, Select } from '../../Form'

/** Type representing the available QR code categories */
export type QRType = 'url' | 'wifi' | 'vcard' | 'payment'

/** Configuration constants for the QR Tabs interface */
const TABS_CONFIG = {
  /** Predefined keys for the VCard dropdown */
  PREDEFINED_KEYS: [
    { value: 'FN', label: 'Full Name' },
    { value: 'TEL', label: 'Phone' },
    { value: 'EMAIL', label: 'Email' },
    { value: 'URL', label: 'Website' },
    { value: 'ADR', label: 'Address' },
    { value: 'ORG', label: 'Company' },
    { value: 'TITLE', label: 'Job Title' },
    { value: 'NOTE', label: 'Note' },
    { value: 'RAW', label: 'Raw Text (data)' },
  ],
  /** Initial state for WiFi settings */
  DEFAULT_WIFI: {
    ssid: '',
    password: '',
    encryption: 'WPA' as const,
    hidden: false,
  },
  /** Initial state for Payment settings */
  DEFAULT_PAYMENT: (firstBankBin: string) => ({
    bankBin: firstBankBin,
    account: '',
    name: '',
    amount: '',
    content: '',
  }),
  /** Initial fields for VCard */
  INITIAL_VCARD_FIELDS: [
    { id: '1', key: 'FN', value: '', label: 'Full Name' },
    { id: '2', key: 'TEL', value: '', label: 'Phone' },
  ],
}

/** Component properties */
interface QRCodeTabsProps {
  /** Callback triggered whenever the generated QR code or its metadata changes */
  onCodeChange: (
    code: string,
    type: QRType,
    displayText?: string,
    rawData?:
      | { url: string }
      | WiFiData
      | { fields: TabCustomField[] }
      | PaymentData
      | null,
  ) => void
}

/** Internal UI state for VCard fields */
interface TabCustomField extends CustomField {
  id: string
  label: string
}

/**
 * Generates a human-friendly display string for WiFi credentials
 */
const generateWifiDisplay = (data: WiFiData): string => {
  if (!data.ssid) return ''
  return `Network: ${data.ssid}\nPassword: ${data.password}`
}

/**
 * Generates a human-friendly display string for VCard fields
 */
const generateVCardDisplay = (fields: CustomField[]): string => {
  return fields
    .filter((f) => f.value.trim())
    .map((f) => `${f.label || f.key}: ${f.value}`)
    .join('\n')
}

/**
 * Generates a human-friendly display string for Payment details
 */
const generatePaymentDisplay = (data: PaymentData): string => {
  const parts = []
  const bank = BANKS.find((b) => b.bin === data.bankBin)
  if (bank) parts.push(`Bank: ${bank.shortName} (${bank.name})`)
  if (data.account) parts.push(`Account: ${data.account}`)
  if (data.name) parts.push(`Name: ${data.name}`)
  if (data.amount) parts.push(`Amount: ${data.amount}`)
  if (data.content) parts.push(`Content: ${data.content}`)
  return parts.join('\n')
}

/**
 * Main Tabs component for the QR Code Generator.
 * Handles the different input forms (URL, WiFi, VCard, Payment) and orchestrates code generation.
 */
export default function QRCodeTabs({ onCodeChange }: QRCodeTabsProps) {
  const [activeTab, setActiveTab] = useState<QRType>('url')
  const [urlValue, setUrlValue] = useState('')
  const [wifiData, setWifiData] = useState<WiFiData>(TABS_CONFIG.DEFAULT_WIFI)
  const [paymentData, setPaymentData] = useState<PaymentData>(
    TABS_CONFIG.DEFAULT_PAYMENT(BANKS[0].bin),
  )
  const [customFields, setCustomFields] = useState<TabCustomField[]>(
    TABS_CONFIG.INITIAL_VCARD_FIELDS,
  )

  // Synchronize generated code with parent whenever any input state changes
  useEffect(() => {
    let result = ''
    let display = ''
    let rawData:
      | { url: string }
      | WiFiData
      | { fields: TabCustomField[] }
      | PaymentData
      | null = null
    switch (activeTab) {
      case 'url':
        result = urlValue
        display = urlValue
        rawData = { url: urlValue }
        break
      case 'wifi':
        result = generateWifiString(wifiData)
        display = generateWifiDisplay(wifiData)
        rawData = wifiData
        break
      case 'vcard':
        result = generateVCardString(customFields)
        display = generateVCardDisplay(customFields)
        rawData = { fields: customFields }
        break
      case 'payment':
        result = generatePaymentString(paymentData)
        display = generatePaymentDisplay(paymentData)
        rawData = paymentData
        break
    }
    onCodeChange(result, activeTab, display, rawData)
  }, [activeTab, urlValue, wifiData, customFields, paymentData, onCodeChange])

  /** Adds a new empty 'Note' field to the VCard list */
  const addCustomField = useCallback(() => {
    setCustomFields((prev) => [
      ...prev,
      { id: Date.now().toString(), key: 'NOTE', value: '', label: 'Note' },
    ])
  }, [])

  /** Removes a specific VCard field by its unique ID */
  const removeCustomField = useCallback((id: string) => {
    setCustomFields((prev) => prev.filter((f) => f.id !== id))
  }, [])

  /** Updates a specific property of a VCard field */
  const updateCustomField = useCallback(
    (id: string, field: keyof TabCustomField, newValue: string) => {
      setCustomFields((fields) =>
        fields.map((f) => {
          if (f.id !== id) return f
          if (field === 'key') {
            const predefined = TABS_CONFIG.PREDEFINED_KEYS.find(
              (k) => k.value === newValue,
            )
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

  /** Renders the specific input form for the active category */
  const renderContent = () => {
    switch (activeTab) {
      case 'url':
        return (
          <Field label="Website URL">
            <Input
              placeholder="https://example.com"
              value={urlValue}
              onChange={(e) => setUrlValue(e.currentTarget.value)}
            />
          </Field>
        )
      case 'wifi':
        return (
          <div className="space-y-4">
            <Field label="SSID (Network Name)">
              <Input
                placeholder="My Wifi"
                value={wifiData.ssid}
                onChange={(e) =>
                  setWifiData({ ...wifiData, ssid: e.currentTarget.value })
                }
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                placeholder="Password"
                value={wifiData.password}
                onChange={(e) =>
                  setWifiData({ ...wifiData, password: e.currentTarget.value })
                }
              />
            </Field>
            <div className="flex gap-4">
              <Field label="Encryption" className="flex-1">
                <Select
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
                </Select>
              </Field>
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
                <Label htmlFor="hidden-wifi" className="cursor-pointer">
                  Hidden Network
                </Label>
              </div>
            </div>
          </div>
        )
      case 'vcard':
        return (
          <div className="space-y-3">
            <p className="text-muted-foreground mb-2 text-sm italic">
              Create a contact card (VCard).
            </p>
            {customFields.map((field, index) => {
              return (
                <div key={field.id} className="flex items-end gap-2">
                  <div className="w-[140px]">
                    {index === 0 && <Label variant="small">Key</Label>}
                    <Select
                      className="h-9"
                      value={field.key}
                      onChange={(e) =>
                        updateCustomField(field.id, 'key', e.target.value)
                      }
                    >
                      {TABS_CONFIG.PREDEFINED_KEYS.map((k) => (
                        <option key={k.value} value={k.value}>
                          {k.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex-1">
                    {index === 0 && <Label variant="small">Content</Label>}
                    <Input
                      className="h-9"
                      placeholder="Enter value"
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
              )
            })}
            <button
              className="border-input hover:bg-muted mt-2 flex w-full items-center justify-center gap-2 rounded-md border py-2 text-sm font-medium transition-colors"
              onClick={addCustomField}
            >
              <IconPlus size={16} /> Add Field
            </button>
          </div>
        )
      case 'payment':
        return (
          <div className="space-y-4">
            <Field label="Bank">
              <Select
                value={paymentData.bankBin}
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    bankBin: e.currentTarget.value,
                  })
                }
              >
                {BANKS.map((bank) => (
                  <option key={bank.bin} value={bank.bin}>
                    {bank.shortName} - {bank.name}
                  </option>
                ))}
              </Select>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Account No.">
                <Input
                  placeholder="0123456789"
                  value={paymentData.account}
                  onChange={(e) =>
                    setPaymentData({
                      ...paymentData,
                      account: e.currentTarget.value,
                    })
                  }
                />
              </Field>
              <Field label="Amount (Optional)">
                <Input
                  placeholder="50000"
                  value={paymentData.amount}
                  onChange={(e) =>
                    setPaymentData({
                      ...paymentData,
                      amount: e.currentTarget.value,
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Account Name">
              <Input
                placeholder="JOHN DOE"
                value={paymentData.name}
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    name: e.currentTarget.value,
                  })
                }
              />
            </Field>
            <Field label="Message (Content)">
              <Input
                placeholder="Payment for..."
                value={paymentData.content}
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    content: e.currentTarget.value,
                  })
                }
              />
            </Field>
          </div>
        )
      default:
        return null
    }
  }

  // Static definition of available tabs
  const tabItems: TabItem[] = useMemo(
    () => [
      {
        value: 'url',
        label: 'URL',
        icon: <IconLink size={16} />,
        content: null,
      },
      {
        value: 'wifi',
        label: 'WiFi',
        icon: <IconWifi size={16} />,
        content: null,
      },
      {
        value: 'vcard',
        label: 'VCard',
        icon: <IconUser size={16} />,
        content: null,
      },
      {
        value: 'payment',
        label: 'Transfer',
        icon: <IconCreditCard size={16} />,
        content: null,
      },
    ],
    [],
  )

  return (
    <>
      <DynamicTabs
        items={tabItems}
        defaultValue="url"
        onChange={(value: string) => setActiveTab(value as QRType)}
      />
      <div className="mt-4">{renderContent()}</div>
    </>
  )
}
