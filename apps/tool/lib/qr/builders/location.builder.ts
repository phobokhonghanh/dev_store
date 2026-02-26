import type { LocationData } from '../types'
import { QRParamBuilder } from './base'

/**
 * Location type: Geographic coordinates
 */
export class LocationBuilder extends QRParamBuilder {
    readonly type = 'location'

    apply(url: URLSearchParams, rawData: unknown): void {
        const data = rawData as LocationData
        if (!data) return

        if (data.lat) url.set('lat', data.lat)
        if (data.lng) url.set('lng', data.lng)
    }
}
