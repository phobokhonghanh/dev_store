import { LucideIcon } from 'lucide-react'
import { QRType } from '@/components/tools/qrcode/QRCodeTabs'
import type { SupportedLocale } from '@/lib/config'

export interface QRTabConfig<T = any> {
    id: QRType
    icon: LucideIcon
    labelKey: string // key in dict.qrTabs
    Form: React.ComponentType<{
        data: T
        onChange: (data: T) => void
        locale: SupportedLocale
        level?: 'L' | 'M' | 'Q' | 'H'
    }>
    generateString: (data: T) => string
    generateDisplay: (data: T) => string
    getInitialData: () => T
}
