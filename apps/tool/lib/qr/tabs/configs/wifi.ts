import { Wifi } from 'lucide-react'
import { WifiForm } from '@/components/tools/qrcode/forms'
import { generateWifiString, generateWifiDisplay } from '../../utils'
import { QR_INIT } from '../../init'
import { QRTabConfig } from '../types'
import { WiFiData } from '../../types'

export const wifiTab: QRTabConfig<WiFiData> = {
    id: 'wifi',
    icon: Wifi,
    labelKey: 'tabWifi',
    Form: WifiForm,
    generateString: generateWifiString,
    generateDisplay: generateWifiDisplay,
    getInitialData: () => QR_INIT.WIFI,
}
