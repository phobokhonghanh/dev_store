'use client'

import { Field, Input } from '@/components/Form'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/config'
import { getAppDict } from '@/lib/i18n'
import { EventData } from '@/lib/qrcode-utils'
import { useMemo } from 'react'

interface EventFormProps {
  data: EventData
  onChange: (data: EventData) => void
  locale?: SupportedLocale
}

export function EventForm({
  data,
  onChange,
  locale = DEFAULT_LOCALE,
}: EventFormProps) {
  const dict = useMemo(() => getAppDict(locale).event, [locale])

  return (
    <div className="space-y-4">
      <Field label={dict.titleLabel}>
        <Input
          placeholder={dict.titlePlaceholder}
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.currentTarget.value })}
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label={dict.startDateLabel}>
          <Input
            type="datetime-local"
            value={data.startDate}
            onChange={(e) =>
              onChange({
                ...data,
                startDate: e.currentTarget.value,
              })
            }
          />
        </Field>
        <Field label={dict.endDateLabel}>
          <Input
            type="datetime-local"
            value={data.endDate}
            onChange={(e) =>
              onChange({
                ...data,
                endDate: e.currentTarget.value,
              })
            }
          />
        </Field>
      </div>
      <Field label={dict.locationLabel}>
        <Input
          placeholder={dict.locationPlaceholder}
          value={data.location}
          onChange={(e) =>
            onChange({
              ...data,
              location: e.currentTarget.value,
            })
          }
        />
      </Field>
      <Field label={dict.descriptionLabel}>
        <Input
          placeholder={dict.descriptionPlaceholder}
          value={data.description}
          onChange={(e) =>
            onChange({
              ...data,
              description: e.currentTarget.value,
            })
          }
        />
      </Field>
    </div>
  )
}
