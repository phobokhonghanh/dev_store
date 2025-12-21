import Link from 'next/link'
import { LinkCard, ContentCard } from '@origini/components'
// import { nodes } from '../../homelab/lib/data/nodes'

export const dynamic = 'force-static'
export const revalidate = 3600

// Extract node names from homelab data (limit to 3, add "..." if more exist)
// const homelabNodes = nodes.length > 3
//   ? [...nodes.slice(0, 3).map((node) => node.name), '...']
//   : nodes.map((node) => node.name)

// Build date for resume card
const buildDate = new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD

/**
 * Add UTM tracking parameters to URL
 */
function addUtmParams(
  url: string,
  campaign: string = 'homepage',
  content?: string
): string {
  // Don't add UTM params to internal routes
  if (url.startsWith('/')) return url

  const urlObj = new URL(url)
  urlObj.searchParams.set('utm_source', 'home')
  urlObj.searchParams.set('utm_medium', 'website')
  urlObj.searchParams.set('utm_campaign', campaign)
  if (content) {
    urlObj.searchParams.set('utm_content', content)
  }
  return urlObj.toString()
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center bg-neutral-50">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="mb-4 font-serif text-5xl font-normal text-neutral-900 sm:text-6xl">
            Origini
          </h1>
          <p className="text-base leading-relaxed text-neutral-700 sm:text-lg">
            Data Engineering
          </p>
        </div>

        {/* Links Grid */}
        <div className="mb-8 grid gap-3 sm:mb-12 sm:grid-cols-2 lg:grid-cols-3">
          <ContentCard
            title="Blog"
            href={addUtmParams(
              process.env.NEXT_PUBLIC_BLOG_URL || '',
              'homepage',
              'blog_card'
            )}
            description="Technical writings on data engineering, distributed systems, and open source."
            color="terracotta"
            illustration="blob"
            featured
          />

          <ContentCard
            title="Resume"
            href={addUtmParams(
              process.env.NEXT_PUBLIC_CV_URL || '',
              'homepage',
              'resume_card'
            )}
            category={`Updated ${buildDate}`}
            description="Experience building scalable data infrastructure and leading engineering teams."
            color="oat"
            illustration="wavy"
          />

          <ContentCard
            title="Insights"
            href={addUtmParams(
              process.env.NEXT_PUBLIC_INSIGHTS_URL ||
              '',
              'homepage',
              'insights_card'
            )}
            description="Analytics dashboard showcasing data from GitHub, WakaTime, and more."
            color="cactus"
            tags={['Coding Stats', 'Website Traffic', 'LLM Token Usage']}
            illustration="wavy"
          />

          {/* <ContentCard
            title="Homelab"
            href={addUtmParams(
              process.env.NEXT_PUBLIC_HOMELAB_URL ||
              'https://homelab.origini.net',
              'homepage',
              'homelab_card'
            )}
            description="Homelab monitoring dashboard (beta)."
            color="lavender"
            tags={homelabNodes}
            illustration="geometric"
          /> */}

          <LinkCard
            title="Photos"
            href={addUtmParams(
              process.env.NEXT_PUBLIC_PHOTOS_URL ||
              '',
              'homepage',
              'photos_card'
            )}
            description="Photography portfolio and visual stories from travels and daily life."
            color="cream"
            backgroundImage="https://images.unsplash.com/photo-1766068968931-0af2cdf805f7?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />

          <LinkCard
            title="Chat"
            href={addUtmParams(
              process.env.NEXT_PUBLIC_AI_URL || '',
              'homepage',
              'ai_card'
            )}
            description="Experimental @originibot LLM base for questions about origini.net and related topics."
            color="sage"
          />

          <LinkCard
            title="About"
            href="/about"
            description="Learn more about my experience, skills, and professional background."
            color="ivory"
          />
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-neutral-600 sm:gap-10">
          <Link
            href={addUtmParams(
              'https://github.com/phobokhonghanh',
              'homepage',
              'footer_github'
            )}
            target="_blank"
            className="transition-colors duration-200 hover:text-neutral-900"
          >
            GitHub
          </Link>
          <Link
            href={addUtmParams(
              'https://linkedin.com/in/phobo',
              'homepage',
              'footer_linkedin'
            )}
            target="_blank"
            className="transition-colors duration-200 hover:text-neutral-900"
          >
            LinkedIn
          </Link>
          <Link
            href="/ls"
            className="transition-colors duration-200 hover:text-neutral-900"
          >
            Short URLs
          </Link>
          <a
            href="/llms.txt"
            className="transition-colors duration-200 hover:text-neutral-900"
          >
            llms.txt
          </a>
          <Link
            href={addUtmParams(
              '',
              'homepage',
              'footer_status'
            )}
            target="_blank"
            className="transition-colors duration-200 hover:text-neutral-900"
          >
            Status
          </Link>
        </div>
      </div>
    </div>
  )
}
