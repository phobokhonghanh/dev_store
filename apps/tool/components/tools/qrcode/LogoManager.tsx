import { cn } from '@origini/libs/utils'
import {
  Image as ImageIcon,
  Trash2,
  Upload,
} from 'lucide-react'
import { useDict } from '@/lib/hooks/useDict'
import { useCallback, useState } from 'react'
import { ToolSection } from '@/components/tools/shared'
import { DestructiveButton } from '@/components/ui/ActionButton'

/**
 * Props for the LogoManager component.
 * 
 * Following Single Responsibility Principle:
 * This component ONLY handles logo display and upload UI.
 * State management is handled by the parent via callbacks.
 */
interface LogoManagerProps {
  /** The URL of the currently selected logo image */
  currentLogo?: string | null
  /** Callback function triggered when a logo is selected (file upload) or removed */
  onSelectLogo: (logoUrl: string | null) => void
  /** Controls the overall visibility of the manager UI */
  showLogo: boolean
}

/**
 * Simplified LogoManager component.
 * 
 * Features:
 * - Active logo preview with remove capability
 * - Prominent drag-and-drop upload area
 * - File validation with error handling
 * 
 * Removed (as per plan):
 * - Social platform preset selection
 * - Search/pagination functionality
 */
export function LogoManager({
  currentLogo,
  onSelectLogo,
  showLogo,
}: LogoManagerProps) {
  const dict = useDict()
  const t = dict.logoManager

  // Local state for drag-and-drop feedback
  const [isDragging, setIsDragging] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  /**
   * Handles file processing from both input and drop events.
   * Validates file type and converts to Data URL.
   */
  const processFile = useCallback((file: File | null) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB')
      return
    }

    setUploadError(null)

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      if (dataUrl) {
        onSelectLogo(dataUrl)
      }
    }
    reader.onerror = () => {
      setUploadError('Failed to read file')
    }
    reader.readAsDataURL(file)
  }, [onSelectLogo])

  /**
   * Handle file input change
   */
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    processFile(file)
    e.target.value = '' // Reset to allow re-upload of same file
  }, [processFile])

  /**
   * Handle drag events for the drop zone
   */
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0] ?? null
    processFile(file)
  }, [processFile])

  /**
   * Remove the current logo
   */
  const handleRemove = useCallback(() => {
    onSelectLogo(null)
    setUploadError(null)
  }, [onSelectLogo])

  // Early return if component is hidden
  if (!showLogo) return null

  return (
    <ToolSection title={t.activeLogo} icon={ImageIcon} className="bg-muted/10">
      <div className="space-y-4 pt-2">
        {/* Active Logo Preview */}
        {currentLogo && (
          <div className="flex items-center gap-4 p-3 rounded-lg bg-background border">
            <div className="relative h-16 w-16 shrink-0 rounded-lg border-2 overflow-hidden bg-white">
              <img
                src={currentLogo}
                alt={t.activeLogo}
                className="h-full w-full object-contain p-1"
                onError={() => setUploadError('Failed to load image')}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {t.activeLogoDesc || 'Logo Selected'}
              </p>
              <p className="text-xs text-muted-foreground">
                Click remove to clear
              </p>
            </div>
            <DestructiveButton
              onClick={handleRemove}
              icon={<Trash2 size={14} />}
              aria-label="Remove Logo"
            >
              Remove
            </DestructiveButton>
          </div>
        )}

        {/* Upload Area */}
        <label
          className={cn(
            'relative flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all',
            isDragging
              ? 'border-primary bg-primary/5 scale-[1.02]'
              : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30',
            currentLogo && 'py-4'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
          />

          <div className={cn(
            'flex items-center justify-center w-12 h-12 rounded-full transition-colors',
            isDragging ? 'bg-primary/20' : 'bg-muted'
          )}>
            <Upload size={20} className={cn(
              isDragging ? 'text-primary' : 'text-muted-foreground'
            )} />
          </div>

          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              {currentLogo ? 'Replace Logo' : 'Upload Logo'}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Drag & drop or click to select
            </p>
          </div>

          <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wide">
            PNG, JPG, SVG, GIF (max 5MB)
          </p>
        </label>

        {/* Error Message */}
        {uploadError && (
          <div className="flex items-center gap-2 p-2 rounded-md bg-destructive/10 text-destructive text-xs">
            <span>⚠️</span>
            <span>{uploadError}</span>
          </div>
        )}
      </div>
    </ToolSection>
  )
}
