import { useState, useEffect } from 'react'
import { FAQItem } from '@/components/tools/shared/FAQSection'
import { useLocale } from './useLocale'

export function useFAQ() {
    const { locale } = useLocale()
    const [data, setData] = useState<Record<string, FAQItem[]> | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true

        const fetchData = async () => {
            try {
                setLoading(true)
                // Assuming locale reflects the file name in public/data/faq/
                const fileName = locale === 'vi' ? 'vi.json' : 'en.json'
                const response = await fetch(`/data/faq/${fileName}`)
                if (!response.ok) {
                    throw new Error('Failed to load FAQ')
                }
                const json = await response.json()
                if (mounted) {
                    setData(json)
                    setError(null)
                }
            } catch (err) {
                if (mounted) {
                    console.error('Error loading FAQ:', err)
                    setError('Failed to load FAQ')
                    // Fallback to empty or default?
                }
            } finally {
                if (mounted) {
                    setLoading(false)
                }
            }
        }

        fetchData()

        return () => {
            mounted = false
        }
    }, [locale])

    return { data, loading, error }
}
