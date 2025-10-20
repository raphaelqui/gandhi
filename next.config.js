/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['de', 'en', 'fr', 'es', 'it'],
    defaultLocale: 'de',
    localeDetection: true,
  },
}

module.exports = nextConfig