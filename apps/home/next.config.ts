/**
 * @type {import('next').NextConfig}
 */
const config = {
  output: 'export',
  trailingSlash: false,
  transpilePackages: ['@origini/components', '@origini/libs'],
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
}

module.exports = config