import { useMemo, useState } from 'react'
import { Field, Textarea } from '@/components/form'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/config'
import { getAppDict } from '@/lib/i18n'
import { EmailData, generateEmailString } from '@/lib/qr'
import { QR_LIMITS } from '@/lib/qr/constants'
import { CharCounter, ImportCSVButton } from '@/components/tools/shared'
import { cn } from '@origini/libs/utils'
import { Zap, Users, Plus, X, ChevronUp } from 'lucide-react'
import { FormGrid } from '@/components/tools/shared'
import { GhostButton } from '@/components/ui'

// Helper to count emails
const getCount = (str?: string) => (str || '').split(',').map(t => t.trim()).filter(Boolean).length

/**
 * Utility to replace placeholders in i18n strings.
 * e.g. "Người nhận: {count}/{limit}" -> "Người nhận: 2/10"
 */
function t(str: string, params: Record<string, string | number>) {
  let result = str
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, String(value))
  })
  return result
}

interface EmailFormProps {
  data: EmailData
  onChange: (data: EmailData) => void
  locale?: SupportedLocale
  level?: 'L' | 'M' | 'Q' | 'H'
  isPremium?: boolean
}

const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB
const SAFE_BUFFER = 31
const RECIP_LIMIT_DEFAULT = 10
const RECIP_LIMIT_PREMIUM = 20

