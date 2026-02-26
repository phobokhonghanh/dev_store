import { QRParamBuilder } from './base'

/**
 * Fallback builder for unsupported types
 */
export class TextBuilder extends QRParamBuilder {
    readonly type = 'text'

    apply(url: URLSearchParams, _rawData: unknown, value: string): void {
        url.set('type', 'text')
        url.set('data', value)
    }
}
