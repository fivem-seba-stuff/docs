const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    domains: [
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      'coxdocs.dev',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Base path for GitHub Pages (will be set by environment variable)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  
  // Enable experimental features for better Bun.js compatibility
  experimental: {
    serverComponentsExternalPackages: ['nextra'],
    optimizePackageImports: ['nextra-theme-docs'],
    // Disable features that can cause warnings
    esmExternals: 'loose',
  },
  
  // Performance optimizations (disabled for Turbopack compatibility)
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production',
  // },
  
  // Webpack optimizations for Bun.js compatibility
  webpack: (config, { isServer, dev }) => {
    // Resolve issues with undici and other Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
      };
    }
    
    // Fix webpack cache issues
    config.cache = {
      type: 'filesystem',
      cacheDirectory: '.next/cache/webpack',
      buildDependencies: {
        config: [__filename],
      },
    };
    
    // Optimize bundle splitting
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
            },
            nextra: {
              test: /[\\/]node_modules[\\/](nextra|nextra-theme-docs)[\\/]/,
              name: 'nextra',
              priority: 20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    // Suppress specific warnings
    config.ignoreWarnings = [
      /Failed to parse source map/,
      /Critical dependency: the request of a dependency is an expression/,
      /Module not found: Error: Can't resolve '..\/..\/..\/..\/undici'/,
    ];
    
    return config;
  },
  
  // Static export configuration
  trailingSlash: true,
  
  // Headers for better caching (only applies to non-static deployments)
  async headers() {
    return [
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).gif',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = withNextra(nextConfig);