# 🛠️ Developer Tools Hub

> **Đơn giản. Nhanh chóng. 100% Miễn phí & Mã nguồn mở.**
> Bộ sưu tập các công cụ tiện ích mạnh mẽ giúp tăng năng suất làm việc, được thiết kế với giao diện hiện đại và đẹp mắt.

![Version](https://img.shields.io/badge/version-1.0_LIVE-green?style=for-the-badge)
![Tech](https://img.shields.io/badge/built_with-Next.js_15-black?style=for-the-badge)
![i18n](https://img.shields.io/badge/i18n-VI%20%7C%20EN-blue?style=for-the-badge)

[🇬🇧 English Version](./README.en.md)

## 🚀 Tại sao nên sử dụng?

Chúng tôi tin rằng các công cụ dành cho lập trình viên nên **dễ tiếp cận**, **nhanh chóng** và **thú vị khi sử dụng**. Không quảng cáo, không trả phí, chỉ có tiện ích thuần túy.

- **🎨 Giao diện Premium:** Thiết kế tập trung vào thẩm mỹ và trải nghiệm người dùng. Hỗ trợ chế độ tối, hiệu ứng glassmorphism và animation mượt mà.
- **⚡ Siêu nhanh:** Được xây dựng với [Next.js 15](https://nextjs.org/) và [Turbo](https://turbo.build/), đảm bảo thời gian tải tức thì.
- **🔌 Sẵn sàng cho Lập trình viên:** Mọi công cụ đều được thiết kế với khả năng tích hợp API và nhúng.
- **🌐 Đa ngôn ngữ:** Hỗ trợ đầy đủ Tiếng Việt và Tiếng Anh với kiến trúc i18n tập trung.

---

## 🌐 Hệ thống Đa ngôn ngữ (i18n)

Dự án sử dụng kiến trúc i18n tập trung với các tính năng:

- **Centralized Dictionary:** Tất cả văn bản nằm trong `lib/i18n.ts`
- **Factory Functions:** Các file dữ liệu tĩnh như `tools-routes.ts` và `qr-types.ts` sử dụng factory pattern để hỗ trợ i18n
- **Locale-Aware Hooks:** Sử dụng `useLocale()` và `useDict()` để truy cập ngôn ngữ và từ điển tập trung.
- **Toast System:** Hệ thống thông báo `useToast()` hỗ trợ đa ngôn ngữ và giảm prop drilling.

### Kiến trúc i18n

```
lib/
├── i18n.ts              # Master dictionary (VI/EN)
├── config.ts            # Centralized config (Locale, API_BASE)
├── tools-routes.ts      # Factory function getToolsRoutes(dict)
├── qr-types.ts          # Factory function getQRTypes(dict)
└── hooks/
    ├── useLocale.tsx    # Context provider cho locale
    ├── useDict.ts       # Hook lấy từ điển nhanh
    └── useToast.tsx     # Context & hook cho thông báo
```

---

## 🌟 Công cụ Nổi bật

### 1. QR Code Generator Nâng cao

Tạo mã QR tùy chỉnh hoàn toàn cho nhiều mục đích sử dụng khác nhau. Không giống các công cụ cơ bản, chúng tôi cung cấp các tính năng tích hợp sâu.

**📌 9 Loại QR Code được hỗ trợ:**

| Loại                         | Mô tả                                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| 🔗 **URL**                   | Điều hướng đến trang web                                                                        |
| 📶 **WiFi**                  | Chia sẻ thông tin mạng WiFi một cách an toàn                                                    |
| 💳 **Chuyển khoản (VietQR)** | Tạo mã thanh toán ngân hàng theo chuẩn Napas 247, tương thích với tất cả app ngân hàng Việt Nam |
| 👤 **VCard**                 | Lưu thông tin liên lạc vào danh bạ                                                              |
| 📅 **Sự kiện**               | Thêm lịch hẹn vào ứng dụng Lịch                                                                 |
| ✉️ **Email**                 | Soạn sẵn thư với địa chỉ nhận, tiêu đề và nội dung                                              |
| 💬 **SMS**                   | Soạn sẵn tin nhắn đến số điện thoại                                                             |
| 📍 **Vị trí**                | Chia sẻ tọa độ hoặc link Google Maps                                                            |
| 📱 **App Store**             | Điều hướng đến iOS App Store hoặc Android Play Store                                            |

**⚙️ Tính năng chính:**

- **Tùy chỉnh:** Điều chỉnh kích thước, mức sửa lỗi, màu nền và màu mã.
- **Nhúng Logo:** Tải logo thương hiệu hoặc sử dụng URL logo công khai.
- **📚 Tài liệu API đầy đủ:** Trang [QR Guide](/tools/free/qrcode/guide) cung cấp chi tiết mọi tham số API và ví dụ thực tế.
- **📱 Tối ưu Di động:** Giao diện mã QR và bảng biểu tự động co giãn (scale) hoàn hảo trên mọi kích thước màn hình.
- **📊 Tích hợp Google Sheets:** Sử dụng **Embed API** (`=IMAGE(...)`) để tạo mã QR động trực tiếp trong bảng tính.
- **Xuất chất lượng cao:** Tải xuống PNG độ phân giải cao cho in ấn/web.

### 2. Bộ đếm ngược Chính xác

Timer tập trung năng suất cho sự kiện, pomodoro và deadline. Hỗ trợ đầy đủ i18n với các labels (Ngày/Giờ/Phút/Giây) và nút (Bắt đầu/Tạm dừng/Đặt lại).

---

## 💻 Công nghệ Sử dụng

Dự án này được xây dựng bằng các công nghệ web hiện đại nhất:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Hooks + Context (useLocale)
- **Language:** TypeScript (Strict)
- **i18n:** Custom architecture với centralized dictionary

---

## 🛠️ Bắt đầu

Muốn chạy dự án cục bộ hoặc đóng góp?

1.  **Clone repository:**

    ```bash
    git clone https://github.com/phobokhonghanh/dev_store.git
    cd dev_store
    ```

2.  **Cài đặt dependencies:**

    ```bash
    yarn install
    ```

3.  **Chạy ứng dụng Tools:**

    ```bash
    yarn dev --filter=tool
    ```

4.  Mở [http://localhost:3003](http://localhost:3003) để xem kết quả!

---

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Nếu bạn có ý tưởng cho công cụ mới hoặc muốn cải thiện công cụ hiện có, vui lòng fork repo và gửi PR.

**Ý tưởng cho công cụ mới:**

- JSON Formatter/Validator
- Base64 Encoder/Decoder
- JWT Debugger
- CSS Gradient Generator

---

Được tạo với ❤️ bởi [itc]
