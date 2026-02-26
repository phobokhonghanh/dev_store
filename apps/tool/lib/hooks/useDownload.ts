import { useCallback } from 'react'

/** Supported image formats for canvas download */
type DownloadFormat = 'png' | 'jpeg' | 'webp'

/**
 * Hook to handle downloading canvas content as an image file
 *
 * @returns An object containing the downloadCanvas function
 */
export function useDownload() {
  /**
   * Triggers a browser download for a given canvas element
   *
   * @param canvasElement - The HTML5 Canvas element to capture
   * @param fileName - Target filename (without extension)
   * @param format - Output format: 'png', 'jpeg', or 'webp' (default: 'png')
   */
  const downloadCanvas = useCallback(
    (
      canvasElement: HTMLCanvasElement | null,
      fileName: string,
      format: DownloadFormat = 'png',
    ) => {
      if (!canvasElement) {
        console.warn('useDownload: Canvas element not found')
        return
      }

      try {
        const url = canvasElement.toDataURL(`image/${format}`)
        const link = document.createElement('a')
        link.download = `${fileName}.${format}`
        link.href = url

        // Append, trigger, and cleanup to ensure compatibility
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error('useDownload: Download failed:', error)
      }
    },
    [],
  )

  return { downloadCanvas }
}
