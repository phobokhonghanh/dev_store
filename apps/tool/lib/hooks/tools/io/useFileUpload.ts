import { useCallback, useState } from 'react'

export type ReadMode = 'DataURL' | 'Text' | 'Binary' | 'None'

interface UseFileUploadOptions {
  maxSizeMB?: number
  accept?: string
  readAs?: ReadMode
}

export function useFileUpload({
  maxSizeMB = 5,
  accept,
  readAs = 'DataURL',
}: UseFileUploadOptions = {}) {
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
    null,
  )
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = useCallback(
    (selectedFile: File | null) => {
      if (!selectedFile) return

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
