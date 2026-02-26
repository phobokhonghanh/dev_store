import {
  Calendar,
  CreditCard,
  Link as LinkIcon,
  LucideIcon,
  Mail,
  MapPin,
  MessageSquare,
  Smartphone,
  User,
  Wifi,
} from 'lucide-react'
import { CONFIG } from '../config'
import type { AppDict } from '../i18n'

/** Base API endpoint (re-exported for convenience) */
const API_BASE = CONFIG.API_BASE

export interface QRTypeParam {
  name: string
  type: string
  desc: string
}

export interface QRTypeData {
  id: string
  icon: LucideIcon
  title: string
  description: string
  params: QRTypeParam[]
  example: string
  sheetsExample: string
}

/**
 * Factory function to generate localized QR types data.
 * Accepts the i18n dictionary and returns QR type definitions with localized text.
 *
 * @param dict - The i18n dictionary for the current locale
 * @returns Array of QRTypeData with localized titles/descriptions
 */
export function getQRTypes(dict: AppDict): QRTypeData[] {
  const t = dict.qrGuidePage

  return [
    {
      id: 'url',
      icon: LinkIcon,
      title: t.urlTitle,
      description: t.urlDesc,
      params: [
        {
          name: 'weburl',
          type: 'string',
          desc: dict.qrTabs.urlLabel,
        },
      ],
      example: `${API_BASE}?type=url&weburl=https://google.com`,
      sheetsExample: `=IMAGE("${API_BASE}?type=url&weburl=" & A2)`,
    },
    {
      id: 'wifi',
      icon: Wifi,
      title: t.wifiTitle,
      description: t.wifiDesc,
      params: [
        { name: 'ssid', type: 'string', desc: dict.wifi.ssidLabel },
        { name: 'password', type: 'string', desc: dict.wifi.passwordLabel },
        { name: 'encryption', type: 'enum', desc: dict.wifi.encryptionLabel },
        { name: 'hidden', type: 'boolean', desc: dict.wifi.hiddenNetwork },
      ],
      example: `${API_BASE}?type=wifi&ssid=CafeWiFi&password=welcome123&encryption=WPA`,
      sheetsExample: `=IMAGE("${API_BASE}?type=wifi&ssid=" & A2 & "&password=" & B2)`,
    },
    {
      id: 'vcard',
      icon: User,
      title: t.vcardTitle,
      description: t.vcardDesc,
      params: [
        { name: 'fn', type: 'string', desc: dict.vcard.keyFullName },
        { name: 'tel', type: 'string', desc: dict.vcard.keyPhone },
        { name: 'email', type: 'string', desc: dict.vcard.keyEmail },
        { name: 'url', type: 'string', desc: dict.vcard.keyWebsite },
        { name: 'org', type: 'string', desc: dict.vcard.keyCompany },
        { name: 'title', type: 'string', desc: dict.vcard.keyJobTitle },
      ],
      example: `${API_BASE}?type=vcard&fn=Nguyen Van A&tel=0901234567&email=a@company.com`,
      sheetsExample: `=IMAGE("${API_BASE}?type=vcard&fn=" & A2 & "&tel=" & B2)`,
    },
    {
      id: 'payment',
      icon: CreditCard,
      title: t.paymentTitle,
      description: t.paymentDesc,
      params: [
        { name: 'bank', type: 'string', desc: dict.payment.bankLabel },
        { name: 'account', type: 'string', desc: dict.payment.accountLabel },
        { name: 'name', type: 'string', desc: dict.payment.accountNameLabel },
        { name: 'amount', type: 'number', desc: dict.payment.amountLabel },
        { name: 'content', type: 'string', desc: dict.payment.messageLabel },
      ],
      example: `${API_BASE}?type=payment&bank=VCB&account=1234567890&amount=100000&content=Thanh+toan`,
      sheetsExample: `=IMAGE("${API_BASE}?type=payment&bank=VCB&account=" & A2 & "&amount=" & B2)`,
    },
    {
      id: 'event',
      icon: Calendar,
      title: t.eventTitle,
      description: t.eventDesc,
      params: [
        { name: 'title', type: 'string', desc: dict.event.titleLabel },
        { name: 'start', type: 'datetime', desc: dict.event.startDateLabel },
        { name: 'end', type: 'datetime', desc: dict.event.endDateLabel },
        { name: 'location', type: 'string', desc: dict.event.locationLabel },
        {
          name: 'description',
          type: 'string',
          desc: dict.event.descriptionLabel,
        },
      ],
      example: `${API_BASE}?type=event&title=Meeting&start=2024-03-15T10:00&end=2024-03-15T11:00&location=Office`,
      sheetsExample: `=IMAGE("${API_BASE}?type=event&title=" & A2 & "&start=" & B2)`,
    },
    {
      id: 'email',
      icon: Mail,
      title: t.emailTitle,
      description: t.emailDesc,
      params: [
        { name: 'email', type: 'string', desc: dict.email.emailLabel },
        { name: 'subject', type: 'string', desc: dict.email.subjectLabel },
        { name: 'body', type: 'string', desc: dict.email.bodyLabel },
      ],
      example: `${API_BASE}?type=email&email=support@company.com&subject=Inquiry&body=Hello`,
      sheetsExample: `=IMAGE("${API_BASE}?type=email&email=" & A2 & "&subject=" & B2)`,
    },
    {
      id: 'sms',
      icon: MessageSquare,
      title: t.smsTitle,
      description: t.smsDesc,
      params: [
        { name: 'phone', type: 'string', desc: dict.sms.phoneLabel },
        { name: 'message', type: 'string', desc: dict.sms.messageLabel },
      ],
      example: `${API_BASE}?type=sms&phone=0901234567&message=Hello`,
      sheetsExample: `=IMAGE("${API_BASE}?type=sms&phone=" & A2 & "&message=" & B2)`,
    },
    {
      id: 'location',
      icon: MapPin,
      title: t.locationTitle,
      description: t.locationDesc,
      params: [
        { name: 'lat', type: 'number', desc: dict.location.latitude },
        { name: 'lng', type: 'number', desc: dict.location.longitude },
        { name: 'google', type: 'boolean', desc: dict.location.googleMapsLink },
      ],
      example: `${API_BASE}?type=location&lat=10.7769&lng=106.7009&google=1`,
      sheetsExample: `=IMAGE("${API_BASE}?type=location&lat=" & A2 & "&lng=" & B2 & "&google=1")`,
    },
    {
      id: 'appstore',
      icon: Smartphone,
      title: t.appstoreTitle,
      description: t.appstoreDesc,
      params: [
        { name: 'ios', type: 'string', desc: dict.appStore.iosLabel },
        { name: 'android', type: 'string', desc: dict.appStore.androidLabel },
      ],
      example: `${API_BASE}?type=appstore&ios=https://apps.apple.com/app/id123`,
      sheetsExample: `=IMAGE("${API_BASE}?type=appstore&ios=" & A2)`,
    },
  ]
}
