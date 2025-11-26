import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PackageCommand } from './package';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import AdmZip from 'adm-zip';

describe('PackageCommand', () => {
  let packageCmd: PackageCommand;
  let testDir: string;
  let bundleDir: string;

  beforeEach(async () => {
    packageCmd = new PackageCommand();
    
    // Create a temporary test directory
    testDir = path.join(os.tmpdir(), `package-test-${Date.now()}`);
    await fs.ensureDir(testDir);
    
    // Create a test bundle directory
    bundleDir = path.join(testDir, 'test-bundle');
    await fs.ensureDir(bundleDir);
  });

  afterEach(async () => {
    // Clean up test directory
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir);
    }
  });

  describe('execute', () => {
    it('should package a valid bundle into a ZIP file', async () => {
      // Create a valid bundle structure
      const manifest = {
        id: 'test-bundle',
        name: 'Test Bundle',
        version: '1.0.0',
        description: 'A test bundle',
        longDescription: 'A detailed test bundle description',
        author: {
          name: 'Test Author',
          email: 'test@example.com'
        },
        tags: ['test'],
        categories: ['testing'],
        components: {
          mcpServers: [
            {
              name: 'test-server',
              command: 'node',
              args: ['server.js']
            }
          ],
          steeringFiles: [
            {
              filename: 'test-steering.md',
              inclusion: 'always' as const
            }
          ]
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Write manifest
      await fs.writeJson(path.join(bundleDir, 'manifest.json'), manifest, { spaces: 2 });

      // Create component directories and files
      await fs.ensureDir(path.join(bundleDir, 'mcp'));
      await fs.writeFile(path.join(bundleDir, 'mcp', 'server.js'), 'console.log("test");');
      
      await fs.ensureDir(path.join(bundleDir, 'steering'));
      await fs.writeFile(path.join(bundleDir, 'steering', 'test-steering.md'), '# Test Steering');

      // Mock console.log to suppress output
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Execute package command with output directory
      await packageCmd.execute([bundleDir], { output: testDir });

      // Verify ZIP file was created
      const zipPath = path.join(testDir, 'test-bundle-1.0.0.zip');
      expect(await fs.pathExists(zipPath)).toBe(true);

      // Verify ZIP contents using adm-zip
      const zip = new AdmZip(zipPath);
      const zipEntries = zip.getEntries();
      const entryNames = zipEntries.map(entry => entry.entryName);

      expect(entryNames).toContain('manifest.json');
      expect(entryNames.some(name => name.startsWith('mcp/'))).toBe(true);
      expect(entryNames.some(name => name.startsWith('steering/'))).toBe(true);

      consoleLogSpy.mockRestore();
    });

    it('should fail if bundle directory does not exist', async () => {
      const nonExistentDir = path.join(testDir, 'non-existent');
      
      // Mock process.exit to prevent test from exiting
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      try {
        await packageCmd.execute([nonExistentDir], {});
      } catch (error) {
        // Catch any errors that might be thrown
      }

      expect(exitSpy).toHaveBeenCalledWith(1);
      expect(consoleErrorSpy).toHaveBeenCalled();

      exitSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('should fail if manifest.json is missing', async () => {
      // Create bundle directory without manifest
      await fs.ensureDir(bundleDir);

      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await packageCmd.execute([bundleDir], { output: testDir });

      expect(exitSpy).toHaveBeenCalledWith(1);
      expect(consoleErrorSpy).toHaveBeenCalled();

      exitSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('should fail if manifest.json has invalid JSON', async () => {
      // Write invalid JSON
      await fs.writeFile(path.join(bundleDir, 'manifest.json'), '{ invalid json }');

      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await packageCmd.execute([bundleDir], { output: testDir });

      expect(exitSpy).toHaveBeenCalledWith(1);
      expect(consoleErrorSpy).toHaveBeenCalled();

      exitSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('should fail if referenced files are missing', async () => {
      const manifest = {
        id: 'test-bundle',
        name: 'Test Bundle',
        version: '1.0.0',
        description: 'A test bundle',
        longDescription: 'A detailed test bundle description',
        author: {
          name: 'Test Author'
        },
        tags: ['test'],
        categories: ['testing'],
        components: {
          steeringFiles: [
            {
              filename: 'missing-file.md',
              inclusion: 'always' as const
            }
          ]
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await fs.writeJson(path.join(bundleDir, 'manifest.json'), manifest, { spaces: 2 });

      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await packageCmd.execute([bundleDir], { output: testDir });

      expect(exitSpy).toHaveBeenCalledWith(1);
      expect(consoleErrorSpy).toHaveBeenCalled();

      exitSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('should include README.md in the ZIP if it exists', async () => {
      const manifest = {
        id: 'test-bundle',
        name: 'Test Bundle',
        version: '1.0.0',
        description: 'A test bundle',
        longDescription: 'A detailed test bundle description',
        author: {
          name: 'Test Author'
        },
        tags: ['test'],
        categories: ['testing'],
        components: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await fs.writeJson(path.join(bundleDir, 'manifest.json'), manifest, { spaces: 2 });
      await fs.writeFile(path.join(bundleDir, 'README.md'), '# Test Bundle');

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await packageCmd.execute([bundleDir], { output: testDir });

      const zipPath = path.join(testDir, 'test-bundle-1.0.0.zip');
      const zip = new AdmZip(zipPath);
      const entryNames = zip.getEntries().map(entry => entry.entryName);

      expect(entryNames).toContain('README.md');

      consoleLogSpy.mockRestore();
    });

    it('should use current directory as default bundle path', async () => {
      // Create manifest in test directory
      const manifest = {
        id: 'test-bundle',
        name: 'Test Bundle',
        version: '1.0.0',
        description: 'A test bundle',
        longDescription: 'A detailed test bundle description',
        author: {
          name: 'Test Author'
        },
        tags: ['test'],
        categories: ['testing'],
        components: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await fs.writeJson(path.join(bundleDir, 'manifest.json'), manifest, { spaces: 2 });

      // Mock process.cwd to return bundleDir
      const originalCwd = process.cwd;
      process.cwd = () => bundleDir;

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await packageCmd.execute([], { output: testDir });

      const zipPath = path.join(testDir, 'test-bundle-1.0.0.zip');
      expect(await fs.pathExists(zipPath)).toBe(true);

      consoleLogSpy.mockRestore();
      process.cwd = originalCwd;
    });
  });
});
