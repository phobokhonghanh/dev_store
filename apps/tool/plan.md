# Event QR Code Enhancement Plan

> **Mục tiêu**: Cải thiện tab Event QR để hỗ trợ calendar import, datetime picker UX tốt hơn, và tích hợp location search với map.

---

## 📊 Phân tích vấn đề hiện tại

### Vấn đề 1: QR Event không import được vào Calendar
**Hiện trạng:**
- File `lib/qr/utils.ts` (dòng 58-73) đã generate iCal format chuẩn với:
  - `BEGIN:VCALENDAR` / `END:VCALENDAR`
  - `DTSTART`, `DTEND`, `LOCATION`, `DESCRIPTION`
- **Nguyên nhân có thể**: Thiếu trường `PRODID` (bắt buộc theo RFC 5545) và có thể thiếu timezone info.
- **Không có QR_PROMOTION_TEXT**: Event QR hiện tại không có footer promotion như VCard.

**Tại sao cần sửa:**
- iCal spec yêu cầu `PRODID` để xác định ứng dụng tạo file.
- Thiếu timezone có thể gây lỗi khi import vào Google Calendar, Apple Calendar.
- Nếu không import được, cần fallback hiển thị text kèm promotion.

---

### Vấn đề 2: Datetime Picker UX chưa tối ưu
**Hiện trạng:**
- `EventForm.tsx` (dòng 34, 46) đã dùng `type="datetime-local"` cho Input.
- **Vấn đề**: User báo "chỉ có thể nhập từ input" → có thể do:
  - Browser không hỗ trợ datetime-local picker (Safari cũ, Firefox Android).
  - UI của native picker không rõ ràng.

**Tại sao cần sửa:**
- Cần fallback UI hoặc custom datetime picker để đảm bảo cross-browser.
- Cải thiện UX bằng cách hiển thị rõ ràng date + time riêng biệt.

---

### Vấn đề 3: Location là plain text, không có map search
**Hiện trạng:**
- `EventForm.tsx` (dòng 57-67) chỉ có Input text đơn giản cho location.
- **Không tận dụng**: `LocationForm.tsx` đã có sẵn map search + Google Maps/OSM integration.

**Tại sao cần sửa:**
- User muốn tìm kiếm địa chỉ qua map như tab Location.
- Tái sử dụng code giúp consistency và giảm duplicate logic.

---

## 📋 Kế hoạch chi tiết

### Task 1: Cải thiện iCal Format & Fallback Display

#### 1.1 Update `generateEventString` trong `lib/qr/utils.ts`
**File**: `lib/qr/utils.ts` (dòng 58-73)

**Thay đổi:**
```typescript
export const generateEventString = (data: EventData): string => {
  if (!data.title) return ''
  
  // Format datetime to iCal format (YYYYMMDDTHHMMSSZ)
  const formatDateTime = (isoString: string): string => {
    // Convert ISO datetime-local to UTC iCal format
    const date = new Date(isoString)
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }
  
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TuiTenPho Tools//QR Event Generator//EN', // REQUIRED by RFC 5545
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@tuitenpho-tool.vercel.app`, // Unique ID
    `DTSTAMP:${formatDateTime(new Date().toISOString())}`, // Creation timestamp
    `DTSTART:${formatDateTime(data.startDate)}`,
    `DTEND:${formatDateTime(data.endDate)}`,
    `SUMMARY:${data.title}`,
    `LOCATION:${data.location}`,
    `DESCRIPTION:${data.description}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n')
}
```

**Lý do:**
- Thêm `PRODID`: Bắt buộc theo spec, giúp calendar apps nhận diện.
- Thêm `UID`, `DTSTAMP`: Chuẩn iCal, tránh duplicate events.
- `formatDateTime` cải thiện: Xử lý đúng timezone UTC.
- Thêm `STATUS`, `SEQUENCE`: Tăng compatibility.

#### 1.2 Update `generateEventDisplay` để có QR_PROMOTION_TEXT
**File**: `lib/qr/utils.ts` (dòng 142-145)

