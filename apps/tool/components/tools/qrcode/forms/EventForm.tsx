'use client'

import { Field, Input, DateTimePicker, Label } from '@/components/form'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/config'
import { getAppDict } from '@/lib/i18n'
import { EventData, LocationData } from '@/lib/qr'
import { reverseGeocode } from '@/lib/geocoding'
import { useEffect, useMemo, useState } from 'react'
import { LocationForm } from './LocationForm'

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

  // Internal state for location coordinates (map search)
  const [locationData, setLocationData] = useState<LocationData>({
    lat: data.locationLat || '',
    lng: data.locationLng || '',
    useGoogleMaps: false,
  })

  // Synchronize local locationData when data props change (e.g., on reset)
  useEffect(() => {
    if (data.locationLat !== locationData.lat || data.locationLng !== locationData.lng) {
      setLocationData(prev => ({
        ...prev,
        lat: data.locationLat || '',
        lng: data.locationLng || '',
      }))
    }
  }, [data.locationLat, data.locationLng])

  // Auto reverse geocode when coordinates change from the map
  useEffect(() => {
    const lat = parseFloat(locationData.lat)
    const lng = parseFloat(locationData.lng)

    if (!isNaN(lat) && !isNaN(lng) && locationData.lat && locationData.lng) {
      const timer = setTimeout(() => {
        reverseGeocode(lat, lng).then((address) => {
          // Only update if address is actually found and differs
          if (address && address !== data.location) {
            onChange({
              ...data,
              location: address,
              locationLat: locationData.lat,
              locationLng: locationData.lng,
            })
          }
        })
      }, 800) // Debounce to avoid too many API calls
      return () => clearTimeout(timer)
    }
  }, [locationData.lat, locationData.lng])

  return (
    <div className="space-y-4">
      <Field label={dict.titleLabel}>
        <Input
          placeholder={dict.titlePlaceholder}
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.currentTarget.value })}
        />
      </Field>

      <div className="space-y-3">
        <DateTimePicker
          label={dict.startDateLabel}
          value={data.startDate}
          onChange={(val: string) => onChange({ ...data, startDate: val })}
        />
        <DateTimePicker
          label={dict.endDateLabel}
          value={data.endDate}
          onChange={(val: string) => onChange({ ...data, endDate: val })}
        />
      </div>

      <div className="bg-muted/5 space-y-3 rounded-lg border border-dashed p-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold">{dict.locationLabel}</Label>
          <div className="bg-muted/20 flex gap-1 rounded-md p-0.5">
            <button
              type="button"
              onClick={() => onChange({ ...data, useMap: true })}
              className={`flex cursor-pointer items-center gap-1.5 rounded px-2 py-1 text-[10px] transition-all ${data.useMap !== false
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {dict.locationModeMap}
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...data, useMap: false })}
              className={`flex cursor-pointer items-center gap-1.5 rounded px-2 py-1 text-[10px] transition-all ${data.useMap === false
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {dict.locationModeManual}
            </button>
          </div>
        </div>

        {data.useMap !== false ? (
          <>
            <LocationForm
              data={locationData}
              onChange={setLocationData}
              locale={locale === 'vi' || locale === 'en' ? locale : 'en'}
            />
            {data.location && (
              <div className="bg-background/50 flex items-start gap-2 rounded border border-dotted p-2">
                <span className="text-[10px]">📍</span>
                <p className="text-muted-foreground text-[10px] leading-relaxed italic">
                  {data.location}
                </p>
              </div>
            )}
          </>
        ) : (
          <Input
            placeholder={dict.locationPlaceholder || 'e.g., 123 Main St, City, Country'}
            value={data.location}
            onChange={(e) => onChange({ ...data, location: e.currentTarget.value })}
          />
        )}
      </div>

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
