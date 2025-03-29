let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'logos-world.net'],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  reactStrictMode: true,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 4,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI
  },
  output: 'standalone',
  trailingSlash: false,
  async redirects() {
    return [];
  },
  async rewrites() {
    return [];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
}

if (process.env.NODE_ENV === 'development') {
  console.log('Next.js Config - Environment Variables:');
  console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
  console.log('NODE_ENV:', process.env.NODE_ENV);
}

function mergeConfig(baseConfig, userConfig) {
  if (!userConfig) return baseConfig
  const merged = { ...baseConfig }
  for (const key in userConfig) {
    if (key === 'env') {
      // Filter out NODE_ENV from user config if present
      const { NODE_ENV, ...otherEnvVars } = userConfig.env || {}
      merged.env = { ...merged.env, ...otherEnvVars }
    } else if (key === 'experimental') {
      merged.experimental = { ...merged.experimental, ...userConfig.experimental }
    } else {
      merged[key] = userConfig[key]
    }
  }
  return merged
}

// Actually use the result of mergeConfig
const finalConfig = mergeConfig(nextConfig, userConfig)

export default finalConfig
