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
import type { AppDict } from './i18n'

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
 * Factory function to generate localized navigation routes.
 * Accepts the i18n dictionary and returns routes with localized labels/descriptions.
 *
 * @param dict - The i18n dictionary for the current locale
 * @returns Array of NavRoute with localized text
 */
export function getToolsRoutes(dict: AppDict): NavRoute[] {
  return [
    {
      label: dict.sidebar.search,
      href: '/search',
      slug: 'search',
      icon: React.createElement(Search, { size: 16 }),
      description: dict.sidebar.searchDesc,
    },
    {
      label: dict.sidebar.premium,
      href: 'tools/premium',
      slug: 'tools-premium',
      opened: false,
      icon: React.createElement(Fingerprint, { size: 16 }),
      isPremium: true,
      children: [
        {
          label: dict.sidebar.firstTools,
          href: '/premium/first',
          slug: 'first',
          icon: React.createElement(Zap, { size: 16 }),
          description: dict.sidebar.firstToolsDesc,
          isPremium: true,
        },
        {
          label: dict.sidebar.secondTools,
          href: '/premium/second',
          slug: 'second',
          icon: React.createElement(Shield, { size: 16 }),
          description: dict.sidebar.secondToolsDesc,
          isPremium: true,
        },
        {
          label: dict.sidebar.premiumParent,
          href: '/premium/parent',
          slug: 'parent',
          opened: true,
          icon: React.createElement(Component, { size: 16 }),
          isPremium: true,
          children: [
            {
              label: dict.sidebar.firstTools,
              href: '/premium/parent/1',
              slug: '1',
              icon: React.createElement(Zap, { size: 16 }),
              isPremium: true,
            },
            {
              label: dict.sidebar.secondTools,
              href: '/premium/parent/2',
              slug: '2',
              icon: React.createElement(Shield, { size: 16 }),
              isPremium: true,
            },
            {
              label: dict.sidebar.thirdTools,
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
      label: dict.sidebar.free,
      href: '/tools/free',
      slug: 'tools-free',
      icon: React.createElement(Smile, { size: 16 }),
      opened: true,
      children: [
        {
          label: dict.sidebar.countdownTimer,
          href: '/tools/free/countdown-timer',
          slug: 'countdown-timer',
          icon: React.createElement(Timer, { size: 16 }),
          description: dict.sidebar.countdownTimerDesc,
        },
        {
          label: dict.sidebar.qrCodeGenerator,
          href: '/tools/free/qrcode',
          slug: 'qrcode',
          icon: React.createElement(QrCode, { size: 16 }),
          description: dict.sidebar.qrCodeGeneratorDesc,
        },
      ],
    },
  ]
}

/**
 * @deprecated Use getToolsRoutes(dict) instead for i18n support.
 * This static export is kept for backward compatibility during migration.
 */
export const toolsRoutes: NavRoute[] = []
