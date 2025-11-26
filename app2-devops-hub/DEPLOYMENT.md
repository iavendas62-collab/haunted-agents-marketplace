# Deployment Guide - DevOps Automation Hub

## Vercel Deployment

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

### Deployment Steps

1. **Connect Repository to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the `app2-devops-hub` directory as the root

2. **Configure Project Settings**
   - **Framework Preset**: Other
   - **Root Directory**: `app2-devops-hub`
   - **Build Command**: `npm run build`
   - **Output Directory**: `../skeleton/web/dist`
   - **Install Command**: `cd ../skeleton/web && npm install`

3. **Set Environment Variables**
   
   Add the following environment variables in Vercel project settings:
   
   ```
   VITE_APP_NAME=DevOps Automation Hub
   VITE_REGISTRY_URL=https://devops-hub.vercel.app/config/agents.json
   ```
   
   Note: Update the `VITE_REGISTRY_URL` with your actual Vercel deployment URL after first deployment.

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

5. **Update Registry URL**
   - After first deployment, update the `VITE_REGISTRY_URL` environment variable with the actual deployment URL
   - Redeploy to apply changes

### Verification

After deployment, verify:
- [ ] Homepage loads with DevOps agent listings
- [ ] Search functionality works
- [ ] Category filtering works (CI/CD, Infrastructure, Monitoring)
- [ ] Agent detail pages load correctly
- [ ] Installation commands are displayed
- [ ] Config files are accessible at `/config/agents.json`

### Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., `devops-hub.com`)
4. Update DNS records as instructed
5. Update `VITE_REGISTRY_URL` environment variable with new domain

### Troubleshooting

**Build fails with "Cannot find module"**
- Ensure the install command includes `cd ../skeleton/web && npm install`
- Check that all dependencies are listed in `skeleton/web/package.json`

**Config files not loading**
- Verify that the build script copies config files to dist directory
- Check that `public` directory contents are copied to dist

**Environment variables not working**
- Ensure variables are prefixed with `VITE_`
- Redeploy after changing environment variables

**Different branding not showing**
- Verify `config/branding.json` has DevOps-specific branding
- Check that config files are being copied during build
- Clear browser cache and reload

### Continuous Deployment

Vercel automatically deploys:
- **Production**: Commits to `main` branch
- **Preview**: Pull requests and other branches

To disable auto-deployment:
1. Go to project settings
2. Navigate to "Git"
3. Configure deployment branches

## Manual Deployment

If you prefer to deploy manually:

```bash
# Build the application
cd app2-devops-hub
npm run build

# Deploy using Vercel CLI
npx vercel --prod
```

## Monitoring

Monitor your deployment:
- **Analytics**: Vercel Dashboard > Analytics
- **Logs**: Vercel Dashboard > Deployments > [Select deployment] > Logs
- **Performance**: Vercel Dashboard > Speed Insights

## Rollback

To rollback to a previous deployment:
1. Go to Vercel Dashboard > Deployments
2. Find the previous working deployment
3. Click "..." menu > "Promote to Production"

## Differences from App 1

This deployment uses the same skeleton codebase as App 1 but with different configuration:
- Different branding (DevOps theme vs Kiro theme)
- Different agent bundles (CI/CD, K8s, Terraform vs React, API, Testing)
- Different categories (Infrastructure, Monitoring vs Frontend, Backend)
- Different registry URL

Both applications demonstrate the skeleton's versatility and configurability.
