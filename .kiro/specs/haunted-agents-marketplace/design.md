# Design Document

## Overview

The Haunted Agents Marketplace is a **skeleton template** that provides a complete foundation for building agent marketplace platforms. The design emphasizes **configurability** and **reusability** - allowing developers to quickly spin up customized marketplaces for different domains by simply changing configuration files.

The skeleton consists of three main components:

1. **Web Frontend** - A React-based marketplace UI for browsing and discovering agents
2. **CLI Tool** - A Node.js command-line interface for installing, creating, and managing agent bundles
3. **Bundle System** - A standardized format for packaging and distributing agent configurations

The architecture is designed to be **domain-agnostic**, with all domain-specific content (agent listings, categories, branding) defined in configuration files rather than hardcoded. This enables the same codebase to power both the Kiro Agents Marketplace and the DevOps Automation Hub with minimal changes.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Skeleton Template                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │              │      │              │      │           │ │
│  │  Web Frontend│◄────►│  CLI Tool    │◄────►│  Bundle   │ │
│  │  (React)     │      │  (Node.js)   │      │  Registry │ │
│  │              │      │              │      │  (JSON)   │ │
│  └──────────────┘      └──────────────┘      └───────────┘ │
│         │                     │                     │        │
│         │                     │                     │        │
│         └─────────────────────┴─────────────────────┘        │
│                              │                                │
│                              ▼                                │
│                    ┌──────────────────┐                      │
│                    │  Config Files    │                      │
│                    │  - agents.json   │                      │
│                    │  - branding.json │                      │
│                    │  - categories.js │                      │
│                    └──────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                             │
        ▼                                             ▼
┌──────────────────┐                      ┌──────────────────┐
│  Application 1   │                      │  Application 2   │
│  Kiro Agents     │                      │  DevOps Hub      │
│  Marketplace     │                      │  Marketplace     │
│                  │                      │                  │
│  - agents.json   │                      │  - agents.json   │
│  - branding.json │                      │  - branding.json │
└──────────────────┘                      └──────────────────┘
```

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- Fuse.js for client-side search

**CLI:**
- Node.js 18+
- Commander.js for CLI framework
- Axios for HTTP requests
- fs-extra for file operations
- chalk for colored terminal output

**Bundle Format:**
- JSON manifest (manifest.json)
- ZIP archive for distribution
- Semantic versioning

**Deployment:**
- Vercel for web frontend hosting
- GitHub for bundle registry (static JSON + releases)

### Repository Structure

```
/
├── .kiro/                          # Kiro configuration (NOT in .gitignore)
│   ├── specs/
│   │   └── haunted-agents-marketplace/
│   │       ├── requirements.md
│   │       ├── design.md
│   │       └── tasks.md
│   ├── hooks/
│   │   └── test-on-save.json      # Auto-run tests on file save
│   └── steering/
│       └── skeleton-dev.md         # Steering for skeleton development
│
├── skeleton/                       # Shared skeleton codebase
│   ├── web/                        # React frontend
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── AgentCard.tsx
│   │   │   │   ├── AgentDetail.tsx
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── CategoryFilter.tsx
│   │   │   ├── pages/
│   │   │   │   ├── Home.tsx
│   │   │   │   └── AgentPage.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAgents.ts
│   │   │   ├── types/
│   │   │   │   └── agent.ts
│   │   │   └── config/
│   │   │       └── config.ts       # Loads from config files
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   ├── cli/                        # Node.js CLI tool
│   │   ├── src/
│   │   │   ├── commands/
│   │   │   │   ├── install.ts
│   │   │   │   ├── create.ts
│   │   │   │   ├── list.ts
│   │   │   │   ├── validate.ts
│   │   │   │   └── package.ts
│   │   │   ├── core/
│   │   │   │   ├── bundleManager.ts
│   │   │   │   ├── registry.ts
│   │   │   │   └── installer.ts
│   │   │   ├── utils/
│   │   │   │   ├── fileOps.ts
│   │   │   │   └── validation.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── shared/                     # Shared types and schemas
│       ├── schemas/
│       │   └── manifest.schema.json
│       └── types/
│           └── bundle.ts
│
├── app1-kiro-marketplace/          # Application 1
│   ├── config/
│   │   ├── agents.json             # Kiro-specific agents
│   │   ├── branding.json           # Kiro branding
│   │   └── categories.json         # Kiro categories
│   ├── bundles/                    # Example agent bundles
│   │   ├── react-supabase-expert/
│   │   ├── api-wizard/
│   │   └── test-coach/
│   ├── public/
│   │   └── images/                 # Agent preview images
│   └── README.md
│
├── app2-devops-hub/                # Application 2
│   ├── config/
│   │   ├── agents.json             # DevOps-specific agents
│   │   ├── branding.json           # DevOps branding
│   │   └── categories.json         # DevOps categories
│   ├── bundles/                    # Example automation bundles
│   │   ├── cicd-template/
│   │   ├── k8s-monitor/
│   │   └── terraform-helper/
│   ├── public/
│   │   └── images/
│   └── README.md
│
├── docs/
│   ├── KIRO_USAGE.md              # How Kiro was used
│   ├── SKELETON_GUIDE.md          # How to use the skeleton
│   └── BUNDLE_FORMAT.md           # Bundle specification
│
├── LICENSE                         # MIT License
├── README.md
├── package.json
└── .gitignore                      # Does NOT exclude .kiro/
```

## Components and Interfaces

### 1. Bundle System

#### Bundle Manifest Schema

```typescript
interface BundleManifest {
  id: string;                    // Unique identifier (kebab-case)
  name: string;                  // Display name
  version: string;               // Semantic version (e.g., "1.0.0")
  description: string;           // Short description
  longDescription: string;       // Detailed description
  author: {
    name: string;
    email?: string;
    url?: string;
  };
  tags: string[];                // Search tags
  categories: string[];          // Category classifications
  previewImage?: string;         // URL to preview image
  
