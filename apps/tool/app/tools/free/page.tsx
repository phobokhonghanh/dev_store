import { AutoBreadcrumbs } from '@/components/layout/AutoBreadcrumbs'
import { toolsRoutes } from '@/data/tools'

export default function ToolsFreePage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-4">
        <AutoBreadcrumbs routes={toolsRoutes} />
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-500">
          Home Free Tools
        </h2>
        <p className="text-muted-foreground mt-1">
          Welcome to Home Free Tools in real time.
        </p>
      </div>
    </div>
  )
}
