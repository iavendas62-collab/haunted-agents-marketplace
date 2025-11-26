import * as fs from 'fs-extra';
import * as path from 'path';
import { BundleManifest, InstallResult, InstalledBundle } from '../../../shared/types/bundle';
import { LocalRegistry } from './localRegistry';
import { MCPConfigMerger } from '../utils/mcpMerger';

/**
 * Installer handles the installation of agent bundles
 * 
 * **Validates: Requirements 3.3, 4.1, 4.2, 4.3, 4.4**
 */
export class Installer {
  private localRegistry: LocalRegistry;
  private mcpMerger: MCPConfigMerger;

  constructor(localRegistry: LocalRegistry) {
    this.localRegistry = localRegistry;
    this.mcpMerger = new MCPConfigMerger();
  }

  /**
   * Install a bundle to the Kiro environment
   * 
   * @param bundle - Bundle manifest
   * @param bundlePath - Path to extracted bundle directory
   * @returns Installation result
   */
  async install(bundle: BundleManifest, bundlePath: string): Promise<InstallResult> {
    const errors: string[] = [];
    const installedComponents = {
      mcpServers: 0,
      steeringFiles: 0,
      hooks: 0,
      specTemplates: 0
    };

    try {
      // Verify we're in a Kiro workspace
      const kiroDir = this.findKiroDirectory();
      if (!kiroDir) {
        throw new Error(
          'Kiro configuration directory not found. ' +
          'Please run this command in a Kiro workspace.'
        );
      }

      // Install MCP servers
      if (bundle.components.mcpServers && bundle.components.mcpServers.length > 0) {
        try {
          const mcpCount = await this.installMCPServers(
            bundle.components.mcpServers,
            bundlePath,
            kiroDir
          );
          installedComponents.mcpServers = mcpCount;
        } catch (error) {
          errors.push(`MCP servers: ${(error as Error).message}`);
        }
      }

      // Install steering files
      if (bundle.components.steeringFiles && bundle.components.steeringFiles.length > 0) {
        try {
          const steeringCount = await this.installSteeringFiles(
            bundle.components.steeringFiles,
            bundlePath,
            kiroDir
          );
          installedComponents.steeringFiles = steeringCount;
        } catch (error) {
          errors.push(`Steering files: ${(error as Error).message}`);
        }
      }

      // Install hooks
      if (bundle.components.hooks && bundle.components.hooks.length > 0) {
        try {
          const hooksCount = await this.installHooks(
            bundle.components.hooks,
            bundlePath,
            kiroDir
          );
          installedComponents.hooks = hooksCount;
        } catch (error) {
          errors.push(`Hooks: ${(error as Error).message}`);
        }
      }

      // Install spec templates
      if (bundle.components.specTemplates && bundle.components.specTemplates.length > 0) {
        try {
          const specsCount = await this.installSpecTemplates(
            bundle.components.specTemplates,
            bundlePath,
            kiroDir
          );
          installedComponents.specTemplates = specsCount;
        } catch (error) {
          errors.push(`Spec templates: ${(error as Error).message}`);
        }
      }

      // Update local registry
      const installedBundle: InstalledBundle = {
        id: bundle.id,
        version: bundle.version,
        installedAt: new Date().toISOString(),
        components: {
          mcpServers: bundle.components.mcpServers?.map(s => s.name) || [],
          steeringFiles: bundle.components.steeringFiles?.map(s => s.filename) || [],
          hooks: bundle.components.hooks?.map(h => h.name) || [],
          specTemplates: bundle.components.specTemplates?.map(t => t.name) || []
        }
      };

      await this.localRegistry.addInstalled(installedBundle);

      return {
        success: errors.length === 0,
        installedComponents,
        errors: errors.length > 0 ? errors : undefined
      };

    } catch (error) {
      return {
        success: false,
        installedComponents,
        errors: [(error as Error).message]
      };
    }
  }

