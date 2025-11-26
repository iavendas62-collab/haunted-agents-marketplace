"use strict";
/**
 * Bundle Manifest Validation
 *
 * Validates bundle manifests against the JSON schema and provides
 * detailed error messages for validation failures.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateManifest = validateManifest;
exports.validateManifestOrThrow = validateManifestOrThrow;
exports.hasRequiredFields = hasRequiredFields;
exports.isValidSemanticVersion = isValidSemanticVersion;
exports.isValidBundleId = isValidBundleId;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const manifest_schema_json_1 = __importDefault(require("../schemas/manifest.schema.json"));
/**
 * Create and configure AJV validator
 */
function createValidator() {
    const ajv = new ajv_1.default({
        allErrors: true,
        verbose: true,
        strict: false,
    });
    // Add format validators (email, uri, date-time, etc.)
    (0, ajv_formats_1.default)(ajv);
    return ajv;
}
/**
 * Format AJV errors into user-friendly messages
 */
function formatErrors(errors) {
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
function validateManifest(manifest) {
    const ajv = createValidator();
    const validate = ajv.compile(manifest_schema_json_1.default);
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
function validateManifestOrThrow(manifest) {
    const result = validateManifest(manifest);
    if (!result.valid) {
        const errorMessages = result.errors
            ?.map((err) => `  • ${err.field}: ${err.message}`)
            .join('\n');
        throw new Error(`Bundle manifest validation failed:\n\n${errorMessages}\n\nPlease fix these issues and try again.`);
    }
}
/**
 * Check if a manifest has all required fields (basic check)
 *
 * @param manifest - The manifest object to check
 * @returns true if all required fields are present
 */
function hasRequiredFields(manifest) {
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
function isValidSemanticVersion(version) {
    const semverPattern = /^\d+\.\d+\.\d+$/;
    return semverPattern.test(version);
}
/**
 * Validate bundle ID format (kebab-case)
 *
 * @param id - Bundle ID to validate
 * @returns true if valid kebab-case format
 */
function isValidBundleId(id) {
    const kebabPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    return kebabPattern.test(id) && id.length >= 3 && id.length <= 50;
}
//# sourceMappingURL=validation.js.map