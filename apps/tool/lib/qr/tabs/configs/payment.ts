import { CreditCard } from 'lucide-react'
import { PaymentForm } from '@/components/tools/qrcode/forms'
import { generatePaymentString, generatePaymentDisplay } from '../../utils'
import { QR_INIT } from '../../init'
import { QRTabConfig } from '../types'
import { PaymentData } from '../../types'
import { BANKS } from '../../vietqr'

export const paymentTab: QRTabConfig<PaymentData> = {
    id: 'payment',
    icon: CreditCard,
    labelKey: 'tabPayment',
    Form: PaymentForm as any, // Temporary cast as we standardize Form types
    generateString: generatePaymentString,
    generateDisplay: generatePaymentDisplay,
    getInitialData: () => QR_INIT.PAYMENT(BANKS[0].bin),
}
