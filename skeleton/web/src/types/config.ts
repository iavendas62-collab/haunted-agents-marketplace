export interface AppConfig {
  branding: {
    name: string;
    logo: string;
    primaryColor: string;
    secondaryColor?: string;
    tagline: string;
    footer?: {
      links: Array<{
        text: string;
        url: string;
      }>;
    };
  };
  
  registry: {
    url: string;
    agentsFile: string;
  };
  
  categories: Array<{
    id: string;
    name: string;
    icon: string;
    description?: string;
  }>;
  
  featured: string[];
  bundles: BundleManifest[];
}

export interface BrandingConfig {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor?: string;
  tagline: string;
  footer?: {
    links: Array<{
      text: string;
      url: string;
    }>;
  };
}

export interface CategoriesConfig {
  categories: Array<{
    id: string;
    name: string;
    icon: string;
    description?: string;
  }>;
}

import type { BundleManifest } from '../../../shared/types/bundle';

export interface AgentsConfig {
  version: string;
  featured: string[];
  bundles: BundleManifest[];
}
