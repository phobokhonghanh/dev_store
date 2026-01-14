'use client'

import { Header } from '@origini/components'
import { Sidebar } from './layout/Sidebar'

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background flex min-h-screen w-full">
      {/* Fixed Sidebar */}
      <Sidebar
        header={
          <Header
            className="py-4"
            longText=""
            shortText=""
            center={true}
            navigationItems={[]}
          />
        }
      />

      {/* Main Content Area */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 overflow-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
