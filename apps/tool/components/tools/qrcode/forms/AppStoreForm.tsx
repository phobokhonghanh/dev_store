'use client'

import { Field, Input } from '@/components/Form'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/config'
import { getAppDict } from '@/lib/i18n'
import { AppStoreData } from '@/lib/qrcode-utils'
import { useMemo } from 'react'

interface AppStoreFormProps {
  data: AppStoreData
  onChange: (data: AppStoreData) => void
  locale?: SupportedLocale
}

export function AppStoreForm({
  data,
  onChange,
  locale = DEFAULT_LOCALE,
}: AppStoreFormProps) {
  const dict = useMemo(() => getAppDict(locale).appStore, [locale])

  return (
    <div className="space-y-4">
      <Field label={dict.iosLabel}>
        <Input
          placeholder={dict.iosPlaceholder}
          value={data.iosUrl}
          onChange={(e) =>
            onChange({
              ...data,
              iosUrl: e.currentTarget.value,
            })
          }
        />
      </Field>
      <Field label={dict.androidLabel}>
        <Input
          placeholder={dict.androidPlaceholder}
          value={data.androidUrl}
          onChange={(e) =>
            onChange({
              ...data,
              androidUrl: e.currentTarget.value,
            })
          }
        />
      </Field>
      <p className="text-muted-foreground text-[10px] italic">{dict.note}</p>
    </div>
  )
}
