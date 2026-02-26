import { FAQItem } from '@/components/tools/shared/FAQSection'
import { QRType } from '@/components/tools/qrcode/QRCodeTabs'

export const QR_FAQ_DATA: Record<string, FAQItem[]> = {
    default: [
        { question: 'Làm thế nào để tạo mã QR?', link: '/tools/free/qrcode/guide' },
        { question: 'Mã QR có hết hạn không?', link: '/tools/free/qrcode/guide' },
        { question: 'Tôi có thể đổi màu mã QR không?', link: '/tools/free/qrcode/guide' },
        { question: 'Làm sao để thêm logo vào mã QR?', link: '/tools/free/qrcode/guide' },
    ],
    wifi: [
        { question: 'Mã QR WiFi hoạt động như thế nào?', link: '/tools/free/qrcode/guide' },
        { question: 'Điện thoại nào quét được mã WiFi?', link: '/tools/free/qrcode/guide' },
    ],
    payment: [
        { question: 'VietQR là gì?', link: '/tools/free/qrcode/guide' },
        { question: 'Làm sao để nhận tiền qua mã QR?', link: '/tools/free/qrcode/guide' },
    ],
    // Thêm các loại khác ở đây...
}

export const getFAQByTab = (tab: QRType): FAQItem[] => {
    return QR_FAQ_DATA[tab] || QR_FAQ_DATA.default
}
