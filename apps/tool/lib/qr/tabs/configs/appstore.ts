import { Smartphone } from 'lucide-react'
import { AppStoreForm } from '@/components/tools/qrcode/forms'
import { generateAppStoreDisplay } from '../../utils'
import { QR_INIT } from '../../init'
import { QRTabConfig } from '../types'
import { AppStoreData } from '../../types'

export const appstoreTab: QRTabConfig<AppStoreData> = {
    id: 'appstore',
    icon: Smartphone,
    labelKey: 'tabAppStore',
    Form: AppStoreForm as any,
    generateString: (data) => data.iosUrl || data.androidUrl,
    generateDisplay: generateAppStoreDisplay,
    getInitialData: () => QR_INIT.APPSTORE,
}
