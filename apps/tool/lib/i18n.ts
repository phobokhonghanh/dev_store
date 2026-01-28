import type { SupportedLocale } from './config'

/**
 * Master I18n Dictionary
 * Contains all user-facing strings for the entire apps/tool application
 */

// ============================================================================
// WIFI FORM
// ============================================================================
export interface WifiFormDict {
  ssidLabel: string
  ssidPlaceholder: string
  passwordLabel: string
  passwordPlaceholder: string
  encryptionLabel: string
  encryptionWPA: string
  encryptionWEP: string
  encryptionNone: string
  hiddenNetwork: string
}

// ============================================================================
// VCARD FORM
// ============================================================================
export interface VCardFormDict {
  description: string
  keyLabel: string
  contentLabel: string
  contentPlaceholder: string
  addField: string
  removeField: string
  // Predefined keys
  keyFullName: string
  keyPhone: string
  keyEmail: string
  keyWebsite: string
  keyAddress: string
  keyCompany: string
  keyJobTitle: string
  keyNote: string
  keyRawText: string
}

// ============================================================================
// PAYMENT FORM
// ============================================================================
export interface PaymentFormDict {
  bankLabel: string
  accountLabel: string
  accountPlaceholder: string
  amountLabel: string
  amountPlaceholder: string
  accountNameLabel: string
  accountNamePlaceholder: string
  messageLabel: string
  messagePlaceholder: string
}

// ============================================================================
// EVENT FORM
// ============================================================================
export interface EventFormDict {
  titleLabel: string
  titlePlaceholder: string
  startDateLabel: string
  endDateLabel: string
  locationLabel: string
  locationPlaceholder: string
  descriptionLabel: string
  descriptionPlaceholder: string
}

// ============================================================================
// EMAIL FORM
// ============================================================================
export interface EmailFormDict {
  emailLabel: string
  emailPlaceholder: string
  subjectLabel: string
  subjectPlaceholder: string
  bodyLabel: string
  bodyPlaceholder: string
}

// ============================================================================
// SMS FORM
// ============================================================================
export interface SmsFormDict {
  phoneLabel: string
  phonePlaceholder: string
  messageLabel: string
  messagePlaceholder: string
}

// ============================================================================
// APP STORE FORM
// ============================================================================
export interface AppStoreFormDict {
  iosLabel: string
  iosPlaceholder: string
  androidLabel: string
  androidPlaceholder: string
  note: string
}

// ============================================================================
// LOCATION FORM
// ============================================================================
export interface LocationFormDict {
  mapProvider: string
  mapProviderGoogle: string
  mapProviderOSM: string
  searchLabel: string
  searchPlaceholderGoogle: string
  searchPlaceholderOSM: string
  getCurrentLocation: string
  loadingMap: string
  tip: string
  googleMapsLink: string
  googleMapsDesc: string
  latitude: string
  longitude: string
  comingSoon: string
  errorGeolocation: string
  errorGeolocationNotSupported: string
  errorSearchFailed: string
  errorNoResults: string
  errorGoogleNotConfigured: string
  switchToOSM: string
  detectingLocation: string
}

// ============================================================================
// QR TABS / GENERAL
// ============================================================================
export interface QRTabsDict {
  // Tab names
  tabUrl: string
  tabWifi: string
  tabVcard: string
  tabPayment: string
  tabEvent: string
  tabEmail: string
  tabSms: string
  tabLocation: string
  tabAppStore: string
  // URL tab
  urlLabel: string
  urlPlaceholder: string
  // Actions
  download: string
  copy: string
  copied: string
  share: string
}

// ============================================================================
// QR APPEARANCE FORM
// ============================================================================
export interface QRAppearanceDict {
  // Toggles
  displayLogo: string
  displayText: string
  autoDetect: string
  // Visual Frame section
  visualFrame: string
  frameText: string
  frameTextPlaceholder: string
  clearFrame: string
  // Advanced section
  advancedCustomization: string
  qrCodeSize: string
  dotsColor: string
  background: string
  errorCorrection: string
  errorCorrectionLow: string
  errorCorrectionMedium: string
  errorCorrectionQuartile: string
  errorCorrectionHigh: string
  errorCorrectionNote: string
}

