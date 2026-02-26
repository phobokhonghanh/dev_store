'use client'

import { useDict } from '@/lib/hooks/useDict'
import PricingCard from './PricingCard'

/**
 * Pricing Section component for the landing page.
 */
export const PricingSection = () => {
  const dict = useDict()
  const { homePage: t } = dict

  return (
    <section className="mx-auto max-w-5xl px-4">
      <div className="grid gap-10 md:grid-cols-2 lg:mx-auto lg:max-w-5xl">
        <PricingCard
          title={t.pricingFreeTitle}
          price={t.pricingFreePrice}
          period={t.periodMonth}
          description={t.pricingFreeDescription}
          features={t.pricingFreeFeatures}
          buttonLabel={t.pricingFreeButton}
          href="/search"
          isPrimary={true}
        />

        <PricingCard
          title={t.pricingPremiumTitle}
          price={t.pricingPremiumPrice}
          period={t.periodMonth}
          description={t.pricingPremiumDescription}
          features={t.pricingPremiumFeatures}
          buttonLabel={t.pricingPremiumButton}
          isDisabled={true}
        />
      </div>
    </section>
  )
}

export default PricingSection
