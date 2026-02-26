import { MapPin } from 'lucide-react'
import { LocationForm } from '@/components/tools/qrcode/forms'
import { generateLocationString, generateLocationDisplay } from '../../utils'
import { QR_INIT } from '../../init'
import { QRTabConfig } from '../types'
import { LocationData } from '../../types'

export const locationTab: QRTabConfig<LocationData> = {
    id: 'location',
    icon: MapPin,
    labelKey: 'tabLocation',
    Form: LocationForm as any,
    generateString: generateLocationString,
    generateDisplay: generateLocationDisplay,
    getInitialData: () => QR_INIT.LOCATION,
}
