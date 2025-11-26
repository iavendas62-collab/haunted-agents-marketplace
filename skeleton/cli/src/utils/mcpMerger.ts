import * as fs from 'fs-extra';
import * as readline from 'readline';
import { MCPServerConfig } from '../../../shared/types/bundle';

/**
 * MCP Configuration Structure
 */
interface MCPConfig {
  mcpServers: Record<string, MCPServerConfig>;
}

/**
 * MCPConfigMerger handles merging MCP server configurations
 * 
 * **Validates: Requirements 4.1, 4.5**
 */
export class MCPConfigMerger {
  /**
   * Merge new MCP servers into existing configuration
   * 
   * @param mcpConfigPath - Path to mcp.json file
   * @param newServers - Array of new MCP server configurations
   */
  async mergeServers(
    mcpConfigPath: string,
    newServers: MCPServerConfig[]
  ): Promise<void> {
    // Read existing config or create new one
    let existingConfig: MCPConfig = { mcpServers: {} };
    
    if (await fs.pathExists(mcpConfigPath)) {
      try {
        existingConfig = await fs.readJson(mcpConfigPath);
        
        // Ensure mcpServers object exists
        if (!existingConfig.mcpServers) {
          existingConfig.mcpServers = {};
        }
      } catch (error) {
        // If file is invalid JSON, start fresh
        console.warn('Warning: Existing mcp.json is invalid, creating new configuration');
        existingConfig = { mcpServers: {} };
      }
    }

    // Merge new servers
    for (const server of newServers) {
      // Check for conflicts
      if (existingConfig.mcpServers[server.name]) {
        // Server already exists - prompt user
        const shouldOverwrite = await this.promptOverwrite(server.name, 'MCP server');
        
        if (!shouldOverwrite) {
          console.log(`Skipping MCP server '${server.name}'`);
          continue;
        }
      }

      // Add or overwrite server
      existingConfig.mcpServers[server.name] = {
        name: server.name,
        command: server.command,
        args: server.args,
        ...(server.env && { env: server.env })
      };
    }

    // Write updated config
    await fs.writeJson(mcpConfigPath, existingConfig, { spaces: 2 });
  }

  /**
   * Prompt user to overwrite existing configuration
   * 
   * @param name - Name of the conflicting item
   * @param type - Type of item (e.g., "MCP server")
   * @returns True if user wants to overwrite
   */
  private async promptOverwrite(name: string, type: string): Promise<boolean> {
    // In a non-interactive environment or for automated testing,
    // default to not overwriting
    if (!process.stdin.isTTY) {
      return false;
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question(
        `${type} '${name}' already exists. Overwrite? (y/n): `,
        (answer) => {
          rl.close();
          resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
        }
      );
    });
  }

  /**
   * Remove MCP servers from configuration
   * 
   * @param mcpConfigPath - Path to mcp.json file
   * @param serverNames - Array of server names to remove
   */
  async removeServers(
    mcpConfigPath: string,
    serverNames: string[]
  ): Promise<void> {
    if (!await fs.pathExists(mcpConfigPath)) {
      return; // Nothing to remove
    }

    const config: MCPConfig = await fs.readJson(mcpConfigPath);

    if (!config.mcpServers) {
      return;
    }

    // Remove servers
    for (const name of serverNames) {
      delete config.mcpServers[name];
    }

    // Write updated config
    await fs.writeJson(mcpConfigPath, config, { spaces: 2 });
  }
}
