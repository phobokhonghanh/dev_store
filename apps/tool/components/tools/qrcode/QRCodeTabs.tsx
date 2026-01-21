import {
  AppStoreData,
  CustomField,
  EmailData,
  EventData,
  generateEmailString,
  generateEventString,
  generateLocationString,
  generatePaymentString,
  generateSmsString,
  generateVCardString,
  generateWifiString,
  LocationData,
  PaymentData,
  SmsData,
  WiFiData,
} from '@/lib/qrcode-utils'
import { detectPlatform, SocialPlatform } from '@/lib/social-platforms'
import { BANKS } from '@/lib/vietqr'
import {
  Calendar as IconCalendar,
  CreditCard as IconCreditCard,
  Link as IconLink,
  Mail as IconMail,
  MapPin as IconMapPin,
  Plus as IconPlus,
  Search as IconSearch,
  MessageSquare as IconSms,
  Trash as IconTrash,
  User as IconUser,
  Wifi as IconWifi,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import DynamicTabs, { TabItem } from '../../DynamicTabs'
import { Field, Input, Label, Select } from '../../Form'

/** Type representing the available QR code categories */
export type QRType =
  | 'url'
  | 'wifi'
  | 'vcard'
  | 'payment'
  | 'event'
  | 'email'
  | 'sms'
  | 'location'
  | 'appstore'

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
  DEFAULT_EVENT: {
    title: '',
    startDate: new Date().toISOString().slice(0, 16),
    endDate: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
    location: '',
    description: '',
  },
  DEFAULT_EMAIL: {
    email: '',
    subject: '',
    body: '',
  },
  DEFAULT_SMS: {
    phone: '',
    message: '',
  },
  DEFAULT_LOCATION: {
    lat: '',
    lng: '',
  },
  DEFAULT_APPSTORE: {
    iosUrl: '',
    androidUrl: '',
  },
}

