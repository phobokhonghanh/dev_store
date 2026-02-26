'use client'

import { Header } from '@origini/components'
import { useState } from 'react'
import { Sidebar } from './Sidebar'

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="bg-background flex min-h-screen w-full">
      {/* Fixed Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
        header={
          <Header
            className="py-4 [&_img]:h-20"
            longText=""
            shortText=""
            center={false}
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