  components: {
    mcpServers?: MCPServerConfig[];
    steeringFiles?: SteeringFileConfig[];
    hooks?: HookConfig[];
    specTemplates?: SpecTemplateConfig[];
  };
  
  dependencies?: {
    external?: string[];         // External tools required
    kiroVersion?: string;        // Minimum Kiro version
  };
  
  examples?: {
    title: string;
    description: string;
    prompt?: string;
  }[];
  
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
}

interface MCPServerConfig {
  name: string;
  command: string;
  args: string[];
  env?: Record<string, string>;
}

interface SteeringFileConfig {
  filename: string;
  inclusion: 'always' | 'manual' | 'fileMatch';
  fileMatchPattern?: string;
}

interface HookConfig {
  name: string;
  trigger: string;
  action: 'message' | 'command';
  content: string;
}

interface SpecTemplateConfig {
  name: string;
  type: 'requirements' | 'design' | 'tasks';
  filename: string;
}
```

#### Bundle Directory Structure

```
bundle-name/
├── manifest.json              # Bundle metadata
├── mcp/                       # MCP server configs
│   └── servers.json
├── steering/                  # Steering files
│   ├── always-included.md
│   └── context-specific.md
├── hooks/                     # Hook definitions
│   └── hooks.json
├── specs/                     # Spec templates
│   ├── requirements.md
│   └── design.md
└── README.md                  # Bundle documentation
```

### 2. CLI Tool

#### Command Interface

```typescript
interface CLICommand {
  name: string;
  description: string;
  execute(args: string[], options: Record<string, any>): Promise<void>;
}

// Commands
class InstallCommand implements CLICommand {
  async execute(args: string[], options: Record<string, any>): Promise<void> {
    const bundleId = args[0];
    // 1. Fetch bundle from registry
    // 2. Validate manifest
    // 3. Install components to .kiro directories
    // 4. Update local registry
    // 5. Display success message
  }
}

class CreateCommand implements CLICommand {
  async execute(args: string[], options: Record<string, any>): Promise<void> {
    const bundleName = args[0];
    // 1. Generate template manifest
    // 2. Create bundle directory structure
    // 3. Add example files
  }
}

class ListCommand implements CLICommand {
  async execute(args: string[], options: Record<string, any>): Promise<void> {
    // 1. Read local registry
    // 2. Display installed bundles with details
  }
}

