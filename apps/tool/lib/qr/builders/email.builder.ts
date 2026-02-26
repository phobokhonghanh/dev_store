import type { EmailData } from '../types'
import { QRParamBuilder } from './base'

/**
 * Email type: mailto parameters
 */
export class EmailBuilder extends QRParamBuilder {
    readonly type = 'email'

    apply(url: URLSearchParams, rawData: unknown): void {
        const data = rawData as EmailData
        if (!data) return

        if (data.email) url.set('email', data.email)
        if (data.subject) url.set('subject', data.subject)
        if (data.body) url.set('body', data.body)
    }
}
