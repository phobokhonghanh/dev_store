import { Field, Input } from '../../../form'
import { getAppDict } from '@/lib/i18n'
import type { SupportedLocale } from '@/lib/config'
import { useMemo, useEffect, useRef, useState } from 'react'
import { cn } from '@origini/libs/utils'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

interface UrlFormProps {
    data: string
    onChange: (val: string) => void
    locale: SupportedLocale
    /** Callback when a logo URL is auto-detected (or null if not found) */
    onDetectLogo?: (url: string | null) => void
}

/** URL validation result */
type UrlStatus = 'idle' | 'valid' | 'invalid'

/** Logo detection state */
type LogoDetectionState = 'idle' | 'detecting' | 'found' | 'not-found'

/**
 * Validates a URL string and returns its status.
 */
function validateUrl(input: string): UrlStatus {
    if (!input) return 'idle'
    try {
        const urlString = input.startsWith('http') ? input : `https://${input}`
        const url = new URL(urlString)
        return url.hostname.includes('.') ? 'valid' : 'invalid'
    } catch {
        return 'invalid'
    }
}

/**
 * URL Form component for QR Code Generator.
 * 
 * Features:
 * - Real-time URL validation with visual indicators
 * - Auto-detection of website logos using Clearbit Logo API
 * - Loading spinner during logo detection
 * - Error/success feedback for logo detection
 * - Debounced to avoid excessive API calls
 */
export function UrlForm({ data, onChange, locale, onDetectLogo }: UrlFormProps) {
    const dict = useMemo(() => getAppDict(locale as SupportedLocale), [locale])

    // Validation state
    const [urlStatus, setUrlStatus] = useState<UrlStatus>('idle')

    // Logo detection state
    const [logoState, setLogoState] = useState<LogoDetectionState>('idle')

    // Track the last detected domain to avoid duplicate detections
    const lastDetectedDomain = useRef<string | null>(null)

    // URL validation effect (instant)
    useEffect(() => {
        setUrlStatus(validateUrl(data))
    }, [data])

    /**
     * Auto-detect logo from URL - Clearbit only, no fallback.
     */
    useEffect(() => {
        if (!data || !onDetectLogo) {
            setLogoState('idle')
            return
        }

        // Debounce: wait 500ms after user stops typing
        const timeoutId = setTimeout(async () => {
            try {
                // Parse URL
                const urlString = data.startsWith('http') ? data : `https://${data}`
                const url = new URL(urlString)
                const domain = url.hostname

                // Skip if empty or invalid domain
                if (!domain || !domain.includes('.')) {
                    setLogoState('idle')
                    return
                }

                // Skip if already detected this domain
                if (domain === lastDetectedDomain.current) return

                // Update tracking
                lastDetectedDomain.current = domain

                // Show detecting state
                setLogoState('detecting')

                // Only try Clearbit - no fallback
                const clearbitUrl = `https://logo.clearbit.com/${domain}`

                // Validate Clearbit logo existence
                const logoUrl = await new Promise<string | null>((resolve) => {
                    const img = new Image()
                    img.onload = () => resolve(clearbitUrl)
                    img.onerror = () => resolve(null)
                    img.src = clearbitUrl
                    setTimeout(() => resolve(null), 2000)
                })

                // Update states
                setLogoState(logoUrl ? 'found' : 'not-found')
                onDetectLogo(logoUrl)

                // Auto-clear "not-found" feedback after 3s
                if (!logoUrl) {
                    setTimeout(() => setLogoState('idle'), 3000)
                }
            } catch (e) {
                setLogoState('idle')
                onDetectLogo(null)
            }
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [data, onDetectLogo])

    return (
        <div className="space-y-1.5">
            <Field label={dict.qrTabs.urlLabel}>
                <div className="relative">
                    <Input
                        placeholder={dict.qrTabs.urlPlaceholder}
                        value={data}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
                        className={cn(
                            'pr-8 transition-colors',
                            urlStatus === 'invalid' && 'border-destructive/50 focus:border-destructive',
                            urlStatus === 'valid' && 'border-green-500/30 focus:border-green-500/50',
                        )}
                        aria-describedby="url-status"
                    />
                    {/* Inline validation icon */}
                    {urlStatus === 'valid' && (
                        <CheckCircle2
                            size={14}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-green-500"
                        />
                    )}
                    {urlStatus === 'invalid' && (
                        <AlertCircle
                            size={14}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-destructive"
                        />
                    )}
                </div>
            </Field>

            {/* Status bar: URL validation + Logo detection */}
            <div id="url-status" className="flex items-center gap-2 min-h-[18px] px-0.5">
                {urlStatus === 'invalid' && (
                    <span className="text-destructive text-[10px] font-medium animate-in fade-in duration-200">
                        URL không hợp lệ
                    </span>
                )}

                {logoState === 'detecting' && (
                    <span className="text-muted-foreground text-[10px] flex items-center gap-1 animate-in fade-in duration-200">
                        <Loader2 size={10} className="animate-spin" />
                        Đang tìm logo...
                    </span>
                )}
                {logoState === 'found' && (
                    <span className="text-green-600 dark:text-green-400 text-[10px] flex items-center gap-1 animate-in fade-in duration-200">
                        <CheckCircle2 size={10} />
                        Logo đã được tự động thêm
                    </span>
                )}
                {logoState === 'not-found' && (
                    <span className="text-muted-foreground text-[10px] flex items-center gap-1 animate-in fade-in duration-200">
                        Không tìm thấy logo cho domain này
                    </span>
                )}
            </div>
        </div>
    )
}
