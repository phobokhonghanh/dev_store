'use client'

import { Field, Input } from '@/components/Form'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/config'
import { getAppDict } from '@/lib/i18n'
import { SmsData } from '@/lib/qrcode-utils'
import { useMemo } from 'react'

interface SmsFormProps {
  data: SmsData
  onChange: (data: SmsData) => void
  locale?: SupportedLocale
}

export function SmsForm({
  data,
  onChange,
  locale = DEFAULT_LOCALE,
}: SmsFormProps) {
  const dict = useMemo(() => getAppDict(locale).sms, [locale])

  return (
    <div className="space-y-4">
      <Field label={dict.phoneLabel}>
        <Input
          placeholder={dict.phonePlaceholder}
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.currentTarget.value })}
        />
      </Field>
      <Field label={dict.messageLabel}>
        <Input
          placeholder={dict.messagePlaceholder}
          value={data.message}
          onChange={(e) =>
            onChange({ ...data, message: e.currentTarget.value })
          }
        />
      </Field>
    </div>
  )
}
