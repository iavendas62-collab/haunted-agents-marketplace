/**
 * Haunted Agents Shared Library
 * 
 * Exports types, validation utilities, and schemas for bundle management.
 */

// Export all types
export * from './types/bundle.js';

// Export validation utilities
export * from './utils/validation.js';

// Export schema (for reference)
export { default as manifestSchema } from './schemas/manifest.schema.json';