class ValidateCommand implements CLICommand {
  async execute(args: string[], options: Record<string, any>): Promise<void> {
    const bundlePath = args[0];
    // 1. Load manifest
    // 2. Validate against schema
    // 3. Check file references
    // 4. Report errors or success
  }
}

class PackageCommand implements CLICommand {
  async execute(args: string[], options: Record<string, any>): Promise<void> {
    const bundlePath = args[0];
    // 1. Validate bundle
    // 2. Create ZIP archive
    // 3. Save to output directory
  }
}
```

#### Registry Interface

```typescript
interface Registry {
  // Fetch bundle metadata from remote registry
  fetchBundle(bundleId: string): Promise<BundleManifest>;
  
  // Download bundle archive
  downloadBundle(bundleId: string, destination: string): Promise<void>;
  
  // Get all available bundles
  listBundles(): Promise<BundleManifest[]>;
  
  // Search bundles
  searchBundles(query: string): Promise<BundleManifest[]>;
}

interface LocalRegistry {
  // Get installed bundles
  getInstalled(): InstalledBundle[];
  
  // Add installed bundle
  addInstalled(bundle: InstalledBundle): void;
  
  // Remove installed bundle
  removeInstalled(bundleId: string): void;
  
  // Check if bundle is installed
  isInstalled(bundleId: string): boolean;
}

interface InstalledBundle {
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
```

#### Installer Interface

```typescript
interface Installer {
  // Install a bundle to the Kiro environment
  install(bundle: BundleManifest, bundlePath: string): Promise<InstallResult>;
  
  // Uninstall a bundle
  uninstall(bundleId: string): Promise<void>;
}

interface InstallResult {
  success: boolean;
  installedComponents: {
    mcpServers: number;
    steeringFiles: number;
    hooks: number;
    specTemplates: number;
  };
  errors?: string[];
}
```

### 3. Web Frontend

#### Component Interfaces

```typescript
// Agent Card Component
interface AgentCardProps {
  agent: BundleManifest;
  onClick: (agentId: string) => void;
}

// Agent Detail Component
interface AgentDetailProps {
  agent: BundleManifest;
}

// Search Bar Component
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

// Category Filter Component
interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}
```

#### Configuration Interface

```typescript
interface AppConfig {
  branding: {
    name: string;
    logo: string;
    primaryColor: string;
    tagline: string;
  };
  
  registry: {
    url: string;
    agentsFile: string;
  };
  
  categories: {
    id: string;
    name: string;
    icon: string;
  }[];
  
