# Seba FiveM Docs Hub

A comprehensive documentation site for FiveM/RedM scripts and resources, optimized for performance with Bun.js runtime.

## 🚀 Features

- **High Performance**: Optimized for Bun.js runtime with faster builds and development
- **Modern Stack**: Next.js 13+ with Nextra documentation framework
- **Image Optimization**: Automated WebP/AVIF conversion with responsive variants
- **TypeScript**: Full TypeScript support for better development experience
- **Mobile First**: Responsive design optimized for all devices

## 📋 Prerequisites

- [Bun](https://bun.sh/) 1.0+ (recommended for optimal performance)
- [Node.js](https://nodejs.org/) 18+ (alternative runtime)
- Git

## ⚡ Quick Start

### With Bun (Recommended)

```bash
# Clone the repository
git clone https://github.com/fivem-seba-stuff/docs.git
cd docs

# Install dependencies with Bun
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

### With Node.js (Alternative)

```bash
# Install dependencies
npm install

# Start development server
npm run dev:next

# Build for production
npm run build:next
```

## 🛠️ Available Scripts

### Development
- `bun run dev` - Start development server with Bun (recommended)
- `bun run dev:turbo` - Start development server with Turbopack (experimental)
- `bun run dev:next` - Start development server with Node.js

### Production
- `bun run build` - Build with Bun optimization
- `bun run build:next` - Build with Node.js
- `bun run start` - Start production server

### Optimization
- `bun run optimize-images` - Optimize images for better performance
- `bun run clean` - Clean build artifacts
- `bun run type-check` - Run TypeScript checks

## 🚀 Deployment

### GitHub Pages (Configured)
This project is set up for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages** in repository settings
2. **Select "GitHub Actions"** as the source  
3. **Push to main branch** to trigger deployment
4. **Site will be available** at: `https://fivem-seba-stuff.github.io/docs`

The deployment workflow automatically:
- Builds with Bun.js (Node.js fallback)
- Generates static export
- Creates sitemap
- Deploys to GitHub Pages

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Other Platforms
- **Vercel**: Connect GitHub repository, set build command to `bun run build`
- **Netlify**: Use `bun run build` as build command, output directory `out`
- **Custom Server**: Use `bun run start` for SSR deployment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using [Bun](https://bun.sh/), [Next.js](https://nextjs.org/), and [Nextra](https://nextra.site/)
