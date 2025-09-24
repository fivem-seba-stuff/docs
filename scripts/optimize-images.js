#!/usr/bin/env bun

/**
 * Image optimization script for Seba FiveM Docs Hub
 * Optimizes images for better performance and faster loading
 */

import { readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { join, extname, basename } from 'path';
import sharp from 'sharp';

const INPUT_DIR = './public/static';
const OUTPUT_DIR = './public/static/optimized';

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// Optimization settings
const OPTIMIZATION_CONFIG = {
  jpeg: {
    quality: 85,
    progressive: true,
    mozjpeg: true,
  },
  png: {
    quality: 90,
    progressive: true,
    compressionLevel: 9,
  },
  webp: {
    quality: 90,
    effort: 6,
  },
  avif: {
    quality: 80,
    effort: 4,
  },
};

// Image size variants
const SIZE_VARIANTS = [
  { suffix: '-sm', width: 384, height: null },
  { suffix: '-md', width: 768, height: null },
  { suffix: '-lg', width: 1200, height: null },
];

async function optimizeImage(inputPath, outputDir) {
  const ext = extname(inputPath).toLowerCase();
  const name = basename(inputPath, ext);
  
  if (!SUPPORTED_FORMATS.includes(ext)) {
    console.log(`Skipping unsupported format: ${inputPath}`);
    return;
  }
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Optimizing: ${inputPath}`);
    
    // Create original optimized version
    await image
      .jpeg(OPTIMIZATION_CONFIG.jpeg)
      .png(OPTIMIZATION_CONFIG.png)
      .toFile(join(outputDir, `${name}${ext}`));
    
    // Create WebP version
    await image
      .webp(OPTIMIZATION_CONFIG.webp)
      .toFile(join(outputDir, `${name}.webp`));
    
    // Create AVIF version (modern browsers)
    await image
      .avif(OPTIMIZATION_CONFIG.avif)
      .toFile(join(outputDir, `${name}.avif`));
    
    // Create responsive variants
    for (const variant of SIZE_VARIANTS) {
      if (metadata.width && metadata.width > variant.width) {
        // Original format
        await image
          .resize(variant.width, variant.height, {
            withoutEnlargement: true,
            fit: 'inside',
          })
          .jpeg(OPTIMIZATION_CONFIG.jpeg)
          .png(OPTIMIZATION_CONFIG.png)
          .toFile(join(outputDir, `${name}${variant.suffix}${ext}`));
        
        // WebP format
        await image
          .resize(variant.width, variant.height, {
            withoutEnlargement: true,
            fit: 'inside',
          })
          .webp(OPTIMIZATION_CONFIG.webp)
          .toFile(join(outputDir, `${name}${variant.suffix}.webp`));
      }
    }
    
    console.log(`✅ Optimized: ${name}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

async function processDirectory(inputDir, outputDir) {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  const items = readdirSync(inputDir);
  
  for (const item of items) {
    const inputPath = join(inputDir, item);
    const stat = statSync(inputPath);
    
    if (stat.isDirectory()) {
      const subOutputDir = join(outputDir, item);
      await processDirectory(inputPath, subOutputDir);
    } else if (stat.isFile()) {
      await optimizeImage(inputPath, outputDir);
    }
  }
}

async function main() {
  console.log('🚀 Starting image optimization...');
  console.log(`Input directory: ${INPUT_DIR}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  
  if (!existsSync(INPUT_DIR)) {
    console.log(`❌ Input directory does not exist: ${INPUT_DIR}`);
    process.exit(1);
  }
  
  const startTime = Date.now();
  
  await processDirectory(INPUT_DIR, OUTPUT_DIR);
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log(`✅ Image optimization completed in ${duration}s`);
  console.log('📁 Optimized images saved to:', OUTPUT_DIR);
  console.log('');
  console.log('💡 Tips:');
  console.log('- Use .webp images for modern browsers');
  console.log('- Use .avif images for the best compression');
  console.log('- Use responsive variants for different screen sizes');
}

if (import.meta.main) {
  main().catch(console.error);
}