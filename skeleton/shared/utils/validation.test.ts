/**
 * Tests for bundle manifest validation
 */

import { describe, it, expect } from 'vitest';
import {
  validateManifest,
  validateManifestOrThrow,
  hasRequiredFields,
  isValidSemanticVersion,
  isValidBundleId,
} from './validation.js';
import { BundleManifest } from '../types/bundle.js';

describe('validateManifest', () => {
  const validManifest: BundleManifest = {
    id: 'test-bundle',
    name: 'Test Bundle',
    version: '1.0.0',
    description: 'A test bundle for validation',
    longDescription: 'This is a longer description for the test bundle that provides more details.',
    author: {
      name: 'Test Author',
      email: 'test@example.com',
    },
    tags: ['test', 'example'],
    categories: ['testing'],
    components: {},
    createdAt: '2025-11-24T10:00:00Z',
    updatedAt: '2025-11-24T10:00:00Z',
  };

  it('should validate a correct manifest', () => {
    const result = validateManifest(validManifest);
    expect(result.valid).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it('should reject manifest with missing required fields', () => {
    const invalidManifest = {
      id: 'test-bundle',
      name: 'Test Bundle',
      // missing version and other required fields
    };

    const result = validateManifest(invalidManifest);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors!.length).toBeGreaterThan(0);
  });

  it('should reject manifest with invalid version format', () => {
    const invalidManifest = {
      ...validManifest,
      version: 'invalid-version',
    };

    const result = validateManifest(invalidManifest);
    expect(result.valid).toBe(false);
    expect(result.errors?.some(e => e.field.includes('version'))).toBe(true);
  });

  it('should reject manifest with invalid id format', () => {
    const invalidManifest = {
      ...validManifest,
      id: 'Invalid_ID_With_Underscores',
    };

    const result = validateManifest(invalidManifest);
    expect(result.valid).toBe(false);
    expect(result.errors?.some(e => e.field.includes('id'))).toBe(true);
  });

  it('should reject manifest with invalid email format', () => {
    const invalidManifest = {
      ...validManifest,
      author: {
        name: 'Test Author',
        email: 'not-an-email',
      },
    };

    const result = validateManifest(invalidManifest);
    expect(result.valid).toBe(false);
    expect(result.errors?.some(e => e.message.includes('email'))).toBe(true);
  });

  it('should validate manifest with all component types', () => {
    const manifestWithComponents: BundleManifest = {
      ...validManifest,
      components: {
        mcpServers: [
          {
            name: 'test-server',
            command: 'node',
            args: ['server.js'],
          },
        ],
        steeringFiles: [
          {
            filename: 'test.md',
            inclusion: 'always',
          },
        ],
        hooks: [
          {
            name: 'test-hook',
            trigger: 'onSave',
            action: 'message',
            content: 'Test message',
          },
        ],
        specTemplates: [
          {
            name: 'test-template',
            type: 'requirements',
            filename: 'template.md',
          },
        ],
      },
    };

    const result = validateManifest(manifestWithComponents);
    expect(result.valid).toBe(true);
  });

  it('should reject manifest with invalid steering file inclusion', () => {
    const invalidManifest = {
      ...validManifest,
      components: {
        steeringFiles: [
          {
            filename: 'test.md',
            inclusion: 'invalid-inclusion',
          },
        ],
      },
    };

    const result = validateManifest(invalidManifest);
    expect(result.valid).toBe(false);
  });
});

describe('validateManifestOrThrow', () => {
  const validManifest: BundleManifest = {
    id: 'test-bundle',
    name: 'Test Bundle',
    version: '1.0.0',
    description: 'A test bundle for validation',
    longDescription: 'This is a longer description for the test bundle.',
    author: { name: 'Test Author' },
    tags: ['test'],
    categories: ['testing'],
    components: {},
    createdAt: '2025-11-24T10:00:00Z',
    updatedAt: '2025-11-24T10:00:00Z',
  };

  it('should not throw for valid manifest', () => {
    expect(() => validateManifestOrThrow(validManifest)).not.toThrow();
  });

  it('should throw for invalid manifest', () => {
    const invalidManifest = { id: 'test' };
    expect(() => validateManifestOrThrow(invalidManifest)).toThrow();
  });

  it('should include error details in thrown error', () => {
    const invalidManifest = { id: 'test' };
    try {
      validateManifestOrThrow(invalidManifest);
      expect.fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).toContain('validation failed');
      expect(error.message).toContain('Missing required field');
    }
  });
});

describe('hasRequiredFields', () => {
  it('should return true for object with all required fields', () => {
    const manifest = {
      id: 'test',
      name: 'Test',
      version: '1.0.0',
      description: 'Test description',
      longDescription: 'Longer test description',
      author: { name: 'Author' },
      tags: ['test'],
      categories: ['test'],
      components: {},
      createdAt: '2025-11-24T10:00:00Z',
      updatedAt: '2025-11-24T10:00:00Z',
    };

    expect(hasRequiredFields(manifest)).toBe(true);
  });

  it('should return false for object missing required fields', () => {
    const manifest = {
      id: 'test',
      name: 'Test',
    };

    expect(hasRequiredFields(manifest)).toBe(false);
  });
});

describe('isValidSemanticVersion', () => {
  it('should accept valid semantic versions', () => {
    expect(isValidSemanticVersion('1.0.0')).toBe(true);
    expect(isValidSemanticVersion('0.1.0')).toBe(true);
    expect(isValidSemanticVersion('10.20.30')).toBe(true);
  });

  it('should reject invalid semantic versions', () => {
    expect(isValidSemanticVersion('1.0')).toBe(false);
    expect(isValidSemanticVersion('v1.0.0')).toBe(false);
    expect(isValidSemanticVersion('1.0.0-beta')).toBe(false);
    expect(isValidSemanticVersion('invalid')).toBe(false);
  });
});

describe('isValidBundleId', () => {
  it('should accept valid kebab-case IDs', () => {
    expect(isValidBundleId('test-bundle')).toBe(true);
    expect(isValidBundleId('my-awesome-bundle')).toBe(true);
    expect(isValidBundleId('bundle123')).toBe(true);
    expect(isValidBundleId('test-123-bundle')).toBe(true);
  });

  it('should reject invalid bundle IDs', () => {
    expect(isValidBundleId('Test-Bundle')).toBe(false); // uppercase
    expect(isValidBundleId('test_bundle')).toBe(false); // underscore
    expect(isValidBundleId('test bundle')).toBe(false); // space
    expect(isValidBundleId('ab')).toBe(false); // too short
    expect(isValidBundleId('-test')).toBe(false); // starts with dash
    expect(isValidBundleId('test-')).toBe(false); // ends with dash
  });
});
