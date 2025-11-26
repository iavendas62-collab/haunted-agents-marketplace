/**
 * Bundle Manifest Validation
 * 
 * Validates bundle manifests against the JSON schema and provides
 * detailed error messages for validation failures.
 */

import Ajv, { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import { BundleManifest } from '../types/bundle.js';
import manifestSchema from '../schemas/manifest.schema.json';

/**
 * Validation result interface
 */
export interface ValidationResult {
  valid: boolean;
  errors?: ValidationError[];
}

/**
 * Detailed validation error
 */
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

/**
 * Create and configure AJV validator
 */
function createValidator() {
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    strict: false,
  });
  
  // Add format validators (email, uri, date-time, etc.)
  addFormats(ajv);
  
  return ajv;
}

/**
 * Format AJV errors into user-friendly messages
 */
function formatErrors(errors: ErrorObject[]): ValidationError[] {
  return errors.map((error) => {
    const field = error.instancePath || error.schemaPath;
    let message = error.message || 'Validation failed';
    
    // Enhance error messages based on error type
    switch (error.keyword) {
      case 'required':
        message = `Missing required field: ${error.params.missingProperty}`;
        break;
      case 'pattern':
        message = `Invalid format for ${field}: ${error.message}`;
        break;
      case 'minLength':
        message = `${field} must be at least ${error.params.limit} characters`;
        break;
      case 'maxLength':
        message = `${field} must be at most ${error.params.limit} characters`;
        break;
      case 'minItems':
        message = `${field} must have at least ${error.params.limit} items`;
        break;
      case 'maxItems':
        message = `${field} must have at most ${error.params.limit} items`;
        break;
      case 'enum':
        message = `${field} must be one of: ${error.params.allowedValues.join(', ')}`;
        break;
      case 'format':
        message = `${field} must be a valid ${error.params.format}`;
        break;
      case 'type':
        message = `${field} must be of type ${error.params.type}`;
        break;
      case 'additionalProperties':
        message = `Unknown property: ${error.params.additionalProperty}`;
        break;
      default:
        message = `${field}: ${error.message}`;
    }
    
    return {
      field: field.replace(/^\//, '').replace(/\//g, '.') || 'root',
      message,
      value: error.data,
    };
  });
}

/**
 * Validate a bundle manifest against the JSON schema
 * 
 * @param manifest - The manifest object to validate
 * @returns ValidationResult with detailed error messages
 * 
 * @example
 * ```typescript
 * const result = validateManifest(manifest);
 * if (!result.valid) {
 *   result.errors?.forEach(error => {
 *     console.error(`${error.field}: ${error.message}`);
 *   });
 * }
 * ```
 */
export function validateManifest(manifest: unknown): ValidationResult {
  const ajv = createValidator();
  const validate = ajv.compile(manifestSchema);
  
  const valid = validate(manifest);
  
  if (valid) {
    return { valid: true };
  }
  
  const errors = validate.errors || [];
  return {
    valid: false,
    errors: formatErrors(errors),
  };
}

/**
 * Validate a bundle manifest and throw an error if invalid
 * 
 * @param manifest - The manifest object to validate
 * @throws Error with detailed validation messages
 * 
 * @example
 * ```typescript
 * try {
 *   validateManifestOrThrow(manifest);
 *   console.log('Manifest is valid!');
 * } catch (error) {
 *   console.error('Validation failed:', error.message);
 * }
 * ```
 */
export function validateManifestOrThrow(manifest: unknown): asserts manifest is BundleManifest {
  const result = validateManifest(manifest);
  
  if (!result.valid) {
    const errorMessages = result.errors
      ?.map((err) => `  • ${err.field}: ${err.message}`)
      .join('\n');
    
    throw new Error(
      `Bundle manifest validation failed:\n\n${errorMessages}\n\nPlease fix these issues and try again.`
    );
  }
}

/**
 * Check if a manifest has all required fields (basic check)
 * 
 * @param manifest - The manifest object to check
 * @returns true if all required fields are present
 */
export function hasRequiredFields(manifest: any): boolean {
  const requiredFields = [
    'id',
    'name',
    'version',
    'description',
    'longDescription',
    'author',
    'tags',
    'categories',
    'components',
    'createdAt',
    'updatedAt',
  ];
  
  return requiredFields.every((field) => field in manifest && manifest[field] !== undefined);
}

/**
 * Validate semantic version format
 * 
 * @param version - Version string to validate
 * @returns true if valid semantic version
 */
export function isValidSemanticVersion(version: string): boolean {
  const semverPattern = /^\d+\.\d+\.\d+$/;
  return semverPattern.test(version);
}

/**
 * Validate bundle ID format (kebab-case)
 * 
 * @param id - Bundle ID to validate
 * @returns true if valid kebab-case format
 */
export function isValidBundleId(id: string): boolean {
  const kebabPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  return kebabPattern.test(id) && id.length >= 3 && id.length <= 50;
}
