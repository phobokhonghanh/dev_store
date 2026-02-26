import type { EventData, QRType } from './types'

export const QR_INIT = {
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
        startDate: '',
        endDate: '',
        location: '',
        locationLat: '',
        locationLng: '',
        useMap: true,
        description: '',
    } as EventData,
    EMAIL: {
        email: '',
        cc: '',
        bcc: '',
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

/**
 * Utility to get current localized datetime string for Event initialization
 */
export const getInitialEventDates = () => {
    const now = new Date()
    const oneHourLater = new Date(now.getTime() + 3600000)
    return {
        start: now.toISOString().slice(0, 16),
        end: oneHourLater.toISOString().slice(0, 16),
    }
}
