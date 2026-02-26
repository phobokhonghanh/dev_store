'use client'

import { useDict } from '@/lib/hooks/useDict'
import { ArrowRight } from 'lucide-react'
import NavButton from './NavButton'

/**
 * Hero Section component for the landing page.
 */
export const HeroSection = () => {
  const dict = useDict()
  const { homePage: t } = dict

  return (
    <section className="relative z-10 mx-auto max-w-5xl px-4 text-center">
      <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-7xl md:text-8xl">
        {t.heroTitle} <br className="hidden sm:block" />
        <span className="text-primary dark:from-primary dark:bg-gradient-to-r dark:to-teal-400 dark:bg-clip-text dark:text-transparent dark:drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          {t.heroTitleHighlight}
        </span>
      </h1>

      <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
        {t.heroSubtitle}
      </p>

      <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
        <NavButton href="/search">
          {t.exploreTools}{' '}
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </NavButton>
        <NavButton
          href="https://github.com/phobokhonghanh/dev_store"
          variant="secondary"
        >
          {t.githubRepo}
        </NavButton>
      </div>
    </section>
  )
}

export default HeroSection
