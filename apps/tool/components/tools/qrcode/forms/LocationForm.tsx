'use client'

import { Field, Input, Label } from '@/components/Form'
import { CONFIG, DEFAULT_LOCALE } from '@/lib/config'
import { useGoogleMaps } from '@/lib/hooks/useGoogleMaps'
import { getDict } from '@/lib/i18n'
import { LocationData } from '@/lib/qrcode-utils'
import { Globe, Loader2, Map, MapPin, Navigation } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useState } from 'react'

// Dynamically import LeafletMap with no SSR
const LeafletMap = dynamic<{
  lat: number
  lng: number
  onPositionChange: (lat: number, lng: number) => void
}>(() => import('../maps/LeafletMap'), {
  loading: () => <MapLoadingPlaceholder />,
  ssr: false,
})

/** Map provider options */
type MapProvider = 'google' | 'leaflet'

/** Loading status for various operations */
interface LoadingState {
  detecting: boolean // Getting user location
  searching: boolean // Searching address
}

interface LocationFormProps {
  data: LocationData
  onChange: (data: LocationData) => void
  onToast?: (message: string) => void
  locale?: 'vi' | 'en'
}

/** Reusable loading placeholder for map */
const MapLoadingPlaceholder = () => (
  <div className="bg-muted/10 text-muted-foreground flex h-full w-full animate-pulse items-center justify-center text-xs">
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  </div>
)

