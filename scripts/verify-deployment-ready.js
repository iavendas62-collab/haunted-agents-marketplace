#!/usr/bin/env node

/**
 * Verification script to check if all components are ready for deployment
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const checks = [];
let passed = 0;
let failed = 0;

function check(name, fn) {
  checks.push({ name, fn });
}

function runCheck(check) {
  try {
    check.fn();
    console.log(`✅ ${check.name}`);
    passed++;
    return true;
  } catch (error) {
    console.log(`❌ ${check.name}`);
    console.log(`   ${error.message}`);
    failed++;
    return false;
  }
}

// File existence checks
check('App 1 vercel.json exists', () => {
  if (!fs.existsSync('app1-kiro-marketplace/vercel.json')) {
    throw new Error('Missing app1-kiro-marketplace/vercel.json');
  }
});

check('App 1 package.json exists', () => {
  if (!fs.existsSync('app1-kiro-marketplace/package.json')) {
    throw new Error('Missing app1-kiro-marketplace/package.json');
  }
});

check('App 1 DEPLOYMENT.md exists', () => {
  if (!fs.existsSync('app1-kiro-marketplace/DEPLOYMENT.md')) {
    throw new Error('Missing app1-kiro-marketplace/DEPLOYMENT.md');
  }
});

check('App 2 vercel.json exists', () => {
  if (!fs.existsSync('app2-devops-hub/vercel.json')) {
    throw new Error('Missing app2-devops-hub/vercel.json');
  }
});

check('App 2 package.json exists', () => {
  if (!fs.existsSync('app2-devops-hub/package.json')) {
    throw new Error('Missing app2-devops-hub/package.json');
  }
});

check('App 2 DEPLOYMENT.md exists', () => {
  if (!fs.existsSync('app2-devops-hub/DEPLOYMENT.md')) {
    throw new Error('Missing app2-devops-hub/DEPLOYMENT.md');
  }
});

check('CLI package.json configured for publishing', () => {
  const pkg = require('../skeleton/cli/package.json');
  if (!pkg.name) throw new Error('Missing package name');
  if (!pkg.version) throw new Error('Missing version');
  if (!pkg.bin) throw new Error('Missing bin configuration');
  if (!pkg.files) throw new Error('Missing files configuration');
  if (!pkg.repository) throw new Error('Missing repository URL');
});

check('CLI .npmignore exists', () => {
  if (!fs.existsSync('skeleton/cli/.npmignore')) {
    throw new Error('Missing skeleton/cli/.npmignore');
  }
});

check('CLI PUBLISHING.md exists', () => {
  if (!fs.existsSync('skeleton/cli/PUBLISHING.md')) {
    throw new Error('Missing skeleton/cli/PUBLISHING.md');
  }
});

check('Copy config script exists', () => {
  if (!fs.existsSync('scripts/copy-config.js')) {
    throw new Error('Missing scripts/copy-config.js');
  }
});

check('DEPLOYMENT_SUMMARY.md exists', () => {
  if (!fs.existsSync('DEPLOYMENT_SUMMARY.md')) {
    throw new Error('Missing DEPLOYMENT_SUMMARY.md');
  }
});

check('QUICK_DEPLOY.md exists', () => {
  if (!fs.existsSync('QUICK_DEPLOY.md')) {
    throw new Error('Missing QUICK_DEPLOY.md');
  }
});

// Configuration checks
check('App 1 has config files', () => {
  if (!fs.existsSync('app1-kiro-marketplace/config/agents.json')) {
    throw new Error('Missing agents.json');
  }
  if (!fs.existsSync('app1-kiro-marketplace/config/branding.json')) {
    throw new Error('Missing branding.json');
  }
  if (!fs.existsSync('app1-kiro-marketplace/config/categories.json')) {
    throw new Error('Missing categories.json');
  }
});

check('App 2 has config files', () => {
  if (!fs.existsSync('app2-devops-hub/config/agents.json')) {
    throw new Error('Missing agents.json');
  }
  if (!fs.existsSync('app2-devops-hub/config/branding.json')) {
    throw new Error('Missing branding.json');
  }
  if (!fs.existsSync('app2-devops-hub/config/categories.json')) {
    throw new Error('Missing categories.json');
  }
});

// Build checks
check('Skeleton web can build', () => {
  try {
    process.chdir('skeleton/web');
    execSync('npm run build', { stdio: 'pipe' });
    process.chdir('../..');
  } catch (error) {
    throw new Error('Web build failed');
  }
});

check('CLI can build', () => {
  try {
    process.chdir('skeleton/cli');
    execSync('npm run build', { stdio: 'pipe' });
    process.chdir('../..');
  } catch (error) {
    throw new Error('CLI build failed');
  }
});

check('CLI dist directory exists', () => {
  if (!fs.existsSync('skeleton/cli/dist')) {
    throw new Error('CLI dist directory not found');
  }
  if (!fs.existsSync('skeleton/cli/dist/index.js')) {
    throw new Error('CLI entry point not found');
  }
});

check('CLI entry point has shebang', () => {
  const content = fs.readFileSync('skeleton/cli/dist/index.js', 'utf8');
  if (!content.startsWith('#!/usr/bin/env node')) {
    throw new Error('CLI entry point missing shebang');
  }
});

// Run all checks
console.log('\n🔍 Verifying Deployment Readiness\n');
console.log('='.repeat(50));
console.log('');

checks.forEach(runCheck);

console.log('');
console.log('='.repeat(50));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('✅ All checks passed! Ready for deployment.\n');
  console.log('Next steps:');
  console.log('  1. Deploy App 1 to Vercel');
  console.log('  2. Deploy App 2 to Vercel');
  console.log('  3. Publish CLI to npm');
  console.log('');
  console.log('See QUICK_DEPLOY.md for commands.\n');
  process.exit(0);
} else {
  console.log('❌ Some checks failed. Please fix the issues above.\n');
  process.exit(1);
}
