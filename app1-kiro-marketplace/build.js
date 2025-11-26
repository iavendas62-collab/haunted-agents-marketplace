const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Building Kiro Agents Marketplace...');

// Copy configuration files
console.log('Copying App 1 configuration...');
fs.copySync(
  path.join(__dirname, 'config'),
  path.join(__dirname, '../skeleton/web/public/config')
);

fs.copySync(
  path.join(__dirname, 'public/images'),
  path.join(__dirname, '../skeleton/web/public/images')
);

// Navigate to skeleton/web and build
console.log('Installing dependencies...');
process.chdir(path.join(__dirname, '../skeleton/web'));
execSync('npm install', { stdio: 'inherit' });

console.log('Building...');
execSync('npm run build', { stdio: 'inherit' });

console.log('✅ Build complete!');
