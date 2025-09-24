// Bun.js configuration for optimal performance
export default {
  // Preload dependencies for faster startup
  preload: [
    "react",
    "react-dom", 
    "next",
    "nextra",
    "nextra-theme-docs"
  ],
  
  // Development server configuration
  dev: {
    port: 3000,
    hostname: "localhost",
    hot: true,
  },
  
  // Build optimizations
  build: {
    target: "browser",
    format: "esm",
    splitting: true,
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV === 'development',
  },
  
  // Runtime optimizations
  runtime: {
    // Enable faster module resolution
    moduleResolution: "bundler",
    // Optimize garbage collection
    gc: {
      incremental: true,
    },
  },
  
  // Test configuration
  test: {
    preset: "react",
  },
};