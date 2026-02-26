'use client'

import L, { LatLng } from 'leaflet'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet'

interface LeafletMapProps {
  lat: number
  lng: number
  onPositionChange: (lat: number, lng: number) => void
}

// Component to handle map clicks
function LocationMarker({
  position,
  onPositionChange,
}: {
  position: LatLng
  onPositionChange: (lat: number, lng: number) => void
}) {
  const markerRef = useRef<L.Marker>(null)

  useMapEvents({
    click(e) {
      onPositionChange(e.latlng.lat, e.latlng.lng)
    },
  })

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const { lat, lng } = marker.getLatLng()
          onPositionChange(lat, lng)
        }
      },
    }),
    [onPositionChange],
  )

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup>
        Latitude: {position.lat.toFixed(5)} <br /> Longitude:{' '}
        {position.lng.toFixed(5)}
      </Popup>
    </Marker>
  )
}

// Component to update map center when props change
function MapUpdater({ center }: { center: LatLng }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

const LeafletMap = ({ lat, lng, onPositionChange }: LeafletMapProps) => {
  const position = new L.LatLng(lat, lng)

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} onPositionChange={onPositionChange} />
      <MapUpdater center={position} />
    </MapContainer>
  )
}

export default LeafletMap
