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
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
  },
  output: 'standalone',
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
      merged.env = { ...merged.env, ...userConfig.env }
    } else if (key === 'experimental') {
      merged.experimental = { ...merged.experimental, ...userConfig.experimental }
    } else {
      merged[key] = userConfig[key]
    }
  }
  return merged
}

mergeConfig(nextConfig, userConfig)

export default nextConfig