**Thay đổi:**
```typescript
export const generateEventDisplay = (data: EventData): string => {
  if (!data.title) return ''
  
  const parts = [
    `Event: ${data.title}`,
    `Start: ${new Date(data.startDate).toLocaleString('vi-VN')}`,
    `End: ${new Date(data.endDate).toLocaleString('vi-VN')}`,
  ]
  
  if (data.location) parts.push(`Location: ${data.location}`)
  if (data.description) parts.push(`Description: ${data.description}`)
  
  return parts.join('\n') + QR_PROMOTION_TEXT
}
```

**Lý do:**
- Hiển thị đầy đủ thông tin event khi scan QR (fallback nếu không import được).
- Thêm `QR_PROMOTION_TEXT` như user yêu cầu.
- Format datetime sang human-readable (locale VN).

---

### Task 2: Cải thiện Datetime Picker UX

#### 2.1 Tạo component `DateTimePicker.tsx`
**File mới**: `components/Form/DateTimePicker.tsx`

**Nội dung:**
```typescript
'use client'

import { Input } from './Input'
import { Label } from './Label'
import { Calendar, Clock } from 'lucide-react'

interface DateTimePickerProps {
  value: string // ISO datetime-local format
  onChange: (value: string) => void
  label?: string
}

export function DateTimePicker({ value, onChange, label }: DateTimePickerProps) {
  // Split datetime-local into date and time
  const [date, time] = value ? value.split('T') : ['', '']
  
  const handleDateChange = (newDate: string) => {
    onChange(`${newDate}T${time || '00:00'}`)
  }
  
  const handleTimeChange = (newTime: string) => {
    onChange(`${date || new Date().toISOString().split('T')[0]}T${newTime}`)
  }
  
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            type="date"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="relative">
          <Clock className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            type="time"
            value={time}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
    </div>
  )
}
```

**Lý do:**
- Tách date và time thành 2 input riêng → UX rõ ràng hơn.
- `type="date"` và `type="time"` có support tốt hơn `datetime-local`.
- Icons giúp user dễ nhận biết.
- Reusable cho các form khác sau này.

#### 2.2 Export component mới
**File**: `components/Form/index.ts`

**Thêm:**
```typescript
export { DateTimePicker } from './DateTimePicker'
```

#### 2.3 Update `EventForm.tsx` sử dụng DateTimePicker
**File**: `components/tools/qrcode/forms/EventForm.tsx`

**Thay đổi:**
```typescript
import { DateTimePicker } from '@/components/form'

// Replace lines 31-56 with:
<div className="space-y-3">
  <DateTimePicker
    label={dict.startDateLabel}
    value={data.startDate}
    onChange={(val) => onChange({ ...data, startDate: val })}
  />
  <DateTimePicker
    label={dict.endDateLabel}
    value={data.endDate}
    onChange={(val) => onChange({ ...data, endDate: val })}
  />
</div>
```

**Lý do:**
- Sử dụng component mới, UX tốt hơn.
- Code gọn hơn, dễ maintain.

---

### Task 3: Tích hợp Location Search với Map

#### 3.1 Mở rộng `EventData` type
**File**: `lib/qr/types.ts` (dòng 71-77)

**Thay đổi:**
```typescript
export interface EventData {
  title: string
  startDate: string
  endDate: string
  location: string
  locationLat?: string  // NEW: Latitude for map
  locationLng?: string  // NEW: Longitude for map
  description: string
}
```

**Lý do:**
- Lưu tọa độ để hiển thị map (optional).
- Không breaking change vì là optional fields.

#### 3.2 Tạo Reverse Geocoding Utility
**File mới**: `lib/geocoding.ts`

**Nội dung:**
```typescript
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
          'User-Agent': 'TuiTenPho-Tools/1.0' 
        } 
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
```

**Lý do:**
- Sử dụng Nominatim (free, open-source).
- Không cần API key → dễ deploy.
- Fallback về coordinates nếu API fail.

#### 3.3 Tái sử dụng LocationForm trực tiếp (RECOMMENDED ✅)
**File**: `components/tools/qrcode/forms/EventForm.tsx`

