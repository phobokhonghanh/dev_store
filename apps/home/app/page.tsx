import { ContentCard, LinkCard } from '@origini/components'
import { originiUrls } from '@origini/urls'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 3600

// Build date for resume card
const buildDate = new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD

/**
 * Add UTM tracking parameters to URL
 */
function addUtmParams(
  url: string | undefined | null,
  campaign: string = 'homepage',
  content?: string,
): string {
  // 1. Trả về fallback nếu URL rỗng hoặc không tồn tại
  if (!url) return '#'

  // 2. Không xử lý URL nội bộ (internal routes)
  if (url.startsWith('/')) return url

  try {
    // 3. Sử dụng try-catch để ngăn chặn crash nếu url không đúng định dạng (thiếu http://)
    const urlObj = new URL(url)
    urlObj.searchParams.set('utm_source', 'home')
    urlObj.searchParams.set('utm_medium', 'website')
    urlObj.searchParams.set('utm_campaign', campaign)
    if (content) {
      urlObj.searchParams.set('utm_content', content)
    }
    return urlObj.toString()
  } catch {
    // Nếu URL lỗi (ví dụ: chỉ có chữ "google.com" mà thiếu "https://")
    // Trả về chính nó để tránh trắng trang
    console.error('Invalid URL passed to addUtmParams:', url)
    return url
  }
}
export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center bg-neutral-50">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="mb-4 font-serif text-5xl font-normal text-neutral-900 sm:text-6xl">
            Nguyên
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
              process.env.NEXT_PUBLIC_BLOG_URL || originiUrls.apps.blog || '',
              'homepage',
              'blog_card',
            )}
            description="Phở’s blog on data engineering, distributed systems, and system design — where I write about techniques and my real-world perspectives from building and operating data systems."
            illustration="geometric"
            color="amber"
            featured
          />

          <ContentCard
            title="Resume"
            href={addUtmParams(
              process.env.NEXT_PUBLIC_CV_URL || originiUrls.apps.cv || '',
              'homepage',
              'resume_card',
            )}
            category={`Updated ${buildDate}`}
            description="Experience working with data engineering concepts, best practices, and modern data and cloud technologies."
            color="orange"
            illustration="wavy"
          />

          {/* <ContentCard
            title="Insights"
            href={addUtmParams(
              process.env.NEXT_PUBLIC_INSIGHTS_URL ||
                originiUrls.apps.insights ||
                '',
              'homepage',
              'insights_card',
            )}
            description="Analytics dashboard showcasing data from GitHub, WakaTime, and more."
            color="cactus"
            tags={['Coding Stats', 'Website Traffic', 'LLM Token Usage']}
            illustration="wavy"
          />

          <LinkCard
            title="Photos"
            href={addUtmParams(
              process.env.NEXT_PUBLIC_PHOTOS_URL ||
                originiUrls.apps.photos ||
                '',
              'homepage',
              'photos_card',
            )}
            description="Photography portfolio and visual stories from travels and daily life."
            color="cream"
            backgroundImage="https://images.unsplash.com/photo-1766068968931-0af2cdf805f7?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          /> */}

          <LinkCard
            title="About"
            href="/about"
            description="Learn more about my experience, skills, and professional background."
            color="lavender"
            className="lg:col-span-3"
          />
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-neutral-600 sm:gap-10">
          <Link
            href={addUtmParams(
              'https://github.com/phobokhonghanh',
              'homepage',
              'footer_github',
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
              'footer_linkedin',
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
          {/* <Link
            href={addUtmParams('', 'homepage', 'footer_status')}
            target="_blank"
            className="transition-colors duration-200 hover:text-neutral-900"
          >
            Status
          </Link> */}
        </div>
      </div>
    </div>
  )
}
