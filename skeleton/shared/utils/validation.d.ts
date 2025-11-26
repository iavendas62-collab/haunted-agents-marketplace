/**
 * Bundle Manifest Validation
 *
 * Validates bundle manifests against the JSON schema and provides
 * detailed error messages for validation failures.
 */
import { BundleManifest } from '../types/bundle.js';
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
export declare function validateManifest(manifest: unknown): ValidationResult;
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
export declare function validateManifestOrThrow(manifest: unknown): asserts manifest is BundleManifest;
/**
 * Check if a manifest has all required fields (basic check)
 *
 * @param manifest - The manifest object to check
 * @returns true if all required fields are present
 */
export declare function hasRequiredFields(manifest: any): boolean;
/**
 * Validate semantic version format
 *
 * @param version - Version string to validate
 * @returns true if valid semantic version
 */
export declare function isValidSemanticVersion(version: string): boolean;
/**
 * Validate bundle ID format (kebab-case)
 *
 * @param id - Bundle ID to validate
 * @returns true if valid kebab-case format
 */
export declare function isValidBundleId(id: string): boolean;
//# sourceMappingURL=validation.d.ts.map