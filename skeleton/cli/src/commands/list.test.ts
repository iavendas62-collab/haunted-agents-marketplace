import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ListCommand } from './list';
import { LocalRegistry } from '../core/localRegistry';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

// Mock os module
vi.mock('os', async () => {
  const actual = await vi.importActual<typeof os>('os');
  return {
    ...actual,
    homedir: vi.fn()
  };
});

describe('ListCommand', () => {
  let listCmd: ListCommand;
  let testRegistryDir: string;

  beforeEach(() => {
    // Create a temporary directory for testing
    testRegistryDir = path.join(os.tmpdir(), `kiro-agent-test-${Date.now()}`);
    
    // Mock os.homedir to use test directory
    vi.mocked(os.homedir).mockReturnValue(testRegistryDir);

    listCmd = new ListCommand();
  });

  afterEach(async () => {
    // Cleanup
    await fs.remove(testRegistryDir);
    vi.clearAllMocks();
  });

  describe('Empty installed list', () => {
    it('should display helpful message when no agents are installed', async () => {
      // Capture console output
      const consoleLogs: string[] = [];
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        consoleLogs.push(args.join(' '));
      };

      await listCmd.execute([], {});

      // Restore console.log
      console.log = originalLog;

      // Verify the output contains expected messages
      const output = consoleLogs.join('\n');
      expect(output).toContain('No agents installed yet');
      expect(output).toContain('marketplace');
      expect(output).toContain('kiro-agent install');
    });

    it('should include marketplace link in empty message', async () => {
      const consoleLogs: string[] = [];
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        consoleLogs.push(args.join(' '));
      };

      await listCmd.execute([], {});

      console.log = originalLog;

      const output = consoleLogs.join('\n');
      expect(output).toMatch(/https?:\/\//); // Should contain a URL
    });
  });

  describe('List installed bundles', () => {
    it('should display installed bundles with names and versions', async () => {
      // Add a test bundle to the registry
      const localRegistry = new LocalRegistry();
      await localRegistry.addInstalled({
        id: 'test-bundle',
        version: '1.0.0',
        installedAt: '2025-11-24T10:00:00Z',
        components: {
          mcpServers: ['test-mcp'],
          steeringFiles: ['test-steering.md'],
          hooks: ['test-hook'],
          specTemplates: ['test-spec']
        }
      });

      const consoleLogs: string[] = [];
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        consoleLogs.push(args.join(' '));
      };

      await listCmd.execute([], {});

      console.log = originalLog;

      const output = consoleLogs.join('\n');
      expect(output).toContain('test-bundle');
      expect(output).toContain('1.0.0');
    });

    it('should display installation dates in ISO 8601 format', async () => {
      const localRegistry = new LocalRegistry();
      const installDate = '2025-11-24T10:30:00Z';
      await localRegistry.addInstalled({
        id: 'test-bundle',
        version: '1.0.0',
        installedAt: installDate,
        components: {
          mcpServers: [],
          steeringFiles: [],
          hooks: [],
          specTemplates: []
        }
      });

      const consoleLogs: string[] = [];
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        consoleLogs.push(args.join(' '));
      };

      await listCmd.execute([], {});

      console.log = originalLog;

      const output = consoleLogs.join('\n');
      // Check for ISO 8601 format (with or without milliseconds)
      expect(output).toMatch(/2025-11-24T10:30:00(\.000)?Z/);
    });

    it('should indicate active components', async () => {
      const localRegistry = new LocalRegistry();
      await localRegistry.addInstalled({
        id: 'test-bundle',
        version: '1.0.0',
        installedAt: '2025-11-24T10:00:00Z',
        components: {
          mcpServers: ['supabase-mcp', 'stripe-mcp'],
          steeringFiles: ['react-patterns.md'],
          hooks: ['test-on-save'],
          specTemplates: ['api-spec']
        }
      });

      const consoleLogs: string[] = [];
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        consoleLogs.push(args.join(' '));
      };

      await listCmd.execute([], {});

      console.log = originalLog;

      const output = consoleLogs.join('\n');
      expect(output).toContain('MCP Servers');
      expect(output).toContain('supabase-mcp');
      expect(output).toContain('stripe-mcp');
      expect(output).toContain('Steering Files');
      expect(output).toContain('react-patterns.md');
      expect(output).toContain('Hooks');
      expect(output).toContain('test-on-save');
      expect(output).toContain('Spec Templates');
      expect(output).toContain('api-spec');
    });

    it('should display multiple installed bundles', async () => {
      const localRegistry = new LocalRegistry();
      
      // Ensure registry is initialized first
      await localRegistry.getInstalled();
      
      await localRegistry.addInstalled({
        id: 'bundle-1',
        version: '1.0.0',
        installedAt: '2025-11-24T10:00:00Z',
        components: {
          mcpServers: [],
          steeringFiles: [],
          hooks: [],
          specTemplates: []
        }
      });
      await localRegistry.addInstalled({
        id: 'bundle-2',
        version: '2.0.0',
        installedAt: '2025-11-24T11:00:00Z',
        components: {
          mcpServers: [],
          steeringFiles: [],
          hooks: [],
          specTemplates: []
        }
      });

      const consoleLogs: string[] = [];
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        consoleLogs.push(args.join(' '));
      };

      await listCmd.execute([], {});

      console.log = originalLog;

      const output = consoleLogs.join('\n');
      expect(output).toContain('bundle-1');
      expect(output).toContain('bundle-2');
      expect(output).toContain('Installed Agents (2)');
    });
  });
});
