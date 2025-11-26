import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ValidateCommand } from './validate';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import { BundleManifest } from '../../../shared/types/bundle';

describe('ValidateCommand', () => {
  let validateCmd: ValidateCommand;
  let tempDir: string;
  let consoleLogSpy: any;
  let consoleErrorSpy: any;
  let processExitSpy: any;

  beforeEach(async () => {
    validateCmd = new ValidateCommand();
    tempDir = path.join(os.tmpdir(), `validate-test-${Date.now()}`);
    await fs.ensureDir(tempDir);
    
    // Spy on console methods
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    processExitSpy = vi.spyOn(process, 'exit').mockImplementation((code?: any) => {
      throw new Error(`process.exit(${code})`);
    });
  });

  afterEach(async () => {
    await fs.remove(tempDir);
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  /**
   * Helper to create a valid test bundle
   */
  async function createValidBundle(bundlePath: string): Promise<BundleManifest> {
    const manifest: BundleManifest = {
      id: 'test-bundle',
      name: 'Test Bundle',
      version: '1.0.0',
      description: 'A test bundle for validation',
      longDescription: 'This is a longer description of the test bundle.',
      author: {
        name: 'Test Author',
        email: 'test@example.com',
      },
      tags: ['test', 'validation'],
      categories: ['testing'],
      components: {
        mcpServers: [
          {
            name: 'test-server',
            command: 'uvx',
            args: ['test-package@latest'],
          },
        ],
        steeringFiles: [
          {
            filename: 'test-steering.md',
            inclusion: 'always',
          },
        ],
        hooks: [
          {
            name: 'test-hook',
            trigger: 'on_save',
            action: 'message',
            content: 'Test hook message',
          },
        ],
        specTemplates: [
          {
            name: 'test-template',
            type: 'requirements',
            filename: 'test-template.md',
          },
        ],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Create manifest file
    await fs.writeJson(path.join(bundlePath, 'manifest.json'), manifest, { spaces: 2 });

    // Create component directories and files
    await fs.ensureDir(path.join(bundlePath, 'mcp'));
    await fs.ensureDir(path.join(bundlePath, 'steering'));
    await fs.writeFile(
      path.join(bundlePath, 'steering', 'test-steering.md'),
      '# Test Steering File'
    );
    await fs.ensureDir(path.join(bundlePath, 'hooks'));
    await fs.ensureDir(path.join(bundlePath, 'specs'));
    await fs.writeFile(
      path.join(bundlePath, 'specs', 'test-template.md'),
      '# Test Template'
    );

    return manifest;
  }

  describe('execute', () => {
    it('should validate a valid bundle successfully', async () => {
      await createValidBundle(tempDir);

      await validateCmd.execute([tempDir], {});

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Validating bundle')
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Bundle validation successful')
      );
      expect(processExitSpy).not.toHaveBeenCalled();
    });

    it('should use current directory if no path provided', async () => {
      const originalCwd = process.cwd();
      vi.spyOn(process, 'cwd').mockReturnValue(tempDir);

      await createValidBundle(tempDir);

      await validateCmd.execute([], {});

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Bundle validation successful')
      );

      vi.spyOn(process, 'cwd').mockReturnValue(originalCwd);
    });

    it('should fail if directory does not exist', async () => {
      const nonExistentPath = path.join(tempDir, 'non-existent');

      await expect(async () => {
        await validateCmd.execute([nonExistentPath], {});
      }).rejects.toThrow('process.exit(1)');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('does not exist')
      );
    });

    it('should fail if path is not a directory', async () => {
      const filePath = path.join(tempDir, 'test-file.txt');
      await fs.writeFile(filePath, 'test content');

      await expect(async () => {
        await validateCmd.execute([filePath], {});
      }).rejects.toThrow('process.exit(1)');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('is not a directory')
      );
    });

    it('should fail if manifest.json is missing', async () => {
      // Create empty directory without manifest
      await fs.ensureDir(tempDir);

      await expect(async () => {
        await validateCmd.execute([tempDir], {});
      }).rejects.toThrow('process.exit(1)');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Validation failed')
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('manifest.json not found')
      );
    });

    it('should fail if manifest.json has invalid JSON', async () => {
      await fs.writeFile(
        path.join(tempDir, 'manifest.json'),
        '{ invalid json }'
      );

      await expect(async () => {
        await validateCmd.execute([tempDir], {});
      }).rejects.toThrow('process.exit(1)');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Invalid JSON')
      );
    });

    it('should fail if manifest is missing required fields', async () => {
      const invalidManifest = {
        id: 'test-bundle',
        name: 'Test Bundle',
        // Missing version and other required fields
      };

      await fs.writeJson(path.join(tempDir, 'manifest.json'), invalidManifest);

      await expect(async () => {
        await validateCmd.execute([tempDir], {});
      }).rejects.toThrow('process.exit(1)');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Validation failed')
      );
    });

    it('should fail if referenced steering file does not exist', async () => {
      const manifest: BundleManifest = {
        id: 'test-bundle',
        name: 'Test Bundle',
        version: '1.0.0',
        description: 'A test bundle for validation',
        longDescription: 'This is a longer description of the test bundle that meets the minimum length requirement.',
        author: { name: 'Test' },
        tags: ['test'],
        categories: ['testing'],
        components: {
          steeringFiles: [
            {
              filename: 'missing-file.md',
              inclusion: 'always',
            },
          ],
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await fs.writeJson(path.join(tempDir, 'manifest.json'), manifest);
      await fs.ensureDir(path.join(tempDir, 'steering'));

      await expect(async () => {
        await validateCmd.execute([tempDir], {});
      }).rejects.toThrow('process.exit(1)');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Referenced files not found')
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('missing-file.md')
      );
    });

    it('should fail if referenced spec template does not exist', async () => {
      const manifest: BundleManifest = {
        id: 'test-bundle',
        name: 'Test Bundle',
        version: '1.0.0',
        description: 'A test bundle for validation',
        longDescription: 'This is a longer description of the test bundle that meets the minimum length requirement.',
        author: { name: 'Test' },
        tags: ['test'],
        categories: ['testing'],
        components: {
          specTemplates: [
            {
              name: 'missing-template',
              type: 'requirements',
              filename: 'missing-template.md',
            },
          ],
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await fs.writeJson(path.join(tempDir, 'manifest.json'), manifest);
      await fs.ensureDir(path.join(tempDir, 'specs'));

      await expect(async () => {
        await validateCmd.execute([tempDir], {});
      }).rejects.toThrow('process.exit(1)');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Referenced files not found')
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('missing-template.md')
      );
    });

    it('should display all validated components on success', async () => {
      await createValidBundle(tempDir);

      await validateCmd.execute([tempDir], {});

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Validated components')
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('MCP server(s)')
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('steering file(s)')
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('hook(s)')
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('spec template(s)')
      );
    });

    it('should handle bundle with no components', async () => {
      const manifest: BundleManifest = {
        id: 'empty-bundle',
        name: 'Empty Bundle',
        version: '1.0.0',
        description: 'A bundle with no components',
        longDescription: 'This is a longer description of the empty bundle that meets the minimum length requirement.',
        author: { name: 'Test' },
        tags: ['test'],
        categories: ['testing'],
        components: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await fs.writeJson(path.join(tempDir, 'manifest.json'), manifest);

      await validateCmd.execute([tempDir], {});

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Bundle validation successful')
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('No components defined')
      );
    });

    it('should check for mcp directory when MCP servers are defined', async () => {
      const manifest: BundleManifest = {
        id: 'test-bundle',
        name: 'Test Bundle',
        version: '1.0.0',
        description: 'A test bundle for validation',
        longDescription: 'This is a longer description of the test bundle that meets the minimum length requirement.',
        author: { name: 'Test' },
        tags: ['test'],
        categories: ['testing'],
        components: {
          mcpServers: [
            {
              name: 'test-server',
              command: 'uvx',
              args: ['test@latest'],
            },
          ],
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await fs.writeJson(path.join(tempDir, 'manifest.json'), manifest);
      // Don't create mcp directory

      await expect(async () => {
        await validateCmd.execute([tempDir], {});
      }).rejects.toThrow('process.exit(1)');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('mcp/ directory')
      );
    });

    it('should check for hooks directory when hooks are defined', async () => {
      const manifest: BundleManifest = {
        id: 'test-bundle',
        name: 'Test Bundle',
        version: '1.0.0',
        description: 'A test bundle for validation',
        longDescription: 'This is a longer description of the test bundle that meets the minimum length requirement.',
        author: { name: 'Test' },
        tags: ['test'],
        categories: ['testing'],
        components: {
          hooks: [
            {
              name: 'test-hook',
              trigger: 'on_save',
              action: 'message',
              content: 'Test',
            },
          ],
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await fs.writeJson(path.join(tempDir, 'manifest.json'), manifest);
      // Don't create hooks directory

      await expect(async () => {
        await validateCmd.execute([tempDir], {});
      }).rejects.toThrow('process.exit(1)');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('hooks/ directory')
      );
    });
  });
});
