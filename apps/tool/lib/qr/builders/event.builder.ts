import type { EventData } from '../types'
import { QRParamBuilder } from './base'

/**
 * Event type: Calendar event parameters
 */
export class EventBuilder extends QRParamBuilder {
    readonly type = 'event'

    apply(url: URLSearchParams, rawData: unknown): void {
        const data = rawData as EventData
        if (!data) return

        if (data.title) url.set('title', data.title)
        if (data.startDate) url.set('start', data.startDate)
        if (data.endDate) url.set('end', data.endDate)
        if (data.location) url.set('location', data.location)
    }
}
