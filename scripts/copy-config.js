#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the app argument (app1 or app2)
const app = process.argv[2];

if (!app || (app !== 'app1' && app !== 'app2')) {
  console.error('Usage: node copy-config.js <app1|app2>');
  process.exit(1);
}

// Define source and destination paths
const appMap = {
  app1: 'app1-kiro-marketplace',
  app2: 'app2-devops-hub'
};

const sourceDir = path.join(__dirname, '..', appMap[app], 'config');
const destDir = path.join(__dirname, '..', 'skeleton', 'web', 'public', 'config');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy configuration files
const configFiles = ['branding.json', 'categories.json', 'agents.json'];

console.log(`\n📦 Copying configuration for ${appMap[app]}...\n`);

configFiles.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const destPath = path.join(destDir, file);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ Copied ${file}`);
  } else {
    console.warn(`⚠️  Warning: ${file} not found in ${sourceDir}`);
  }
});

// Copy images if they exist
const sourceImagesDir = path.join(__dirname, '..', appMap[app], 'public', 'images');
const destImagesDir = path.join(__dirname, '..', 'skeleton', 'web', 'public', 'images');

if (fs.existsSync(sourceImagesDir)) {
  if (!fs.existsSync(destImagesDir)) {
    fs.mkdirSync(destImagesDir, { recursive: true });
  }
  
  const images = fs.readdirSync(sourceImagesDir);
  images.forEach(image => {
    const sourcePath = path.join(sourceImagesDir, image);
    const destPath = path.join(destImagesDir, image);
    fs.copyFileSync(sourcePath, destPath);
  });
  console.log(`✅ Copied ${images.length} image(s)`);
}

console.log(`\n✨ Configuration ready for ${appMap[app]}!\n`);
