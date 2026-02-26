import { User } from 'lucide-react'
import { VCardForm, INITIAL_VCARD_FIELDS } from '@/components/tools/qrcode/forms'
import { generateVCardString, generateVCardDisplay } from '../../utils'
import { QRTabConfig } from '../types'
import { VCardField } from '@/components/tools/qrcode/forms'

export const vcardTab: QRTabConfig<VCardField[]> = {
    id: 'vcard',
    icon: User,
    labelKey: 'tabVcard',
    Form: VCardForm,
    generateString: generateVCardString,
    generateDisplay: generateVCardDisplay,
    getInitialData: () => INITIAL_VCARD_FIELDS,
}