// ============================================================================
// COMMON / SHARED
// ============================================================================
export interface CommonDict {
  loading: string
  error: string
  save: string
  cancel: string
  confirm: string
  optional: string
  displaySettings: string
}

// ============================================================================
// MASTER DICTIONARY TYPE
// ============================================================================
export interface AppDict {
  common: CommonDict
  qrTabs: QRTabsDict
  qrAppearance: QRAppearanceDict
  wifi: WifiFormDict
  vcard: VCardFormDict
  payment: PaymentFormDict
  event: EventFormDict
  email: EmailFormDict
  sms: SmsFormDict
  appStore: AppStoreFormDict
  location: LocationFormDict
  sidebar: SidebarNavDict
  countdownPage: CountdownPageDict
  freeToolsPage: FreeToolsPageDict
  qrCodePage: QRCodePageDict
  qrGuidePage: QRGuidePageDict
}

// ============================================================================
// QR CODE PAGE
// ============================================================================
export interface QRCodePageDict {
  downloadPng: string
  copy: string
  copied: string
  faqTitle: string
  embedTitle: string
  sheetFormula: string
  directUrl: string
  viewGuide: string
  customLogoLabel: string
  customLogoDesc: string
  faq1: string
  faq2: string
  faq3: string
  faq4: string
}

// ============================================================================
// QR GUIDE PAGE
// ============================================================================
export interface QRGuidePageDict {
  title: string
  description: string
  apiParams: string
  paramCol: string
  typeCol: string
  descCol: string
  defaultCol: string
  apiExample: string
  sheetsFormula: string
  sheetsFormulaNote: string
  customizeSection: string
  customizeDesc: string
  try: string
  // Appearance params
  sizeDesc: string
  darkDesc: string
  lightDesc: string
  levelDesc: string
  // Advanced options
  advancedSection: string
  advancedDesc: string
  textDesc: string
  renderTextDesc: string
  logoDesc: string
  logoUrlDesc: string
  logoNote: string
  // QR Types
  urlTitle: string
  urlDesc: string
  wifiTitle: string
  wifiDesc: string
  vcardTitle: string
  vcardDesc: string
  paymentTitle: string
  paymentDesc: string
  eventTitle: string
  eventDesc: string
  emailTitle: string
  emailDesc: string
  smsTitle: string
  smsDesc: string
  locationTitle: string
  locationDesc: string
  appstoreTitle: string
  appstoreDesc: string
}

// ============================================================================
// COUNTDOWN PAGE
// ============================================================================
export interface CountdownPageDict {
  title: string
  description: string
  days: string
  hours: string
  minutes: string
  seconds: string
  start: string
  pause: string
  continue: string
  reset: string
  clear: string
  keyboardShortcuts: string
  toggleStartPause: string
}

// ============================================================================
// FREE TOOLS PAGE
// ============================================================================
export interface FreeToolsPageDict {
  title: string
  description: string
  readyToUse: string
  defaultToolDesc: string
}

// ============================================================================
// SIDEBAR NAVIGATION
// ============================================================================
export interface SidebarNavDict {
  search: string
  searchDesc: string
  premium: string
  free: string
  // Premium items
  firstTools: string
  firstToolsDesc: string
  secondTools: string
  secondToolsDesc: string
  premiumParent: string
  thirdTools: string
  // Free items
  countdownTimer: string
  countdownTimerDesc: string
  qrCodeGenerator: string
  qrCodeGeneratorDesc: string
}

