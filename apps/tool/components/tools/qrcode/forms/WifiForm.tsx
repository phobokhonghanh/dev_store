'use client'

import { Checkbox, Field, Input, Select } from '@/components/Form'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/config'
import { getAppDict } from '@/lib/i18n'
import { WiFiData } from '@/lib/qrcode-utils'
import { useMemo } from 'react'

interface WifiFormProps {
  data: WiFiData
  onChange: (data: WiFiData) => void
  locale?: SupportedLocale
}

export function WifiForm({
  data,
  onChange,
  locale = DEFAULT_LOCALE,
}: WifiFormProps) {
  const dict = useMemo(() => getAppDict(locale).wifi, [locale])

  return (
    <div className="space-y-4">
      <Field label={dict.ssidLabel}>
        <Input
          placeholder={dict.ssidPlaceholder}
          value={data.ssid}
          onChange={(e) => onChange({ ...data, ssid: e.currentTarget.value })}
        />
      </Field>
      <Field label={dict.passwordLabel}>
        <Input
          type="password"
          placeholder={dict.passwordPlaceholder}
          value={data.password}
          onChange={(e) =>
            onChange({ ...data, password: e.currentTarget.value })
          }
        />
      </Field>
      <div className="flex gap-4">
        <Field label={dict.encryptionLabel} className="flex-1">
          <Select
            value={data.encryption}
            onChange={(e) =>
              onChange({
                ...data,
                encryption: e.target.value as 'WPA' | 'WEP' | 'nopass',
              })
            }
          >
            <option value="WPA">{dict.encryptionWPA}</option>
            <option value="WEP">{dict.encryptionWEP}</option>
            <option value="nopass">{dict.encryptionNone}</option>
          </Select>
        </Field>
        <div className="flex items-center pt-6">
          <Checkbox
            id="hidden-wifi"
            label={dict.hiddenNetwork}
            checked={data.hidden}
            onCheckedChange={(checked) =>
              onChange({ ...data, hidden: checked })
            }
          />
        </div>
      </div>
    </div>
  )
}