**Thay đổi:**
```typescript
import { LocationForm } from './LocationForm'
import { reverseGeocode } from '@/lib/geocoding'
import { useState, useEffect } from 'react'

// Add state for location data
const [locationData, setLocationData] = useState<LocationData>({
  lat: data.locationLat || '',
  lng: data.locationLng || '',
  useGoogleMaps: false,
})

// Auto reverse geocode when coordinates change
useEffect(() => {
  const lat = parseFloat(locationData.lat)
  const lng = parseFloat(locationData.lng)
  
  if (!isNaN(lat) && !isNaN(lng)) {
    reverseGeocode(lat, lng).then(address => {
      onChange({
        ...data,
        location: address,
        locationLat: locationData.lat,
        locationLng: locationData.lng,
      })
    })
  }
}, [locationData.lat, locationData.lng])

// Replace location Input (lines 57-67) with:
<div className="border rounded-lg p-3 bg-muted/5 space-y-2">
  <Label className="text-sm font-semibold">{dict.locationLabel}</Label>
  <LocationForm
    data={locationData}
    onChange={setLocationData}
    locale={locale}
  />
  {data.location && (
    <p className="text-xs text-muted-foreground mt-2">
      📍 {data.location}
    </p>
  )}
</div>
```

**Lý do (Best Practices):**
1. **DRY Principle**: Tái sử dụng 100% logic của LocationForm (map search, provider toggle, geolocation).
2. **Consistency**: UX giống hệt tab Location → user không phải học lại interface.
3. **Maintainability**: Bug fixes ở LocationForm tự động apply cho Event tab.
4. **Feature Parity**: Tự động có Google Maps/OSM toggle, current location detection.

**Trade-offs (Acceptable):**
- ✅ **Pros**: Full map functionality, consistency, zero duplicate code.
- ⚠️ **Cons**: EventForm phức tạp hơn một chút, cần reverse geocoding.
- **Kết luận**: Trade-off đáng giá vì được đền bù bằng maintainability và UX consistency.

**Quyết định cuối cùng:** Dùng approach 3.3 (full LocationForm reuse) ngay từ đầu. Không cần phase 1/2 vì reverse geocoding đơn giản với Nominatim.

---

### Task 4: Update Initial Data

#### 4.1 Update `lib/qr/init.ts`
**File**: `lib/qr/init.ts`

**Thay đổi:**
```typescript
EVENT: {
  title: '',
  startDate: '', // Will be set by getInitialEventDates()
  endDate: '',
  location: '',
  locationLat: '', // NEW
  locationLng: '', // NEW
  description: '',
} as EventData,
```

**Lý do:**
- Thêm fields mới cho location coordinates.

---

## 🎯 Thứ tự thực hiện (Priority)

| Task | Priority | Effort | Impact |
|------|----------|--------|--------|
| Task 1.1: Fix iCal format | **HIGH** | Low | Critical (fix calendar import) |
| Task 1.2: Add promotion text | Medium | Low | Nice to have |
| Task 2: DateTimePicker | **HIGH** | Medium | High (UX improvement) |
| Task 3.2: Reverse Geocoding | **HIGH** | Low | Required for Task 3.3 |
| Task 3.3: Full LocationForm Reuse | **HIGH** | Medium | High (best practices) |

**Rationale for Task 3 approach:**
- Không cần phân chia phase 1/2 vì reverse geocoding với Nominatim rất đơn giản (free, no API key).
- Implement full LocationForm reuse ngay từ đầu để tránh technical debt và đảm bảo consistency.

---

## ⚠️ Lưu ý khi implement

1. **Timezone handling**: iCal format cần UTC time. Phải convert từ datetime-local (local time) sang UTC.
2. **Reverse Geocoding**: Nếu dùng Task 3.3, cần API key (Google Maps Geocoding hoặc Nominatim).
3. **Backward compatibility**: Các EventData cũ không có `locationLat/Lng` vẫn phải hoạt động.
4. **Testing**: Test QR code với nhiều calendar apps (Google Calendar, Apple Calendar, Outlook).

---

## 📚 Files cần sửa

```
lib/
├── qr/
│   ├── utils.ts              # Task 1.1, 1.2
│   ├── types.ts              # Task 3.1
│   └── init.ts               # Task 4.1
└── geocoding.ts              # Task 3.2 (NEW)

components/
├── Form/
│   ├── DateTimePicker.tsx   # Task 2.1 (NEW)
│   └── index.ts             # Task 2.2
└── tools/qrcode/forms/
    └── EventForm.tsx        # Task 2.3, Task 3.3
```
