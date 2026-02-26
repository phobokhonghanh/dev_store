/**
 * QR Module - Public API
 * 
 * Centralized exports for QR code generation utilities.
 */

// Types
export * from './types'

// Utilities (string generation & display formatting)
export * from './utils'

// VietQR (bank payment)
export { BANKS, getBankByBinOrShortName, generateVietQR } from './vietqr'
export type { Bank } from './vietqr'

// Guide metadata
export { getQRTypes, type QRTypeData, type QRTypeParam } from './guide'

// Builders
export { QRParamBuilder } from './builders'

// Services
export { QRBuilderRegistry } from './registry'
export { QREmbedGenerator, type QREmbedConfig } from './embed'
export * from './init'

// Hooks
export { useQREmbed, type QREmbedResult, type UseQREmbedOptions } from './hooks/useQREmbed'
export { useQRAppearance, type UseQRAppearanceResult } from './hooks/useQRAppearance'
export { useQRCodeTool } from './hooks/useQRCodeTool'

// FAQ & Tabs Registry
export * from './faq'
export * from './tabs/registry'
export * from './tabs/types'