// ============================================================================
// VIETNAMESE (DEFAULT)
// ============================================================================
const VI: AppDict = {
  sidebar: {
    search: 'Tìm kiếm',
    searchDesc: 'Tìm công cụ phù hợp với nhu cầu của bạn',
    premium: 'Cao cấp',
    free: 'Miễn phí',
    firstTools: 'Công cụ 1',
    firstToolsDesc: 'Công cụ cao cấp sẵn sàng cho production',
    secondTools: 'Công cụ 2',
    secondToolsDesc: 'Tiện ích cấp doanh nghiệp cho các tác vụ phức tạp',
    premiumParent: 'Công cụ Cha',
    thirdTools: 'Công cụ 3',
    countdownTimer: 'Đồng hồ đếm ngược',
    countdownTimerDesc: 'Đếm ngược chính xác cho năng suất và sự kiện',
    qrCodeGenerator: 'Tạo mã QR',
    qrCodeGeneratorDesc: 'Tạo mã QR tùy chỉnh với văn bản và logo',
  },
  common: {
    loading: 'Đang tải...',
    error: 'Lỗi',
    save: 'Lưu',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    optional: 'Tùy chọn',
    displaySettings: 'Cài đặt hiển thị',
  },
  qrTabs: {
    tabUrl: 'URL',
    tabWifi: 'WiFi',
    tabVcard: 'Danh thiếp',
    tabPayment: 'Chuyển khoản',
    tabEvent: 'Sự kiện',
    tabEmail: 'Email',
    tabSms: 'SMS',
    tabLocation: 'Bản đồ',
    tabAppStore: 'App Store',
    urlLabel: 'Địa chỉ URL',
    urlPlaceholder: 'https://example.com',
    download: 'Tải xuống',
    copy: 'Sao chép',
    copied: 'Đã sao chép!',
    share: 'Chia sẻ',
  },
  qrAppearance: {
    displayLogo: 'Hiển thị Logo',
    displayText: 'Hiển thị văn bản',
    autoDetect: 'Tự động nhận diện',
    visualFrame: 'Khung hình',
    frameText: 'Văn bản khung',
    frameTextPlaceholder: 'Ví dụ: QUÉT TÔI',
    clearFrame: 'Xóa khung',
    advancedCustomization: 'Tùy chỉnh nâng cao',
    qrCodeSize: 'Kích thước mã QR',
    dotsColor: 'Màu chấm',
    background: 'Màu nền',
    errorCorrection: 'Độ chính xác sửa lỗi',
    errorCorrectionLow: 'Thấp (phục hồi 7%)',
    errorCorrectionMedium: 'Trung bình (phục hồi 15%)',
    errorCorrectionQuartile: 'Khá (phục hồi 25%)',
    errorCorrectionHigh: 'Cao (phục hồi 30%)',
    errorCorrectionNote:
      'Độ chính xác cao hơn giúp mã QR chịu được hư hỏng hoặc logo lớn.',
  },
  wifi: {
    ssidLabel: 'SSID (Tên mạng)',
    ssidPlaceholder: 'Tên WiFi của bạn',
    passwordLabel: 'Mật khẩu',
    passwordPlaceholder: 'Mật khẩu',
    encryptionLabel: 'Mã hóa',
    encryptionWPA: 'WPA/WPA2',
    encryptionWEP: 'WEP',
    encryptionNone: 'Không mật khẩu',
    hiddenNetwork: 'Mạng ẩn',
  },
  vcard: {
    description: 'Tạo danh thiếp điện tử (VCard).',
    keyLabel: 'Trường',
    contentLabel: 'Nội dung',
    contentPlaceholder: 'Nhập giá trị',
    addField: 'Thêm trường',
    removeField: 'Xóa trường',
    keyFullName: 'Họ và tên',
    keyPhone: 'Điện thoại',
    keyEmail: 'Email',
    keyWebsite: 'Website',
    keyAddress: 'Địa chỉ',
    keyCompany: 'Công ty',
    keyJobTitle: 'Chức vụ',
    keyNote: 'Ghi chú',
    keyRawText: 'Văn bản thô',
  },
  payment: {
    bankLabel: 'Ngân hàng',
    accountLabel: 'Số tài khoản',
    accountPlaceholder: '0123456789',
    amountLabel: 'Số tiền (Tùy chọn)',
    amountPlaceholder: '50000',
    accountNameLabel: 'Tên chủ tài khoản',
    accountNamePlaceholder: 'NGUYEN VAN A',
    messageLabel: 'Nội dung chuyển khoản',
    messagePlaceholder: 'Thanh toán cho...',
  },
  event: {
    titleLabel: 'Tiêu đề sự kiện',
    titlePlaceholder: 'Tiệc sinh nhật',
    startDateLabel: 'Ngày bắt đầu',
    endDateLabel: 'Ngày kết thúc',
    locationLabel: 'Địa điểm',
    locationPlaceholder: '123 Đường ABC',
    descriptionLabel: 'Mô tả',
    descriptionPlaceholder: 'Hãy đến và vui chơi cùng nhau!',
  },
  email: {
    emailLabel: 'Địa chỉ Email',
    emailPlaceholder: 'example@mail.com',
    subjectLabel: 'Tiêu đề',
    subjectPlaceholder: 'Yêu cầu hỗ trợ',
    bodyLabel: 'Nội dung',
    bodyPlaceholder: 'Xin chào...',
  },
  sms: {
    phoneLabel: 'Số điện thoại',
    phonePlaceholder: '+84 123 456 789',
    messageLabel: 'Tin nhắn',
    messagePlaceholder: 'Xin chào!',
  },
  appStore: {
    iosLabel: 'iOS App Store URL',
    iosPlaceholder: 'https://apps.apple.com/...',
    androidLabel: 'Android Play Store URL',
    androidPlaceholder: 'https://play.google.com/store/...',
    note: 'Lưu ý: Công cụ này mặc định mã hóa iOS URL nếu cả hai được cung cấp.',
  },
  location: {
    mapProvider: 'Nhà cung cấp bản đồ:',
    mapProviderGoogle: 'Google',
    mapProviderOSM: 'OSM (Miễn phí)',
    searchLabel: 'Tìm kiếm vị trí',
    searchPlaceholderGoogle: 'Tìm kiếm với Google Maps...',
    searchPlaceholderOSM: 'Tìm kiếm địa chỉ (Nhấn Enter)...',
    getCurrentLocation: 'Lấy vị trí hiện tại',
    loadingMap: 'Đang tải bản đồ...',
    tip: 'Mẹo: Nhấp vào bản đồ hoặc kéo dấu mốc để định vị chính xác.',
    googleMapsLink: 'Sử dụng liên kết Google Maps (Khuyên dùng)',
    googleMapsDesc:
      'Tạo liên kết web chuẩn xác giúp người dùng mở được trên cả trình duyệt và ứng dụng di động. Nếu tắt, mã QR sẽ chỉ chứa tọa độ thuần (Geo URI).',
    latitude: 'Vĩ độ',
    longitude: 'Kinh độ',
    comingSoon: 'Tính năng này sẽ sớm ra mắt',
    errorGeolocation: 'Không thể lấy vị trí hiện tại.',
    errorGeolocationNotSupported: 'Trình duyệt không hỗ trợ xác định vị trí.',
    errorSearchFailed: 'Tìm kiếm thất bại. Vui lòng thử lại.',
    errorNoResults: 'Không tìm thấy kết quả.',
    errorGoogleNotConfigured: 'Google Maps chưa được cấu hình.',
    switchToOSM: 'Thử chuyển sang chế độ OSM (Miễn phí).',
    detectingLocation: 'Đang xác định vị trí của bạn...',
  },
  countdownPage: {
    title: 'Đồng hồ đếm ngược',
    description:
      'Đặt bất kỳ khoảng thời gian nào và đếm ngược theo thời gian thực.',
    days: 'Ngày',
    hours: 'Giờ',
    minutes: 'Phút',
    seconds: 'Giây',
    start: 'Bắt đầu',
    pause: 'Tạm dừng',
    continue: 'Tiếp tục',
    reset: 'Đặt lại',
    clear: 'Xóa',
    keyboardShortcuts: 'Phím tắt',
    toggleStartPause: 'Bật/Tắt Bắt đầu/Tạm dừng',
  },
  freeToolsPage: {
    title: 'Công cụ miễn phí cho Lập trình viên',
    description:
      'Các công cụ chất lượng cao, tập trung vào quyền riêng tư, được thiết kế để đơn giản hóa các tác vụ phát triển hàng ngày của bạn. Không đăng ký, không quảng cáo, chỉ tập trung.',
    readyToUse: 'Sẵn sàng sử dụng',
    defaultToolDesc:
      'Công cụ nhanh chóng và hiệu quả để tăng năng suất của bạn.',
  },
  qrCodePage: {
    downloadPng: 'Tải PNG',
    copy: 'Sao chép',
    copied: 'Đã sao chép!',
    faqTitle: 'Câu hỏi thường gặp & Tích hợp',
    embedTitle: 'Nhúng tích hợp',
    sheetFormula: 'Công thức Sheet',
    directUrl: 'URL trực tiếp',
    viewGuide: 'Xem hướng dẫn',
    customLogoLabel: 'Logo tùy chỉnh',
    customLogoDesc: 'Tải lên hình ảnh tùy chỉnh cho vị trí trung tâm',
    faq1: 'Cách sử dụng trong Google Sheets?',
    faq2: 'Tôi có thể thay đổi màu mã QR không?',
    faq3: 'Tích hợp với các ứng dụng khác?',
    faq4: 'Có được sử dụng thương mại không?',
  },
  qrGuidePage: {
    title: 'Hướng dẫn Sử dụng QR Code Generator',
    description:
      'Tìm hiểu cách tạo mã QR cho từng mục đích sử dụng, tích hợp API và Google Sheets.',
    apiParams: 'Tham số API',
    paramCol: 'Tham số',
    typeCol: 'Kiểu',
    descCol: 'Mô tả',
    defaultCol: 'Mặc định',
    apiExample: 'Ví dụ API Request',
    sheetsFormula: 'Google Sheets Formula',
    sheetsFormulaNote:
      'Thay A2, B2 bằng ô chứa dữ liệu tương ứng trong bảng tính của bạn.',
    customizeSection: 'Tùy chỉnh giao diện',
    customizeDesc:
      'Tùy chỉnh màu sắc, kích thước và các thuộc tính hiển thị của mã QR.',
    try: 'Dùng thử ngay',
    sizeDesc: 'Kích thước ảnh (px)',
    darkDesc: 'Màu mã QR (foreground)',
    lightDesc: 'Màu nền (background)',
    levelDesc: 'Mức sửa lỗi: L (7%), M (15%), Q (25%), H (30%)',
    advancedSection: 'Tùy chọn nâng cao',
    advancedDesc: 'Thêm văn bản khung, logo và các tùy chỉnh khác cho mã QR.',
    textDesc: 'Văn bản hiển thị dưới mã QR (VD: SCAN ME)',
    renderTextDesc: 'Bật/tắt hiển thị văn bản. 1 = hiển thị, 0 = ẩn',
    logoDesc: 'Hiển thị logo ở giữa mã QR. 1 = hiển thị, 0 = ẩn',
    logoUrlDesc: 'URL hình ảnh logo (PNG/JPG, khuyến nghị 50-80px)',
    logoNote:
      'Logo phải được host công khai (public URL). Kích thước khuyến nghị: 50-80px.',
    urlTitle: 'Link Website (URL)',
    urlDesc:
      'Điều hướng người dùng đến bất kỳ trang web nào. Khi quét, trình duyệt sẽ mở liên kết ngay lập tức.',
    wifiTitle: 'Mạng WiFi',
    wifiDesc:
      'Cho phép người dùng kết nối vào mạng WiFi mà không cần nhập mật khẩu thủ công. Rất tiện lợi cho quán cà phê, khách sạn, văn phòng.',
    vcardTitle: 'Danh thiếp (VCard)',
    vcardDesc:
      'Lưu thông tin liên lạc vào danh bạ điện thoại chỉ bằng 1 cú quét. Hỗ trợ tên, số điện thoại, email, website, địa chỉ.',
    paymentTitle: 'Chuyển khoản (VietQR)',
    paymentDesc:
      'Tạo mã thanh toán ngân hàng theo chuẩn Napas 247. Hỗ trợ hơn 40 ngân hàng Việt Nam.',
    eventTitle: 'Sự kiện (Event)',
    eventDesc:
      'Thêm sự kiện vào ứng dụng Lịch. Bao gồm tiêu đề, thời gian bắt đầu/kết thúc, địa điểm và mô tả.',
    emailTitle: 'Gửi Email',
    emailDesc: 'Tạo sẵn thư nháp với địa chỉ nhận, tiêu đề và nội dung.',
    smsTitle: 'Gửi SMS',
    smsDesc: 'Soạn sẵn tin nhắn đến số điện thoại chỉ định.',
    locationTitle: 'Vị trí (Map)',
    locationDesc:
      'Chia sẻ tọa độ địa lý. Hỗ trợ cả định dạng GEO URI chuẩn và link Google Maps.',
    appstoreTitle: 'Cửa hàng ứng dụng (App Store)',
    appstoreDesc:
      'Điều hướng đến trang tải ứng dụng trên iOS App Store hoặc Android Play Store.',
  },
}

