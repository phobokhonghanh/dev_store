import React, { useState } from 'react'

export interface TabItem {
  value: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

interface DynamicTabsProps {
  items: TabItem[]
  defaultValue?: string
  onChange?: (value: string) => void
  grow?: boolean
}

export default function DynamicTabs({
  items,
  defaultValue,
  onChange,
  grow = true,
}: DynamicTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || items[0]?.value)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    onChange?.(value)
  }

  const activeContent = items.find((item) => item.value === activeTab)?.content

  return (
    <div className="w-full">
      <div
        className={`border-border mb-4 flex border-b ${grow ? '' : 'inline-flex'}`}
      >
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => handleTabChange(item.value)}
            className={`flex items-center justify-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === item.value
                ? 'border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground hover:border-muted border-transparent'
            } ${grow ? 'flex-1' : ''} `}
          >
            {item.icon && <span className="h-4 w-4">{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-4">{activeContent}</div>
    </div>
  )
}
