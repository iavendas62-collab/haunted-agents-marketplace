#!/bin/bash
# Build script for App 1 - Kiro Agents Marketplace

echo "📦 Building Kiro Agents Marketplace..."

# Copy configuration files
echo "Copying App 1 configuration..."
cp -r config/* ../skeleton/web/public/config/
cp -r public/images/* ../skeleton/web/public/images/

# Navigate to skeleton/web and build
cd ../skeleton/web
npm install
npm run build

echo "✅ Build complete!"
