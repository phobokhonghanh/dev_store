/**
 * I18n Type Definitions
 * All interfaces for translation dictionary structure
 */

// ============================================================================
// FORM DICTIONARIES
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

export interface VCardFormDict {
    description: string
    keyLabel: string
    contentLabel: string
    contentPlaceholder: string
    addField: string
    removeField: string
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
    bankPlaceholder: string
}

export interface EventFormDict {
    titleLabel: string
    titlePlaceholder: string
    startDateLabel: string
    endDateLabel: string
    locationLabel: string
    locationPlaceholder: string
    descriptionLabel: string
    descriptionPlaceholder: string
    locationModeMap: string
    locationModeManual: string
}

export interface EmailFormDict {
    emailLabel: string
    emailPlaceholder: string
    ccLabel: string
    ccPlaceholder: string
    bccLabel: string
    bccPlaceholder: string
    subjectLabel: string
    subjectPlaceholder: string
    bodyLabel: string
    bodyPlaceholder: string
    recipientsLimit: string
    listLabel: string
    addCcBcc: string
    hideCcBcc: string
    upgradeForMore: string
    enterToComplete: string
    charsCount: string
    charsCountWithLimit: string
    importCsv: string
}

export interface SmsFormDict {
    phoneLabel: string
    phonePlaceholder: string
    messageLabel: string
    messagePlaceholder: string
}

export interface AppStoreFormDict {
    iosLabel: string
    iosPlaceholder: string
    androidLabel: string
    androidPlaceholder: string
    note: string
}

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
// QR DICTIONARIES
// ============================================================================

export interface QRTabsDict {
    tabUrl: string
    tabWifi: string
    tabVcard: string
    tabPayment: string
    tabEvent: string
    tabEmail: string
    tabSms: string
    tabLocation: string
    tabAppStore: string
    urlLabel: string
    urlPlaceholder: string
    download: string
    copy: string
    copied: string
    share: string
}

export interface QRAppearanceDict {
    displayLogo: string
    displayText: string
    visualFrame: string
    frameText: string
    frameTextPlaceholder: string
    clearFrame: string
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
// PAGE DICTIONARIES
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

export interface SidebarNavDict {
    search: string
    searchDesc: string
    premium: string
    free: string
    firstTools: string
    firstToolsDesc: string
    secondTools: string
    secondToolsDesc: string
    premiumParent: string
    thirdTools: string
    countdownTimer: string
    countdownTimerDesc: string
    qrCodeGenerator: string
    qrCodeGeneratorDesc: string
}

export interface CountdownPageDict {
    title: string
    description: string
    years: string
    months: string
    days: string
    hours: string
    minutes: string
    seconds: string
    milliseconds: string
    showMilliseconds: string
    start: string
    pause: string
    continue: string
    reset: string
    clear: string
    keyboardShortcuts: string
    toggleStartPause: string
}

export interface FreeToolsPageDict {
    title: string
    description: string
    readyToUse: string
    defaultToolDesc: string
}

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
    sizeDesc: string
    darkDesc: string
    lightDesc: string
    levelDesc: string
    advancedSection: string
    advancedDesc: string
    textDesc: string
    renderTextDesc: string
    logoDesc: string
    logoUrlDesc: string
    logoNote: string
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

export interface HomePageDict {
    heroTitle: string
    heroTitleHighlight: string
    heroSubtitle: string
    exploreTools: string
    githubRepo: string
    pricingFreeTitle: string
    pricingFreePrice: string
    pricingFreeDescription: string
    pricingFreeFeatures: string[]
    pricingFreeButton: string
    pricingPremiumTitle: string
    pricingPremiumPrice: string
    pricingPremiumDescription: string
    pricingPremiumFeatures: string[]
    pricingPremiumButton: string
    periodMonth: string
}

export interface SearchPageDict {
    title: string
    subtitle: string
    placeholder: string
    filterAll: string
    filterFree: string
    filterPremium: string
    resultsTitle: string
    allToolsTitle: string
    noResults: string
    clearFilters: string
    openTool: string
    defaultToolDesc: string
}

export interface TimerDict {
    years: string
    months: string
    days: string
    hours: string
    minutes: string
    seconds: string
    milliseconds: string
}

export interface LogoManagerDict {
    activeLogo: string
    activeLogoDesc: string
    noLogoSelected: string
    presetLogos: string
    filterPlaceholder: string
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
    homePage: HomePageDict
    searchPage: SearchPageDict
    timer: TimerDict
    logoManager: LogoManagerDict
    embedSection: EmbedSectionDict
}

export interface EmbedSectionDict {
    enterContent: string
    copy: string
    copied: string
    copySuccess: string
    copyError: string
    googleSheets: string
    postWarning: string
    viewGuide: string
}
