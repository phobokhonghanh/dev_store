import { MessageSquare } from 'lucide-react'
import { SmsForm } from '@/components/tools/qrcode/forms'
import { generateSmsString, generateSmsDisplay } from '../../utils'
import { QR_INIT } from '../../init'
import { QRTabConfig } from '../types'
import { SmsData } from '../../types'

export const smsTab: QRTabConfig<SmsData> = {
    id: 'sms',
    icon: MessageSquare,
    labelKey: 'tabSms',
    Form: SmsForm as any,
    generateString: generateSmsString,
    generateDisplay: generateSmsDisplay,
    getInitialData: () => QR_INIT.SMS,
}
