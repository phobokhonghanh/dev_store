'use client'

/** Props for the VersionBadge component */
interface VersionBadgeProps {
  /** The version string to display (default: 'v1.0 LIVE') */
  version?: string
}

/**
 * A reusable badge that displays the current application version.
 * Positioned fixed at the top-right of the screen.
 */
export const VersionBadge = ({ version = 'v1.0 LIVE' }: VersionBadgeProps) => {
  return (
    <div className="absolute top-4 right-4 z-50 md:fixed md:top-8 md:right-8">
      <div className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold backdrop-blur-md transition-all hover:shadow-[0_0_15px_-3px_#10b981]">
        <span className="mr-2 flex h-2 w-2">
          <span className="bg-primary absolute inline-flex h-2 w-2 animate-ping rounded-full opacity-75"></span>
          <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
        </span>
        {version}
      </div>
    </div>
  )
}

export default VersionBadge
