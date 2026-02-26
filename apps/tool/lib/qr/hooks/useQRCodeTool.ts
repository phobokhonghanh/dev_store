import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useDownload } from '@/lib/hooks/useDownload'
import { useClipboard } from '@/lib/hooks/useClipboard'
import { useQRAppearance } from './useQRAppearance'
import { useQREmbed } from './useQREmbed'
import type { QRType } from '@/components/tools/qrcode/QRCodeTabs'

/**
 * Custom hook to manage the state and logic for the QR Code Generator page.
 * Encapsulates QR content, appearance, logo management, and asset generation.
 * 
 * Logo Management Strategy:
 * - `uploadedLogo`: Stores a Data URL from file uploads. Has highest priority.
 * - `detectedLogo`: Stores a URL from auto-detection (Clearbit/fallback). Lower priority.
 * - `effectiveLogo`: The final logo to render, prioritizing uploadedLogo.
 */
export function useQRCodeTool() {
    const searchParams = useSearchParams()

    // --- 1. QR Content State ---
    const [qrValue, setQrValue] = useState('')
    const [displayText, setDisplayText] = useState('')
    const [qrType, setQrType] = useState<QRType>('url')
    const [qrRawData, setQrRawData] = useState<any>(null)
    const [renderText, setRenderText] = useState(true)
    const [frameText, setFrameText] = useState('')

    // --- 2. Logo Management (Refactored: Separate states) ---
    const [showLogo, setShowLogo] = useState(true)
    /** User-uploaded logo (Data URL). Highest priority. */
    const [uploadedLogo, setUploadedLogo] = useState<string | null>(null)
    /** Auto-detected logo from URL (e.g., Clearbit). Lower priority. */
    const [detectedLogo, setDetectedLogo] = useState<string | null>(null)

    // --- 3. Appearance Setup ---
    const appearance = useQRAppearance()
    const { size, fgColor, bgColor } = appearance

    // --- 4. Asset Generation ---
    const { embedUrl, sheetsFormula } = useQREmbed({
        value: qrValue,
        type: qrType,
        size,
        fgColor,
        bgColor,
        rawData: qrRawData,
    })

    // --- 5. UI Helpers (Toast, Download, Clipboard) ---
    const [toast, setToast] = useState<{ message: string; visible: boolean }>({
        message: '',
        visible: false,
    })

    const { downloadCanvas } = useDownload()
    const qrRef = useRef<HTMLDivElement>(null)

    const showToast = useCallback((message: string) => {
        setToast({ message, visible: true })
    }, [])

    const hideToast = useCallback(() => {
        setToast((prev) => ({ ...prev, visible: false }))
    }, [])

    const { copy: copyToClipboard } = useClipboard({
        onSuccess: () => showToast('Content copied to clipboard!'),
        onError: () => showToast('Failed to copy content.'),
        timeout: 1500,
    })

    // --- 6. Effects & derived state ---
    useEffect(() => {
        const text = searchParams.get('text')
        const url = searchParams.get('url')

        if (text) {
            setQrValue(text)
            setDisplayText(text)
        } else if (url) {
            setQrValue(url)
            setDisplayText(url)
        }
    }, [searchParams])

    /**
     * Effective logo resolution: Upload > Detected > None
     * Only applies when showLogo is true and qrType is 'url'.
     */
    const effectiveLogo = showLogo && qrType === 'url'
        ? (uploadedLogo || detectedLogo || null)
        : null

    /**
     * Clears the uploaded logo (use when user clicks "Remove" on their upload).
     */
    const clearUploadedLogo = useCallback(() => {
        setUploadedLogo(null)
    }, [])

    const handleDownload = useCallback(() => {
        const canvas = qrRef.current?.querySelector('canvas')
        if (canvas) {
            downloadCanvas(canvas, `qrcode-${qrType}-${Date.now()}.png`)
        }
    }, [downloadCanvas, qrType])

    return {
        // QR Content State
        qrValue,
        setQrValue,
        displayText,
        setDisplayText,
        qrType,
        setQrType,
        qrRawData,
        setQrRawData,
        renderText,
        setRenderText,
        frameText,
        setFrameText,

        // Logo State
        showLogo,
        setShowLogo,
        uploadedLogo,
        setUploadedLogo,
        detectedLogo,
        setDetectedLogo,
        effectiveLogo,
        clearUploadedLogo,

        // Appearance & Embed
        appearance,
        embedUrl,
        sheetsFormula,

        // UI Helpers
        toast,
        qrRef,
        showToast,
        hideToast,
        copyToClipboard,
        handleDownload,
    }
}
