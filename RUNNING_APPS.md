# Running the Applications

This skeleton supports running two different marketplace applications from the same codebase.

## Quick Start

### Run Application 1 (Kiro Agents Marketplace)
```bash
npm run dev:app1
```
This will start the Kiro Agents Marketplace on **http://localhost:4000**

### Run Application 2 (DevOps Automation Hub)
```bash
npm run dev:app2
```
This will start the DevOps Automation Hub on **http://localhost:4001**

### Run Both Applications Simultaneously
```bash
npm run dev:both
```
This will start both applications:
- App 1 on **http://localhost:4000**
- App 2 on **http://localhost:4001**

## How It Works

The skeleton uses a configuration-driven approach:

1. **Configuration Files**: Each application has its own configuration in:
   - `app1-kiro-marketplace/config/` - Kiro Agents Marketplace config
   - `app2-devops-hub/config/` - DevOps Hub config

2. **Copy Script**: The `scripts/copy-config.js` script copies the appropriate configuration to `skeleton/web/public/config/` before starting the dev server.

3. **Shared Codebase**: Both applications use the same React components from `skeleton/web/src/`, but display different content based on the loaded configuration.

## Configuration Files

Each application directory contains:

- **branding.json** - Name, logo, colors, tagline
- **categories.json** - Category filters
- **agents.json** - Available agent bundles
- **public/images/** - Preview images for agents

## Manual Configuration

If you want to manually switch configurations:

```bash
# Copy App 1 config
node scripts/copy-config.js app1

# Copy App 2 config
node scripts/copy-config.js app2

# Then run the dev server
cd skeleton/web
npm run dev
```

## Verifying the Setup

After starting an application, you should see:

**App 1 (localhost:4000):**
- Title: "Kiro Agents Marketplace"
- Tagline: "Supercharge your Kiro IDE with specialized AI agents"
- Categories: Frontend Development, Backend Development, Testing, etc.
- Agents: React + Supabase Expert, API Documentation Wizard, TDD Coach

**App 2 (localhost:4001):**
- Title: "DevOps Automation Hub"
- Tagline: "Automate your infrastructure with specialized DevOps agents"
- Categories: CI/CD, Infrastructure, Monitoring, etc.
- Agents: CI/CD Pipeline Template, Kubernetes Monitor, Terraform Helper

## Troubleshooting

### Both apps show the same name

Make sure you're using the npm scripts (`npm run dev:app1` or `npm run dev:app2`) instead of running `npm run dev` directly in the skeleton/web directory.

### Configuration not updating

1. Stop the dev server
2. Run the copy-config script manually: `node scripts/copy-config.js app1`
3. Restart the dev server

### Port already in use

If port 4000 or 4001 is already in use, you can manually specify a different port:

```bash
node scripts/copy-config.js app1
cd skeleton/web
npm run dev -- --port 3000
```

## Building for Production

To build each application for production:

```bash
# Build App 1
node scripts/copy-config.js app1
npm run build:web

# Build App 2
node scripts/copy-config.js app2
npm run build:web
```

The built files will be in `skeleton/web/dist/` and can be deployed to Vercel or any static hosting service.
