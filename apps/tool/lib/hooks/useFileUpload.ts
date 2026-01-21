import { useCallback, useState } from 'react'

/** File reading modes for the file reader */
export type ReadMode = 'DataURL' | 'Text' | 'Binary' | 'None'

/** Configuration options for the file upload hook */
interface UseFileUploadOptions {
  /** Maximum file size in Megabytes (default: 5) */
  maxSizeMB?: number
  /** Accepted file types (standard 'accept' attribute string) */
  accept?: string
  /** How to read the file content after upload */
  readAs?: ReadMode
}

const DEFAULT_MAX_SIZE_MB = 5

/**
 * Hook for handling client-side file selection and reading
 *
 * @param options - Configuration for file constraints and behavior
 * @returns Status of the current file, its content, and handlers
 */
export function useFileUpload({
  maxSizeMB = DEFAULT_MAX_SIZE_MB,
  accept,
  readAs = 'DataURL',
}: UseFileUploadOptions = {}) {
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
    null,
  )
  const [error, setError] = useState<string | null>(null)

  /**
   * Validates and processes a selected file
   */
  const handleFileSelect = useCallback(
    (selectedFile: File | null) => {
      if (!selectedFile) return

      // Validate file size
      if (selectedFile.size > maxSizeMB * 1024 * 1024) {
        setError(`File size exceeds ${maxSizeMB}MB`)
        return
      }

      setError(null)
      setFile(selectedFile)

      if (readAs === 'None') {
        setFileContent(null)
        return
      }

      const reader = new FileReader()

      reader.onload = (e) => {
        setFileContent(e.target?.result ?? null)
      }

      reader.onerror = () => {
        setError('Error reading file content')
      }

      // Read file based on configured mode
      if (readAs === 'DataURL') {
        reader.readAsDataURL(selectedFile)
      } else if (readAs === 'Text') {
        reader.readAsText(selectedFile)
      } else if (readAs === 'Binary') {
        reader.readAsArrayBuffer(selectedFile)
      }
    },
    [maxSizeMB, accept, readAs],
  )

  /**
   * Resets the hook state to null
   */
  const clearFile = useCallback(() => {
    setFile(null)
    setFileContent(null)
    setError(null)
  }, [])

  return {
    file,
    fileContent,
    error,
    handleFileSelect,
    clearFile,
  }
}
