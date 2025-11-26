# Deployment Summary

This document provides an overview of the deployment configuration for the Haunted Agents Marketplace project.

## Overview

The project consists of three deployable components:

1. **App 1: Kiro Agents Marketplace** - Web application for Kiro IDE agent bundles
2. **App 2: DevOps Automation Hub** - Web application for DevOps automation bundles
3. **CLI Tool** - Command-line interface for managing agent bundles

## Deployment Status

### ✅ App 1: Kiro Agents Marketplace

**Status**: Ready for deployment

**Platform**: Vercel

**Configuration Files**:
- `app1-kiro-marketplace/vercel.json` - Vercel deployment configuration
- `app1-kiro-marketplace/package.json` - Build scripts
- `app1-kiro-marketplace/DEPLOYMENT.md` - Detailed deployment guide

**Environment Variables**:
```
VITE_APP_NAME=Kiro Agents Marketplace
VITE_REGISTRY_URL=https://kiro-marketplace.vercel.app/config/agents.json
```

**Build Configuration**:
- Build Command: `npm run build`
- Output Directory: `../skeleton/web/dist`
- Install Command: `cd ../skeleton/web && npm install`

**Deployment Steps**:
1. Connect GitHub repository to Vercel
2. Select `app1-kiro-marketplace` as root directory
3. Configure environment variables
4. Deploy

**Verification Checklist**:
- [ ] Homepage loads with agent listings
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Agent detail pages load
- [ ] Installation commands display correctly
- [ ] Config files accessible at `/config/agents.json`

### ✅ App 2: DevOps Automation Hub

**Status**: Ready for deployment

**Platform**: Vercel

**Configuration Files**:
- `app2-devops-hub/vercel.json` - Vercel deployment configuration
- `app2-devops-hub/package.json` - Build scripts
- `app2-devops-hub/DEPLOYMENT.md` - Detailed deployment guide

**Environment Variables**:
```
VITE_APP_NAME=DevOps Automation Hub
VITE_REGISTRY_URL=https://devops-hub.vercel.app/config/agents.json
```

**Build Configuration**:
- Build Command: `npm run build`
- Output Directory: `../skeleton/web/dist`
- Install Command: `cd ../skeleton/web && npm install`

**Deployment Steps**:
1. Connect GitHub repository to Vercel
2. Select `app2-devops-hub` as root directory
3. Configure environment variables
4. Deploy

**Verification Checklist**:
- [ ] Homepage loads with DevOps agent listings
- [ ] Search functionality works
- [ ] Category filtering works (CI/CD, Infrastructure, Monitoring)
- [ ] Agent detail pages load
- [ ] Installation commands display correctly
- [ ] Config files accessible at `/config/agents.json`

### ✅ CLI Tool: @haunted-agents/cli

**Status**: Ready for npm publishing

**Platform**: npm

**Configuration Files**:
- `skeleton/cli/package.json` - Package metadata and scripts
- `skeleton/cli/.npmignore` - Files to exclude from package
- `skeleton/cli/PUBLISHING.md` - Detailed publishing guide
- `skeleton/cli/README.md` - Package documentation

**Package Details**:
- Package Name: `@haunted-agents/cli`
- Version: `1.0.0`
- License: MIT
- Size: ~38 kB (packed)

**Publishing Steps**:
1. Login to npm: `npm login`
2. Navigate to CLI directory: `cd skeleton/cli`
3. Run tests: `npm test`
4. Build package: `npm run build`
5. Test locally: `npm pack && npm install -g <tarball>`
6. Publish: `npm publish --access public`

**Verification Checklist**:
- [ ] Package builds successfully
- [ ] All tests pass
- [ ] CLI commands work: `kiro-agent --help`
- [ ] Package visible on npmjs.com
- [ ] Installation works: `npm install -g @haunted-agents/cli`

## Architecture

### Shared Skeleton

Both web applications use the same skeleton codebase (`skeleton/web/`) but with different configurations:

