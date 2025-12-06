/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["de", "en", "fr", "es", "it"],
    defaultLocale: "de",
    localeDetection: true,
  },
  // Environment Variables hinzufügen
  env: {
    GOOGLE_PLACES_API_KEY: "AIzaSyBvyXhHvDSfdpUHkkj1ZoSbswGmazttJ_U",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/videos/",
          outputPath: "static/videos/",
          name: "[name].[hash].[ext]",
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
