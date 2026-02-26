import { Field, Input } from '@/components/form'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/config'
import { getAppDict } from '@/lib/i18n'
import { PaymentData } from '@/lib/qr'
import { useMemo, useCallback } from 'react'
import { BankSelect } from './BankSelect'
import { FormGrid } from '../../shared/FormGrid'

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

  const handleUpdate = useCallback(
    (field: keyof PaymentData, value: string) => {
      onChange({ ...data, [field]: value })
    },
    [data, onChange],
  )

  return (
    <div className="space-y-6">
      <Field label={dict.bankLabel}>
        <BankSelect
          value={data.bankBin}
          onChange={(val) => handleUpdate('bankBin', val)}
          placeholder={dict.bankPlaceholder} // Assuming we might add this to i18n later or use default
        />
      </Field>

      <FormGrid>
        <Field label={dict.accountLabel}>
          <Input
            placeholder={dict.accountPlaceholder}
            value={data.account}
            onChange={(e) => handleUpdate('account', e.currentTarget.value)}
          />
        </Field>
        <Field label={dict.amountLabel}>
          <Input
            placeholder={dict.amountPlaceholder}
            value={data.amount}
            onChange={(e) => handleUpdate('amount', e.currentTarget.value)}
          />
        </Field>
      </FormGrid>

      <FormGrid>
        <Field label={dict.accountNameLabel}>
          <Input
            placeholder={dict.accountNamePlaceholder}
            value={data.name}
            onChange={(e) => handleUpdate('name', e.currentTarget.value)}
          />
        </Field>
        <Field label={dict.messageLabel}>
          <Input
            placeholder={dict.messagePlaceholder}
            value={data.content}
            onChange={(e) => handleUpdate('content', e.currentTarget.value)}
          />
        </Field>
      </FormGrid>
    </div>
  )
}
