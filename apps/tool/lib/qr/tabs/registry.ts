import { urlTab } from './configs/url'
import { wifiTab } from './configs/wifi'
import { vcardTab } from './configs/vcard'
import { paymentTab } from './configs/payment'
import { eventTab } from './configs/event'
import { emailTab } from './configs/email'
import { smsTab } from './configs/sms'
import { locationTab } from './configs/location'
import { appstoreTab } from './configs/appstore'
import { QRTabConfig } from './types'

export const QR_TAB_REGISTRY: QRTabConfig[] = [
    urlTab,
    wifiTab,
    vcardTab,
    paymentTab,
    eventTab,
    emailTab,
    smsTab,
    locationTab,
    appstoreTab,
]

export const getTabConfig = (id: string) =>
    QR_TAB_REGISTRY.find(tab => tab.id === id)
