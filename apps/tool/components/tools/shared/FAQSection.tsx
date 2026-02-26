import Link from 'next/link'
import { ChevronDown, HelpCircle, LucideIcon } from 'lucide-react'

export interface FAQItem {
    question: string
    link: string
}

interface FAQSectionProps {
    title: string
    items: FAQItem[]
    icon?: LucideIcon
    viewGuideText: string
}

export function FAQSection({
    title,
    items,
    icon: Icon = HelpCircle,
    viewGuideText,
}: FAQSectionProps) {
    if (!items || items.length === 0) return null

    return (
        <div>
            <h5 className="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-widest text-green-600 uppercase dark:text-green-500">
                <Icon size={14} className="text-green-600 dark:text-green-500" /> {title}
            </h5>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {items.map((faq, i) => (
                    <li key={i}>
                        <Link
                            href={faq.link}
                            className="group bg-card hover:border-primary/50 hover:bg-primary/5 flex h-full flex-col justify-between rounded-xl border p-4 shadow-sm transition-all hover:shadow-md"
                        >
                            <span className="group-hover:text-primary text-xs leading-snug font-bold transition-colors">
                                {faq.question}
                            </span>
                            <div className="text-muted-foreground group-hover:text-primary/70 mt-2 flex items-center text-[10px] transition-colors">
                                {viewGuideText}{' '}
                                <ChevronDown size={12} className="ml-1 rotate-[-90deg]" />
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
