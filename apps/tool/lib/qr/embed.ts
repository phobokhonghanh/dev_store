import { QRBuilderRegistry } from './registry'

/**
 * Configuration for QR embed URL generation
 */
export interface QREmbedConfig {
    value: string
    type: string
    size: number
    fgColor: string
    bgColor: string
    rawData?: unknown
    domain?: boolean
    paramsDefault?: boolean
}

/**
 * Service class responsible for generating embed URLs and Sheets formulas.
 * Encapsulates all URL construction logic.
 */
export class QREmbedGenerator {
    private config: QREmbedConfig
    private registry: QRBuilderRegistry

    constructor(config: QREmbedConfig) {
        this.config = config
        this.registry = QRBuilderRegistry.getInstance()
    }

    /**
     * Generates the full API URL with all parameters
     */
    generateUrl(): string {
        if (typeof window === 'undefined' || !this.config.value) {
            return ''
        }

        const { value, type, rawData, paramsDefault } = this.config
        const origin = window.location.origin
        const url = new URL('/api/qrcode', origin)

        // Apply appearance parameters
        this.applyAppearanceParams(url.searchParams, paramsDefault)

        // Set type and apply type-specific parameters
        url.searchParams.set('type', type)
        const builder = this.registry.getBuilder(type)
        builder.apply(url.searchParams, rawData, value)

        return this.config.domain !== false ? url.toString() : url.search
    }

    /**
     * Generates Google Sheets IMAGE formula
     */
    generateSheetsFormula(): string {
        const url = this.generateUrl()
        return url ? `=IMAGE("${url}")` : ''
    }

    private applyAppearanceParams(params: URLSearchParams, includeDefaults = false): void {
        const { size, fgColor, bgColor } = this.config

        if (includeDefaults || size !== 256) {
            params.set('size', size.toString())
        }

        if (includeDefaults || fgColor !== '#000000') {
            params.set('dark', fgColor.replace('#', ''))
        }

        if (includeDefaults || bgColor !== '#ffffff') {
            params.set('light', bgColor.replace('#', ''))
        }
    }
}
