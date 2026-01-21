'use client'

import PricingCard from './PricingCard'

/**
 * Pricing Section component for the landing page.
 */
export const PricingSection = () => {
  return (
    <section className="mx-auto max-w-5xl px-4">
      <div className="grid gap-10 md:grid-cols-2 lg:mx-auto lg:max-w-5xl">
        <PricingCard
          title="Free"
          price="$0"
          period="month"
          description="Full access. No hidden fees. Open source."
          features={[
            'Unlimited access to all tools',
            'No tracking or ads',
            'Dark mode included',
            'MIT License',
          ]}
          buttonLabel="Start Using Tools"
          href="/search"
          isPrimary={true}
        />

        <PricingCard
          title="Premium"
          price="$2"
          period="month"
          description="For teams requiring advanced support."
          features={[
            'Self-hosted deployment',
            'Custom branding',
            'SSO Integration',
            'Priority Support',
          ]}
          buttonLabel="Coming Soon >"
          isDisabled={true}
        />
      </div>
    </section>
  )
}

export default PricingSection
