import { useCallback, useEffect, useRef, useState } from 'react'

interface UseGoogleMapsOptions {
  onPlaceSelected: (lat: number, lng: number, address: string) => void
  onMarkerDragEnd: (lat: number, lng: number) => void
  initialConfig?: {
    lat: number
    lng: number
    zoom?: number
  }
}

/**
 * Hook to integrate Google Maps and Places Autocomplete.
 * Loads the Google Maps script using API Key from environment variable.
 * Provides refs for the map and autocomplete input.
 */
export function useGoogleMaps({
  onPlaceSelected,
  onMarkerDragEnd,
  initialConfig,
}: UseGoogleMapsOptions) {
  const inputRef = useRef<HTMLInputElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapInstance = useRef<google.maps.Map | null>(null)
  const markerInstance = useRef<google.maps.Marker | null>(null)

  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Defer reading env var to client-side to avoid hydration mismatch
  const [apiKey, setApiKey] = useState<string>('')

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
    setApiKey(key)
  }, [])

  // 1. Script Loading
  useEffect(() => {
    // Wait for apiKey to be set from client-side
    if (apiKey === '') return

    if (!apiKey) {
      setError('Google Maps API Key is not configured.')
      return
    }

    if (window.google?.maps?.places) {
      setIsLoaded(true)
      return
    }

    const scriptId = 'google-maps-script'
    let script = document.getElementById(scriptId) as HTMLScriptElement | null

    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setIsLoaded(true)
      script.onerror = () => setError('Failed to load Google Maps script')
      document.head.appendChild(script)
    } else {
      script.addEventListener('load', () => setIsLoaded(true))
    }
  }, [apiKey])

  // 2. Map & Marker Initialization
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.google?.maps) return

    const lat = initialConfig?.lat || 10.762622
    const lng = initialConfig?.lng || 106.660172
    const pos = { lat, lng }

    const map = new window.google.maps.Map(mapRef.current, {
      center: pos,
      zoom: initialConfig?.zoom || 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    })

    const marker = new window.google.maps.Marker({
      position: pos,
      map: map,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
    })

    googleMapInstance.current = map
    markerInstance.current = marker

    marker.addListener('dragend', () => {
      const position = marker.getPosition()
      if (position) {
        onMarkerDragEnd(position.lat(), position.lng())
      }
    })

    // Update lat/lng on map click too
    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      const clickedPos = e.latLng
      if (clickedPos) {
        marker.setPosition(clickedPos)
        onMarkerDragEnd(clickedPos.lat(), clickedPos.lng())
      }
    })

    return () => {
      window.google.maps.event.clearInstanceListeners(marker)
      window.google.maps.event.clearInstanceListeners(map)
    }
  }, [
    isLoaded,
    onMarkerDragEnd,
    initialConfig?.lat,
    initialConfig?.lng,
    initialConfig?.zoom,
  ])

  // 3. Autocomplete Initialization
  useEffect(() => {
    if (!isLoaded || !inputRef.current || !window.google?.maps?.places) return

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ['address'],
        fields: ['geometry', 'formatted_address'],
      },
    )

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        const address = place.formatted_address || ''

        // Update map and marker
        if (googleMapInstance.current && markerInstance.current) {
          const pos = { lat, lng }
          googleMapInstance.current.setCenter(pos)
          googleMapInstance.current.setZoom(17)
          markerInstance.current.setPosition(pos)
        }

        onPlaceSelected(lat, lng, address)
      }
    })

    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete)
    }
  }, [isLoaded, onPlaceSelected])

  // Helper to manually update marker/map from outside (e.g. if lat/lng inputs are edited)
  const setPosition = useCallback((lat: number, lng: number) => {
    if (googleMapInstance.current && markerInstance.current) {
      const pos = { lat, lng }
      googleMapInstance.current.setCenter(pos)
      markerInstance.current.setPosition(pos)
    }
  }, [])

  const hasApiKey = Boolean(apiKey)

  return { inputRef, mapRef, isLoaded, error, setPosition, hasApiKey }
}
