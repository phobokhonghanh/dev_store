import { Mail } from 'lucide-react'
import { EmailForm } from '@/components/tools/qrcode/forms'
import { generateEmailString, generateEmailDisplay } from '../../utils'
import { QR_INIT } from '../../init'
import { QRTabConfig } from '../types'
import { EmailData } from '../../types'

export const emailTab: QRTabConfig<EmailData> = {
    id: 'email',
    icon: Mail,
    labelKey: 'tabEmail',
    Form: EmailForm as any,
    generateString: generateEmailString,
    generateDisplay: generateEmailDisplay,
    getInitialData: () => QR_INIT.EMAIL,
}
