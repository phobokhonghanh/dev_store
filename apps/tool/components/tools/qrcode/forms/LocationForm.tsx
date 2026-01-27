'use client'

import { Field, Input } from '@/components/Form'
import { useGoogleMaps } from '@/lib/hooks/useGoogleMaps'
import { LocationData } from '@/lib/qrcode-utils'
import { Globe, Loader2, Map, MapPin, Navigation } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'

// Dynamically import LeafletMap with no SSR to avoid "window is not defined" error
const LeafletMap = dynamic<{
  lat: number
  lng: number
  onPositionChange: (lat: number, lng: number) => void
}>(() => import('../maps/LeafletMap'), {
  loading: () => (
    <div className="bg-muted/10 text-muted-foreground flex h-full w-full animate-pulse items-center justify-center text-xs">
      Loading Map...
    </div>
  ),
  ssr: false,
})

type MapProvider = 'google' | 'leaflet'

interface LocationFormProps {
  data: LocationData
  onChange: (data: LocationData) => void
}

export function LocationForm({ data, onChange }: LocationFormProps) {
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  // Map provider toggle - detect default based on env var
  const [mapProvider, setMapProvider] = useState<MapProvider>('leaflet') // default to free option
  const [hasGoogleKey, setHasGoogleKey] = useState(false)

  // Check for Google API Key on mount (client-side only)
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (key) {
      setHasGoogleKey(true)
      setMapProvider('google') // Default to Google if key available
    }
  }, [])

  // Current coordinates or default (Ho Chi Minh City)
  const lat = parseFloat(data.lat) || 10.762622
  const lng = parseFloat(data.lng) || 106.660172

  const handlePositionChange = useCallback(
    (newLat: number, newLng: number) => {
      onChange({
        lat: newLat.toFixed(7),
        lng: newLng.toFixed(7),
      })
    },
    [onChange],
  )

  // Google Maps Hook
  const {
    inputRef,
    mapRef,
    isLoaded,
    error: googleError,
    setPosition,
  } = useGoogleMaps({
    onPlaceSelected: (newLat, newLng) => {
      handlePositionChange(newLat, newLng)
    },
    onMarkerDragEnd: (newLat, newLng) => {
      handlePositionChange(newLat, newLng)
    },
    initialConfig: {
      lat,
      lng,
    },
  })

  // Sync manual input changes back to the Google map
  useEffect(() => {
    if (mapProvider === 'google') {
      const parsedLat = parseFloat(data.lat)
      const parsedLng = parseFloat(data.lng)
      if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
        setPosition(parsedLat, parsedLng)
      }
    }
  }, [data.lat, data.lng, setPosition, mapProvider])

  // Nominatim Search for Leaflet
  const handleNominatimSearch = async (q: string) => {
    if (!q.trim()) return

    setIsSearching(true)
    setSearchError(null)

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`,
        {
          headers: {
            'User-Agent': 'DevStoreQR/1.0',
          },
        },
      )

      if (!res.ok) throw new Error('Search failed')

      const results = await res.json()

      if (results && results.length > 0) {
        const newLat = parseFloat(results[0].lat)
        const newLon = parseFloat(results[0].lon)
        handlePositionChange(newLat, newLon)
      } else {
        setSearchError('No results found')
      }
    } catch (err) {
      console.error('Nominatim Search Error', err)
      setSearchError('Search error. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsSearching(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handlePositionChange(
            position.coords.latitude,
            position.coords.longitude,
          )
          setIsSearching(false)
        },
        (err) => {
          console.error('Geolocation error', err)
          setSearchError('Could not get current location.')
          setIsSearching(false)
        },
      )
    } else {
      setSearchError('Geolocation is not supported by this browser.')
    }
  }

  const isGoogleMode = mapProvider === 'google'

  return (
    <div className="space-y-4">
      {/* Map Provider Toggle */}
      <div className="border-border bg-muted/10 flex items-center justify-between rounded-lg border p-2">
        <span className="text-muted-foreground text-xs font-medium">
          Map Provider:
        </span>
        <div className="bg-muted/20 flex gap-1 rounded-md p-0.5">
          <button
            onClick={() => {
              if (hasGoogleKey) {
                setMapProvider('google')
              } else {
                setSearchError('Google Maps API Key is not configured.')
              }
            }}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs transition-all ${
              isGoogleMode
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Map size={12} />
            Google
          </button>
          <button
            onClick={() => setMapProvider('leaflet')}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs transition-all ${
              !isGoogleMode
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Globe size={12} />
            OSM (Free)
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Field label="Search Location">
          <div className="relative">
            <Input
              ref={isGoogleMode ? inputRef : undefined}
              placeholder={
                isGoogleMode
                  ? 'Search with Google Maps...'
                  : 'Search address (Press Enter)...'
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isGoogleMode) {
                  handleNominatimSearch(e.currentTarget.value)
                }
              }}
              className="pr-10"
            />
            <div className="text-muted-foreground absolute top-1/2 right-3 flex -translate-y-1/2 gap-2">
              {isSearching ? (
                <Loader2 className="text-primary h-4 w-4 animate-spin" />
              ) : (
                <button
                  onClick={handleGetCurrentLocation}
                  title="Get Current Location"
                  className="hover:text-primary transition-colors"
                >
                  <Navigation size={16} />
                </button>
              )}
            </div>
          </div>
        </Field>
        {searchError && (
          <p className="text-destructive mt-1 ml-1 text-[10px]">
            {searchError}
          </p>
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
                  Try switching to OSM (Free) mode.
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
        Tip: Click on map or drag marker to pinpoint location.
      </p>

      {/* Coordinate Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Latitude">
          <Input
            placeholder="10.762622"
            value={data.lat}
            onChange={(e) =>
              onChange({
                ...data,
                lat: e.currentTarget.value,
              })
            }
          />
        </Field>
        <Field label="Longitude">
          <Input
            placeholder="106.660172"
            value={data.lng}
            onChange={(e) =>
              onChange({
                ...data,
                lng: e.currentTarget.value,
              })
            }
          />
        </Field>
      </div>
    </div>
  )
}
