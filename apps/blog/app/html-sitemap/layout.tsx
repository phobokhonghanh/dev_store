import Header from '@origini/components/Header'
import * as React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header navigationItems={[]} logo={false} />
      {children}
    </>
  )
}
