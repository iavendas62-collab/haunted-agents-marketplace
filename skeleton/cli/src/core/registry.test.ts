import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Registry } from './registry';
import axios from 'axios';
import { BundleManifest } from '../../../shared/types/bundle';

// Mock axios
vi.mock('axios');

describe('Registry', () => {
  let registry: Registry;
  let mockClient: any;
  
  const mockBundles: BundleManifest[] = [
    {
      id: 'react-expert',
      name: 'React Expert',
      version: '1.0.0',
      description: 'Expert in React development',
      longDescription: 'A comprehensive React development agent',
      author: { name: 'Test Author' },
      tags: ['react', 'frontend', 'javascript'],
      categories: ['frontend'],
      components: {},
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'api-wizard',
      name: 'API Wizard',
      version: '1.0.0',
      description: 'API development expert',
      longDescription: 'Expert in building REST APIs',
      author: { name: 'Test Author' },
      tags: ['api', 'backend', 'rest'],
      categories: ['backend'],
      components: {},
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Create mock client
    mockClient = {
      get: vi.fn()
    };
    
    // Mock axios.create to return our mock client
    vi.mocked(axios.create).mockReturnValue(mockClient as any);
    
    registry = new Registry('https://test-registry.com/agents.json');
  });

  it('should list all bundles', async () => {
    mockClient.get.mockResolvedValue({
      data: {
        version: '1.0.0',
        bundles: mockBundles
      }
    });

    const bundles = await registry.listBundles();
    
    expect(bundles).toHaveLength(2);
    expect(bundles[0].id).toBe('react-expert');
    expect(bundles[1].id).toBe('api-wizard');
  });

  it('should fetch specific bundle by id', async () => {
    mockClient.get.mockResolvedValue({
      data: {
        version: '1.0.0',
        bundles: mockBundles
      }
    });

    const bundle = await registry.fetchBundle('react-expert');
    
    expect(bundle.id).toBe('react-expert');
    expect(bundle.name).toBe('React Expert');
  });

  it('should throw error when bundle not found', async () => {
    mockClient.get.mockResolvedValue({
      data: {
        version: '1.0.0',
        bundles: mockBundles
      }
    });

    await expect(registry.fetchBundle('non-existent')).rejects.toThrow(
      "Bundle 'non-existent' not found in registry"
    );
  });

  it('should search bundles by name', async () => {
    mockClient.get.mockResolvedValue({
      data: {
        version: '1.0.0',
        bundles: mockBundles
      }
    });

    const results = await registry.searchBundles('React');
    
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('react-expert');
  });

  it('should search bundles by tag', async () => {
    mockClient.get.mockResolvedValue({
      data: {
        version: '1.0.0',
        bundles: mockBundles
      }
    });

    const results = await registry.searchBundles('backend');
    
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('api-wizard');
  });

  it('should search bundles by description', async () => {
    mockClient.get.mockResolvedValue({
      data: {
        version: '1.0.0',
        bundles: mockBundles
      }
    });

    const results = await registry.searchBundles('REST');
    
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('api-wizard');
  });

  it('should return empty array when no matches found', async () => {
    mockClient.get.mockResolvedValue({
      data: {
        version: '1.0.0',
        bundles: mockBundles
      }
    });

    const results = await registry.searchBundles('nonexistent');
    
    expect(results).toHaveLength(0);
  });

  it('should handle network errors with retry', async () => {
    mockClient.get.mockRejectedValue(new Error('Network error'));

    await expect(registry.listBundles()).rejects.toThrow(
      'Unable to connect to registry'
    );
    
    // Should have tried 3 times
    expect(mockClient.get).toHaveBeenCalledTimes(3);
  });

  it('should get and set registry URL', () => {
    expect(registry.getRegistryUrl()).toBe('https://test-registry.com/agents.json');
    
    registry.setRegistryUrl('https://new-registry.com/agents.json');
    
    expect(registry.getRegistryUrl()).toBe('https://new-registry.com/agents.json');
  });
});
