import {
  Component,
  Fingerprint,
  QrCode,
  Search,
  Shield,
  Smile,
  Timer,
  Zap,
} from 'lucide-react'
import React from 'react'

/**
 * Interface defining a navigation route for the sidebar and breadcrumbs
 */
export type NavRoute = {
  /** Display label for the route */
  label: string
  /** Destination path (e.g., '/tools/free/qrcode') */
  href: string
  /** Unique slug for internal logic/tracking */
  slug?: string
  /** Lucide icon element for the menu item */
  icon?: React.ReactNode
  /** Whether sub-items are expanded by default */
  opened?: boolean
  /** Brief summary of the tool functionality */
  description?: string
  /** Flag for features restricted to premium users */
  isPremium?: boolean
  /** Nested sub-routes */
  children?: NavRoute[]
}

/**
 * Main application routes configuration.
 * Using React.createElement for pure TypeScript (.ts) compatibility.
 */
const routes: NavRoute[] = [
  {
    label: 'Search',
    href: '/search',
    slug: 'search',
    icon: React.createElement(Search, { size: 16 }),
    description: 'Find the right tool for your development needs',
  },
  {
    label: 'Premium',
    href: 'tools/premium',
    slug: 'tools-premium',
    opened: false,
    icon: React.createElement(Fingerprint, { size: 16 }),
    isPremium: true,
    children: [
      {
        label: 'First tools',
        href: '/premium/first',
        slug: 'first',
        icon: React.createElement(Zap, { size: 16 }),
        description: 'Advanced production-ready premium tool',
        isPremium: true,
      },
      {
        label: 'Second tools',
        href: '/premium/second',
        slug: 'second',
        icon: React.createElement(Shield, { size: 16 }),
        description: 'Enterprise grade utility for complex tasks',
        isPremium: true,
      },
      {
        label: 'Premium parent',
        href: '/premium/parent',
        slug: 'parent',
        opened: true,
        icon: React.createElement(Component, { size: 16 }),
        isPremium: true,
        children: [
          {
            label: 'First tools',
            href: '/premium/parent/1',
            slug: '1',
            icon: React.createElement(Zap, { size: 16 }),
            isPremium: true,
          },
          {
            label: 'Second tools',
            href: '/premium/parent/2',
            slug: '2',
            icon: React.createElement(Shield, { size: 16 }),
            isPremium: true,
          },
          {
            label: 'Third tools',
            href: '/premium/parent/3',
            slug: '3',
            icon: React.createElement(Fingerprint, { size: 16 }),
            isPremium: true,
          },
        ],
      },
    ],
  },
  {
    label: 'Free',
    href: '/tools/free',
    slug: 'tools-free',
    icon: React.createElement(Smile, { size: 16 }),
    opened: true,
    children: [
      {
        label: 'Countdown Timer',
        href: '/tools/free/countdown-timer',
        slug: 'countdown-timer',
        icon: React.createElement(Timer, { size: 16 }),
        description: 'Precise countdown timer for productivity and events',
      },
      {
        label: 'QR Code Generator',
        href: '/tools/free/qrcode',
        slug: 'qrcode',
        icon: React.createElement(QrCode, { size: 16 }),
        description: 'Generate customizable QR codes with text and logos',
      },
    ],
  },
]

/**
 * Exported routes list used by Sidebar and Navigation components.
 */
export const toolsRoutes = routes
