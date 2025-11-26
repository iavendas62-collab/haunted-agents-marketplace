import axios, { AxiosInstance } from 'axios';
import * as fs from 'fs-extra';
import * as path from 'path';
import { BundleManifest } from '../../../shared/types/bundle';

/**
 * Remote Registry Data Structure
 */
interface RemoteRegistryData {
  version: string;
  featured?: string[];
  bundles: BundleManifest[];
}

/**
 * Registry client for fetching bundles from remote registry
 */
export class Registry {
  private client: AxiosInstance;
  private registryUrl: string;
  private maxRetries: number = 3;
  private retryDelays: number[] = [1000, 2000, 4000]; // Exponential backoff

  constructor(registryUrl: string = 'https://kiro-marketplace.vercel.app/config/agents.json') {
    this.registryUrl = registryUrl;
    this.client = axios.create({
      timeout: 30000, // 30 second timeout
      headers: {
        'User-Agent': 'kiro-agent-cli/1.0.0'
      }
    });
  }

  /**
   * Fetch bundle metadata from registry with retry logic
   */
  async fetchBundle(bundleId: string): Promise<BundleManifest> {
    const bundles = await this.listBundles();
    const bundle = bundles.find(b => b.id === bundleId);
    
    if (!bundle) {
      throw new Error(`Bundle '${bundleId}' not found in registry`);
    }
    
    return bundle;
  }

  /**
   * Download bundle archive to destination
   */
  async downloadBundle(bundleId: string, destination: string): Promise<void> {
    const bundle = await this.fetchBundle(bundleId);
    
    // In a real implementation, this would download from bundle.downloadUrl
    // For now, we'll throw an error if downloadUrl is not present
    const downloadUrl = (bundle as any).downloadUrl;
    
    if (!downloadUrl) {
      throw new Error(`Bundle '${bundleId}' does not have a download URL`);
    }

    await this.downloadWithRetry(downloadUrl, destination);
  }

  /**
   * Get all available bundles from registry
   */
  async listBundles(): Promise<BundleManifest[]> {
    const data = await this.fetchRegistryData();
    return data.bundles;
  }

  /**
   * Search bundles by query string
   * Searches in name, description, tags, and categories
   */
  async searchBundles(query: string): Promise<BundleManifest[]> {
    const bundles = await this.listBundles();
    const lowerQuery = query.toLowerCase();
    
    return bundles.filter(bundle => {
      // Search in name
      if (bundle.name.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Search in description
      if (bundle.description.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Search in tags
      if (bundle.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
        return true;
      }
      
      // Search in categories
      if (bundle.categories.some(cat => cat.toLowerCase().includes(lowerQuery))) {
        return true;
      }
      
      return false;
    });
  }

  /**
   * Fetch registry data with retry logic
   */
  private async fetchRegistryData(): Promise<RemoteRegistryData> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const response = await this.client.get<RemoteRegistryData>(this.registryUrl);
        return response.data;
      } catch (error) {
        lastError = error as Error;
        
        // If this is not the last attempt, wait before retrying
        if (attempt < this.maxRetries - 1) {
          await this.delay(this.retryDelays[attempt]);
        }
      }
    }
    
    // All retries failed
    throw new Error(
      `Unable to connect to registry. Please check your internet connection.\n` +
      `Error: ${lastError?.message || 'Unknown error'}`
    );
  }

  /**
   * Download file with retry logic
   */
  private async downloadWithRetry(url: string, destination: string): Promise<void> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const response = await this.client.get(url, {
          responseType: 'stream'
        });
        
        // Ensure destination directory exists
        await fs.ensureDir(path.dirname(destination));
        
        // Stream to file
        const writer = fs.createWriteStream(destination);
        response.data.pipe(writer);
        
        return new Promise((resolve, reject) => {
          writer.on('finish', () => resolve());
          writer.on('error', reject);
        });
      } catch (error) {
        lastError = error as Error;
        
        // If this is not the last attempt, wait before retrying
        if (attempt < this.maxRetries - 1) {
          await this.delay(this.retryDelays[attempt]);
        }
      }
    }
    
    // All retries failed
    throw new Error(
      `Failed to download bundle after ${this.maxRetries} attempts.\n` +
      `Error: ${lastError?.message || 'Unknown error'}`
    );
  }

  /**
   * Delay helper for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Set custom registry URL
   */
  setRegistryUrl(url: string): void {
    this.registryUrl = url;
  }

  /**
   * Get current registry URL
   */
  getRegistryUrl(): string {
    return this.registryUrl;
  }
}