  featured: string[];  // Featured bundle IDs
}
```

## Data Models

### Bundle Manifest

The core data model is the `BundleManifest` (defined above in Components section). This JSON structure describes everything about an agent bundle.

### Local Registry

Stored at `~/.kiro-agent/registry.json`:

```json
{
  "version": "1.0.0",
  "installed": [
    {
      "id": "react-supabase-expert",
      "version": "1.0.0",
      "installedAt": "2025-11-24T10:30:00Z",
      "components": {
        "mcpServers": ["supabase-mcp"],
        "steeringFiles": ["react-best-practices.md", "supabase-patterns.md"],
        "hooks": ["test-on-save"],
        "specTemplates": ["react-component-spec"]
      }
    }
  ]
}
```

### Remote Registry

Stored at `config/agents.json` in each application:

```json
{
  "version": "1.0.0",
  "bundles": [
    {
      "id": "react-supabase-expert",
      "name": "React + Supabase Expert",
      "version": "1.0.0",
      "description": "Expert agent for building React apps with Supabase",
      "downloadUrl": "https://github.com/.../releases/download/v1.0.0/react-supabase-expert.zip",
      "...": "... (full manifest)"
    }
  ]
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Bundle card component completeness
*For any* agent bundle, when rendered as a card, the output SHALL include all component types (MCP servers, steering files, hooks, spec templates) with their corresponding icons.
**Validates: Requirements 1.2**

### Property 2: Installation command display
*For any* agent bundle detail page, the rendered output SHALL contain the exact CLI installation command in the format `kiro-agent install <bundle-id>`.
**Validates: Requirements 1.5**

### Property 3: Search relevance
*For any* search query with matching bundles, all returned results SHALL contain the query terms in either the bundle name, description, or tags, and SHALL be ordered by relevance score in descending order.
**Validates: Requirements 2.1**

### Property 4: Category filter correctness
*For any* selected category filter, all displayed bundles SHALL have that category in their categories array, and no bundles without that category SHALL be displayed.
**Validates: Requirements 2.2**

### Property 5: Tag search accuracy
*For any* technology tag search query, all returned bundles SHALL include that exact tag in their tags array.
**Validates: Requirements 2.3**

### Property 6: Keyword highlighting
*For any* search query with results, the rendered bundle names and descriptions SHALL highlight all occurrences of the query terms with visual emphasis.
**Validates: Requirements 2.4**

### Property 7: Bundle download on install
*For any* valid agent bundle identifier, executing `kiro-agent install <bundle-id>` SHALL trigger a download request to the registry for that bundle.
**Validates: Requirements 3.1**

### Property 8: Manifest validation on download
*For any* downloaded bundle, the CLI SHALL validate the manifest JSON structure against the schema before proceeding with installation.
**Validates: Requirements 3.2**

### Property 9: Component file installation
*For any* valid bundle with components, installation SHALL copy all MCP configs to `.kiro/mcp/`, steering files to `.kiro/steering/`, hooks to `.kiro/hooks/`, and spec templates to `.kiro/specs/`.
**Validates: Requirements 3.3**

### Property 10: Installation success message
*For any* successfully installed bundle, the CLI output SHALL include the bundle name, version, and a list of installed components with example usage prompts.
**Validates: Requirements 3.4**

### Property 11: MCP configuration merging
*For any* bundle containing MCP server configurations, installation SHALL merge the server entries into the existing `mcp.json` file without overwriting unrelated entries.
**Validates: Requirements 4.1**

### Property 12: Steering file placement
*For any* bundle containing steering files, installation SHALL place each file in `.kiro/steering/` with the inclusion settings specified in the manifest.
**Validates: Requirements 4.2**

### Property 13: Hook registration
*For any* bundle containing hooks, installation SHALL register each hook in the Kiro hooks system, making them available for triggering.
**Validates: Requirements 4.3**

### Property 14: Spec template availability
*For any* bundle containing spec templates, after installation, the templates SHALL be discoverable and usable in the spec creation workflow.
**Validates: Requirements 4.4**

### Property 15: Manifest template generation
*For any* execution of `kiro-agent create <bundle-name>`, the CLI SHALL generate a manifest.json file containing all required fields (id, name, version, description, author, components).
**Validates: Requirements 5.1**

### Property 16: Bundle validation completeness
*For any* bundle directory, executing `kiro-agent validate` SHALL check that the manifest is valid JSON, conforms to the schema, and all referenced files in the components section exist.
**Validates: Requirements 5.3**

### Property 17: Validation success output
*For any* valid bundle, executing `kiro-agent validate` SHALL output a success message confirming the bundle is ready for distribution.
**Validates: Requirements 5.4**

### Property 18: Package archive completeness
*For any* valid bundle, executing `kiro-agent package` SHALL create a .zip file containing the manifest.json and all component files referenced in the manifest.
**Validates: Requirements 5.5**

### Property 19: List command completeness
*For any* set of installed bundles, executing `kiro-agent list` SHALL display all bundles with their names and versions in the output.
**Validates: Requirements 6.1**

### Property 20: Installation date display
*For any* installed bundle in the list output, the CLI SHALL display the installation date in ISO 8601 format.
**Validates: Requirements 6.2**

### Property 21: Active components indication
*For any* listed installed bundle, the output SHALL indicate which component types are active (MCP servers, steering files, hooks, spec templates) with counts or names.
**Validates: Requirements 6.3**

### Property 22: Featured badge display
*For any* agent bundle marked as featured in the configuration, the marketplace UI SHALL display a "Featured" badge on the bundle card.
**Validates: Requirements 7.2**

## Error Handling

### CLI Error Handling

**Network Errors:**
- If the registry is unreachable, display: "Unable to connect to registry. Please check your internet connection."
- Retry logic: 3 attempts with exponential backoff (1s, 2s, 4s)

**Validation Errors:**
- If manifest is invalid JSON: "Invalid manifest.json: <specific JSON parse error>"
- If manifest missing required fields: "Manifest validation failed: missing required field '<field-name>'"
- If referenced files don't exist: "Validation failed: file '<filename>' referenced in manifest not found"

**Installation Errors:**
- If bundle already installed: "Bundle '<bundle-id>' is already installed. Use --force to reinstall."
- If .kiro directory doesn't exist: "Kiro configuration directory not found. Please run this command in a Kiro workspace."
- If file write fails: "Installation failed: unable to write to '<path>'. Check permissions."

**Conflict Handling:**
- If MCP server name conflicts: Prompt user: "MCP server '<name>' already exists. Overwrite? (y/n)"
- If steering file conflicts: Prompt user: "Steering file '<filename>' already exists. Overwrite? (y/n)"
- If user declines: "Installation cancelled. No changes were made."

### Web Frontend Error Handling

**Loading Errors:**
- If agents.json fails to load: Display error banner: "Unable to load agent listings. Please try again later."
- Fallback: Show cached data if available

**Search Errors:**
- If search returns no results: Display: "No agents found matching '<query>'. Try different keywords or browse by category."
- Show suggested searches or popular agents

**Navigation Errors:**
- If bundle ID in URL doesn't exist: Redirect to home with message: "Agent not found."

### Validation Error Messages

All validation errors should:
1. Clearly state what went wrong
2. Indicate which file or field has the issue
3. Suggest how to fix it (when possible)

Example:
```
❌ Validation failed for bundle 'my-agent'

Issues found:
  • manifest.json: Missing required field 'version'
  • manifest.json: Invalid author.email format
  • mcp/servers.json: File referenced in manifest not found

Fix these issues and run 'kiro-agent validate' again.
```

## Testing Strategy

### Unit Testing

**CLI Commands:**
- Test each command (install, create, list, validate, package) with valid inputs
- Test error handling for invalid inputs
- Test file operations (create, read, write, delete)
- Test JSON parsing and validation

**Bundle Manager:**
- Test manifest validation against schema
- Test file extraction from ZIP archives
- Test component installation to correct directories

**Registry:**
- Test fetching bundle metadata
- Test downloading bundle archives
- Test local registry read/write operations

**Web Components:**
- Test AgentCard rendering with various bundle data
- Test SearchBar filtering logic
- Test CategoryFilter selection behavior
- Test AgentDetail page rendering

### Property-Based Testing

We will use **fast-check** (for TypeScript/JavaScript) as our property-based testing library. Each property-based test will run a minimum of 100 iterations to ensure thorough coverage.

**Property Test Framework:**
```typescript
import fc from 'fast-check';

// Example property test structure
describe('Property: Bundle card component completeness', () => {
  it('should include all component types with icons for any bundle', () => {
    fc.assert(
      fc.property(
        bundleArbitrary, // Generator for random bundles
        (bundle) => {
          const rendered = renderAgentCard(bundle);
          // Verify all component types are present
          expect(rendered).toContain('MCP Servers');
          expect(rendered).toContain('Steering Files');
          expect(rendered).toContain('Hooks');
          expect(rendered).toContain('Spec Templates');
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Generators (Arbitraries):**

We will create smart generators that produce valid test data:

```typescript
// Bundle generator
const bundleArbitrary = fc.record({
  id: fc.stringOf(fc.constantFrom('a-z', '0-9', '-'), { minLength: 3, maxLength: 30 }),
  name: fc.string({ minLength: 5, maxLength: 50 }),
  version: fc.tuple(fc.nat(10), fc.nat(10), fc.nat(10)).map(([major, minor, patch]) => 
    `${major}.${minor}.${patch}`
  ),
  description: fc.string({ minLength: 20, maxLength: 200 }),
  tags: fc.array(fc.string({ minLength: 3, maxLength: 20 }), { minLength: 1, maxLength: 10 }),
  categories: fc.array(fc.constantFrom('frontend', 'backend', 'devops', 'testing'), { minLength: 1 }),
  components: fc.record({
    mcpServers: fc.option(fc.array(mcpServerArbitrary)),
    steeringFiles: fc.option(fc.array(steeringFileArbitrary)),
    hooks: fc.option(fc.array(hookArbitrary)),
    specTemplates: fc.option(fc.array(specTemplateArbitrary))
  })
});

// MCP Server generator
const mcpServerArbitrary = fc.record({
  name: fc.string({ minLength: 3, maxLength: 30 }),
  command: fc.constantFrom('uvx', 'node', 'python'),
  args: fc.array(fc.string())
});

// Search query generator
const searchQueryArbitrary = fc.oneof(
  fc.string({ minLength: 1, maxLength: 50 }), // Random string
  fc.constantFrom('React', 'Supabase', 'API', 'Testing', 'DevOps') // Common terms
);
```

**Property Tests to Implement:**

Each correctness property will have a corresponding property-based test:

1. **Property 1 Test**: Generate random bundles, render cards, verify all components shown
2. **Property 2 Test**: Generate random bundles, render detail pages, verify install command present
3. **Property 3 Test**: Generate random queries and bundle sets, verify search results relevance
4. **Property 4 Test**: Generate random categories and bundle sets, verify filter correctness
5. **Property 5 Test**: Generate random tags and bundle sets, verify tag search accuracy
6. **Property 6 Test**: Generate random queries, verify keyword highlighting in results
7. **Property 7 Test**: Generate random bundle IDs, verify download triggered
8. **Property 8 Test**: Generate random manifests (valid and invalid), verify validation
9. **Property 9 Test**: Generate random bundles, verify files copied to correct locations
10. **Property 10 Test**: Generate random bundles, verify success message format
11. **Property 11 Test**: Generate random MCP configs, verify merging preserves existing entries
12. **Property 12 Test**: Generate random steering files, verify placement and settings
13. **Property 13 Test**: Generate random hooks, verify registration
14. **Property 14 Test**: Generate random spec templates, verify availability
15. **Property 15 Test**: Generate random bundle names, verify manifest template structure
16. **Property 16 Test**: Generate random bundle directories, verify validation checks
17. **Property 17 Test**: Generate valid bundles, verify success message
18. **Property 18 Test**: Generate random bundles, verify ZIP contains all files
19. **Property 19 Test**: Generate random installed bundle sets, verify list output
20. **Property 20 Test**: Generate random installed bundles, verify date format
21. **Property 21 Test**: Generate random installed bundles, verify component indication
22. **Property 22 Test**: Generate random featured bundles, verify badge display

### Integration Testing

**End-to-End Workflows:**
1. Install a bundle → Verify files in .kiro directories → List installed → Verify in list
2. Create bundle → Validate → Package → Verify ZIP contents
3. Search for agent → Click result → View details → Copy install command
4. Filter by category → Verify results → Clear filter → Verify all shown

**Cross-Component Testing:**
- Test CLI and web frontend using the same registry data
- Test bundle installation with real Kiro configuration directories
- Test manifest validation with real bundle examples

### Test Coverage Goals

- **Unit Tests**: 80%+ code coverage
- **Property Tests**: All 22 correctness properties implemented
- **Integration Tests**: All critical user workflows covered
- **Edge Cases**: Empty inputs, missing files, network failures, conflicts

### Testing Tools

- **Unit Testing**: Vitest (for both CLI and web)
- **Property-Based Testing**: fast-check
- **Integration Testing**: Playwright (for web E2E)
- **Mocking**: vi.mock (Vitest mocking)
- **Assertions**: expect (Vitest assertions)

## Deployment Strategy

### Web Frontend Deployment

**Platform**: Vercel

**Configuration**:
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables:
  - `VITE_REGISTRY_URL`: URL to agents.json
  - `VITE_APP_NAME`: Application name (from branding.json)

**Deployment Process**:
1. Push to GitHub repository
2. Vercel auto-deploys from main branch
3. Preview deployments for pull requests

**Two Deployments**:
- App 1: `kiro-marketplace.vercel.app`
- App 2: `devops-hub.vercel.app`

### CLI Distribution

**Distribution Method**: npm package

**Package Name**: `@haunted-agents/cli`

**Installation**:
```bash
npm install -g @haunted-agents/cli
```

**Configuration**:
- CLI reads from `~/.kiro-agent/config.json` for registry URL
- Default registry points to GitHub releases

### Bundle Registry

**Hosting**: GitHub Releases + Static JSON

**Structure**:
- `config/agents.json`: Bundle metadata
- GitHub Releases: ZIP archives for each bundle version

**Update Process**:
1. Create new bundle
2. Validate and package
3. Upload ZIP to GitHub release
4. Update agents.json with new bundle metadata
5. Commit and push agents.json

## Configuration Management

### Skeleton Configuration

The skeleton is configured through JSON files that define domain-specific content:

**branding.json**:
```json
{
  "name": "Kiro Agents Marketplace",
  "logo": "/images/logo.svg",
  "primaryColor": "#6366f1",
  "secondaryColor": "#8b5cf6",
  "tagline": "Supercharge your Kiro with specialized agents",
  "footer": {
    "links": [
      { "text": "Documentation", "url": "/docs" },
      { "text": "GitHub", "url": "https://github.com/..." }
    ]
  }
}
```

**categories.json**:
```json
{
  "categories": [
    {
      "id": "frontend",
      "name": "Frontend Development",
      "icon": "🎨",
      "description": "React, Vue, and modern frontend tools"
    },
    {
      "id": "backend",
      "name": "Backend Development",
      "icon": "⚙️",
      "description": "APIs, databases, and server-side logic"
    }
  ]
}
```

**agents.json**:
```json
{
  "version": "1.0.0",
  "featured": ["react-supabase-expert", "api-wizard"],
  "bundles": [
    { "...": "bundle manifests" }
  ]
}
```

### Environment-Specific Configuration

**Development**:
- Registry URL: `http://localhost:3000/config/agents.json`
- CLI points to local bundles directory

**Production**:
- Registry URL: `https://kiro-marketplace.vercel.app/config/agents.json`
- CLI downloads from GitHub releases

## Security Considerations

### Bundle Validation

- Validate manifest against JSON schema
- Check for malicious file paths (e.g., `../../etc/passwd`)
- Verify file sizes are reasonable (< 10MB per bundle)
- Scan for suspicious commands in MCP server configs

### Installation Safety

- Never execute arbitrary code from bundles
- Only copy files to designated .kiro directories
- Prompt user before overwriting existing files
- Validate all file paths before writing

### Registry Security

- Serve agents.json over HTTPS only
- Implement Content Security Policy headers
- Rate limit API requests
- Validate bundle checksums (future enhancement)

## Performance Considerations

### Web Frontend

- Lazy load agent preview images
- Implement virtual scrolling for large agent lists
- Cache agents.json in localStorage (with TTL)
- Debounce search input (300ms)
- Use React.memo for AgentCard components

### CLI

- Stream large file downloads (don't load into memory)
- Use async file operations
- Cache registry data locally (refresh every 24h)
- Parallel file copying during installation

### Bundle Size

- Recommend bundles stay under 5MB
- Compress steering files and spec templates
- Use external URLs for large assets
- Provide bundle size in manifest

## Accessibility

### Web Frontend

- Semantic HTML (header, nav, main, article)
- ARIA labels for interactive elements
- Keyboard navigation support (Tab, Enter, Escape)
- Focus indicators on all interactive elements
- Alt text for all images
- Color contrast ratio ≥ 4.5:1
- Screen reader announcements for search results

### CLI

- Clear, descriptive output messages
- Progress indicators for long operations
- Colored output with fallback for no-color terminals
- Consistent command structure and help text

## Future Enhancements

1. **Bundle Versioning**: Support installing specific versions
2. **Dependency Management**: Handle bundle dependencies automatically
3. **Update Notifications**: Check for bundle updates
4. **Bundle Ratings**: Community ratings and reviews
5. **Bundle Analytics**: Track installation counts
6. **Private Registries**: Support custom registry URLs
7. **Bundle Signing**: Cryptographic signatures for security
8. **Auto-Updates**: Automatic bundle updates (opt-in)
9. **Bundle Conflicts**: Better conflict resolution UI
10. **Bundle Marketplace API**: REST API for programmatic access