export function EmailForm({
  data,
  onChange,
  locale = DEFAULT_LOCALE,
  level = 'M',
  isPremium = false
}: EmailFormProps) {
  const dict = useMemo(() => getAppDict(locale).email, [locale])
  const [showAdvanced, setShowAdvanced] = useState(getCount(data.cc) > 0 || getCount(data.bcc) > 0)
  const [activeTab, setActiveTab] = useState<'cc' | 'bcc'>('cc')

  const MAX_RECIPIENTS = isPremium ? RECIP_LIMIT_PREMIUM : RECIP_LIMIT_DEFAULT
  const maxCapacity = QR_LIMITS[level] || 2331
  const maxSafeChars = maxCapacity - SAFE_BUFFER

  const totalRecipients = useMemo(() =>
    getCount(data.email) + getCount(data.cc) + getCount(data.bcc),
    [data])

  const handleUpdate = (newData: EmailData) => {
    const currentStr = generateEmailString(data)
    const newStr = generateEmailString(newData)

    // Allow reducing or stay under limit
    if (newStr.length < currentStr.length || newStr.length <= maxSafeChars) {
      onChange(newData)
    }
  }

  const handleFileProcess = async (file: File, target: 'email' | 'cc' | 'bcc') => {
    if (file.size > MAX_FILE_SIZE) return

    try {
      const XLSX = await import('xlsx')
      const buffer = await file.arrayBuffer()
      const wb = XLSX.read(buffer, { type: 'array' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 }) as string[][]

      const foundEmails: string[] = []
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      jsonData.forEach((row) => {
        row.forEach((cell) => {
          if (typeof cell === 'string') {
            const parts = cell.split(/[\s,;]+/)
            parts.forEach((part) => {
              const clean = part.trim()
              if (emailRegex.test(clean)) foundEmails.push(clean)
            })
          }
        })
      })

      if (foundEmails.length > 0) {
        const currentList = (data[target] || '').split(',').map((t) => t.trim()).filter(Boolean)
        const otherList = [
          ...(target === 'email' ? [] : (data.email || '').split(',')),
          ...(target === 'cc' ? [] : (data.cc || '').split(',')),
          ...(target === 'bcc' ? [] : (data.bcc || '').split(',')),
        ].map(t => t.trim()).filter(Boolean)

        const newEmails: string[] = []
        foundEmails.forEach((email) => {
          if (!currentList.includes(email) && !newEmails.includes(email) && !otherList.includes(email)) {
            newEmails.push(email)
          }
        })

        if (newEmails.length > 0) {
          const currentTotal = totalRecipients
          const availableSlot = MAX_RECIPIENTS - currentTotal
          if (availableSlot <= 0) return

          const toImport = newEmails.slice(0, availableSlot)
          const updatedList = [...currentList, ...toImport]
          handleUpdate({ ...data, [target]: updatedList.join(', ') })
        }
      }
    } catch (error) {
      console.error('Error parsing file:', error)
    }
  }

  return (
    <div className="space-y-6">
      <FormGrid gap={4}>
        {/* Primary Recipient (To) */}
        <div className="col-span-full">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium leading-none">
              {dict.emailLabel}
            </span>
            <ImportCSVButton
              onFileSelect={(file) => handleFileProcess(file, 'email')}
              label={dict.importCsv}
              className="h-7 px-2 text-[10px]"
            />
          </div>

          <EmailTagInput
            placeholder={dict.emailPlaceholder}
            value={data.email || ''}
            onChange={(val) => handleUpdate({ ...data, email: val })}
            maxTags={MAX_RECIPIENTS - (getCount(data.cc) + getCount(data.bcc))}
          />

          {/* Integrated CC/BCC Toggle */}
          <div className="mt-2.5 flex items-center justify-between">
            <GhostButton
              onClick={() => setShowAdvanced(!showAdvanced)}
              icon={showAdvanced ? <ChevronUp size={14} /> : <Plus size={14} />}
              className="h-7 text-[11px] px-2 hover:bg-primary/10 hover:text-primary transition-all rounded-md"
            >
              {showAdvanced ? dict.hideCcBcc : dict.addCcBcc}
            </GhostButton>

            {showAdvanced && (
              <div className="flex bg-muted/50 p-0.5 rounded-lg border border-border/50">
                <button
                  onClick={() => setActiveTab('cc')}
                  className={cn(
                    "px-3 py-1 text-[10px] font-bold rounded-md transition-all",
                    activeTab === 'cc' ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {dict.ccLabel} {getCount(data.cc) > 0 && `(${getCount(data.cc)})`}
                </button>
                <button
                  onClick={() => setActiveTab('bcc')}
                  className={cn(
                    "px-3 py-1 text-[10px] font-bold rounded-md transition-all",
                    activeTab === 'bcc' ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {dict.bccLabel} {getCount(data.bcc) > 0 && `(${getCount(data.bcc)})`}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Recipients Panel */}
        {showAdvanced && (
          <div className="col-span-full animate-in slide-in-from-top-2 fade-in duration-300">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3 relative overflow-hidden group">
              {/* Decorative background icon */}
              <Users className="absolute -right-4 -bottom-4 h-24 w-24 text-primary/5 -rotate-12 transition-transform group-hover:scale-110" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium leading-none text-foreground/70">
                    {dict.listLabel} {activeTab === 'cc' ? 'CC' : 'BCC'}
                  </span>
                  <ImportCSVButton
                    onFileSelect={(file) => handleFileProcess(file, activeTab)}
                    label={dict.importCsv}
                    className="h-7 px-2 text-[10px]"
                  />
                </div>

                <EmailTagInput
                  placeholder={activeTab === 'cc' ? dict.ccPlaceholder : dict.bccPlaceholder}
                  value={activeTab === 'cc' ? (data.cc || '') : (data.bcc || '')}
                  onChange={(val) => handleUpdate({ ...data, [activeTab]: val })}
                  maxTags={MAX_RECIPIENTS - (getCount(data.email) + getCount(activeTab === 'cc' ? data.bcc : data.cc))}
                />

                <div className="flex items-center justify-between pt-1">
                  <p className="text-[9px] text-muted-foreground/70 italic">
                    {dict.enterToComplete}
                  </p>
                  <LimitsInfo
                    current={totalRecipients}
                    limit={MAX_RECIPIENTS}
                    isPremium={isPremium}
                    dict={dict}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subject Field */}
        <div className="col-span-full">
          <Field label={dict.subjectLabel}>
            <input
              placeholder={dict.subjectPlaceholder}
              value={data.subject}
              onChange={(e) => handleUpdate({ ...data, subject: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </Field>
        </div>

        {/* Body Field */}
        <div className="col-span-full">
          <Field label={dict.bodyLabel}>
            <div className="relative group/textarea">
              <Textarea
                placeholder={dict.bodyPlaceholder}
                value={data.body}
                onChange={(e) => handleUpdate({ ...data, body: e.target.value })}
                className="min-h-[140px] pb-8 transition-all focus:min-h-[180px]"
              />
              <div className="absolute right-3 bottom-3 opacity-50 group-focus-within/textarea:opacity-100 transition-opacity">
                <CharCounter
                  count={generateEmailString(data).length}
                  limit={maxSafeChars}
                />
              </div>
            </div>
          </Field>
        </div>
      </FormGrid>
    </div>
  )
}

function LimitsInfo({ current, limit, isPremium, dict }: {
  current: number
  limit: number
  isPremium: boolean
  dict: { recipientsLimit: string; upgradeForMore: string }
}) {
  const limitText = t(dict.recipientsLimit, { count: current, limit })

  return (
    <div className="flex items-center gap-1.5 text-[10px]">
      <span className={cn(
        "font-bold transition-colors",
        current >= limit ? "text-destructive" : "text-primary/70"
      )}>
        {limitText}
      </span>
      {!isPremium && (
        <div
          className="flex items-center gap-1 cursor-help hover:text-amber-500 transition-colors group"
          title="Upgrade to Premium for increased limits"
        >
          <span className="text-muted-foreground/30">•</span>
          <Zap className="h-3 w-3 text-amber-500 group-hover:scale-110 transition-transform" />
          <span className="underline decoration-dotted text-muted-foreground/70 group-hover:text-amber-500 transition-colors">
            {dict.upgradeForMore}
          </span>
        </div>
      )}
    </div>
  )
}

function EmailTagInput({
  value,
  onChange,
  placeholder,
  maxTags = 100,
}: {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  maxTags?: number
}) {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const tags = useMemo(() => value
    ? value.split(',').map((t) => t.trim()).filter(Boolean)
    : [], [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (error) setError(null)
  }

  const addTag = (tag: string) => {
    const cleanTag = tag.trim()
    if (!cleanTag) {
      setInputValue('')
      return
    }

    if (tags.length >= maxTags) {
      setError('Đã đạt giới hạn số lượng email')
      return
    }

    if (tags.includes(cleanTag)) {
      setInputValue('')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(cleanTag)) {
      setError('Email không hợp lệ')
      return
    }

    onChange([...tags, cleanTag].join(', '))
    setInputValue('')
    setError(null)
  }

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove).join(', '))
  }

  return (
    <div className="space-y-1">
      <div className={cn(
        "flex min-h-[44px] w-full flex-wrap items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all shadow-inner",
        error
          ? "border-destructive ring-1 ring-destructive/20 bg-destructive/5"
          : "border-primary/20 bg-background/50 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20"
      )}>
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-primary/10 text-primary border border-primary/20 inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold animate-in zoom-in-95"
          >
            {tag}
            <button
              type="button"
              className="ml-1.5 text-primary/50 hover:text-primary transition-colors cursor-pointer"
              onClick={() => removeTag(index)}
            >
              <X size={10} strokeWidth={3} />
            </button>
          </span>
        ))}
        <input
          className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/50 min-w-[120px]"
          placeholder={tags.length === 0 ? placeholder : ''}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
              e.preventDefault()
              addTag(inputValue)
            } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
              removeTag(tags.length - 1)
            }
          }}
          onBlur={() => addTag(inputValue)}
        />
      </div>
      {error && (
        <p className="text-[10px] text-destructive font-medium animate-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  )
}
