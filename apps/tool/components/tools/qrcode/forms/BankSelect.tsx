'use client'

import { cn } from '@origini/libs/utils'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { BANKS, Bank } from '@/lib/qr/vietqr'
import { Input } from '@/components/form'

interface BankSelectProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export function BankSelect({ value, onChange, placeholder }: BankSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)

    // Sort banks A-Z by shortName
    const sortedBanks = useMemo(() => {
        return [...BANKS].sort((a, b) => a.shortName.localeCompare(b.shortName))
    }, [])

    // Filter banks based on search term
    const filteredBanks = useMemo(() => {
        if (!searchTerm) return sortedBanks
        const lowSearch = searchTerm.toLowerCase()
        return sortedBanks.filter(
            (bank) =>
                bank.shortName.toLowerCase().includes(lowSearch) ||
                bank.name.toLowerCase().includes(lowSearch)
        )
    }, [sortedBanks, searchTerm])

    const selectedBank = useMemo(
        () => sortedBanks.find((b) => b.bin === value),
        [sortedBanks, value]
    )

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Reset search when opening
    useEffect(() => {
        if (isOpen) {
            setSearchTerm('')
        }
    }, [isOpen])

    return (
        <div className="relative w-full" ref={containerRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                    !selectedBank && 'text-muted-foreground'
                )}
            >
                <span className="truncate">
                    {selectedBank ? `${selectedBank.shortName} - ${selectedBank.name}` : placeholder || 'Search bank...'}
                </span>
                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="bg-popover text-popover-foreground animate-in fade-in zoom-in-95 absolute z-50 mt-1 max-h-[300px] w-full overflow-hidden rounded-md border shadow-lg">
                    {/* Search Input */}
                    <div className="flex items-center border-b px-3 py-2">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <input
                            autoFocus
                            className="bg-transparent placeholder:text-muted-foreground flex h-8 w-full rounded-md py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Search bank..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* List */}
                    <div className="max-h-[240px] overflow-y-auto p-1">
                        {filteredBanks.length === 0 ? (
                            <div className="text-muted-foreground py-6 text-center text-sm">No bank found.</div>
                        ) : (
                            filteredBanks.map((bank) => {
                                const isSelected = value === bank.bin
                                return (
                                    <button
                                        key={bank.bin}
                                        type="button"
                                        onClick={() => {
                                            onChange(bank.bin)
                                            setIsOpen(false)
                                        }}
                                        className={cn(
                                            'hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-pointer items-center rounded-sm px-2 py-2 text-sm outline-none transition-colors',
                                            isSelected && 'bg-accent/50 text-accent-foreground'
                                        )}
                                    >
                                        <div className="flex flex-1 flex-col items-start truncate">
                                            <span className="font-bold">{bank.shortName}</span>
                                            <span className="text-muted-foreground text-[10px] truncate">{bank.name}</span>
                                        </div>
                                        {isSelected && (
                                            <Check className="ml-2 h-4 w-4 shrink-0 opacity-70" />
                                        )}
                                    </button>
                                )
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
