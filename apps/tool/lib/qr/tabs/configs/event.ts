import { Calendar } from 'lucide-react'
import { EventForm } from '@/components/tools/qrcode/forms'
import { generateEventString, generateEventDisplay } from '../../utils'
import { QR_INIT, getInitialEventDates } from '../../init'
import { QRTabConfig } from '../types'
import { EventData } from '../../types'

export const eventTab: QRTabConfig<EventData> = {
    id: 'event',
    icon: Calendar,
    labelKey: 'tabEvent',
    Form: EventForm as any,
    generateString: generateEventString,
    generateDisplay: generateEventDisplay,
    getInitialData: () => {
        const dates = getInitialEventDates()
        return {
            ...QR_INIT.EVENT,
            startDate: dates.start,
            endDate: dates.end,
        }
    },
}
