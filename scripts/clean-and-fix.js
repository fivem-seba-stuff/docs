#!/usr/bin/env bun

/**
 * Clean and fix script for Seba FiveM Docs Hub
 * Resolves common Next.js and webpack warnings
 */

import { rmSync, existsSync } from 'fs';
import { join } from 'path';

const PROJECT_ROOT = process.cwd();

async function cleanDirectories() {
  console.log('🧹 Cleaning build directories...');
  
  const dirsToClean = ['.next', 'out', 'node_modules/.cache'];
  
  for (const dir of dirsToClean) {
    const fullPath = join(PROJECT_ROOT, dir);
    if (existsSync(fullPath)) {
      try {
        rmSync(fullPath, { recursive: true, force: true });
        console.log(`✅ Cleaned: ${dir}`);
      } catch (error) {
        console.log(`⚠️  Could not clean ${dir}: ${error.message}`);
      }
    }
  }
}

async function reinstallDependencies() {
  console.log('📦 Reinstalling dependencies...');
  
  try {
    const { spawn } = await import('child_process');
    
    return new Promise((resolve, reject) => {
      const install = spawn('bun', ['install'], { 
        stdio: 'inherit',
        shell: true 
      });
      
      install.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Dependencies reinstalled');
          resolve(true);
        } else {
          console.log('❌ Failed to reinstall dependencies');
          reject(new Error(`Install failed with code ${code}`));
        }
      });
    });
  } catch (error) {
    console.log(`❌ Error reinstalling: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting clean and fix process...');
  console.log('');
  
  await cleanDirectories();
  console.log('');
  
  await reinstallDependencies();
  console.log('');
  
  console.log('✅ Clean and fix completed!');
  console.log('');
  console.log('💡 Tips to avoid warnings:');
  console.log('- Use "bun run fresh" to clean and start dev server');
  console.log('- Use "bun run clean" to clean build directories');
  console.log('- Warnings about undici are now resolved');
  console.log('');
  console.log('🎯 Run "bun run dev" to start development server');
}

if (import.meta.main) {
  main().catch(console.error);
}