import type { AppConfig, BrandingConfig, CategoriesConfig, AgentsConfig } from '../types/config';

/**
 * Load configuration from JSON files
 * This function reads branding.json, categories.json, and agents.json
 * from the config directory and combines them into a single AppConfig object
 */
export async function loadConfig(configPath: string = '/config'): Promise<AppConfig> {
  try {
    // Load branding configuration
    const brandingResponse = await fetch(`${configPath}/branding.json`);
    if (!brandingResponse.ok) {
      throw new Error(`Failed to load branding.json: ${brandingResponse.statusText}`);
    }
    const branding: BrandingConfig = await brandingResponse.json();

    // Load categories configuration
    const categoriesResponse = await fetch(`${configPath}/categories.json`);
    if (!categoriesResponse.ok) {
      throw new Error(`Failed to load categories.json: ${categoriesResponse.statusText}`);
    }
    const categoriesData: CategoriesConfig = await categoriesResponse.json();

    // Load agents configuration
    const agentsResponse = await fetch(`${configPath}/agents.json`);
    if (!agentsResponse.ok) {
      throw new Error(`Failed to load agents.json: ${agentsResponse.statusText}`);
    }
    const agentsData: AgentsConfig = await agentsResponse.json();

    // Combine into AppConfig
    const config: AppConfig = {
      branding,
      registry: {
        url: `${configPath}/agents.json`,
        agentsFile: 'agents.json'
      },
      categories: categoriesData.categories,
      featured: agentsData.featured,
      bundles: agentsData.bundles
    };

    return config;
  } catch (error) {
    console.error('Error loading configuration:', error);
    throw error;
  }
}

/**
 * Get the configuration path based on environment
 * In development, this might be a local path
 * In production, this would be the deployed URL
 */
export function getConfigPath(): string {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    return '/config';
  }
  
  // In production, use environment variable or default to /config
  return import.meta.env.VITE_CONFIG_PATH || '/config';
}
