# Deployment Checklist

Use this checklist to ensure all deployment steps are completed successfully.

## Pre-Deployment

- [ ] All code committed to GitHub
- [ ] All tests passing: `npm test`
- [ ] Build verification passed: `npm run verify:deployment`
- [ ] README.md updated with project information
- [ ] Demo video recorded (if applicable)

## App 1: Kiro Agents Marketplace

### Setup
- [ ] GitHub repository connected to Vercel
- [ ] Project created in Vercel dashboard
- [ ] Root directory set to `app1-kiro-marketplace`

### Configuration
- [ ] Build command: `npm run build`
- [ ] Output directory: `../skeleton/web/dist`
- [ ] Install command: `cd ../skeleton/web && npm install`

### Environment Variables
- [ ] `VITE_APP_NAME` = `Kiro Agents Marketplace`
- [ ] `VITE_REGISTRY_URL` = `https://[your-app].vercel.app/config/agents.json`

### Deployment
- [ ] Initial deployment successful
- [ ] Registry URL updated with actual deployment URL
- [ ] Redeployed with correct registry URL

### Verification
- [ ] Homepage loads correctly
- [ ] All 3 agent bundles display
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Agent detail pages load
- [ ] Installation commands display correctly
- [ ] Config accessible at `/config/agents.json`
- [ ] Images load correctly
- [ ] No console errors

### Post-Deployment
- [ ] URL added to README.md
- [ ] URL added to demo video description
- [ ] URL tested from different devices/browsers

## App 2: DevOps Automation Hub

### Setup
- [ ] GitHub repository connected to Vercel
- [ ] Project created in Vercel dashboard
- [ ] Root directory set to `app2-devops-hub`

### Configuration
- [ ] Build command: `npm run build`
- [ ] Output directory: `../skeleton/web/dist`
- [ ] Install command: `cd ../skeleton/web && npm install`

### Environment Variables
- [ ] `VITE_APP_NAME` = `DevOps Automation Hub`
- [ ] `VITE_REGISTRY_URL` = `https://[your-app].vercel.app/config/agents.json`

### Deployment
- [ ] Initial deployment successful
- [ ] Registry URL updated with actual deployment URL
- [ ] Redeployed with correct registry URL

### Verification
- [ ] Homepage loads correctly
- [ ] All 3 DevOps bundles display
- [ ] Search functionality works
- [ ] Category filtering works (CI/CD, Infrastructure, Monitoring)
- [ ] Agent detail pages load
- [ ] Installation commands display correctly
- [ ] Config accessible at `/config/agents.json`
- [ ] Images load correctly
- [ ] No console errors
- [ ] Different branding from App 1 visible

### Post-Deployment
- [ ] URL added to README.md
- [ ] URL added to demo video description
- [ ] URL tested from different devices/browsers

## CLI: @haunted-agents/cli

### Pre-Publishing
- [ ] Logged into npm: `npm whoami`
- [ ] Organization created (if using scoped package)
- [ ] All tests passing: `cd skeleton/cli && npm test`
- [ ] Build successful: `npm run build`
- [ ] Local test successful: `npm pack && npm install -g <tarball>`

### Publishing
- [ ] Version number correct in package.json
- [ ] CHANGELOG updated (if exists)
- [ ] README.md complete and accurate
- [ ] Published to npm: `npm publish --access public`

### Verification
- [ ] Package visible on npmjs.com
- [ ] Package info correct: `npm info @haunted-agents/cli`
- [ ] Global installation works: `npm install -g @haunted-agents/cli`
- [ ] CLI commands work:
  - [ ] `kiro-agent --version`
  - [ ] `kiro-agent --help`
  - [ ] `kiro-agent list`
  - [ ] `kiro-agent create test-bundle`
  - [ ] `kiro-agent validate test-bundle`

### Post-Publishing
- [ ] Installation instructions added to README.md
- [ ] npm package URL added to documentation
- [ ] Tested installation on clean machine

## Integration Testing

### End-to-End Workflow
- [ ] Install CLI from npm
- [ ] Browse App 1 marketplace
- [ ] Copy install command from App 1
- [ ] Install bundle using CLI
- [ ] Verify bundle installed in `.kiro/` directories
- [ ] List installed bundles: `kiro-agent list`
- [ ] Repeat for App 2

### Cross-Application Testing
- [ ] Both apps use same CLI
- [ ] Bundles from both apps can be installed
- [ ] No conflicts between apps
- [ ] Registry URLs work correctly

## Documentation

- [ ] README.md updated with deployment URLs
- [ ] DEPLOYMENT_SUMMARY.md complete
- [ ] QUICK_DEPLOY.md accurate
- [ ] Individual deployment guides reviewed
- [ ] KIRO_USAGE.md complete
- [ ] SKELETON_GUIDE.md accurate
- [ ] BUNDLE_FORMAT.md complete

## Demo Video

- [ ] Video recorded (max 3 minutes)
- [ ] Shows both applications
- [ ] Demonstrates CLI installation
- [ ] Shows bundle installation workflow
- [ ] Highlights skeleton versatility
- [ ] Uploaded to YouTube as public
- [ ] URL added to README.md
- [ ] Description includes deployment URLs

## Hackathon Submission

### Repository Requirements
- [ ] Public repository
- [ ] MIT License visible in About section
- [ ] `.kiro/` directory at root
- [ ] `.kiro/` NOT in .gitignore
- [ ] `app1-kiro-marketplace/` folder exists
- [ ] `app2-devops-hub/` folder exists
- [ ] All source code committed

### Documentation Requirements
- [ ] KIRO_USAGE.md explains spec-driven development
- [ ] KIRO_USAGE.md documents steering strategies
- [ ] KIRO_USAGE.md describes agent hooks
- [ ] KIRO_USAGE.md includes code generation examples
- [ ] README.md has project overview
- [ ] README.md has installation instructions

### Deployment Requirements
- [ ] App 1 deployed and accessible
- [ ] App 2 deployed and accessible
- [ ] Both apps functional
- [ ] Demo video uploaded
- [ ] All URLs working

### Submission Materials
- [ ] GitHub repository URL
- [ ] App 1 deployment URL
- [ ] App 2 deployment URL
- [ ] Demo video URL
- [ ] npm package URL (optional but recommended)

## Final Checks

- [ ] All URLs tested and working
- [ ] No broken links in documentation
- [ ] No sensitive information in code
- [ ] All images loading correctly
- [ ] Mobile responsiveness checked
- [ ] Cross-browser compatibility verified
- [ ] Performance acceptable (< 3s load time)
- [ ] No console errors or warnings
- [ ] Analytics/monitoring set up (optional)

## Rollback Plan

In case of issues:

### Vercel Rollback
1. Go to Vercel Dashboard > Deployments
2. Find previous working deployment
3. Click "..." > "Promote to Production"

### npm Rollback
1. Deprecate bad version: `npm deprecate @haunted-agents/cli@X.X.X "Use X.X.Y"`
2. Publish fix: `npm version patch && npm publish`

## Support Contacts

- **Vercel Support**: https://vercel.com/support
- **npm Support**: https://www.npmjs.com/support
- **GitHub Issues**: [Your repository]/issues

## Notes

Use this space for deployment-specific notes:

```
Deployment Date: _______________
App 1 URL: _______________
App 2 URL: _______________
CLI Version: _______________
Issues Encountered: _______________
Resolution: _______________
```

---

**Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Last Updated**: 2025-11-25
