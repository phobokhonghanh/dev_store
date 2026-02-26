'use client'

import { Input, Label } from './primitives'
import { Calendar, Clock, ChevronDown } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@origini/libs/utils'

export interface DateTimePickerProps {
    value: string // ISO datetime-local format (YYYY-MM-DDTHH:mm)
    onChange: (value: string) => void
    label?: string
}

export function DateTimePicker({ value, onChange, label }: DateTimePickerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Split datetime-local into date and time
    const [date, time] = value ? value.split('T') : ['', '00:00']
    const [hours, minutes] = (time && time.includes(':')) ? time.split(':') : ['00', '00']

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleDateChange = (newDate: string) => {
        const currentTime = time || '00:00'
        onChange(`${newDate}T${currentTime}`)
    }

    const setTimePart = (newHours: string, newMinutes: string) => {
        const currentDate = date || new Date().toISOString().split('T')[0]
        onChange(`${currentDate}T${newHours}:${newMinutes}`)
    }

    // Generate options
    const hoursOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
    const minutesOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

    return (
        <div className="space-y-2">
            {label && <Label className="text-xs font-semibold">{label}</Label>}
            <div className="flex items-stretch gap-2">
                {/* Date Picker Section */}
                <div className="relative flex-1 group">
                    <Calendar
                        className="text-muted-foreground group-focus-within:text-primary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
                        size={15}
                    />
                    <Input
                        type="date"
                        value={date}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDateChange(e.target.value)}
                        className="h-10 pl-10 text-xs font-medium bg-muted/5 border-muted-foreground/20 hover:border-primary/50 focus:border-primary transition-all duration-200"
                    />
                </div>

                {/* Custom Time Picker Section */}
                <div className="relative" ref={containerRef}>
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "flex items-center gap-2 h-10 px-3 bg-muted/10 rounded-md border border-muted-foreground/20 hover:border-primary/50 transition-all duration-200",
                            isOpen && "border-primary ring-1 ring-primary/20 bg-background shadow-sm"
                        )}
                    >
                        <Clock size={15} className={cn("text-muted-foreground transition-colors", isOpen && "text-primary")} />
                        <span className="text-sm font-bold tracking-tight min-w-[42px]">{hours}:{minutes}</span>
                        <ChevronDown size={14} className={cn("text-muted-foreground/50 transition-transform duration-200", isOpen && "rotate-180")} />
                    </button>

                    {/* Popover Selection Panel */}
                    {isOpen && (
                        <div className="absolute right-0 top-full mt-1.5 z-[100] bg-background border border-border shadow-xl rounded-xl overflow-hidden min-w-[160px] flex animate-in fade-in zoom-in-95 duration-100">
                            {/* Hours Column */}
                            <div className="flex-1 border-r border-border h-48 overflow-y-auto scrollbar-hide flex flex-col pt-1 pb-1">
                                <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 px-2 py-1 text-[10px] font-bold text-muted-foreground border-b border-border/50 uppercase tracking-widest text-center">HH</div>
                                {hoursOptions.map((h) => (
                                    <button
                                        key={h}
                                        type="button"
                                        onClick={() => setTimePart(h, minutes)}
                                        className={cn(
                                            "px-4 py-1.5 text-xs transition-all hover:bg-muted/50",
                                            h === hours ? "bg-primary text-primary-foreground font-bold" : "text-foreground/80 hover:text-foreground"
                                        )}
                                    >
                                        {h}
                                    </button>
                                ))}
                            </div>
                            {/* Minutes Column */}
                            <div className="flex-1 h-48 overflow-y-auto scrollbar-hide flex flex-col pt-1 pb-1">
                                <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 px-2 py-1 text-[10px] font-bold text-muted-foreground border-b border-border/50 uppercase tracking-widest text-center">MM</div>
                                {minutesOptions.map((m) => (
                                    <button
                                        key={m}
                                        type="button"
                                        onClick={() => setTimePart(hours, m)}
                                        className={cn(
                                            "px-4 py-1.5 text-xs transition-all hover:bg-muted/50",
                                            m === minutes ? "bg-primary text-primary-foreground font-bold" : "text-foreground/80 hover:text-foreground"
                                        )}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
