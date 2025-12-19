import Container from '@origini/components/Container'
import Header from '@origini/components/Header'
import * as React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container className="mb-10 px-0">{children}</Container>
    </>
  )
}
