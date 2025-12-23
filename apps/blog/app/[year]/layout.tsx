import React from 'react'

import Container from '@origini/components/Container'
import Header from '@origini/components/Header'

interface YearLayoutProps {
  params: Promise<{
    year: string
  }>
  children: React.ReactNode | React.ReactNode[]
}

export default function YearLayout({ children }: YearLayoutProps) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  )
}
