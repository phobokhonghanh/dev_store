import { QRParamBuilder } from './base'

/**
 * URL type: Simple web URL embedding
 */
export class UrlBuilder extends QRParamBuilder {
    readonly type = 'url'

    apply(url: URLSearchParams, _rawData: unknown, value: string): void {
        url.set('weburl', value)
    }
}