```
skeleton/web/          # Shared React application
├── src/
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   └── config/        # Configuration loader
└── dist/              # Build output

app1-kiro-marketplace/ # App 1 configuration
├── config/
│   ├── agents.json    # Kiro-specific agents
│   ├── branding.json  # Kiro branding
│   └── categories.json
└── public/            # App 1 assets

app2-devops-hub/       # App 2 configuration
├── config/
│   ├── agents.json    # DevOps-specific agents
│   ├── branding.json  # DevOps branding
│   └── categories.json
└── public/            # App 2 assets
```

### Build Process

1. **Install dependencies** in `skeleton/web`
2. **Build React app** with Vite
3. **Copy configuration** from app directory to `dist/`
4. **Deploy** the `dist/` directory

This is handled by the `scripts/copy-config.js` script.

## Security Headers

Both applications include security headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Content-Security-Policy` with restricted sources

## Continuous Deployment

### Vercel Auto-Deployment

Both web applications can be configured for automatic deployment:

- **Production**: Commits to `main` branch
- **Preview**: Pull requests and feature branches

### GitHub Actions (Optional)

For automated npm publishing, see `skeleton/cli/PUBLISHING.md` for GitHub Actions workflow configuration.

## Post-Deployment Tasks

After deploying all components:

1. **Update Registry URLs**
   - Update `VITE_REGISTRY_URL` in both apps with actual deployment URLs
   - Redeploy to apply changes

2. **Test End-to-End**
   - Browse both web applications
   - Install CLI: `npm install -g @haunted-agents/cli`
   - Install bundles from both marketplaces
   - Verify all components work

3. **Update Documentation**
   - Update README.md with deployment URLs
   - Update demo video with live applications
   - Update submission materials

4. **Monitor**
   - Check Vercel analytics
   - Monitor npm download stats
   - Watch for issues and user feedback

## Rollback Procedures

### Vercel Rollback

1. Go to Vercel Dashboard > Deployments
2. Find previous working deployment
3. Click "..." menu > "Promote to Production"

### npm Rollback

1. Deprecate problematic version:
   ```bash
   npm deprecate @haunted-agents/cli@1.0.0 "Critical bug, use 1.0.1"
   ```

2. Publish fixed version:
   ```bash
   npm version patch
   npm publish
   ```

## Troubleshooting

### Build Fails

**Issue**: Build fails with "Cannot find module"

**Solution**:
- Ensure install command includes `cd ../skeleton/web && npm install`
- Check all dependencies in `skeleton/web/package.json`

### Config Files Not Loading

**Issue**: Configuration files not accessible

**Solution**:
- Verify build script copies config files
- Check `scripts/copy-config.js` is working
- Ensure `public` directory contents are copied

### Environment Variables Not Working

**Issue**: App name or registry URL not updating

**Solution**:
- Ensure variables are prefixed with `VITE_`
- Redeploy after changing environment variables
- Clear browser cache

### CLI Installation Fails

**Issue**: `npm install -g @haunted-agents/cli` fails

**Solution**:
- Check npm registry: `npm info @haunted-agents/cli`
- Verify package is public: `npm publish --access public`
- Try with sudo on Unix: `sudo npm install -g @haunted-agents/cli`

## Resources

### Documentation

- [App 1 Deployment Guide](app1-kiro-marketplace/DEPLOYMENT.md)
- [App 2 Deployment Guide](app2-devops-hub/DEPLOYMENT.md)
- [CLI Publishing Guide](skeleton/cli/PUBLISHING.md)
- [Skeleton Development Guide](.kiro/steering/skeleton-dev.md)

### External Resources

- [Vercel Documentation](https://vercel.com/docs)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

## Support

For issues or questions:

- GitHub Issues: [Repository Issues](https://github.com/yourusername/haunted-agents-marketplace/issues)
- Documentation: [Project README](README.md)
- Kiro Community: [Kiro Discord/Forum]

---

**Last Updated**: 2025-11-25

**Deployment Status**: All components ready for deployment
