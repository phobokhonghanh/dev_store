/**
 * Reverse geocoding using Nominatim (OpenStreetMap)
 * Free, no API key required
 */
export async function reverseGeocode(
    lat: number,
    lng: number
): Promise<string> {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
            {
                headers: {
                    'User-Agent': 'TuiTenPho-Tools/1.0',
                },
            }
        )

        if (!res.ok) throw new Error('Geocoding failed')

        const data = await res.json()
        return data.display_name || `${lat}, ${lng}`
    } catch (error) {
        console.error('Reverse geocoding error:', error)
        return `${lat}, ${lng}` // Fallback to coordinates
    }
}
