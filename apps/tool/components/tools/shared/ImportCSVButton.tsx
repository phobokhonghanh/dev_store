'use client'

import { getAppDict } from '@/lib/i18n'
import { Upload } from 'lucide-react'
import { useRef, useMemo } from 'react'
import { useLocale } from '@/lib/hooks/useLocale'
import { cn } from '@origini/libs/utils'

interface ImportCSVButtonProps {
    onFileSelect: (file: File) => void
    label?: string
    className?: string
}

export function ImportCSVButton({ onFileSelect, label, className }: ImportCSVButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { locale } = useLocale()
    // Typecast locale to any to bypass strict check for now
    const dict = useMemo(() => getAppDict(locale as any), [locale])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            onFileSelect(file)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    return (
        <>
            <input
                type="file"
                accept=".csv,.txt"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                    "h-8 rounded-md px-3",
                    className
                )}
                onClick={() => fileInputRef.current?.click()}
                type="button"
            >
                <Upload size={14} className="mr-2" />
                {label || (dict.email as any).importCsv}
            </button>
        </>
    )
}
