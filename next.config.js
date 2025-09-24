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
  
  // Static export configuration
  trailingSlash: true,
  
  // Enable experimental features for better compatibility
  experimental: {
    optimizePackageImports: ['nextra-theme-docs'],
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        url: false,
      };
    }
    
    return config;
  },
  
  // Ignore build errors for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withNextra(nextConfig);