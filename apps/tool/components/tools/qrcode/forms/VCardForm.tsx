'use client'

import { Input, Label, Select } from '@/components/form'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/config'
import { getAppDict, VCardFormDict } from '@/lib/i18n'
import { CustomField } from '@/lib/qr'
import { Plus, Trash } from 'lucide-react'
import { useCallback, useMemo } from 'react'

/** Get predefined keys based on locale */
function getPredefinedKeys(dict: VCardFormDict) {
  return [
    { value: 'FN', label: dict.keyFullName },
    { value: 'TEL', label: dict.keyPhone },
    { value: 'EMAIL', label: dict.keyEmail },
    { value: 'URL', label: dict.keyWebsite },
    { value: 'ADR', label: dict.keyAddress },
    { value: 'ORG', label: dict.keyCompany },
    { value: 'TITLE', label: dict.keyJobTitle },
    { value: 'NOTE', label: dict.keyNote },
    { value: 'RAW', label: dict.keyRawText },
  ]
}

/** Internal UI state for VCard fields */
export interface VCardField extends CustomField {
  id: string
  label: string
}

/** Get initial fields based on locale */
export function getInitialVCardFields(locale: SupportedLocale): VCardField[] {
  const dict = getAppDict(locale).vcard
  return [
    { id: '1', key: 'FN', value: '', label: dict.keyFullName },
    { id: '2', key: 'TEL', value: '', label: dict.keyPhone },
  ]
}

interface VCardFormProps {
  data: VCardField[]
  onChange: (fields: VCardField[]) => void
  locale: SupportedLocale
}

export function VCardForm({
  data: fields,
  onChange,
  locale,
}: VCardFormProps) {
  const dict = useMemo(() => getAppDict(locale).vcard, [locale])
  const predefinedKeys = useMemo(() => getPredefinedKeys(dict), [dict])

  /** Adds a new empty 'Note' field to the VCard list */
  const addField = useCallback(() => {
    onChange([
      ...fields,
      {
        id: Date.now().toString(),
        key: 'NOTE',
        value: '',
        label: dict.keyNote,
      },
    ])
  }, [fields, onChange, dict.keyNote])

  /** Removes a specific VCard field by its unique ID */
  const removeField = useCallback(
    (id: string) => {
      onChange(fields.filter((f) => f.id !== id))
    },
    [fields, onChange],
  )

  /** Updates a specific property of a VCard field */
  const updateField = useCallback(
    (id: string, field: keyof VCardField, newValue: string) => {
      onChange(
        fields.map((f) => {
          if (f.id !== id) return f
          if (field === 'key') {
            const predefined = predefinedKeys.find((k) => k.value === newValue)
            return {
              ...f,
              key: newValue,
              label: predefined ? predefined.label : newValue,
            }
          }
          return { ...f, [field]: newValue }
        }),
      )
    },
    [fields, onChange, predefinedKeys],
  )

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground mb-2 text-sm italic">
        {dict.description}
      </p>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-end gap-2">
          <div className="w-[140px]">
            {index === 0 && <Label variant="small">{dict.keyLabel}</Label>}
            <Select
              className="h-9"
              value={field.key}
              onChange={(e) => updateField(field.id, 'key', e.target.value)}
            >
              {predefinedKeys.map((k) => (
                <option key={k.value} value={k.value}>
                  {k.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex-1">
            {index === 0 && <Label variant="small">{dict.contentLabel}</Label>}
            <Input
              className="h-9"
              placeholder={dict.contentPlaceholder}
              value={field.value}
              onChange={(e) =>
                updateField(field.id, 'value', e.currentTarget.value)
              }
            />
          </div>
          <button
            onClick={() => removeField(field.id)}
            disabled={fields.length <= 1}
            className="mb-1 cursor-pointer rounded p-2 text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            title={dict.removeField}
          >
            <Trash size={16} />
          </button>
        </div>
      ))}
      <button
        className="border-input hover:bg-muted mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border py-2 text-sm font-medium transition-colors"
        onClick={addField}
      >
        <Plus size={16} /> {dict.addField}
      </button>
    </div>
  )
}

/** Legacy exports for backward compatibility */
export const INITIAL_VCARD_FIELDS = getInitialVCardFields('vi')
export const PREDEFINED_KEYS = getPredefinedKeys(getAppDict('vi').vcard)
