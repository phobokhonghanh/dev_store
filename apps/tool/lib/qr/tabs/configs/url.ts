import { Link } from 'lucide-react'
import { UrlForm } from '@/components/tools/qrcode/forms'
import { QRTabConfig } from '../types'

export const urlTab: QRTabConfig<string> = {
    id: 'url',
    icon: Link,
    labelKey: 'tabUrl',
    Form: UrlForm,
    generateString: (data: string) => data,
    generateDisplay: (data: string) => data,
    getInitialData: () => '',
}
// Note: Platform detection for URL is handled in onCodeChange for logo detection, 
// but rawData transformation can be done in the registry refactor later.