/** Component properties */
interface QRCodeTabsProps {
  /** Callback triggered whenever the generated QR code or its metadata changes */
  onCodeChange: (
    code: string,
    type: QRType,
    displayText?: string,
    rawData?:
      | { url: string; platform: SocialPlatform | null }
      | WiFiData
      | { fields: TabCustomField[] }
      | PaymentData
      | EventData
      | EmailData
      | SmsData
      | LocationData
      | AppStoreData
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

const generateEventDisplay = (data: EventData): string => {
  if (!data.title) return ''
  return `Event: ${data.title}\nDate: ${data.startDate}\nLocation: ${data.location}`
}

const generateEmailDisplay = (data: EmailData): string => {
  if (!data.email) return ''
  return `Email: ${data.email}\nSubject: ${data.subject}`
}

const generateSmsDisplay = (data: SmsData): string => {
  if (!data.phone) return ''
  return `SMS: ${data.phone}\nMessage: ${data.message}`
}

const generateLocationDisplay = (data: LocationData): string => {
  if (!data.lat || !data.lng) return ''
  return `Location: ${data.lat}, ${data.lng}`
}

const generateAppStoreDisplay = (data: AppStoreData): string => {
  if (!data.iosUrl && !data.androidUrl) return ''
  return `iOS: ${data.iosUrl}\nAndroid: ${data.androidUrl}`
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
  const [eventData, setEventData] = useState<EventData>(
    TABS_CONFIG.DEFAULT_EVENT,
  )
  const [emailData, setEmailData] = useState<EmailData>(
    TABS_CONFIG.DEFAULT_EMAIL,
  )
  const [smsData, setSmsData] = useState<SmsData>(TABS_CONFIG.DEFAULT_SMS)
  const [locationData, setLocationData] = useState<LocationData>(
    TABS_CONFIG.DEFAULT_LOCATION,
  )
  const [appStoreData, setAppStoreData] = useState<AppStoreData>(
    TABS_CONFIG.DEFAULT_APPSTORE,
  )
  const [isSearchingLocation, setIsSearchingLocation] = useState(false)

  // Synchronize generated code with parent whenever any input state changes
  useEffect(() => {
    let result = ''
    let display = ''
    let rawData:
      | { url: string; platform: SocialPlatform | null }
      | WiFiData
      | { fields: TabCustomField[] }
      | PaymentData
      | EventData
      | EmailData
      | SmsData
      | LocationData
      | AppStoreData
      | null = null
    switch (activeTab) {
      case 'url':
        result = urlValue
        display = urlValue
        rawData = { url: urlValue, platform: detectPlatform(urlValue) }
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
      case 'event':
        result = generateEventString(eventData)
        display = generateEventDisplay(eventData)
        rawData = eventData
        break
      case 'email':
        result = generateEmailString(emailData)
        display = generateEmailDisplay(emailData)
        rawData = emailData
        break
      case 'sms':
        result = generateSmsString(smsData)
        display = generateSmsDisplay(smsData)
        rawData = smsData
        break
      case 'location':
        result = generateLocationString(locationData)
        display = generateLocationDisplay(locationData)
        rawData = locationData
        break
      case 'appstore':
        // For appstore, we use a simple format or we can use the iOS one as default
        // Standard is often to have a middleman URL, but we'll use iOS one for encoding
        result = appStoreData.iosUrl || appStoreData.androidUrl
        display = generateAppStoreDisplay(appStoreData)
        rawData = appStoreData
        break
    }
    onCodeChange(result, activeTab, display, rawData)
  }, [
    activeTab,
    urlValue,
    wifiData,
    customFields,
    paymentData,
    eventData,
    emailData,
    smsData,
    locationData,
    appStoreData,
    onCodeChange,
  ])

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
      case 'event':
        return (
          <div className="space-y-4">
            <Field label="Event Title">
              <Input
                placeholder="Birthday Party"
                value={eventData.title}
                onChange={(e) =>
                  setEventData({ ...eventData, title: e.currentTarget.value })
                }
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Start Date">
                <Input
                  type="datetime-local"
                  value={eventData.startDate}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      startDate: e.currentTarget.value,
                    })
                  }
                />
              </Field>
              <Field label="End Date">
                <Input
                  type="datetime-local"
                  value={eventData.endDate}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      endDate: e.currentTarget.value,
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Location">
              <Input
                placeholder="123 Party Lane"
                value={eventData.location}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    location: e.currentTarget.value,
                  })
                }
              />
            </Field>
            <Field label="Description">
              <Input
                placeholder="Join us for fun!"
                value={eventData.description}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    description: e.currentTarget.value,
                  })
                }
              />
            </Field>
          </div>
        )
      case 'email':
        return (
          <div className="space-y-4">
            <Field label="Email Address">
              <Input
                placeholder="example@mail.com"
                value={emailData.email}
                onChange={(e) =>
                  setEmailData({ ...emailData, email: e.currentTarget.value })
                }
              />
            </Field>
            <Field label="Subject">
              <Input
                placeholder="Inquiry"
                value={emailData.subject}
                onChange={(e) =>
                  setEmailData({ ...emailData, subject: e.currentTarget.value })
                }
              />
            </Field>
            <Field label="Body">
              <Input
                placeholder="Hello..."
                value={emailData.body}
                onChange={(e) =>
                  setEmailData({ ...emailData, body: e.currentTarget.value })
                }
              />
            </Field>
          </div>
        )
      case 'sms':
        return (
          <div className="space-y-4">
            <Field label="Phone Number">
              <Input
                placeholder="+84 123 456 789"
                value={smsData.phone}
                onChange={(e) =>
                  setSmsData({ ...smsData, phone: e.currentTarget.value })
                }
              />
            </Field>
            <Field label="Message">
              <Input
                placeholder="Hi there!"
                value={smsData.message}
                onChange={(e) =>
                  setSmsData({ ...smsData, message: e.currentTarget.value })
                }
              />
            </Field>
          </div>
        )
      case 'location':
        return (
          <div className="space-y-4">
            <div className="relative">
              <Field label="Search Address">
                <div className="relative">
                  <Input
                    placeholder="Search for address (e.g. Hoan Kiem Lake)"
                    onKeyDown={async (e) => {
                      if (e.key === 'Enter') {
                        const q = e.currentTarget.value
                        if (!q) return
                        setIsSearchingLocation(true)
                        try {
                          const res = await fetch(
                            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`,
                          )
                          const data = await res.json()
                          if (data && data[0]) {
                            setLocationData({
                              lat: data[0].lat,
                              lng: data[0].lon,
                            })
                          }
                        } finally {
                          setIsSearchingLocation(false)
                        }
                      }
                    }}
                  />
                  <div className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2">
                    {isSearchingLocation ? (
                      <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                    ) : (
                      <IconSearch size={16} />
                    )}
                  </div>
                </div>
              </Field>
              <p className="text-muted-foreground mt-1 text-[10px] italic">
                Press Enter to search via OpenStreetMap
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Latitude">
                <Input
                  placeholder="10.762622"
                  value={locationData.lat}
                  onChange={(e) =>
                    setLocationData({
                      ...locationData,
                      lat: e.currentTarget.value,
                    })
                  }
                />
              </Field>
              <Field label="Longitude">
                <Input
                  placeholder="106.660172"
                  value={locationData.lng}
                  onChange={(e) =>
                    setLocationData({
                      ...locationData,
                      lng: e.currentTarget.value,
                    })
                  }
                />
              </Field>
            </div>
          </div>
        )
      case 'appstore':
        return (
          <div className="space-y-4">
            <Field label="iOS App Store URL">
              <Input
                placeholder="https://apps.apple.com/..."
                value={appStoreData.iosUrl}
                onChange={(e) =>
                  setAppStoreData({
                    ...appStoreData,
                    iosUrl: e.currentTarget.value,
                  })
                }
              />
            </Field>
            <Field label="Android Play Store URL">
              <Input
                placeholder="https://play.google.com/store/..."
                value={appStoreData.androidUrl}
                onChange={(e) =>
                  setAppStoreData({
                    ...appStoreData,
                    androidUrl: e.currentTarget.value,
                  })
                }
              />
            </Field>
            <p className="text-muted-foreground text-[10px] italic">
              Note: This tool currently encodes the iOS URL by default if both
              are provided.
            </p>
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
      {
        value: 'event',
        label: 'Event',
        icon: <IconCalendar size={16} />,
        content: null,
      },
      {
        value: 'email',
        label: 'Email',
        icon: <IconMail size={16} />,
        content: null,
      },
      {
        value: 'sms',
        label: 'SMS',
        icon: <IconSms size={16} />,
        content: null,
      },
      {
        value: 'location',
        label: 'Map',
        icon: <IconMapPin size={16} />,
        content: null,
      },
      {
        value: 'appstore',
        label: 'App Store',
        icon: <IconPlus size={16} />,
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
