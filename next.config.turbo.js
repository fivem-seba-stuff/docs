const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

/** @type {import('next').NextConfig} */
const turboConfig = {
  // Minimal configuration for Turbopack compatibility
  experimental: {
    serverComponentsExternalPackages: ['nextra'],
    optimizePackageImports: ['nextra-theme-docs'],
  },
  
  // Image optimization (simplified for Turbopack)
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      'coxdocs.dev',
    ],
  },
  
  // Static export configuration
  trailingSlash: true,
};

module.exports = withNextra(turboConfig);