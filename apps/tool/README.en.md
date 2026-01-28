# 🛠️ Developer Tools Hub

> **Simple. Fast. 100% Free & Open Source.**
> A collection of powerful utilities designed to boost your productivity, wrapped in a beautiful, modern interface.

![Version](https://img.shields.io/badge/version-1.0_LIVE-green?style=for-the-badge)
![Tech](https://img.shields.io/badge/built_with-Next.js_15-black?style=for-the-badge)
![i18n](https://img.shields.io/badge/i18n-VI%20%7C%20EN-blue?style=for-the-badge)

[🇻🇳 Phiên bản Tiếng Việt](./README.md)

## 🚀 Why Use This Tool?

We believe developer tools should be **accessible**, **fast**, and **delightful to use**. No ads, no paywalls, just pure utility.

- **🎨 Premium UI/UX:** Built with a focus on aesthetics and user experience. Dark mode support, glassmorphism effects, and smooth animations.
- **⚡ Blazing Fast:** Powered by [Next.js 15](https://nextjs.org/) and [Turbo](https://turbo.build/), ensuring instant load times.
- **🔌 Developer Ready:** Every tool is designed with API integrations and embeddability in mind.
- **🌐 Multi-language:** Full support for Vietnamese and English with a centralized i18n architecture.

---

## 🌐 Internationalization (i18n) System

The project uses a centralized i18n architecture with the following features:

- **Centralized Dictionary:** All text content lives in `lib/i18n.ts`
- **Factory Functions:** Static data files like `tools-routes.ts` and `qr-types.ts` use factory pattern for i18n support
- **Locale-Aware Hooks:** Use `useLocale()` and `useDict()` for centralized language and dictionary access.
- **Toast System:** The `useToast()` notification system supports multi-language and reduces prop drilling.

### i18n Architecture

```
lib/
├── i18n.ts              # Master dictionary (VI/EN)
├── config.ts            # Centralized config (Locale, API_BASE)
├── tools-routes.ts      # Factory function getToolsRoutes(dict)
├── qr-types.ts          # Factory function getQRTypes(dict)
└── hooks/
    ├── useLocale.tsx    # Context provider for locale
    ├── useDict.ts       # Hook for quick dictionary access
    └── useToast.tsx     # Context & hook for notifications
```

---

## 🌟 Featured Tools

### 1. Advanced QR Code Generator

Generate fully customizable QR codes for various use cases. Unlike basic generators, we offer deep integration features.

**📌 9 Supported QR Code Types:**

| Type                    | Description                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| 🔗 **URL**              | Navigate to any website                                                                   |
| 📶 **WiFi**             | Share network credentials securely                                                        |
| 💳 **Payment (VietQR)** | Generate standardized payment QRs compatible with all Vietnamese banking apps (Napas 247) |
| 👤 **VCard**            | Share contact details instantly                                                           |
| 📅 **Event**            | Add calendar events with date, time, and location                                         |
| ✉️ **Email**            | Pre-compose emails with recipient, subject, and body                                      |
| 💬 **SMS**              | Pre-compose text messages to a phone number                                               |
| 📍 **Location**         | Share coordinates or Google Maps links                                                    |
| 📱 **App Store**        | Navigate to iOS App Store or Android Play Store                                           |

**⚙️ Key Capabilities:**

- **Customization:** Adjust size, error correction levels, and custom colors (foreground/background).
- **Logo Embedding:** Upload your brand logo or use a public logo URL.
- **📚 Full API Documentation:** The [QR Guide](/tools/free/qrcode/guide) page provides details on every API parameter with real-world examples.
- **📱 Mobile Optimized:** QR display and tables automatically scale perfectly on all screen sizes.
- **📊 Google Sheets Integration:** Use our unique **Embed API** (e.g., `=IMAGE(...)`) to generate QR codes dynamically directly inside your spreadsheets.
- **High-Res Export:** Download high-quality PNGs for print/web.

### 2. Precision Countdown Timer

A productivity-focused timer for events, pomodoros, and deadlines. Fully i18n-enabled with localized labels (Days/Hours/Minutes/Seconds) and buttons (Start/Pause/Reset).

---

## 💻 Tech Stack

This project is built using the latest modern web technologies:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Hooks + Context (useLocale)
- **Language:** TypeScript (Strict)
- **i18n:** Custom architecture with centralized dictionary

---

## 🛠️ Getting Started

Want to run this locally or contribute?

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/phobokhonghanh/dev_store.git
    cd dev_store
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    ```

3.  **Run the Tools app:**

    ```bash
    yarn dev --filter=tool
    ```

4.  Open [http://localhost:3003](http://localhost:3003) to see the magic!

---

## 🤝 Contributing

We welcome contributions! If you have an idea for a new tool or want to improve an existing one, please fork the repo and submit a PR.

**Ideas for new tools:**

- JSON Formatter/Validator
- Base64 Encoder/Decoder
- JWT Debugger
- CSS Gradient Generator

---

Made with ❤️ by [itc]
