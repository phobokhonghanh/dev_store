import {
  CustomField,
  generateEmailString,
  generateEventString,
  generateLocationString,
  generatePaymentString,
  generateSmsString,
  generateVCardString,
  generateWifiString,
  WiFiData,
} from '@/lib/qrcode-utils'
import { getBankByBinOrShortName } from '@/lib/vietqr'
import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const type = searchParams.get('type') || 'text'
  const size = parseInt(searchParams.get('size') || '300')
  const dark = searchParams.get('dark') || '#000000'
  const light = searchParams.get('light') || '#ffffff'

  let qrValue = searchParams.get('data') || searchParams.get('url') || ''

  if (!qrValue) {
    switch (type) {
      case 'url':
        // For URL type, prioritize 'weburl' param
        const webUrl = searchParams.get('weburl')
        if (webUrl) qrValue = webUrl
        break
      case 'wifi':
        const ssid = searchParams.get('ssid') || ''
        const password = searchParams.get('password') || ''
        const encryption =
          (searchParams.get('encryption') as WiFiData['encryption']) || 'WPA'
        const hidden =
          searchParams.get('hidden') === '1' ||
          searchParams.get('hidden') === 'true'

        if (ssid) {
          qrValue = generateWifiString({ ssid, password, encryption, hidden })
        }
        break
      case 'custom':
      case 'vcard':
        // Extract standard VCard params or custom params
        // We'll iterate all params to find custom ones if needed, or just specific known ones?
        // For simplicity/security, let's look for specific known keys or keys starting with 'custom_'?
        // The implementation in Tabs uses 'key' and 'value'.
        // Let's support a flexible approach: any param 'key_FIELD=VALUE' or just direct mapping if we define standard keys.
        // But the user request said: "mỗi 1 cột, dòng là 1 param".
        // So if we have {key:'FN', value:'Name'}, we expect param ?fn=Name.
        // Let's map searchParams to CustomFields.
        const fields: CustomField[] = []
        searchParams.forEach((value, key) => {
          // Skip standard control params
          if (['type', 'size', 'dark', 'light', 'data', 'url'].includes(key))
            return

          // Assume other params are fields
          // Note: This might capture unintended params, but for this specific API endpoint it should be fine
          // as long as we document it.
          // We map key to upper case for VCard keys (FN, TEL, etc)
          fields.push({ key: key.toUpperCase(), value, label: key }) // Label logic could be improved
        })

        if (fields.length > 0) {
          qrValue = generateVCardString(fields)
        }
        break
      case 'payment':
        const bankInput = searchParams.get('bank') || ''
        const account = searchParams.get('account') || ''
        const amount = searchParams.get('amount') || ''
        const content = searchParams.get('content') || ''

        const bank = getBankByBinOrShortName(bankInput)
        if (bank && account) {
          qrValue = generatePaymentString({
            bankBin: bank.bin,
            account,
            name: searchParams.get('name') || '',
            amount,
            content,
          })
        }
        break
      case 'event': {
        const title = searchParams.get('title') || ''
        const startDate = searchParams.get('start') || ''
        const endDate = searchParams.get('end') || ''
        const eventLocation = searchParams.get('location') || ''
        const description = searchParams.get('description') || ''
        if (title) {
          qrValue = generateEventString({
            title,
            startDate,
            endDate,
            location: eventLocation,
            description,
          })
        }
        break
      }
      case 'email': {
        const emailAddr = searchParams.get('email') || ''
        const subject = searchParams.get('subject') || ''
        const body = searchParams.get('body') || ''
        if (emailAddr) {
          qrValue = generateEmailString({ email: emailAddr, subject, body })
        }
        break
      }
      case 'sms': {
        const phone = searchParams.get('phone') || ''
        const message = searchParams.get('message') || ''
        if (phone) {
          qrValue = generateSmsString({ phone, message })
        }
        break
      }
      case 'location': {
        const lat = searchParams.get('lat') || ''
        const lng = searchParams.get('lng') || ''
        const useGoogle =
          searchParams.get('google') === '1' ||
          searchParams.get('google') === 'true'
        if (lat && lng) {
          qrValue = generateLocationString({
            lat,
            lng,
            useGoogleMaps: useGoogle,
          })
        }
        break
      }
      case 'appstore': {
        const iosUrl = searchParams.get('ios') || ''
        const androidUrl = searchParams.get('android') || ''
        if (iosUrl || androidUrl) {
          qrValue = iosUrl || androidUrl
        }
        break
      }
    }
  }

  if (!qrValue) {
    return new NextResponse('Missing data for QR code', { status: 400 })
  }

  try {
    // Generate PNG buffer
    const pngBuffer = await QRCode.toBuffer(qrValue, {
      type: 'png',
      width: size,
      margin: 1,
      color: {
        dark,
        light,
      },
    })

    return new Response(new Uint8Array(pngBuffer), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err) {
    console.error('QR Generation Error:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
