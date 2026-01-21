/**
 * @type {import('next').NextConfig}
 */
const config = {
  trailingSlash: false,
  transpilePackages: [
    '@origini/components',
    '@origini/libs',
    '@origini/config',
    '@origini/profile',
  ],
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/tools',
        destination: '/search',
        permanent: true,
      },
    ]
  },
}

module.exports = config
