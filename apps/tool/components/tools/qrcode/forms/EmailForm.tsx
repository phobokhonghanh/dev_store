'use client'

import { Field, Input } from '@/components/Form'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/config'
import { getAppDict } from '@/lib/i18n'
import { EmailData } from '@/lib/qrcode-utils'
import { useMemo } from 'react'

interface EmailFormProps {
  data: EmailData
  onChange: (data: EmailData) => void
  locale?: SupportedLocale
}

export function EmailForm({
  data,
  onChange,
  locale = DEFAULT_LOCALE,
}: EmailFormProps) {
  const dict = useMemo(() => getAppDict(locale).email, [locale])

  return (
    <div className="space-y-4">
      <Field label={dict.emailLabel}>
        <Input
          placeholder={dict.emailPlaceholder}
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.currentTarget.value })}
        />
      </Field>
      <Field label={dict.subjectLabel}>
        <Input
          placeholder={dict.subjectPlaceholder}
          value={data.subject}
          onChange={(e) =>
            onChange({ ...data, subject: e.currentTarget.value })
          }
        />
      </Field>
      <Field label={dict.bodyLabel}>
        <Input
          placeholder={dict.bodyPlaceholder}
          value={data.body}
          onChange={(e) => onChange({ ...data, body: e.currentTarget.value })}
        />
      </Field>
    </div>
  )
}
