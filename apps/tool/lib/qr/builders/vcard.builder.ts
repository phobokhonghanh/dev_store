import type { CustomField } from '../types'
import { QRParamBuilder } from './base'

/**
 * VCard type: Contact information fields
 */
export class VCardBuilder extends QRParamBuilder {
    readonly type = 'vcard'

    apply(url: URLSearchParams, rawData: unknown): void {
        const data = rawData as { fields?: CustomField[] }
        if (!data?.fields) return

        data.fields.forEach((field) => {
            if (field.value) {
                url.set(field.key.toLowerCase(), field.value)
            }
        })
    }
}
