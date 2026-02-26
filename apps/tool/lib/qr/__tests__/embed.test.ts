/**
 * Unit tests for QREmbedGenerator class.
 * 
 * These tests ensure the API URL generation logic is correct and maintainable.
 * This supports the guide documentation and future API Key feature.
 */

import { QREmbedGenerator, QREmbedConfig } from '../embed'

// Mock window.location.origin for testing
const mockOrigin = 'https://example.com'

beforeAll(() => {
    Object.defineProperty(global, 'window', {
        value: {
            location: {
                origin: mockOrigin,
            },
        },
        writable: true,
    })
})

describe('QREmbedGenerator', () => {
    describe('generateUrl', () => {
        it('should generate basic URL with type and value', () => {
            const config: QREmbedConfig = {
                value: 'https://google.com',
                type: 'url',
                size: 256,
                fgColor: '#000000',
                bgColor: '#ffffff',
            }

            const generator = new QREmbedGenerator(config)
            const url = generator.generateUrl()

            expect(url).toContain('/api/qrcode')
            expect(url).toContain('type=url')
        })

        it('should include custom size when different from default', () => {
            const config: QREmbedConfig = {
                value: 'https://google.com',
                type: 'url',
                size: 512,
                fgColor: '#000000',
                bgColor: '#ffffff',
            }

            const generator = new QREmbedGenerator(config)
            const url = generator.generateUrl()

            expect(url).toContain('size=512')
        })

        it('should include custom colors when different from defaults', () => {
            const config: QREmbedConfig = {
                value: 'https://google.com',
                type: 'url',
                size: 256,
                fgColor: '#ff0000',
                bgColor: '#00ff00',
            }

            const generator = new QREmbedGenerator(config)
            const url = generator.generateUrl()

            expect(url).toContain('dark=ff0000')
            expect(url).toContain('light=00ff00')
        })

        it('should NOT include default values when paramsDefault is false', () => {
            const config: QREmbedConfig = {
                value: 'https://google.com',
                type: 'url',
                size: 256,
                fgColor: '#000000',
                bgColor: '#ffffff',
                paramsDefault: false,
            }

            const generator = new QREmbedGenerator(config)
            const url = generator.generateUrl()

            expect(url).not.toContain('size=256')
            expect(url).not.toContain('dark=000000')
            expect(url).not.toContain('light=ffffff')
        })

        it('should include all params when paramsDefault is true', () => {
            const config: QREmbedConfig = {
                value: 'https://google.com',
                type: 'url',
                size: 256,
                fgColor: '#000000',
                bgColor: '#ffffff',
                paramsDefault: true,
            }

            const generator = new QREmbedGenerator(config)
            const url = generator.generateUrl()

            expect(url).toContain('size=256')
            expect(url).toContain('dark=000000')
            expect(url).toContain('light=ffffff')
        })

        it('should return empty string for empty value', () => {
            const config: QREmbedConfig = {
                value: '',
                type: 'url',
                size: 256,
                fgColor: '#000000',
                bgColor: '#ffffff',
            }

            const generator = new QREmbedGenerator(config)
            const url = generator.generateUrl()

            expect(url).toBe('')
        })

        it('should return query string only when domain is false', () => {
            const config: QREmbedConfig = {
                value: 'https://google.com',
                type: 'url',
                size: 256,
                fgColor: '#000000',
                bgColor: '#ffffff',
                domain: false,
            }

            const generator = new QREmbedGenerator(config)
            const url = generator.generateUrl()

            expect(url).not.toContain(mockOrigin)
            expect(url).toMatch(/^\?/)
        })
    })

    describe('generateSheetsFormula', () => {
        it('should generate IMAGE formula with full URL', () => {
            const config: QREmbedConfig = {
                value: 'https://google.com',
                type: 'url',
                size: 256,
                fgColor: '#000000',
                bgColor: '#ffffff',
            }

            const generator = new QREmbedGenerator(config)
            const formula = generator.generateSheetsFormula()

            expect(formula).toMatch(/^=IMAGE\(".*"\)$/)
            expect(formula).toContain('/api/qrcode')
        })

        it('should return empty string when value is empty', () => {
            const config: QREmbedConfig = {
                value: '',
                type: 'url',
                size: 256,
                fgColor: '#000000',
                bgColor: '#ffffff',
            }

            const generator = new QREmbedGenerator(config)
            const formula = generator.generateSheetsFormula()

            expect(formula).toBe('')
        })
    })
})
