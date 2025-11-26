# @haunted-agents/shared

Shared types, schemas, and utilities for the Haunted Agents Marketplace.

## Overview

This package provides the core data structures and validation logic used across the Haunted Agents ecosystem, including the CLI tool and web frontend.

## Features

- **TypeScript Types**: Complete type definitions for bundle manifests and related structures
- **JSON Schema**: Formal schema definition for manifest validation
- **Validation Utilities**: Functions to validate manifests with detailed error messages

## Installation

```bash
npm install @haunted-agents/shared
```

## Usage

### Importing Types

```typescript
import { BundleManifest, MCPServerConfig, SteeringFileConfig } from '@haunted-agents/shared';

const manifest: BundleManifest = {
  id: 'my-bundle',
  name: 'My Bundle',
  version: '1.0.0',
  // ... other fields
};
```

### Validating Manifests

```typescript
import { validateManifest, validateManifestOrThrow } from '@haunted-agents/shared';

// Option 1: Get validation result
const result = validateManifest(manifest);
if (!result.valid) {
  result.errors?.forEach(error => {
    console.error(`${error.field}: ${error.message}`);
  });
}

// Option 2: Throw on validation failure
try {
  validateManifestOrThrow(manifest);
  console.log('Manifest is valid!');
} catch (error) {
  console.error('Validation failed:', error.message);
}
```

### Helper Functions

```typescript
import { 
  isValidSemanticVersion, 
  isValidBundleId,
  hasRequiredFields 
} from '@haunted-agents/shared';

// Check version format
if (isValidSemanticVersion('1.0.0')) {
  console.log('Valid version!');
}

// Check bundle ID format
if (isValidBundleId('my-awesome-bundle')) {
  console.log('Valid bundle ID!');
}

// Quick check for required fields
if (hasRequiredFields(manifest)) {
  console.log('All required fields present!');
}
```

## Type Definitions

### BundleManifest

The main structure describing an agent bundle:

```typescript
interface BundleManifest {
  id: string;                    // Unique identifier (kebab-case)
  name: string;                  // Display name
  version: string;               // Semantic version (e.g., "1.0.0")
  description: string;           // Short description
  longDescription: string;       // Detailed description
  author: BundleAuthor;
  tags: string[];                // Search tags
  categories: string[];          // Category classifications
  previewImage?: string;         // URL to preview image
  components: BundleComponents;
  dependencies?: BundleDependencies;
  examples?: BundleExample[];
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
}
```

### Component Types

- **MCPServerConfig**: MCP server configuration
- **SteeringFileConfig**: Steering file configuration
- **HookConfig**: Hook definition
- **SpecTemplateConfig**: Spec template configuration

See [types/bundle.ts](./types/bundle.ts) for complete definitions.

## Validation Rules

The JSON schema enforces:

- **ID Format**: kebab-case, 3-50 characters
- **Version Format**: Semantic versioning (X.Y.Z)
- **Required Fields**: All core fields must be present
- **Email Format**: Valid email addresses for author
- **URI Format**: Valid URIs for URLs
- **Date Format**: ISO 8601 timestamps
- **Enum Values**: Specific allowed values for inclusion, action, type fields

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Watch mode
npm run test:watch
```

## Testing

The package includes comprehensive unit tests covering:

- Valid manifest validation
- Invalid manifest rejection
- Field format validation
- Component validation
- Error message formatting

Run tests with `npm test`.

## License

MIT
