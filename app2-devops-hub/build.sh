#!/bin/bash
# Build script for App 2 - DevOps Automation Hub

echo "📦 Building DevOps Automation Hub..."

# Copy configuration files
echo "Copying App 2 configuration..."
cp -r config/* ../skeleton/web/public/config/
cp -r public/images/* ../skeleton/web/public/images/

# Navigate to skeleton/web and build
cd ../skeleton/web
npm install
npm run build

echo "✅ Build complete!"
