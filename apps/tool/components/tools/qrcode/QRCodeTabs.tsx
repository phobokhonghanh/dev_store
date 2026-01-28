import { useLocale } from '@/lib/hooks/useLocale'
import { getAppDict } from '@/lib/i18n'
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
  Smartphone as IconAppStore,
  Calendar as IconCalendar,
  CreditCard as IconCreditCard,
  Link as IconLink,
  Mail as IconMail,
  MapPin as IconMapPin,
  MessageSquare as IconSms,
  User as IconUser,
  Wifi as IconWifi,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import DynamicTabs, { TabItem } from '../../DynamicTabs'
import { Field, Input } from '../../Form'
import {
  AppStoreForm,
  EmailForm,
  EventForm,
  INITIAL_VCARD_FIELDS,
  LocationForm,
  PaymentForm,
  SmsForm,
  VCardField,
  VCardForm,
  WifiForm,
} from './forms'

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

/** Default state configurations */
const DEFAULTS = {
  WIFI: {
    ssid: '',
    password: '',
    encryption: 'WPA' as const,
    hidden: false,
  },
  PAYMENT: (firstBankBin: string) => ({
    bankBin: firstBankBin,
    account: '',
    name: '',
    amount: '',
    content: '',
  }),
  EVENT: {
    title: '',
    startDate: new Date().toISOString().slice(0, 16),
    endDate: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
    location: '',
    description: '',
  },
  EMAIL: {
    email: '',
    subject: '',
    body: '',
  },
  SMS: {
    phone: '',
    message: '',
  },
  LOCATION: {
    lat: '',
    lng: '',
    useGoogleMaps: true,
  },
  APPSTORE: {
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
      | { fields: VCardField[] }
      | PaymentData
      | EventData
      | EmailData
      | SmsData
      | LocationData
      | AppStoreData
      | null,
  ) => void
}

// Display string generators
const generateWifiDisplay = (data: WiFiData): string => {
  if (!data.ssid) return ''
  return `Network: ${data.ssid}\nPassword: ${data.password}`
}

const generateVCardDisplay = (fields: CustomField[]): string => {
  return fields
    .filter((f) => f.value.trim())
    .map((f) => `${f.label || f.key}: ${f.value}`)
    .join('\n')
}

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
  return `GEO Coordinate: ${data.lat}, ${data.lng}`
}

const generateAppStoreDisplay = (data: AppStoreData): string => {
  if (!data.iosUrl && !data.androidUrl) return ''
  return `iOS: ${data.iosUrl}\nAndroid: ${data.androidUrl}`
}

/**
 * Main Tabs component for the QR Code Generator.
 * Handles the different input forms and orchestrates code generation.
 */
export default function QRCodeTabs({ onCodeChange }: QRCodeTabsProps) {
  const { locale } = useLocale()
  const dict = useMemo(() => getAppDict(locale), [locale])
  const [activeTab, setActiveTab] = useState<QRType>('url')
  const [urlValue, setUrlValue] = useState('')
  const [wifiData, setWifiData] = useState<WiFiData>(DEFAULTS.WIFI)
  const [paymentData, setPaymentData] = useState<PaymentData>(
    DEFAULTS.PAYMENT(BANKS[0].bin),
  )
  const [customFields, setCustomFields] =
    useState<VCardField[]>(INITIAL_VCARD_FIELDS)
  const [eventData, setEventData] = useState<EventData>(DEFAULTS.EVENT)
  const [emailData, setEmailData] = useState<EmailData>(DEFAULTS.EMAIL)
  const [smsData, setSmsData] = useState<SmsData>(DEFAULTS.SMS)
  const [locationData, setLocationData] = useState<LocationData>(
    DEFAULTS.LOCATION,
  )
  const [appStoreData, setAppStoreData] = useState<AppStoreData>(
    DEFAULTS.APPSTORE,
  )

  // Synchronize generated code with parent whenever any input state changes
  useEffect(() => {
    let result = ''
    let display = ''
    let rawData:
      | { url: string; platform: SocialPlatform | null }
      | WiFiData
      | { fields: VCardField[] }
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

  /** Renders the specific input form for the active category */
  const renderContent = () => {
    switch (activeTab) {
      case 'url':
        return (
          <Field label={dict.qrTabs.urlLabel}>
            <Input
              placeholder={dict.qrTabs.urlPlaceholder}
              value={urlValue}
              onChange={(e) => setUrlValue(e.currentTarget.value)}
            />
          </Field>
        )
      case 'wifi':
        return (
          <WifiForm data={wifiData} onChange={setWifiData} locale={locale} />
        )
      case 'vcard':
        return (
          <VCardForm
            fields={customFields}
            onChange={setCustomFields}
            locale={locale}
          />
        )
      case 'payment':
        return (
          <PaymentForm
            data={paymentData}
            onChange={setPaymentData}
            locale={locale}
          />
        )
      case 'event':
        return (
          <EventForm data={eventData} onChange={setEventData} locale={locale} />
        )
      case 'email':
        return (
          <EmailForm data={emailData} onChange={setEmailData} locale={locale} />
        )
      case 'sms':
        return <SmsForm data={smsData} onChange={setSmsData} locale={locale} />
      case 'location':
        return (
          <LocationForm
            data={locationData}
            onChange={setLocationData}
            locale={locale}
          />
        )
      case 'appstore':
        return (
          <AppStoreForm
            data={appStoreData}
            onChange={setAppStoreData}
            locale={locale}
          />
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
        label: dict.qrTabs.tabUrl,
        icon: <IconLink size={16} />,
        content: null,
      },
      {
        value: 'wifi',
        label: dict.qrTabs.tabWifi,
        icon: <IconWifi size={16} />,
        content: null,
      },
      {
        value: 'vcard',
        label: dict.qrTabs.tabVcard,
        icon: <IconUser size={16} />,
        content: null,
      },
      {
        value: 'payment',
        label: dict.qrTabs.tabPayment,
        icon: <IconCreditCard size={16} />,
        content: null,
      },
      {
        value: 'event',
        label: dict.qrTabs.tabEvent,
        icon: <IconCalendar size={16} />,
        content: null,
      },
      {
        value: 'email',
        label: dict.qrTabs.tabEmail,
        icon: <IconMail size={16} />,
        content: null,
      },
      {
        value: 'sms',
        label: dict.qrTabs.tabSms,
        icon: <IconSms size={16} />,
        content: null,
      },
      {
        value: 'location',
        label: dict.qrTabs.tabLocation,
        icon: <IconMapPin size={16} />,
        content: null,
      },
      {
        value: 'appstore',
        label: dict.qrTabs.tabAppStore,
        icon: <IconAppStore size={16} />,
        content: null,
      },
    ],
    [dict],
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
