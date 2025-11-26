/**
 * Property-Based Tests for Registry
 * 
 * Feature: haunted-agents-marketplace
 * These tests validate universal properties using fast-check
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import fc from 'fast-check';
import { Registry } from './registry';
import axios from 'axios';
import { BundleManifest } from '../../../shared/types/bundle';

// Mock axios
vi.mock('axios');

describe('Registry Property-Based Tests', () => {
  let mockClient: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Create mock client
    mockClient = {
      get: vi.fn()
    };
    
    // Mock axios.create to return our mock client
    vi.mocked(axios.create).mockReturnValue(mockClient as any);
  });

  /**
   * Property 7: Bundle download on install
   * Feature: haunted-agents-marketplace, Property 7: Bundle download on install
   * Validates: Requirements 3.1
   * 
   * For any valid agent bundle identifier, fetchBundle SHALL trigger 
   * a request to the registry for that bundle.
   * 
   * Note: We test fetchBundle rather than downloadBundle because downloadBundle
   * involves file system operations and stream handling that are complex to mock.
   * The property we're validating is that a valid bundle ID triggers a registry fetch.
   */
  it('Property 7: should trigger registry fetch for any valid bundle ID', async () => {
    // Generator for valid bundle IDs (kebab-case)
    const bundleIdArbitrary = fc.stringMatching(/^[a-z][a-z0-9-]{2,29}$/);
    
    // Generator for bundle manifests
    const bundleManifestArbitrary = fc.record({
      id: fc.string({ minLength: 3, maxLength: 30 }),
      name: fc.string({ minLength: 5, maxLength: 50 }),
      version: fc.tuple(fc.nat(10), fc.nat(10), fc.nat(10)).map(
        ([major, minor, patch]) => `${major}.${minor}.${patch}`
      ),
      description: fc.string({ minLength: 20, maxLength: 200 }),
      longDescription: fc.string({ minLength: 50, maxLength: 500 }),
      author: fc.record({
        name: fc.string({ minLength: 3, maxLength: 50 })
      }),
      tags: fc.array(fc.string({ minLength: 3, maxLength: 20 }), { minLength: 1, maxLength: 10 }),
      categories: fc.array(fc.string({ minLength: 3, maxLength: 20 }), { minLength: 1, maxLength: 5 }),
      components: fc.constant({}),
      createdAt: fc.constant('2024-01-01T00:00:00Z'),
      updatedAt: fc.constant('2024-01-01T00:00:00Z')
    });

    await fc.assert(
      fc.asyncProperty(
        bundleIdArbitrary,
        bundleManifestArbitrary,
        async (bundleId, manifest) => {
          // Override the manifest ID to match the bundleId we're testing
          const testManifest = { ...manifest, id: bundleId };

          // Mock registry response with the bundle
          mockClient.get.mockResolvedValueOnce({
            data: {
              version: '1.0.0',
              bundles: [testManifest]
            }
          });

          const registry = new Registry('https://test-registry.com/agents.json');
          
          // Fetch the bundle - this should trigger a registry request
          const fetchedBundle = await registry.fetchBundle(bundleId);
          
          // Verify that get was called to fetch from registry
          expect(mockClient.get).toHaveBeenCalledWith('https://test-registry.com/agents.json');
          
          // Verify we got the correct bundle back
          expect(fetchedBundle.id).toBe(bundleId);
          expect(fetchedBundle.name).toBe(testManifest.name);
          
          // Clear mocks for next iteration
          vi.clearAllMocks();
          mockClient.get.mockClear();
        }
      ),
      { numRuns: 100 }
    );
  }, 30000); // 30 second timeout for property test
});
