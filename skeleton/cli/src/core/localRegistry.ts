import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import { InstalledBundle } from '../../../shared/types/bundle';

/**
 * Local Registry Data Structure
 */
interface LocalRegistryData {
  version: string;
  installed: InstalledBundle[];
}

/**
 * LocalRegistry manages the local installation registry
 * Stored at ~/.kiro-agent/registry.json
 */
export class LocalRegistry {
  private registryPath: string;
  private registryDir: string;

  constructor() {
    this.registryDir = path.join(os.homedir(), '.kiro-agent');
    this.registryPath = path.join(this.registryDir, 'registry.json');
  }

  /**
   * Initialize the registry file if it doesn't exist
   */
  private async ensureRegistry(): Promise<void> {
    await fs.ensureDir(this.registryDir);
    
    if (!await fs.pathExists(this.registryPath)) {
      const initialData: LocalRegistryData = {
        version: '1.0.0',
        installed: []
      };
      await fs.writeJson(this.registryPath, initialData, { spaces: 2 });
    }
  }

  /**
   * Read the registry data
   */
  private async readRegistry(): Promise<LocalRegistryData> {
    await this.ensureRegistry();
    return await fs.readJson(this.registryPath);
  }

  /**
   * Write the registry data
   */
  private async writeRegistry(data: LocalRegistryData): Promise<void> {
    await fs.writeJson(this.registryPath, data, { spaces: 2 });
  }

  /**
   * Get all installed bundles
   */
  async getInstalled(): Promise<InstalledBundle[]> {
    const data = await this.readRegistry();
    return data.installed;
  }

  /**
   * Add an installed bundle to the registry
   */
  async addInstalled(bundle: InstalledBundle): Promise<void> {
    const data = await this.readRegistry();
    
    // Remove existing entry if present (for reinstalls)
    data.installed = data.installed.filter(b => b.id !== bundle.id);
    
    // Add new entry
    data.installed.push(bundle);
    
    await this.writeRegistry(data);
  }

  /**
   * Remove an installed bundle from the registry
   */
  async removeInstalled(bundleId: string): Promise<void> {
    const data = await this.readRegistry();
    data.installed = data.installed.filter(b => b.id !== bundleId);
    await this.writeRegistry(data);
  }

  /**
   * Check if a bundle is installed
   */
  async isInstalled(bundleId: string): Promise<boolean> {
    const data = await this.readRegistry();
    return data.installed.some(b => b.id === bundleId);
  }

  /**
   * Get a specific installed bundle
   */
  async getInstalledBundle(bundleId: string): Promise<InstalledBundle | null> {
    const data = await this.readRegistry();
    return data.installed.find(b => b.id === bundleId) || null;
  }
}
