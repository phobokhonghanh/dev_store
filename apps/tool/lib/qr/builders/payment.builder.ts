import { BANKS } from '../vietqr'
import type { PaymentData } from '../types'
import { QRParamBuilder } from './base'

/**
 * Payment type: Bank transfer parameters with shortName lookup
 */
export class PaymentBuilder extends QRParamBuilder {
    readonly type = 'payment'

    apply(url: URLSearchParams, rawData: unknown): void {
        const data = rawData as PaymentData
        if (!data) return

        // Convert BIN to shortName for human-readable URLs
        if (data.bankBin) {
            const bank = BANKS.find(b => b.bin === data.bankBin)
            url.set('bank', bank?.shortName || data.bankBin)
        }

        if (data.account) url.set('account', data.account)
        if (data.name) url.set('name', data.name)
        if (data.amount) url.set('amount', data.amount)
        if (data.content) url.set('content', data.content)
    }
}
