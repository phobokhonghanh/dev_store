'use client'

import { HeroSection, PricingSection } from '@/components/home'

/**
 * Main Landing Page for the Tools Application.
 * Composed of modular sections for better maintainability.
 */
export default function Home() {
  return (
    <div className="bg-background text-foreground relative flex flex-col gap-24 overflow-hidden py-12 md:py-24">
      {/* Background Ambience - Dark Mode Only */}
      <div className="pointer-events-none absolute top-[-20%] left-1/2 hidden -translate-x-1/2 opacity-20 blur-[120px] dark:block">
        <div className="bg-primary/40 h-[600px] w-[600px] rounded-full" />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Pricing Section */}
      <PricingSection />
    </div>
  )
}
