# Developer Guide (apps/tool)

Tài liệu này hướng dẫn cách phát triển và mở rộng các công cụ trong dự án `apps/tool`, đặc biệt tập trung vào module QR Code Generator với kiến trúc Registry Pattern mới.

---

## 1. Cấu trúc Chung

Dự án được tổ chức theo cấu trúc App Router của Next.js:

- `app/tools/*`: Chứa các page routes cho từng công cụ.
- `components/tools/*`: Chứa UI components cụ thể cho từng công cụ.
- `lib/*`: Chứa logic xử lý, helpers, hooks dùng chung.

---

## 2. QR Code Generator Architecture

Module QR Code (`apps/tool/lib/qr`) vừa được tái cấu trúc theo **Registry Pattern** để đảm bảo tính mở rộng và dễ bảo trì.

### Các thành phần chính:

| Thư mục/File | Mô tả |
|--------------|-------|
| `lib/qr/tabs/registry.ts` | **Trung tâm điều khiển**. Nơi đăng ký tất cả các loại QR tab. |
| `lib/qr/tabs/configs/` | Chứa file cấu hình riêng cho từng tab (logic tạo chuỗi QR, hiển thị, form). |
| `lib/qr/types.ts` | Định nghĩa TypeScript types cho dữ liệu QR. |
| `lib/qr/utils.ts` | Hàm tiện ích để tạo chuỗi QR (encode) và chuỗi hiển thị (display). |
| `lib/qr/init.ts` | Giá trị khởi tạo mặc định (Initial State). |
| `components/tools/qrcode/forms/` | Các React Component form nhập liệu cho từng loại QR. |
| `components/tools/qrcode/QRCodeTabs.tsx` | Component hiển thị chính, render động dựa trên registry. |

---

## 3. Hướng dẫn thêm Tab QR Code Mới

Để thêm một loại mã QR mới (ví dụ: `crypto`), bạn cần làm theo quy trình 6 bước sau:

### Bước 1: Định nghĩa Type dữ liệu
Mở `lib/qr/types.ts` và thêm interface cho dữ liệu mới, sau đó update union type `QRType`.

```typescript
// lib/qr/types.ts

// 1. Define Interface
export interface CryptoData {
  address: string
  amount: string
  coin: 'btc' | 'eth'
}

// 2. Add to Union Type (để tránh circular dependency)
export type QRType = 
  | 'url' 
  | 'wifi' 
  // ...
  | 'crypto' // <-- Thêm vào đây
```

### Bước 2: Thêm dữ liệu khởi tạo (Initial State)
Mở `lib/qr/init.ts` và thêm giá trị mặc định.

```typescript
// lib/qr/init.ts

export const QR_INIT = {
  // ...
  CRYPTO: {
    address: '',
    amount: '',
    coin: 'btc'
  } as CryptoData,
}
```

### Bước 3: Viết hàm tiện ích (Utils)
Mở `lib/qr/utils.ts` và viết 2 hàm: 
1. `generate...String`: Tạo chuỗi raw cho mã QR.
2. `generate...Display`: Tạo chuỗi text hiển thị cho người dùng đọc.

```typescript
// lib/qr/utils.ts

// 1. Raw String Generator
export const generateCryptoString = (data: CryptoData): string => {
  return `${data.coin}:${data.address}?amount=${data.amount}`
}

// 2. Display Formatter
export const generateCryptoDisplay = (data: CryptoData): string => {
  return `Coin: ${data.coin}\nAddress: ${data.address}\nAmount: ${data.amount}`
}
```

### Bước 4: Tạo Form Component
Tạo file mới trong `components/tools/qrcode/forms/CryptoForm.tsx`.
**Lưu ý**: Component phải nhận props đúng chuẩn `QRTabConfig['Form']`.

```tsx
// components/tools/qrcode/forms/CryptoForm.tsx

import { Field, Input } from '../../Form' // Import components chung
import { CryptoData } from '@/lib/qr/types'
import { SupportedLocale } from '@/lib/config'

interface CryptoFormProps {
  data: CryptoData
  onChange: (data: CryptoData) => void
  locale: SupportedLocale
}

export function CryptoForm({ data, onChange, locale }: CryptoFormProps) {
  // ... logic render form
  return (
    <div>
       <Input 
         value={data.address} 
         onChange={e => onChange({...data, address: e.target.value})} 
       />
       {/* ... */}
    </div>
  )
}
```
*Đừng quên export form này trong `components/tools/qrcode/forms/index.ts`.*

### Bước 5: Tạo File Config
Tạo file `lib/qr/tabs/configs/crypto.ts` để kết nối mọi thứ lại.

```typescript
// lib/qr/tabs/configs/crypto.ts

import { Bitcoin } from 'lucide-react' // Icon
import { CryptoForm } from '@/components/tools/qrcode/forms'
import { generateCryptoString, generateCryptoDisplay } from '../../utils'
import { QR_INIT } from '../../init'
import { QRTabConfig } from '../types'
import { CryptoData } from '../../types'

export const cryptoTab: QRTabConfig<CryptoData> = {
  id: 'crypto', // Khớp với QRType
  icon: Bitcoin,
  labelKey: 'tabCrypto', // Key trong file ngôn ngữ (dict)
  Form: CryptoForm as any,
  generateString: generateCryptoString,
  generateDisplay: generateCryptoDisplay,
  getInitialData: () => QR_INIT.CRYPTO,
}
```

### Bước 6: Đăng ký vào Registry
Cuối cùng, mở `lib/qr/tabs/registry.ts` và thêm config vào danh sách.

```typescript
// lib/qr/tabs/registry.ts

import { cryptoTab } from './configs/crypto'

export const QR_TAB_REGISTRY: QRTabConfig[] = [
  urlTab,
  wifiTab,
  // ...
  cryptoTab, // <-- Đăng ký tại đây. Thứ tự trong mảng quyết định thứ tự hiển thị tab.
]
```

---

## 4. FAQ Configuration (Tùy chọn)

Để thêm câu hỏi thường gặp riêng cho tab mới, mở `lib/qr/faq.ts`:

```typescript
// lib/qr/faq.ts

export const QR_FAQ_DATA = {
  // ...
  crypto: [
    { question: 'Có an toàn không?', link: '/guide/crypto' },
    { question: 'Hỗ trợ những coin nào?', link: '/guide/crypto' }
  ]
}
```

---

## 5. Các công cụ khác (Time, etc.)

Nguyên tắc chung cho các công cụ khác trong `apps/tool`:

1. **Tách biệt Logic & UI**: Luôn cố gắng tách logic tính toán sang `lib/` và chỉ để UI ở `components/`.
2. **Custom Hooks**: Sử dụng custom hooks (ví dụ `useTimeConverter`) để quản lý state phức tạp thay vì để trực tiếp trong `page.tsx`.
3. **Reusability**: Tận dụng các components chung trong `components/ui` hoặc `components/Form`.
