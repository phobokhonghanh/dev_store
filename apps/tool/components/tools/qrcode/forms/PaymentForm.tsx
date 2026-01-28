'use client'

import { Field, Input, Select } from '@/components/Form'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/config'
import { getAppDict } from '@/lib/i18n'
import { PaymentData } from '@/lib/qrcode-utils'
import { BANKS } from '@/lib/vietqr'
import { useMemo } from 'react'

interface PaymentFormProps {
  data: PaymentData
  onChange: (data: PaymentData) => void
  locale?: SupportedLocale
}

export function PaymentForm({
  data,
  onChange,
  locale = DEFAULT_LOCALE,
}: PaymentFormProps) {
  const dict = useMemo(() => getAppDict(locale).payment, [locale])

  return (
    <div className="space-y-4">
      <Field label={dict.bankLabel}>
        <Select
          value={data.bankBin}
          onChange={(e) =>
            onChange({
              ...data,
              bankBin: e.currentTarget.value,
            })
          }
        >
          {BANKS.map((bank) => (
            <option key={bank.bin} value={bank.bin}>
              {bank.shortName} - {bank.name}
            </option>
          ))}
        </Select>
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label={dict.accountLabel}>
          <Input
            placeholder={dict.accountPlaceholder}
            value={data.account}
            onChange={(e) =>
              onChange({
                ...data,
                account: e.currentTarget.value,
              })
            }
          />
        </Field>
        <Field label={dict.amountLabel}>
          <Input
            placeholder={dict.amountPlaceholder}
            value={data.amount}
            onChange={(e) =>
              onChange({
                ...data,
                amount: e.currentTarget.value,
              })
            }
          />
        </Field>
      </div>
      <Field label={dict.accountNameLabel}>
        <Input
          placeholder={dict.accountNamePlaceholder}
          value={data.name}
          onChange={(e) =>
            onChange({
              ...data,
              name: e.currentTarget.value,
            })
          }
        />
      </Field>
      <Field label={dict.messageLabel}>
        <Input
          placeholder={dict.messagePlaceholder}
          value={data.content}
          onChange={(e) =>
            onChange({
              ...data,
              content: e.currentTarget.value,
            })
          }
        />
      </Field>
    </div>
  )
}
