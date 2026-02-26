'use client'

import { cn } from '@origini/libs/utils'
import { useLocale } from '@/lib/hooks/useLocale'
import { useMemo } from 'react'

interface CharCounterProps {
    count: number
    limit?: number
    className?: string
}

export function CharCounter({ count, limit, className }: CharCounterProps) {
    const { locale } = useLocale()

    // Simple text replacement instead of full i18n dictionary for this utility to be lightweight
    // Or we can accept a translation function/string
    // For now, let's use the format from locales if we were injecting dict, 
    // but since this is a shared component, let's keep it simple or accept format string.
    // Actually, sticking to the plan: use i18n keys we just added.

    // We need to access the dict properly. 
    // Since getAppDict might be large, maybe pass the format string as prop?
    // But user wants "reuse".
    // Let's implement a simple formatter here or use the dict. common/email keys are generic enough?
    // "charsCount": "{count} chars"
    // "charsCountWithLimit": "{count}/{limit} chars"

    // For specific requirement "số lượng đếm chars nên được đa ngôn ngữ"
    // I will use a simple mapping here based on locale for now to avoid prop drilling dict everywhere,
    // or better: import getAppDict.

    const text = useMemo(() => {
        // Fallback or simple logic if dict access is too heavy/complex for this tiny component
        // But getAppDict is sync and fast.
        const isVi = locale === 'vi'

        if (limit) {
            return isVi ? `${count}/${limit} ký tự` : `${count}/${limit} chars`
        }
        return isVi ? `${count} ký tự` : `${count} chars`
    }, [count, limit, locale])

    // Color logic
    const isError = limit && count > limit
    const isWarning = limit && count > limit * 0.9

    return (
        <div className={cn(
            "text-xs mt-1 transition-colors text-right",
            isError ? "text-red-500 font-bold" : isWarning ? "text-orange-500 font-bold" : "text-muted-foreground",
            className
        )}>
            {text}
        </div>
    )
}
