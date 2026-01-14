import { Fingerprint, Search, Smile } from 'lucide-react'
import React from 'react'

export type NavRoute = {
  label: string
  href: string
  slug?: string
  icon?: React.ReactNode
  opened?: boolean
  description?: string
  children?: NavRoute[]
}

const routes: NavRoute[] = [
  {
    label: 'Search',
    href: '/tools',
    slug: 'tools',
    icon: <Search size={16} />,
    description: 'Search tools',
  },
  {
    label: 'Premium',
    href: '/premium',
    slug: 'premium',
    opened: false,
    icon: <Fingerprint size={16} />,
    children: [
      { label: 'First tools', href: '/premium/first', slug: 'first' },
      { label: 'Second tools', href: '/premium/second', slug: 'second' },
      {
        label: 'Premium parent',
        href: '/premium/parent',
        slug: 'parent',
        opened: true,
        children: [
          { label: 'First tools', href: '/premium/parent/1', slug: '1' },
          { label: 'Second tools', href: '/premium/parent/2', slug: '2' },
          { label: 'Third tools', href: '/premium/parent/3', slug: '3' },
        ],
      },
    ],
  },
  {
    label: 'Free',
    href: '/tools/free',
    slug: 'tools/free',
    icon: <Smile size={16} />,
    opened: true,
    children: [
      {
        label: 'Countdown Timer',
        href: '/tools/free/countdown-timer',
        slug: 'countdown-timer',
        description: 'Countdown timer tool',
      },
      {
        label: 'QR Code Generator',
        href: '/tools/free/qrcode',
        slug: 'qrcode',
        description: 'QR code generator tool',
      },
    ],
  },
]

export const toolsRoutes = routes
