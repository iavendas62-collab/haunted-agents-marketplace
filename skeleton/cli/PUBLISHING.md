# Publishing Guide - @haunted-agents/cli

This guide explains how to publish the CLI package to npm.

## Prerequisites

1. **npm Account**
   - Create an account at [npmjs.com](https://www.npmjs.com/signup)
   - Verify your email address

2. **npm Login**
   ```bash
   npm login
   ```
   Enter your username, password, and email when prompted.

3. **Organization Setup (Optional)**
   
   If publishing under `@haunted-agents` scope:
   - Create an organization at [npmjs.com/org/create](https://www.npmjs.com/org/create)
   - Name it `haunted-agents`
   - Add team members if needed

## Pre-Publishing Checklist

Before publishing, ensure:

- [ ] All tests pass: `npm test`
- [ ] Code builds successfully: `npm run build`
- [ ] README.md is complete and accurate
- [ ] package.json has correct metadata:
  - [ ] Version number is correct
  - [ ] Repository URL is set
  - [ ] Author information is filled
  - [ ] Keywords are relevant
  - [ ] License is specified (MIT)
- [ ] CHANGELOG.md is updated (if exists)
- [ ] No sensitive information in code or config
- [ ] `.npmignore` or `files` field excludes unnecessary files

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backward compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backward compatible

Update version:

```bash
# Patch release (bug fixes)
npm version patch

# Minor release (new features)
npm version minor

# Major release (breaking changes)
npm version major
```

This automatically:
- Updates `package.json`
- Creates a git commit
- Creates a git tag

## Publishing Steps

### 1. Prepare the Package

```bash
cd skeleton/cli

# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build
```

### 2. Test the Package Locally

Test installation before publishing:

```bash
# Create a tarball
npm pack

# This creates @haunted-agents-cli-1.0.0.tgz
# Install it globally to test
npm install -g @haunted-agents-cli-1.0.0.tgz

# Test the CLI
kiro-agent --version
kiro-agent --help

# Uninstall after testing
npm uninstall -g @haunted-agents/cli
```

### 3. Publish to npm

#### First-Time Publishing

```bash
# Publish as public package (required for scoped packages)
npm publish --access public
```

#### Subsequent Releases

```bash
# Update version
npm version patch  # or minor, or major

# Publish
npm publish
```

### 4. Verify Publication

Check that the package is published:

```bash
# View package info
npm info @haunted-agents/cli

# Install from npm to verify
npm install -g @haunted-agents/cli

# Test
kiro-agent --version
```

Visit the package page: `https://www.npmjs.com/package/@haunted-agents/cli`

## Automated Publishing with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: |
          cd skeleton/cli
          npm install
      
      - name: Run tests
        run: |
          cd skeleton/cli
          npm test
      
      - name: Build
        run: |
          cd skeleton/cli
          npm run build
      
      - name: Publish to npm
        run: |
          cd skeleton/cli
          npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Setup:
1. Generate npm token: [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens)
2. Add token to GitHub secrets as `NPM_TOKEN`
3. Create a GitHub release to trigger publishing

## Post-Publishing

After publishing:

1. **Update Documentation**
   - Update main README.md with installation instructions
   - Update CHANGELOG.md with release notes

2. **Announce Release**
   - Post on social media
   - Update project website
   - Notify users

3. **Monitor**
   - Check npm download stats
   - Monitor GitHub issues for bug reports
   - Respond to user feedback

## Unpublishing (Emergency Only)

⚠️ **Warning**: Unpublishing is discouraged and has restrictions.

```bash
# Unpublish a specific version (within 72 hours)
npm unpublish @haunted-agents/cli@1.0.0

# Unpublish entire package (within 72 hours, if no dependents)
npm unpublish @haunted-agents/cli --force
```

**Better alternative**: Deprecate instead:

```bash
npm deprecate @haunted-agents/cli@1.0.0 "This version has a critical bug. Please upgrade to 1.0.1"
```

## Troubleshooting

### "You do not have permission to publish"

- Ensure you're logged in: `npm whoami`
- Check organization membership
- Verify package name isn't taken

### "Package name too similar to existing package"

- Choose a different name
- Or request transfer of existing package

### "Version already exists"

- Update version number: `npm version patch`
- Cannot republish same version

### "prepublishOnly script failed"

- Fix failing tests or build errors
- Ensure all dependencies are installed

### "Package size too large"

- Check what's being included: `npm pack --dry-run`
- Update `.npmignore` or `files` field in package.json
- Remove unnecessary files

## Best Practices

1. **Test Before Publishing**
   - Always run tests: `npm test`
   - Test local installation: `npm pack && npm install -g <tarball>`

2. **Version Carefully**
   - Follow semantic versioning
   - Document breaking changes clearly

3. **Keep README Updated**
   - Installation instructions
   - Usage examples
   - API documentation

4. **Maintain Changelog**
   - Document all changes
   - Group by version
   - Include dates

5. **Security**
   - Never commit secrets
   - Use `.npmignore` to exclude sensitive files
   - Enable 2FA on npm account

6. **Deprecation**
   - Deprecate old versions when needed
   - Provide migration guides for breaking changes

## Release Checklist

- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Run all tests
- [ ] Build package
- [ ] Test local installation
- [ ] Commit changes
- [ ] Create git tag
- [ ] Push to GitHub
- [ ] Publish to npm
- [ ] Verify publication
- [ ] Create GitHub release
- [ ] Announce release

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm CLI Documentation](https://docs.npmjs.com/cli/)
- [Creating and Publishing Scoped Packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
