import type { Series } from '@origini/interfaces'
import { cn } from '@origini/libs'
import { getAllSeries } from '@origini/libs/getSeries'
import { SeriesBox } from '../../components/series'

const seriesBackgrounds = [
  'bg-ivory-medium',
  'bg-cactus-light',
  'bg-oat',
  'bg-sage',
  'bg-lavender',
]

export default function SeriesPage() {
  const seriesList: Series[] = getAllSeries()

  return (
    <div className="mb-0 mt-10 grid grid-cols-1 gap-8 md:grid-cols-1">
      {seriesList.map((series: Series, index: number) => (
        <SeriesBox
          className={cn(seriesBackgrounds[index % seriesBackgrounds.length])}
          key={series.slug}
          series={series}
        />
      ))}
      {seriesList.length === 0 && (
        <div className="text-center text-neutral-600 dark:text-neutral-400">
          No series available at the moment. Please check back later!
        </div>
      )
      }
    </div>
  )
}
