import { useState } from 'react'

export interface QRAppearance {
  size: number
  fgColor: string
  bgColor: string
  level: 'L' | 'M' | 'Q' | 'H'
}

export interface UseQRAppearanceOptions {
  defaultSize?: number
  defaultFgColor?: string
  defaultBgColor?: string
  defaultLevel?: 'L' | 'M' | 'Q' | 'H'
}

export interface UseQRAppearanceResult {
  size: number
  fgColor: string
  bgColor: string
  level: 'L' | 'M' | 'Q' | 'H'
  setSize: (size: number) => void
  setFgColor: (color: string) => void
  setBgColor: (color: string) => void
  setLevel: (level: 'L' | 'M' | 'Q' | 'H') => void
}

/**
 * Hook to manage QR Code appearance state (size, colors, error correction).
 */
export function useQRAppearance({
  defaultSize = 256,
  defaultFgColor = '#000000',
  defaultBgColor = '#ffffff',
  defaultLevel = 'M',
}: UseQRAppearanceOptions = {}): UseQRAppearanceResult {
  // State
  const [size, setSize] = useState<number>(defaultSize)
  const [fgColor, setFgColor] = useState<string>(defaultFgColor)
  const [bgColor, setBgColor] = useState<string>(defaultBgColor)
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>(defaultLevel)

  // Setters wrapper if needed, or just return direct setters
  // We keep it simple first

  return {
    // Values
    size,
    fgColor,
    bgColor,
    level,
    // Setters
    setSize,
    setFgColor,
    setBgColor,
    setLevel,
  }
}
