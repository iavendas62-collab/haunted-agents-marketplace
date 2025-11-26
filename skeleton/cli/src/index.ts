#!/usr/bin/env node

import { Command } from 'commander';
import { InstallCommand } from './commands/install';
import { CreateCommand } from './commands/create';
import { ValidateCommand } from './commands/validate';
import { PackageCommand } from './commands/package';
import { ListCommand } from './commands/list';

const program = new Command();

program
  .name('kiro-agent')
  .description('CLI tool for managing Haunted Agent bundles')
  .version('1.0.0');

// Install command
program
  .command('install <bundle-id>')
  .description('Install an agent bundle from the registry')
  .option('-f, --force', 'Force reinstall if already installed')
  .action(async (bundleId: string, options: any) => {
    const installCmd = new InstallCommand();
    await installCmd.execute([bundleId], options);
  });

// Create command
program
  .command('create <bundle-name>')
  .description('Create a new agent bundle template')
  .option('-o, --output <path>', 'Output directory for the bundle')
  .action(async (bundleName: string, options: any) => {
    const createCmd = new CreateCommand();
    await createCmd.execute([bundleName], options);
  });

// Validate command
program
  .command('validate [bundle-path]')
  .description('Validate a bundle manifest and check referenced files')
  .action(async (bundlePath: string | undefined, options: any) => {
    const validateCmd = new ValidateCommand();
    await validateCmd.execute(bundlePath ? [bundlePath] : [], options);
  });

// Package command
program
  .command('package [bundle-path]')
  .description('Package a bundle into a distributable ZIP archive')
  .option('-o, --output <path>', 'Output directory for the ZIP file')
  .action(async (bundlePath: string | undefined, options: any) => {
    const packageCmd = new PackageCommand();
    await packageCmd.execute(bundlePath ? [bundlePath] : [], options);
  });

// List command
program
  .command('list')
  .description('List all installed agent bundles')
  .action(async (options: any) => {
    const listCmd = new ListCommand();
    await listCmd.execute([], options);
  });

program.parse(process.argv);
