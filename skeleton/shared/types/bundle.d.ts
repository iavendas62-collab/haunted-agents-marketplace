/**
 * Bundle Manifest Types
 *
 * These types define the structure of agent bundles in the Haunted Agents Marketplace.
 * They are used for validation, installation, and display of agent bundles.
 */
/**
 * MCP (Model Context Protocol) Server Configuration
 */
export interface MCPServerConfig {
    name: string;
    command: string;
    args: string[];
    env?: Record<string, string>;
}
/**
 * Steering File Configuration
 */
export interface SteeringFileConfig {
    filename: string;
    inclusion: 'always' | 'manual' | 'fileMatch';
    fileMatchPattern?: string;
}
/**
 * Hook Configuration
 */
export interface HookConfig {
    name: string;
    trigger: string;
    action: 'message' | 'command';
    content: string;
}
/**
 * Spec Template Configuration
 */
export interface SpecTemplateConfig {
    name: string;
    type: 'requirements' | 'design' | 'tasks';
    filename: string;
}
/**
 * Bundle Author Information
 */
export interface BundleAuthor {
    name: string;
    email?: string;
    url?: string;
}
/**
 * Bundle Components
 */
export interface BundleComponents {
    mcpServers?: MCPServerConfig[];
    steeringFiles?: SteeringFileConfig[];
    hooks?: HookConfig[];
    specTemplates?: SpecTemplateConfig[];
}
/**
 * Bundle Dependencies
 */
export interface BundleDependencies {
    external?: string[];
    kiroVersion?: string;
}
/**
 * Bundle Example Use Case
 */
export interface BundleExample {
    title: string;
    description: string;
    prompt?: string;
}
/**
 * Complete Bundle Manifest
 *
 * This is the main structure that describes an agent bundle.
 */
export interface BundleManifest {
    id: string;
    name: string;
    version: string;
    description: string;
    longDescription: string;
    author: BundleAuthor;
    tags: string[];
    categories: string[];
    previewImage?: string;
    components: BundleComponents;
    dependencies?: BundleDependencies;
    examples?: BundleExample[];
    createdAt: string;
    updatedAt: string;
}
/**
 * Installed Bundle Information
 *
 * Tracks locally installed bundles in the user's environment.
 */
export interface InstalledBundle {
    id: string;
    version: string;
    installedAt: string;
    components: {
        mcpServers: string[];
        steeringFiles: string[];
        hooks: string[];
        specTemplates: string[];
    };
}
/**
 * Installation Result
 *
 * Result of a bundle installation operation.
 */
export interface InstallResult {
    success: boolean;
    installedComponents: {
        mcpServers: number;
        steeringFiles: number;
        hooks: number;
        specTemplates: number;
    };
    errors?: string[];
}
//# sourceMappingURL=bundle.d.ts.map