import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CreateCommand } from './create';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

describe('CreateCommand', () => {
  let createCmd: CreateCommand;
  let testDir: string;

  beforeEach(() => {
    createCmd = new CreateCommand();
    // Create a unique test directory
    testDir = path.join(os.tmpdir(), `test-create-${Date.now()}`);
  });

  afterEach(async () => {
    // Cleanup test directory
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir);
    }
  });

  describe('execute', () => {
    it('should create bundle directory structure', async () => {
      const bundleName = 'Test Bundle';
      const bundleId = 'test-bundle';
      const outputDir = path.join(testDir, bundleId);

      await createCmd.execute([bundleName], { output: outputDir });

      // Check directory structure
      expect(await fs.pathExists(outputDir)).toBe(true);
      expect(await fs.pathExists(path.join(outputDir, 'mcp'))).toBe(true);
      expect(await fs.pathExists(path.join(outputDir, 'steering'))).toBe(true);
      expect(await fs.pathExists(path.join(outputDir, 'hooks'))).toBe(true);
      expect(await fs.pathExists(path.join(outputDir, 'specs'))).toBe(true);
    });

    it('should generate manifest.json with required fields', async () => {
      const bundleName = 'Test Bundle';
      const bundleId = 'test-bundle';
      const outputDir = path.join(testDir, bundleId);

      await createCmd.execute([bundleName], { output: outputDir });

      const manifestPath = path.join(outputDir, 'manifest.json');
      expect(await fs.pathExists(manifestPath)).toBe(true);

      const manifest = await fs.readJson(manifestPath);
      
      // Check required fields
      expect(manifest.id).toBe(bundleId);
      expect(manifest.name).toBe(bundleName);
      expect(manifest.version).toBe('1.0.0');
      expect(manifest.description).toBeDefined();
      expect(manifest.longDescription).toBeDefined();
      expect(manifest.author).toBeDefined();
      expect(manifest.author.name).toBeDefined();
      expect(manifest.tags).toBeInstanceOf(Array);
      expect(manifest.categories).toBeInstanceOf(Array);
      expect(manifest.components).toBeDefined();
      expect(manifest.createdAt).toBeDefined();
      expect(manifest.updatedAt).toBeDefined();
    });

    it('should create example MCP server config', async () => {
      const bundleName = 'Test Bundle';
      const bundleId = 'test-bundle';
      const outputDir = path.join(testDir, bundleId);

      await createCmd.execute([bundleName], { output: outputDir });

      const mcpPath = path.join(outputDir, 'mcp', 'example-server.json');
      expect(await fs.pathExists(mcpPath)).toBe(true);

      const mcpConfig = await fs.readJson(mcpPath);
      expect(mcpConfig.name).toBeDefined();
      expect(mcpConfig.command).toBeDefined();
      expect(mcpConfig.args).toBeInstanceOf(Array);
    });

    it('should create example steering file', async () => {
      const bundleName = 'Test Bundle';
      const bundleId = 'test-bundle';
      const outputDir = path.join(testDir, bundleId);

      await createCmd.execute([bundleName], { output: outputDir });

      const steeringPath = path.join(outputDir, 'steering', 'example-steering.md');
      expect(await fs.pathExists(steeringPath)).toBe(true);

      const content = await fs.readFile(steeringPath, 'utf-8');
      expect(content).toContain('# Example Steering File');
    });

    it('should create example hook', async () => {
      const bundleName = 'Test Bundle';
      const bundleId = 'test-bundle';
      const outputDir = path.join(testDir, bundleId);

      await createCmd.execute([bundleName], { output: outputDir });

      const hookPath = path.join(outputDir, 'hooks', 'example-hook.json');
      expect(await fs.pathExists(hookPath)).toBe(true);

      const hookConfig = await fs.readJson(hookPath);
      expect(hookConfig.name).toBeDefined();
      expect(hookConfig.trigger).toBeDefined();
      expect(hookConfig.action).toBeDefined();
      expect(hookConfig.content).toBeDefined();
    });

    it('should create example spec template', async () => {
      const bundleName = 'Test Bundle';
      const bundleId = 'test-bundle';
      const outputDir = path.join(testDir, bundleId);

      await createCmd.execute([bundleName], { output: outputDir });

      const specPath = path.join(outputDir, 'specs', 'requirements-template.md');
      expect(await fs.pathExists(specPath)).toBe(true);

      const content = await fs.readFile(specPath, 'utf-8');
      expect(content).toContain('# Requirements Template');
    });

    it('should create README.md', async () => {
      const bundleName = 'Test Bundle';
      const bundleId = 'test-bundle';
      const outputDir = path.join(testDir, bundleId);

      await createCmd.execute([bundleName], { output: outputDir });

      const readmePath = path.join(outputDir, 'README.md');
      expect(await fs.pathExists(readmePath)).toBe(true);

      const content = await fs.readFile(readmePath, 'utf-8');
      expect(content).toContain(`# ${bundleName}`);
    });

    it('should convert bundle name to kebab-case for ID', async () => {
      const bundleName = 'My Awesome Bundle';
      const expectedId = 'my-awesome-bundle';
      const outputDir = path.join(testDir, expectedId);

      await createCmd.execute([bundleName], { output: outputDir });

      const manifestPath = path.join(outputDir, 'manifest.json');
      const manifest = await fs.readJson(manifestPath);
      
      expect(manifest.id).toBe(expectedId);
    });

    it('should fail if directory already exists', async () => {
      const bundleName = 'Test Bundle';
      const bundleId = 'test-bundle';
      const outputDir = path.join(testDir, bundleId);

      // Create directory first
      await fs.ensureDir(outputDir);

      // Mock process.exit to prevent test from exiting
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called');
      });

      await expect(createCmd.execute([bundleName], { output: outputDir }))
        .rejects.toThrow('process.exit called');

      exitSpy.mockRestore();
    });

    it('should fail if bundle name is not provided', async () => {
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called');
      });

      await expect(createCmd.execute([], {}))
        .rejects.toThrow('process.exit called');

      exitSpy.mockRestore();
    });
  });
});
