import { Checkbox, Field, Input, Select } from '@/components/form'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/config'
import { getAppDict } from '@/lib/i18n'
import { WiFiData } from '@/lib/qr'
import { useMemo, useCallback } from 'react'
import { FormGrid } from '../../shared/FormGrid'

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

  const handleSsidChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...data, ssid: e.currentTarget.value })
    },
    [data, onChange],
  )

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...data, password: e.currentTarget.value })
    },
    [data, onChange],
  )

  const handleEncryptionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const encryption = e.target.value as 'WPA' | 'WEP' | 'nopass'
      onChange({
        ...data,
        encryption,
        // Clear password if switching to nopass
        password: encryption === 'nopass' ? '' : data.password,
      })
    },
    [data, onChange],
  )

  const handleHiddenChange = useCallback(
    (checked: boolean) => {
      onChange({ ...data, hidden: checked })
    },
    [data, onChange],
  )

  const isNoPassword = data.encryption === 'nopass'

  return (
    <div className="space-y-6">
      <FormGrid>
        <Field label={dict.ssidLabel}>
          <Input
            placeholder={dict.ssidPlaceholder}
            value={data.ssid}
            onChange={handleSsidChange}
          />
        </Field>
        {!isNoPassword && (
          <Field label={dict.passwordLabel}>
            <Input
              type="password"
              placeholder={dict.passwordPlaceholder}
              value={data.password}
              onChange={handlePasswordChange}
            />
          </Field>
        )}
      </FormGrid>

      <FormGrid className="items-end">
        <Field label={dict.encryptionLabel}>
          <Select value={data.encryption} onChange={handleEncryptionChange}>
            <option value="WPA">{dict.encryptionWPA}</option>
            <option value="WEP">{dict.encryptionWEP}</option>
            <option value="nopass">{dict.encryptionNone}</option>
          </Select>
        </Field>
        <div className="flex h-10 items-center pb-1">
          <Checkbox
            id="hidden-wifi"
            label={dict.hiddenNetwork}
            checked={data.hidden}
            onCheckedChange={handleHiddenChange}
          />
        </div>
      </FormGrid>
    </div>
  )
}
