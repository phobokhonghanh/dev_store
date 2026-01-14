import {
  AlertCircle,
  File,
  FileArchive,
  FileCode,
  FileText,
  Image as ImageIcon,
  Upload,
  X,
} from 'lucide-react'
import { useRef } from 'react'

interface FileUploaderProps {
  label?: string
  description?: string
  file: File | null
  previewSrc?: string | null
  accept?: string
  maxSizeMB?: number
  onFileSelect: (file: File | null) => void
  onClear: () => void
  error?: string | null
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const getFileIcon = (file: File) => {
  if (file.type.startsWith('image/'))
    return <ImageIcon className="h-6 w-6 text-blue-500" />
  if (file.name.endsWith('.zip') || file.name.endsWith('.rar'))
    return <FileArchive className="h-6 w-6 text-yellow-500" />
  if (file.type.startsWith('text/') || file.name.endsWith('.txt'))
    return <FileText className="h-6 w-6 text-gray-500" />
  if (file.name.endsWith('.json') || file.name.endsWith('.xml'))
    return <FileCode className="h-6 w-6 text-green-500" />
  return <File className="h-6 w-6 text-gray-400" />
}

export default function FileUploader({
  label = 'Upload File',
  description,
  file,
  previewSrc,
  accept = '*',
  maxSizeMB = 5,
  onFileSelect,
  onClear,
  error,
}: FileUploaderProps) {
  const isImage = file?.type.startsWith('image/')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>

      {error && (
        <div className="flex items-center gap-2 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {!file ? (
        <>
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            accept={accept}
            onChange={handleInputChange}
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="border-input hover:bg-muted flex w-full flex-col items-center justify-center rounded-md border p-4 transition-colors"
          >
            <div className="mb-1 flex items-center gap-2">
              <Upload size={16} />
              <span className="text-sm font-medium">Select file</span>
            </div>
            <span className="text-muted-foreground text-xs">
              (Max {maxSizeMB}MB)
            </span>
          </button>
        </>
      ) : (
        <div className="bg-muted/30 border-border flex items-center justify-between rounded-md border p-3">
          <div className="flex items-center gap-3 overflow-hidden">
            {isImage && typeof previewSrc === 'string' ? (
              <img
                src={previewSrc}
                alt="Preview"
                className="bg-muted h-10 w-10 rounded object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-50">
                {file && getFileIcon(file)}
              </div>
            )}

            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-medium">{file.name}</span>
              <span className="text-muted-foreground text-xs">
                {formatBytes(file.size)}
              </span>
            </div>
          </div>

          <button
            onClick={onClear}
            className="hover:bg-muted text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors"
            aria-label="Remove file"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {description && (
        <span className="text-muted-foreground text-xs">{description}</span>
      )}
    </div>
  )
}