  /**
   * Install MCP server configurations
   * 
   * **Validates: Requirements 4.1**
   */
  private async installMCPServers(
    mcpServers: any[],
    bundlePath: string,
    kiroDir: string
  ): Promise<number> {
    const mcpDir = path.join(kiroDir, 'settings');
    await fs.ensureDir(mcpDir);

    const mcpConfigPath = path.join(mcpDir, 'mcp.json');

    // Merge MCP configurations
    await this.mcpMerger.mergeServers(mcpConfigPath, mcpServers);

    return mcpServers.length;
  }

  /**
   * Install steering files
   * 
   * **Validates: Requirements 4.2**
   */
  private async installSteeringFiles(
    steeringFiles: any[],
    bundlePath: string,
    kiroDir: string
  ): Promise<number> {
    const steeringDir = path.join(kiroDir, 'steering');
    await fs.ensureDir(steeringDir);

    let count = 0;
    for (const steeringFile of steeringFiles) {
      const sourcePath = path.join(bundlePath, 'steering', steeringFile.filename);
      const destPath = path.join(steeringDir, steeringFile.filename);

      // Check if file exists in bundle (for now, we'll skip if not found)
      if (await fs.pathExists(sourcePath)) {
        // Check if file already exists
        if (await fs.pathExists(destPath)) {
          // For now, skip existing files
          // In a real implementation, we would prompt the user
          continue;
        }

        await fs.copy(sourcePath, destPath);
        count++;
      }
    }

    return count;
  }

  /**
   * Install hooks
   * 
   * **Validates: Requirements 4.3**
   */
  private async installHooks(
    hooks: any[],
    bundlePath: string,
    kiroDir: string
  ): Promise<number> {
    const hooksDir = path.join(kiroDir, 'hooks');
    await fs.ensureDir(hooksDir);

    let count = 0;
    for (const hook of hooks) {
      const hookFilename = `${hook.name}.json`;
      const sourcePath = path.join(bundlePath, 'hooks', hookFilename);
      const destPath = path.join(hooksDir, hookFilename);

      // Check if file exists in bundle
      if (await fs.pathExists(sourcePath)) {
        // Check if file already exists
        if (await fs.pathExists(destPath)) {
          continue;
        }

        await fs.copy(sourcePath, destPath);
        count++;
      }
    }

    return count;
  }

  /**
   * Install spec templates
   * 
   * **Validates: Requirements 4.4**
   */
  private async installSpecTemplates(
    specTemplates: any[],
    bundlePath: string,
    kiroDir: string
  ): Promise<number> {
    const specsDir = path.join(kiroDir, 'specs', 'templates');
    await fs.ensureDir(specsDir);

    let count = 0;
    for (const template of specTemplates) {
      const sourcePath = path.join(bundlePath, 'specs', template.filename);
      const destPath = path.join(specsDir, template.filename);

      // Check if file exists in bundle
      if (await fs.pathExists(sourcePath)) {
        // Check if file already exists
        if (await fs.pathExists(destPath)) {
          continue;
        }

        await fs.copy(sourcePath, destPath);
        count++;
      }
    }

    return count;
  }

  /**
   * Find the .kiro directory in the current workspace
   * Searches current directory and parent directories
   */
  private findKiroDirectory(): string | null {
    let currentDir = process.cwd();
    const root = path.parse(currentDir).root;

    while (currentDir !== root) {
      const kiroDir = path.join(currentDir, '.kiro');
      if (fs.existsSync(kiroDir)) {
        return kiroDir;
      }
      currentDir = path.dirname(currentDir);
    }

    return null;
  }

  /**
   * Uninstall a bundle from the Kiro environment
   * 
   * @param bundleId - Bundle ID to uninstall
   */
  async uninstall(bundleId: string): Promise<void> {
    const installedBundle = await this.localRegistry.getInstalledBundle(bundleId);
    
    if (!installedBundle) {
      throw new Error(`Bundle '${bundleId}' is not installed`);
    }

    // Remove from local registry
    await this.localRegistry.removeInstalled(bundleId);

    // Note: We don't remove the actual files because they might be shared
    // or modified by the user. This is a design decision.
  }
}