// ============================================================================
// ENGLISH
// ============================================================================
const EN: AppDict = {
  sidebar: {
    search: 'Search',
    searchDesc: 'Find the right tool for your development needs',
    premium: 'Premium',
    free: 'Free',
    firstTools: 'First tools',
    firstToolsDesc: 'Advanced production-ready premium tool',
    secondTools: 'Second tools',
    secondToolsDesc: 'Enterprise grade utility for complex tasks',
    premiumParent: 'Premium parent',
    thirdTools: 'Third tools',
    countdownTimer: 'Countdown Timer',
    countdownTimerDesc: 'Precise countdown timer for productivity and events',
    qrCodeGenerator: 'QR Code Generator',
    qrCodeGeneratorDesc: 'Generate customizable QR codes with text and logos',
  },
  common: {
    loading: 'Loading...',
    error: 'Error',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    optional: 'Optional',
    displaySettings: 'Display Settings',
  },
  qrTabs: {
    tabUrl: 'URL',
    tabWifi: 'WiFi',
    tabVcard: 'VCard',
    tabPayment: 'Transfer',
    tabEvent: 'Event',
    tabEmail: 'Email',
    tabSms: 'SMS',
    tabLocation: 'Map',
    tabAppStore: 'App Store',
    urlLabel: 'URL Address',
    urlPlaceholder: 'https://example.com',
    download: 'Download',
    copy: 'Copy',
    copied: 'Copied!',
    share: 'Share',
  },
  qrAppearance: {
    displayLogo: 'Display Logo',
    displayText: 'Display Text',
    autoDetect: 'Auto Detect',
    visualFrame: 'Visual Frame',
    frameText: 'Frame Text',
    frameTextPlaceholder: 'e.g. SCAN ME',
    clearFrame: 'Clear Frame',
    advancedCustomization: 'Advanced Customization',
    qrCodeSize: 'QR Code Size',
    dotsColor: 'Dots Color',
    background: 'Background',
    errorCorrection: 'Error Correction Precision',
    errorCorrectionLow: 'Low (7% recovery)',
    errorCorrectionMedium: 'Medium (15% recovery)',
    errorCorrectionQuartile: 'Quartile (25% recovery)',
    errorCorrectionHigh: 'High (30% recovery)',
    errorCorrectionNote:
      'Higher precision allows the QR code to survive damage or large logos.',
  },
  wifi: {
    ssidLabel: 'SSID (Network Name)',
    ssidPlaceholder: 'My WiFi',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Password',
    encryptionLabel: 'Encryption',
    encryptionWPA: 'WPA/WPA2',
    encryptionWEP: 'WEP',
    encryptionNone: 'No Password',
    hiddenNetwork: 'Hidden Network',
  },
  vcard: {
    description: 'Create a contact card (VCard).',
    keyLabel: 'Key',
    contentLabel: 'Content',
    contentPlaceholder: 'Enter value',
    addField: 'Add Field',
    removeField: 'Remove field',
    keyFullName: 'Full Name',
    keyPhone: 'Phone',
    keyEmail: 'Email',
    keyWebsite: 'Website',
    keyAddress: 'Address',
    keyCompany: 'Company',
    keyJobTitle: 'Job Title',
    keyNote: 'Note',
    keyRawText: 'Raw Text (data)',
  },
  payment: {
    bankLabel: 'Bank',
    accountLabel: 'Account No.',
    accountPlaceholder: '0123456789',
    amountLabel: 'Amount (Optional)',
    amountPlaceholder: '50000',
    accountNameLabel: 'Account Name',
    accountNamePlaceholder: 'JOHN DOE',
    messageLabel: 'Message (Content)',
    messagePlaceholder: 'Payment for...',
  },
  event: {
    titleLabel: 'Event Title',
    titlePlaceholder: 'Birthday Party',
    startDateLabel: 'Start Date',
    endDateLabel: 'End Date',
    locationLabel: 'Location',
    locationPlaceholder: '123 Party Lane',
    descriptionLabel: 'Description',
    descriptionPlaceholder: 'Join us for fun!',
  },
  email: {
    emailLabel: 'Email Address',
    emailPlaceholder: 'example@mail.com',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'Inquiry',
    bodyLabel: 'Body',
    bodyPlaceholder: 'Hello...',
  },
  sms: {
    phoneLabel: 'Phone Number',
    phonePlaceholder: '+84 123 456 789',
    messageLabel: 'Message',
    messagePlaceholder: 'Hi there!',
  },
  appStore: {
    iosLabel: 'iOS App Store URL',
    iosPlaceholder: 'https://apps.apple.com/...',
    androidLabel: 'Android Play Store URL',
    androidPlaceholder: 'https://play.google.com/store/...',
    note: 'Note: This tool currently encodes the iOS URL by default if both are provided.',
  },
  location: {
    mapProvider: 'Map Provider:',
    mapProviderGoogle: 'Google',
    mapProviderOSM: 'OSM (Free)',
    searchLabel: 'Search Location',
    searchPlaceholderGoogle: 'Search with Google Maps...',
    searchPlaceholderOSM: 'Search address (Press Enter)...',
    getCurrentLocation: 'Get Current Location',
    loadingMap: 'Loading Map...',
    tip: 'Tip: Click on map or drag marker to pinpoint location.',
    googleMapsLink: 'Use Google Maps Link (Recommended)',
    googleMapsDesc:
      'Creates a precise web link that opens on both browsers and mobile apps. If off, the QR code will only contain raw coordinates (Geo URI).',
    latitude: 'Latitude',
    longitude: 'Longitude',
    comingSoon: 'This feature is coming soon',
    errorGeolocation: 'Could not get current location.',
    errorGeolocationNotSupported:
      'Geolocation is not supported by this browser.',
    errorSearchFailed: 'Search failed. Please try again.',
    errorNoResults: 'No results found.',
    errorGoogleNotConfigured: 'Google Maps is not configured.',
    switchToOSM: 'Try switching to OSM (Free) mode.',
    detectingLocation: 'Detecting your location...',
  },
  countdownPage: {
    title: 'Countdown Timer',
    description: 'Set any duration and count down in real time.',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    start: 'Start',
    pause: 'Pause',
    continue: 'Continue',
    reset: 'Reset',
    clear: 'Clear',
    keyboardShortcuts: 'Keyboard Shortcuts',
    toggleStartPause: 'Toggle Start/Pause',
  },
  freeToolsPage: {
    title: 'Free Developer Utilities',
    description:
      'High-quality, privacy-focused tools designed to simplify your daily development tasks. No registration, no ads, just focus.',
    readyToUse: 'Ready to Use',
    defaultToolDesc: 'Quick and efficient tool to boost your productivity.',
  },
  qrCodePage: {
    downloadPng: 'Download PNG',
    copy: 'Copy',
    copied: 'Copied!',
    faqTitle: 'FAQ & Integration',
    embedTitle: 'Embed Integration',
    sheetFormula: 'Sheet Formula',
    directUrl: 'Direct URL',
    viewGuide: 'View Guide',
    customLogoLabel: 'Custom Logo Overlay',
    customLogoDesc: 'Upload a custom image for the center',
    faq1: 'How to use in Google Sheets?',
    faq2: 'Can I change QR colors?',
    faq3: 'Integration with other apps?',
    faq4: 'Commercial usage allowed?',
  },
  qrGuidePage: {
    title: 'QR Code Generator Guide',
    description:
      'Learn how to create QR codes for various purposes, integrate with API and Google Sheets.',
    apiParams: 'API Parameters',
    paramCol: 'Parameter',
    typeCol: 'Type',
    descCol: 'Description',
    defaultCol: 'Default',
    apiExample: 'API Request Example',
    sheetsFormula: 'Google Sheets Formula',
    sheetsFormulaNote:
      'Replace A2, B2 with the cells containing corresponding data in your spreadsheet.',
    customizeSection: 'Customize Appearance',
    customizeDesc: 'Adjust colors, size and display properties of the QR code.',
    try: 'Try Now',
    sizeDesc: 'Image size (px)',
    darkDesc: 'QR code color (foreground)',
    lightDesc: 'Background color',
    levelDesc: 'Error correction: L (7%), M (15%), Q (25%), H (30%)',
    advancedSection: 'Advanced Options',
    advancedDesc:
      'Add frame text, logo and other customizations to your QR code.',
    textDesc: 'Text displayed below QR code (e.g., SCAN ME)',
    renderTextDesc: 'Enable/disable text display. 1 = show, 0 = hide',
    logoDesc: 'Display logo in center of QR code. 1 = show, 0 = hide',
    logoUrlDesc: 'URL of logo image (PNG/JPG, recommended 50-80px)',
    logoNote:
      'Logo must be publicly hosted (public URL). Recommended size: 50-80px.',
    urlTitle: 'Website Link (URL)',
    urlDesc:
      'Navigate users to any website. When scanned, the browser will open the link instantly.',
    wifiTitle: 'WiFi Network',
    wifiDesc:
      'Allow users to connect to WiFi without manually entering password. Great for cafes, hotels, offices.',
    vcardTitle: 'Business Card (VCard)',
    vcardDesc:
      'Save contact information to phone contacts with a single scan. Supports name, phone, email, website, address.',
    paymentTitle: 'Bank Transfer (VietQR)',
    paymentDesc:
      'Generate bank payment QR codes following Napas 247 standard. Supports 40+ Vietnamese banks.',
    eventTitle: 'Calendar Event',
    eventDesc:
      'Add events to Calendar app. Includes title, start/end time, location and description.',
    emailTitle: 'Send Email',
    emailDesc: 'Pre-compose emails with recipient address, subject and body.',
    smsTitle: 'Send SMS',
    smsDesc: 'Pre-compose text messages to a specified phone number.',
    locationTitle: 'Location (Map)',
    locationDesc:
      'Share geographic coordinates. Supports both standard GEO URI format and Google Maps links.',
    appstoreTitle: 'App Store',
    appstoreDesc:
      'Navigate to app download page on iOS App Store or Android Play Store.',
  },
}

// ============================================================================
// DICTIONARY REGISTRY
// ============================================================================
export const I18N: Record<SupportedLocale, AppDict> = {
  vi: VI,
  en: EN,
}

/**
 * Get the complete dictionary for a locale
 */
export function getAppDict(locale: SupportedLocale): AppDict {
  return I18N[locale]
}

/**
 * Legacy function for LocationForm compatibility
 * @deprecated Use getAppDict(locale).location instead
 */
export function getDict(locale: SupportedLocale): LocationFormDict {
  return I18N[locale].location
}
