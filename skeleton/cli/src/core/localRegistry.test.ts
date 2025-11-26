import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LocalRegistry } from './localRegistry';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import { InstalledBundle } from '../../../shared/types/bundle';

// Mock os module
vi.mock('os', async () => {
  const actual = await vi.importActual<typeof os>('os');
  return {
    ...actual,
    homedir: vi.fn()
  };
});

describe('LocalRegistry', () => {
  let registry: LocalRegistry;
  let testRegistryDir: string;

  beforeEach(async () => {
    // Create a temporary directory for testing
    testRegistryDir = path.join(os.tmpdir(), `kiro-agent-test-${Date.now()}`);
    
    // Mock os.homedir to use test directory
    vi.mocked(os.homedir).mockReturnValue(testRegistryDir);
    
    registry = new LocalRegistry();
  });

  afterEach(async () => {
    // Clean up test directory
    await fs.remove(testRegistryDir);
    vi.clearAllMocks();
  });

  it('should initialize empty registry', async () => {
    const installed = await registry.getInstalled();
    expect(installed).toEqual([]);
  });

  it('should add installed bundle', async () => {
    const bundle: InstalledBundle = {
      id: 'test-bundle',
      version: '1.0.0',
      installedAt: new Date().toISOString(),
      components: {
        mcpServers: ['test-server'],
        steeringFiles: ['test.md'],
        hooks: ['test-hook'],
        specTemplates: ['test-template']
      }
    };

    await registry.addInstalled(bundle);
    const installed = await registry.getInstalled();
    
    expect(installed).toHaveLength(1);
    expect(installed[0]).toEqual(bundle);
  });

  it('should check if bundle is installed', async () => {
    const bundle: InstalledBundle = {
      id: 'test-bundle',
      version: '1.0.0',
      installedAt: new Date().toISOString(),
      components: {
        mcpServers: [],
        steeringFiles: [],
        hooks: [],
        specTemplates: []
      }
    };

    // Add bundle first to ensure registry is initialized
    await registry.addInstalled(bundle);
    
    expect(await registry.isInstalled('test-bundle')).toBe(true);
    expect(await registry.isInstalled('other-bundle')).toBe(false);
    
    // Remove and check again
    await registry.removeInstalled('test-bundle');
    expect(await registry.isInstalled('test-bundle')).toBe(false);
  });

  it('should remove installed bundle', async () => {
    const bundle: InstalledBundle = {
      id: 'test-bundle',
      version: '1.0.0',
      installedAt: new Date().toISOString(),
      components: {
        mcpServers: [],
        steeringFiles: [],
        hooks: [],
        specTemplates: []
      }
    };

    await registry.addInstalled(bundle);
    expect(await registry.isInstalled('test-bundle')).toBe(true);
    
    await registry.removeInstalled('test-bundle');
    expect(await registry.isInstalled('test-bundle')).toBe(false);
  });

  it('should replace bundle on reinstall', async () => {
    const bundle1: InstalledBundle = {
      id: 'test-bundle',
      version: '1.0.0',
      installedAt: '2024-01-01T00:00:00Z',
      components: {
        mcpServers: ['server1'],
        steeringFiles: [],
        hooks: [],
        specTemplates: []
      }
    };

    const bundle2: InstalledBundle = {
      id: 'test-bundle',
      version: '2.0.0',
      installedAt: '2024-01-02T00:00:00Z',
      components: {
        mcpServers: ['server2'],
        steeringFiles: [],
        hooks: [],
        specTemplates: []
      }
    };

    await registry.addInstalled(bundle1);
    await registry.addInstalled(bundle2);
    
    const installed = await registry.getInstalled();
    expect(installed).toHaveLength(1);
    expect(installed[0].version).toBe('2.0.0');
    expect(installed[0].components.mcpServers).toEqual(['server2']);
  });

  it('should get specific installed bundle', async () => {
    const bundle: InstalledBundle = {
      id: 'test-bundle',
      version: '1.0.0',
      installedAt: new Date().toISOString(),
      components: {
        mcpServers: [],
        steeringFiles: [],
        hooks: [],
        specTemplates: []
      }
    };

    await registry.addInstalled(bundle);
    
    const retrieved = await registry.getInstalledBundle('test-bundle');
    expect(retrieved).toEqual(bundle);
    
    const notFound = await registry.getInstalledBundle('non-existent');
    expect(notFound).toBeNull();
  });
});
