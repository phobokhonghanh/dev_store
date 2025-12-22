import type { Post } from '@origini/interfaces'
import { getAllCategories, getAllPosts } from '@origini/libs/getPost'
import { getSlug } from '@origini/libs/getSlug'
import Link from 'next/link'

export const dynamic = 'force-static'

export default function HtmlSitemapPage() {
  const posts = getAllPosts(['slug', 'title', 'excerpt', 'date'], 100000)
  const categories = Object.keys(getAllCategories())
  return (
    <div className="mx-auto max-w-4xl">
      {/* <h1 className="mb-8 text-3xl font-bold">HTML Sitemap</h1> */}
      <div className="mb-12 text-center">
        <h1 className="mb-6 font-serif text-5xl font-normal text-neutral-900 sm:text-6xl">
          Sitemap
        </h1>
        <div className="mb-8">
          <ul className="flex flex-wrap justify-center gap-4">
            <li>
              <Link
                href="/"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/archives"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Archives
              </Link>
            </li>
            <li>
              <Link
                href="/featured"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Featured
              </Link>
            </li>
            <li>
              <Link
                href="/category"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Categoires
              </Link>
            </li>
            <li>
              <Link
                href="/tags"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Tags
              </Link>
            </li>
            <li>
              <Link
                href="/series"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Series
              </Link>
            </li>
            <li>
              <a
                href={`/about`}
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            Blog Posts ({posts.length})
          </h2>
          <ul className="space-y-2">
            {posts.map((post: Post) => (
              <li key={post.slug}>
                <Link
                  href={post.slug}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {post.title}
                </Link>
                <div className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="text-right">
          <h2 className="mb-4 text-2xl font-semibold">
            Categories ({categories.length})
          </h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/category/${getSlug(category)}`}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-8 border-t pt-4 text-sm text-gray-500">
        <p>
          This sitemap is also available in XML format at{' '}
          <Link href="/sitemap.xml" className="underline">
            /sitemap.xml
          </Link>
        </p>
      </div>
    </div>
  )
}
