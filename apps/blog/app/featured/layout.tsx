import * as React from 'react'

import Container from '@origini/components/Container'
import Header from '@origini/components/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container className="mb-10">{children}</Container>
    </>
  )
}
