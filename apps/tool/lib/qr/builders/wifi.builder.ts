import type { WiFiData } from '../types'
import { QRParamBuilder } from './base'

/**
 * WiFi type: Network configuration parameters
 */
export class WifiBuilder extends QRParamBuilder {
    readonly type = 'wifi'

    apply(url: URLSearchParams, rawData: unknown): void {
        const data = rawData as WiFiData
        if (!data) return

        if (data.ssid) url.set('ssid', data.ssid)
        if (data.password) url.set('password', data.password)
        if (data.encryption) url.set('encryption', data.encryption)
        if (data.hidden) url.set('hidden', '1')
    }
}