export function LocationForm({
  data,
  onChange,
  onToast,
  locale = DEFAULT_LOCALE,
}: LocationFormProps) {
  const dict = useMemo(() => getDict(locale), [locale])

  // Unified loading state
  const [loading, setLoading] = useState<LoadingState>({
    detecting: false,
    searching: false,
  })
  const [error, setError] = useState<string | null>(null)

  // Map provider state
  const [mapProvider, setMapProvider] = useState<MapProvider>('leaflet')
  const [hasGoogleKey, setHasGoogleKey] = useState(false)

  // Check for Google API Key on mount
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (key) {
      setHasGoogleKey(true)
      setMapProvider('google')
    }
  }, [])

  // Auto-detect user location on mount
  useEffect(() => {
    // Only if no coordinates are set yet
    if (data.lat || data.lng) return

    if (!navigator.geolocation) {
      onChange({
        lat: String(CONFIG.DEFAULT_LAT),
        lng: String(CONFIG.DEFAULT_LNG),
      })
      return
    }

    setLoading((prev) => ({ ...prev, detecting: true }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onChange({
          lat: position.coords.latitude.toFixed(7),
          lng: position.coords.longitude.toFixed(7),
        })
        setLoading((prev) => ({ ...prev, detecting: false }))
      },
      () => {
        // On error or denial, use default 0,0
        onChange({
          lat: String(CONFIG.DEFAULT_LAT),
          lng: String(CONFIG.DEFAULT_LNG),
        })
        setLoading((prev) => ({ ...prev, detecting: false }))
      },
      {
        timeout: CONFIG.GEOLOCATION.TIMEOUT,
        maximumAge: CONFIG.GEOLOCATION.MAX_AGE,
        enableHighAccuracy: CONFIG.GEOLOCATION.HIGH_ACCURACY,
      },
    )
  }, [])

  // Current coordinates
  const lat = parseFloat(data.lat) || CONFIG.DEFAULT_LAT
  const lng = parseFloat(data.lng) || CONFIG.DEFAULT_LNG

  const handlePositionChange = useCallback(
    (newLat: number, newLng: number) => {
      onChange({
        ...data,
        lat: newLat.toFixed(7),
        lng: newLng.toFixed(7),
      })
    },
    [onChange, data],
  )

  // Google Maps Hook
  const {
    inputRef,
    mapRef,
    isLoaded,
    error: googleError,
    setPosition,
  } = useGoogleMaps({
    onPlaceSelected: handlePositionChange,
    onMarkerDragEnd: handlePositionChange,
    initialConfig: { lat, lng },
  })

  // Sync manual input changes to Google map
  useEffect(() => {
    if (mapProvider === 'google') {
      const parsedLat = parseFloat(data.lat)
      const parsedLng = parseFloat(data.lng)
      if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
        setPosition(parsedLat, parsedLng)
      }
    }
  }, [data.lat, data.lng, setPosition, mapProvider])

  // Nominatim Search for Leaflet/OSM
  const handleNominatimSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) return

      setLoading((prev) => ({ ...prev, searching: true }))
      setError(null)

      try {
        const res = await fetch(
          `${CONFIG.NOMINATIM_URL}?format=json&q=${encodeURIComponent(query)}&limit=1`,
          { headers: { 'User-Agent': CONFIG.MAP.USER_AGENT } },
        )

        if (!res.ok) throw new Error('Search failed')

        const results = await res.json()

        if (results?.length > 0) {
          handlePositionChange(
            parseFloat(results[0].lat),
            parseFloat(results[0].lon),
          )
        } else {
          setError(dict.errorNoResults)
        }
      } catch {
        setError(dict.errorSearchFailed)
      } finally {
        setLoading((prev) => ({ ...prev, searching: false }))
      }
    },
    [handlePositionChange, dict],
  )

  const handleGetCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError(dict.errorGeolocationNotSupported)
      return
    }

    setLoading((prev) => ({ ...prev, detecting: true }))
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        handlePositionChange(
          position.coords.latitude,
          position.coords.longitude,
        )
        setLoading((prev) => ({ ...prev, detecting: false }))
      },
      () => {
        setError(dict.errorGeolocation)
        setLoading((prev) => ({ ...prev, detecting: false }))
      },
      {
        timeout: CONFIG.GEOLOCATION.TIMEOUT,
        maximumAge: CONFIG.GEOLOCATION.MAX_AGE,
        enableHighAccuracy: CONFIG.GEOLOCATION.HIGH_ACCURACY,
      },
    )
  }, [handlePositionChange, dict])

  const handleGoogleProviderClick = useCallback(() => {
    if (hasGoogleKey) {
      setMapProvider('google')
    } else {
      onToast?.(dict.comingSoon)
      setError(dict.errorGoogleNotConfigured)
    }
  }, [hasGoogleKey, onToast, dict])

  const isGoogleMode = mapProvider === 'google'
  const isLoading = loading.detecting || loading.searching

  return (
    <div className="space-y-4">
      {/* Detecting Location Overlay */}
      {loading.detecting && (
        <div className="bg-primary/5 border-primary/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
          <Loader2 className="text-primary h-4 w-4 animate-spin" />
          <span className="text-muted-foreground">
            {dict.detectingLocation}
          </span>
        </div>
      )}

      {/* Map Provider Toggle */}
      <div className="border-border bg-muted/10 flex items-center justify-between rounded-lg border p-2">
        <span className="text-muted-foreground text-xs font-medium">
          {dict.mapProvider}
        </span>
        <div className="bg-muted/20 flex gap-1 rounded-md p-0.5">
          <button
            onClick={handleGoogleProviderClick}
            className={`flex cursor-pointer items-center gap-1.5 rounded px-2.5 py-1 text-xs transition-all ${
              isGoogleMode
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Map size={12} />
            {dict.mapProviderGoogle}
          </button>
          <button
            onClick={() => setMapProvider('leaflet')}
            className={`flex cursor-pointer items-center gap-1.5 rounded px-2.5 py-1 text-xs transition-all ${
              !isGoogleMode
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Globe size={12} />
            {dict.mapProviderOSM}
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Field label={dict.searchLabel}>
          <div className="relative">
            <Input
              ref={isGoogleMode ? inputRef : undefined}
              placeholder={
                isGoogleMode
                  ? dict.searchPlaceholderGoogle
                  : dict.searchPlaceholderOSM
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isGoogleMode) {
                  handleNominatimSearch(e.currentTarget.value)
                }
              }}
              className="pr-10"
            />
            <div className="text-muted-foreground absolute top-1/2 right-3 flex -translate-y-1/2 gap-2">
              {isLoading ? (
                <Loader2 className="text-primary h-4 w-4 animate-spin" />
              ) : (
                <button
                  onClick={handleGetCurrentLocation}
                  title={dict.getCurrentLocation}
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  <Navigation size={16} />
                </button>
              )}
            </div>
          </div>
        </Field>
        {error && (
          <p className="text-destructive mt-1 ml-1 text-[10px]">{error}</p>
        )}
      </div>

      {/* Map Container */}
      <div
        className="border-border bg-muted/5 relative z-0 overflow-hidden rounded-lg border"
        style={{ height: '300px' }}
      >
        {isGoogleMode ? (
          <>
            <div ref={mapRef} className="h-full w-full" />
            {!isLoaded && !googleError && (
              <div className="bg-background/50 absolute inset-0 flex items-center justify-center backdrop-blur-[1px]">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
              </div>
            )}
            {googleError && (
              <div className="bg-destructive/5 absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <p className="text-destructive text-xs font-semibold">
                  {googleError}
                </p>
                <p className="text-muted-foreground mt-1 text-[10px]">
                  {dict.switchToOSM}
                </p>
              </div>
            )}
          </>
        ) : (
          <LeafletMap
            lat={lat}
            lng={lng}
            onPositionChange={handlePositionChange}
          />
        )}
      </div>

      <p className="text-muted-foreground border-border border-b pb-2 text-[10px] italic">
        <MapPin size={10} className="text-primary mr-1 inline" />
        {dict.tip}
      </p>

      {/* Google Maps Link Toggle */}
      <div className="bg-muted/5 hover:bg-muted/10 flex flex-col gap-1.5 rounded-lg border border-dashed p-3 transition-all">
        <div className="flex items-center gap-2">
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              id="use-google-maps"
              className="peer checked:border-primary checked:bg-primary h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 bg-white transition-all"
              checked={!!data.useGoogleMaps}
              onChange={(e) =>
                onChange({ ...data, useGoogleMaps: e.currentTarget.checked })
              }
            />
            <svg
              className="pointer-events-none absolute h-4 w-4 scale-0 text-white transition-transform peer-checked:scale-100"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <Label
            htmlFor="use-google-maps"
            className="cursor-pointer text-xs font-semibold select-none"
          >
            {dict.googleMapsLink}
          </Label>
        </div>
        <div className="ml-6 space-y-1">
          <p className="text-muted-foreground text-[10px] leading-relaxed">
            {dict.googleMapsDesc}
          </p>
        </div>
      </div>

      {/* Coordinate Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <Field label={dict.latitude}>
          <Input
            placeholder="0.0000000"
            value={data.lat}
            onChange={(e) => onChange({ ...data, lat: e.currentTarget.value })}
          />
        </Field>
        <Field label={dict.longitude}>
          <Input
            placeholder="0.0000000"
            value={data.lng}
            onChange={(e) => onChange({ ...data, lng: e.currentTarget.value })}
          />
        </Field>
      </div>
    </div>
  )
}
