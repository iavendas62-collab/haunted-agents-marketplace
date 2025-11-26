import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import path from 'path';

describe('CLI Entry Point', () => {
  const cliPath = path.join(__dirname, '../dist/cli/src/index.js');

  it('should display help message', () => {
    const output = execSync(`node "${cliPath}" --help`, { encoding: 'utf-8' });
    expect(output).toContain('CLI tool for managing Haunted Agent bundles');
    expect(output).toContain('kiro-agent');
  });

  it('should display version', () => {
    const output = execSync(`node "${cliPath}" --version`, { encoding: 'utf-8' });
    expect(output.trim()).toBe('1.0.0');
  });

  it('should have correct CLI name', () => {
    const output = execSync(`node "${cliPath}" --help`, { encoding: 'utf-8' });
    expect(output).toContain('Usage: kiro-agent');
  });
});
