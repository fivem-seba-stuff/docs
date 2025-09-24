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
  },
  
  // Base path for GitHub Pages
  basePath: '/docs',
  assetPrefix: '/docs/',
  
  // Enable experimental features for better Bun.js compatibility
  experimental: {
    serverComponentsExternalPackages: ['nextra'],
    optimizePackageImports: ['nextra-theme-docs'],
    esmExternals: 'loose',
  },
  
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
    ];
  },
};

module.exports = withNextra(nextConfig);