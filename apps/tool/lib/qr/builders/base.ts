/**
 * Abstract base class for QR URL parameter builders.
 * Each QR type implements its own strategy for mapping data to URL params.
 */
export abstract class QRParamBuilder {
    abstract readonly type: string

    /**
     * Applies type-specific parameters to the URL.
     * @param url - The URLSearchParams object to modify
     * @param rawData - The raw form data object
     * @param value - The generated QR string value (fallback)
     */
    abstract apply(url: URLSearchParams, rawData: unknown, value: string): void
}
