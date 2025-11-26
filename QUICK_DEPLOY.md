# Quick Deployment Reference

Quick commands for deploying all components of the Haunted Agents Marketplace.

## Prerequisites

```bash
# Install Vercel CLI (optional, for manual deployment)
npm install -g vercel

# Login to npm
npm login

# Verify you're logged in
npm whoami
```

## Deploy App 1: Kiro Agents Marketplace

### Via Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import GitHub repository
3. Configure:
   - **Root Directory**: `app1-kiro-marketplace`
   - **Build Command**: `npm run build`
   - **Output Directory**: `../skeleton/web/dist`
   - **Install Command**: `cd ../skeleton/web && npm install`
4. Add environment variables:
   ```
   VITE_APP_NAME=Kiro Agents Marketplace
   VITE_REGISTRY_URL=https://kiro-marketplace.vercel.app/config/agents.json
   ```
5. Click "Deploy"

### Via Vercel CLI

```bash
cd app1-kiro-marketplace
vercel --prod
```

## Deploy App 2: DevOps Automation Hub

### Via Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import GitHub repository
3. Configure:
   - **Root Directory**: `app2-devops-hub`
   - **Build Command**: `npm run build`
   - **Output Directory**: `../skeleton/web/dist`
   - **Install Command**: `cd ../skeleton/web && npm install`
4. Add environment variables:
   ```
   VITE_APP_NAME=DevOps Automation Hub
   VITE_REGISTRY_URL=https://devops-hub.vercel.app/config/agents.json
   ```
5. Click "Deploy"

### Via Vercel CLI

```bash
cd app2-devops-hub
vercel --prod
```

## Publish CLI to npm

```bash
# Navigate to CLI directory
cd skeleton/cli

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Test locally (optional)
npm pack
npm install -g haunted-agents-cli-1.0.0.tgz
kiro-agent --version
npm uninstall -g @haunted-agents/cli

# Publish to npm
npm publish --access public
```

## Verify Deployments

### App 1

```bash
# Check if site is live
curl https://kiro-marketplace.vercel.app

# Check config endpoint
curl https://kiro-marketplace.vercel.app/config/agents.json
```

### App 2

```bash
# Check if site is live
curl https://devops-hub.vercel.app

# Check config endpoint
curl https://devops-hub.vercel.app/config/agents.json
```

### CLI

```bash
# Check npm package
npm info @haunted-agents/cli

# Install and test
npm install -g @haunted-agents/cli
kiro-agent --version
kiro-agent --help
```

## Update After Deployment

After first deployment, update registry URLs:

### App 1

1. Go to Vercel project settings
2. Update `VITE_REGISTRY_URL` with actual URL
3. Redeploy

### App 2

1. Go to Vercel project settings
2. Update `VITE_REGISTRY_URL` with actual URL
3. Redeploy

## Rollback

### Vercel

```bash
# Via Dashboard
# 1. Go to Deployments
# 2. Find previous deployment
# 3. Click "..." > "Promote to Production"

# Via CLI
vercel rollback [deployment-url]
```

### npm

```bash
# Deprecate bad version
npm deprecate @haunted-agents/cli@1.0.0 "Use 1.0.1 instead"

# Publish fix
npm version patch
npm publish
```

## Common Issues

### Build fails

```bash
# Check dependencies
cd skeleton/web
npm install
npm run build

# Check if config copy works
cd ../../app1-kiro-marketplace
npm run copy-config
```

### CLI publish fails

```bash
# Check if logged in
npm whoami

# Check package name availability
npm info @haunted-agents/cli

# Try with explicit access
npm publish --access public
```

### Environment variables not working

```bash
# Ensure variables start with VITE_
# Redeploy after changing variables
vercel --prod --force
```

## Monitoring

### Vercel

```bash
# View logs
vercel logs [deployment-url]

# View deployments
vercel ls
```

### npm

```bash
# View package info
npm info @haunted-agents/cli

# View download stats
npm view @haunted-agents/cli
```

## Complete Deployment Checklist

- [ ] Push code to GitHub
- [ ] Deploy App 1 to Vercel
- [ ] Deploy App 2 to Vercel
- [ ] Update registry URLs in both apps
- [ ] Redeploy both apps
- [ ] Publish CLI to npm
- [ ] Test App 1 live site
- [ ] Test App 2 live site
- [ ] Test CLI installation from npm
- [ ] Install bundles using CLI
- [ ] Update README with deployment URLs
- [ ] Create demo video
- [ ] Submit to hackathon

## Quick Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [npm Dashboard](https://www.npmjs.com/settings/packages)
- [GitHub Repository](https://github.com/yourusername/haunted-agents-marketplace)

---

For detailed instructions, see:
- [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)
- [app1-kiro-marketplace/DEPLOYMENT.md](app1-kiro-marketplace/DEPLOYMENT.md)
- [app2-devops-hub/DEPLOYMENT.md](app2-devops-hub/DEPLOYMENT.md)
- [skeleton/cli/PUBLISHING.md](skeleton/cli/PUBLISHING.md)
