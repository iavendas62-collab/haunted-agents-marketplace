import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { InstallCommand } from './install';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

describe('InstallCommand', () => {
  let tempDir: string;

  beforeEach(async () => {
    // Create a temporary directory for testing
    tempDir = path.join(os.tmpdir(), `kiro-agent-test-${Date.now()}`);
    await fs.ensureDir(tempDir);
  });

  afterEach(async () => {
    // Clean up temp directory
    await fs.remove(tempDir);
  });

  it('should create an InstallCommand instance', () => {
    const cmd = new InstallCommand();
    expect(cmd).toBeDefined();
  });

  it('should exit with error if no bundle ID provided', async () => {
    const cmd = new InstallCommand();
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await cmd.execute([], {});

    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(consoleErrorSpy).toHaveBeenCalled();

    exitSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should handle registry fetch errors gracefully', async () => {
    const cmd = new InstallCommand();
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Try to install a non-existent bundle
    await cmd.execute(['non-existent-bundle'], {});

    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(consoleErrorSpy).toHaveBeenCalled();

    exitSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});
