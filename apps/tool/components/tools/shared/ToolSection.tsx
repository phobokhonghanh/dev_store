'use client'

import { cn } from '@origini/libs/utils'
import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react'
import React, { useState } from 'react'

interface ToolSectionProps {
    title: string
    icon?: LucideIcon
    children: React.ReactNode
    className?: string
    collapsible?: boolean
    defaultOpen?: boolean
    description?: string
}

/**
 * A reusable section component for tools with consistent styling,
 * optional icons, and collapsible functionality.
 */
export function ToolSection({
    title,
    icon: Icon,
    children,
    className,
    collapsible = false,
    defaultOpen = true,
    description,
}: ToolSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    const TitleWrapper = collapsible ? 'button' : 'div'

    return (
        <div className={cn('border-border rounded-xl border bg-background overflow-hidden transition-all', className)}>
            <TitleWrapper
                onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
                className={cn(
                    'flex w-full items-center justify-between px-4 py-3 text-left transition-colors cursor-pointer',
                    collapsible && 'hover:bg-muted/50 focus-visible:bg-muted/50 outline-none',
                    collapsible && !isOpen && 'bg-muted/20'
                )}
            >
                <div className="flex items-center gap-2.5">
                    {Icon && <Icon size={18} className="text-primary" />}
                    <div className="flex flex-col">
                        <span className="text-sm font-bold tracking-tight">{title}</span>
                        {description && !collapsible && (
                            <p className="text-muted-foreground text-[10px] leading-relaxed opacity-70">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
                {collapsible && (
                    <div className="flex items-center gap-2">
                        {description && (
                            <span className="text-muted-foreground hidden text-[10px] sm:inline">
                                {description}
                            </span>
                        )}
                        {isOpen ? (
                            <ChevronUp size={18} className="opacity-40" />
                        ) : (
                            <ChevronDown size={18} className="opacity-40" />
                        )}
                    </div>
                )}
            </TitleWrapper>

            {(!collapsible || isOpen) && (
                <div className={cn(
                    'p-4 pt-0',
                    collapsible && 'animate-in fade-in slide-in-from-top-2 duration-300'
                )}>
                    {collapsible && <div className="border-t mb-4 opacity-50" />}
                    {children}
                </div>
            )}
        </div>
    )
}
