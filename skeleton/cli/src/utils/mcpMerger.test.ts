import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MCPConfigMerger } from './mcpMerger';
import { MCPServerConfig } from '../../../shared/types/bundle';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

describe('MCPConfigMerger', () => {
  let tempDir: string;
  let mcpConfigPath: string;
  let merger: MCPConfigMerger;

  beforeEach(async () => {
    // Create a temporary directory for testing
    tempDir = path.join(os.tmpdir(), `mcp-merger-test-${Date.now()}`);
    await fs.ensureDir(tempDir);
    mcpConfigPath = path.join(tempDir, 'mcp.json');
    
    merger = new MCPConfigMerger();
  });

  afterEach(async () => {
    // Clean up temp directory
    await fs.remove(tempDir);
  });

  it('should create a new MCP config if none exists', async () => {
    const servers: MCPServerConfig[] = [
      {
        name: 'test-server',
        command: 'node',
        args: ['server.js']
      }
    ];

    await merger.mergeServers(mcpConfigPath, servers);

    expect(await fs.pathExists(mcpConfigPath)).toBe(true);
    
    const config = await fs.readJson(mcpConfigPath);
    expect(config.mcpServers['test-server']).toBeDefined();
    expect(config.mcpServers['test-server'].command).toBe('node');
  });

  it('should merge new servers into existing config', async () => {
    // Create initial config
    const initialConfig = {
      mcpServers: {
        'existing-server': {
          name: 'existing-server',
          command: 'python',
          args: ['existing.py']
        }
      }
    };
    await fs.writeJson(mcpConfigPath, initialConfig);

    // Merge new server
    const newServers: MCPServerConfig[] = [
      {
        name: 'new-server',
        command: 'node',
        args: ['new.js']
      }
    ];

    await merger.mergeServers(mcpConfigPath, newServers);

    const config = await fs.readJson(mcpConfigPath);
    expect(config.mcpServers['existing-server']).toBeDefined();
    expect(config.mcpServers['new-server']).toBeDefined();
  });

  it('should preserve environment variables when merging', async () => {
    const servers: MCPServerConfig[] = [
      {
        name: 'test-server',
        command: 'node',
        args: ['server.js'],
        env: {
          API_KEY: 'test-key',
          DEBUG: 'true'
        }
      }
    ];

    await merger.mergeServers(mcpConfigPath, servers);

    const config = await fs.readJson(mcpConfigPath);
    expect(config.mcpServers['test-server'].env).toBeDefined();
    expect(config.mcpServers['test-server'].env.API_KEY).toBe('test-key');
  });

  it('should handle invalid existing config gracefully', async () => {
    // Write invalid JSON
    await fs.writeFile(mcpConfigPath, 'invalid json {');

    const servers: MCPServerConfig[] = [
      {
        name: 'test-server',
        command: 'node',
        args: ['server.js']
      }
    ];

    // Should not throw, but create new config
    await merger.mergeServers(mcpConfigPath, servers);

    const config = await fs.readJson(mcpConfigPath);
    expect(config.mcpServers['test-server']).toBeDefined();
  });

  it('should remove servers from config', async () => {
    // Create initial config with multiple servers
    const initialConfig = {
      mcpServers: {
        'server-1': {
          name: 'server-1',
          command: 'node',
          args: ['s1.js']
        },
        'server-2': {
          name: 'server-2',
          command: 'node',
          args: ['s2.js']
        }
      }
    };
    await fs.writeJson(mcpConfigPath, initialConfig);

    // Remove one server
    await merger.removeServers(mcpConfigPath, ['server-1']);

    const config = await fs.readJson(mcpConfigPath);
    expect(config.mcpServers['server-1']).toBeUndefined();
    expect(config.mcpServers['server-2']).toBeDefined();
  });
});
