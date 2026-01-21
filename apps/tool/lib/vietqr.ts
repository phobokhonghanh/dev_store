/**
 * VietQR (EMVCo) generation logic for Vietnamese Banks.
 * This module handles the creation of standardized QR payment strings
 * used by Napas and various banking apps in Vietnam.
 */

/**
 * Represents a Vietnamese bank with its BIN and identifiers
 */
export interface Bank {
  /** 6-digit Bank Identification Number (BIN) */
  bin: string
  /** Commonly used short name (e.g., VCB, TCB) */
  shortName: string
  /** Full official name of the bank */
  name: string
}

/**
 * List of supported Vietnamese banks for QR generation.
 * Maps short names to their official Napas BINs.
 */
export const BANKS: Bank[] = [
  { bin: '970436', shortName: 'VCB', name: 'Vietcombank' },
  { bin: '970422', shortName: 'MB', name: 'MBBank' },
  { bin: '970407', shortName: 'TCB', name: 'Techcombank' },
  { bin: '970415', shortName: 'CTG', name: 'VietinBank' },
  { bin: '970418', shortName: 'BIDV', name: 'BIDV' },
  { bin: '970405', shortName: 'AGR', name: 'Agribank' },
  { bin: '970423', shortName: 'TPB', name: 'TPBank' },
  { bin: '970432', shortName: 'VPB', name: 'VPBank' },
  { bin: '970448', shortName: 'OCB', name: 'OCB' },
  { bin: '970403', shortName: 'STB', name: 'Sacombank' },
  { bin: '970416', shortName: 'ACB', name: 'ACB' },
  { bin: '970425', shortName: 'ABB', name: 'ABBANK' },
  { bin: '970437', shortName: 'HDB', name: 'HDBBank' },
  { bin: '970441', shortName: 'VIB', name: 'VIB' },
  { bin: '970429', shortName: 'SCB', name: 'SCB' },
  { bin: '970440', shortName: 'SEAB', name: 'SeABank' },
  { bin: '970428', shortName: 'NAB', name: 'Nam A Bank' },
  { bin: '970431', shortName: 'EIB', name: 'Eximbank' },
  { bin: '970443', shortName: 'SHB', name: 'SHB' },
  { bin: '970427', shortName: 'VAB', name: 'VietA Bank' },
]

/**
 * Calculates CRC16-CCITT for EMVCo standard validation
 *
 * @param data - The string to calculate CRC for
 * @returns 4-character hex string of the calculated CRC
 */
function crc16(data: string): string {
  let crc = 0xffff
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021
      } else {
        crc <<= 1
      }
    }
  }
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, '0')
}

/**
 * Formats a single EMVCo tag (ID + Length + Value)
 *
 * @param id - 2-character Tag ID
 * @param value - The value content
 * @returns Formatted tag string
 */
function formatTag(id: string, value: string): string {
  return id.padStart(2, '0') + value.length.toString().padStart(2, '0') + value
}

/**
 * Look up a bank object by its BIN or short name (case-insensitive)
 *
 * @param input - BIN string (e.g., '970436') or short name (e.g., 'VCB')
 * @returns Bank object if found, otherwise undefined
 */
export function getBankByBinOrShortName(input: string): Bank | undefined {
  if (!input) return undefined
  const search = input.toUpperCase().trim()
  return BANKS.find(
    (b) => b.bin === search || b.shortName.toUpperCase() === search,
  )
}

/**
 * Generates a VietQR compliant string based on EMVCo standards
 * This format is used for inter-bank transfers through Napas 247.
 *
 * @param data - Object containing payment details
 * @returns A complete QR data string including calculated CRC
 */
export function generateVietQR(data: {
  bankBin: string
  accountNo: string
  amount?: string | number
  content?: string
}): string {
  const { bankBin, accountNo, amount, content } = data

  // ID 00: Payload Format Indicator (Fixed to 01)
  let result = formatTag('00', '01')

  // ID 01: Point of Initiation Method (11 for static, 12 for dynamic/amount-based)
  result += formatTag('01', amount ? '12' : '11')

  // ID 38: Merchant Account Information (NAPAS specific formatting)
  const napasValue =
    formatTag('00', 'A000000727') + // Global Unique Identifier for Napas
    formatTag('01', formatTag('00', bankBin) + formatTag('01', accountNo)) +
    formatTag('02', 'QRIBFTTA') // Service Code: Transfer to Account

  result += formatTag('38', napasValue)

  // ID 53: Transaction Currency (704 for VND)
  result += formatTag('53', '704')

  // ID 54: Transaction Amount (Optional for static QRs)
  if (amount) {
    result += formatTag('54', amount.toString())
  }

  // ID 58: Country Code (Fixed to VN)
  result += formatTag('58', 'VN')

  // ID 62: Additional Data Field (Used for transfer message/content)
  if (content) {
    result += formatTag('62', formatTag('08', content))
  }

  // ID 63: Cyclic Redundancy Check (CRC) - Must be at the end
  result += '6304' // Tag 63 with length 04
  result += crc16(result)

  return result
}
