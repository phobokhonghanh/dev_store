import type { SmsData } from '../types'
import { QRParamBuilder } from './base'

/**
 * SMS type: Phone message parameters
 */
export class SmsBuilder extends QRParamBuilder {
    readonly type = 'sms'

    apply(url: URLSearchParams, rawData: unknown): void {
        const data = rawData as SmsData
        if (!data) return

        if (data.phone) url.set('phone', data.phone)
        if (data.message) url.set('message', data.message)
    }
}
