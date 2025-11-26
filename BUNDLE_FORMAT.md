# Bundle Format Specification

## Overview

This document defines the **Haunted Agents Bundle Format** - a standardized way to package and distribute AI agent configurations for Kiro IDE. Bundles contain MCP servers, steering files, hooks, and spec templates that transform Kiro's behavior for specific use cases.

**Version:** 1.0.0  
**Last Updated:** November 24, 2025

## Table of Contents

1. [Bundle Structure](#bundle-structure)
2. [Manifest Schema](#manifest-schema)
3. [Component Types](#component-types)
4. [Validation Rules](#validation-rules)
5. [Best Practices](#best-practices)
6. [Examples](#examples)

---

## Bundle Structure

A bundle is a directory containing a manifest and component files:

```
my-agent-bundle/
├── manifest.json              # Required: Bundle metadata
├── README.md                  # Recommended: Bundle documentation
├── mcp/                       # Optional: MCP server configurations
│   └── servers.json
├── steering/                  # Optional: Steering documents
│   ├── always-included.md
│   ├── context-specific.md
│   └── manual-include.md
├── hooks/                     # Optional: Hook definitions
│   └── hooks.json
└── specs/                     # Optional: Spec templates
    ├── requirements.md
    ├── design.md
    └── tasks.md
```

### File Requirements

| File/Directory | Required | Description |
|----------------|----------|-------------|
| `manifest.json` | ✅ Yes | Bundle metadata and configuration |
| `README.md` | ⚠️ Recommended | Human-readable documentation |
| `mcp/` | ❌ No | MCP server configurations |
| `steering/` | ❌ No | Steering documents |
| `hooks/` | ❌ No | Hook definitions |
| `specs/` | ❌ No | Spec templates |

**Note:** At least one component type (mcp, steering, hooks, or specs) should be present for the bundle to be useful.

---

## Manifest Schema

The `manifest.json` file describes the bundle and its components.

### Complete Example

```json
{
  "id": "react-supabase-expert",
  "name": "React + Supabase Expert",
  "version": "1.0.0",
  "description": "Expert agent for building React apps with Supabase backend",
  "longDescription": "This agent provides comprehensive support for React and Supabase development, including best practices, code generation, testing strategies, and deployment guidance. Perfect for full-stack developers building modern web applications.",
  "author": {
    "name": "Jane Developer",
    "email": "jane@example.com",
    "url": "https://janedeveloper.com"
  },
  "tags": [
    "react",
    "supabase",
    "frontend",
    "backend",
    "full-stack",
    "typescript"
  ],
  "categories": [
    "frontend",
    "backend",
    "full-stack"
  ],
  "previewImage": "/images/react-supabase-expert.png",
  "components": {
    "mcpServers": [
      {
        "name": "supabase-mcp",
        "command": "uvx",
        "args": ["supabase-mcp-server@latest"],
        "env": {
          "SUPABASE_URL": "your-project-url",
          "SUPABASE_KEY": "your-anon-key"
        }
      }
    ],
    "steeringFiles": [
      {
        "filename": "react-best-practices.md",
        "inclusion": "always"
      },
      {
        "filename": "supabase-patterns.md",
        "inclusion": "fileMatch",
        "fileMatchPattern": "**/*.{ts,tsx}"
      }
    ],
    "hooks": [
      {
        "name": "Run tests on save",
        "trigger": "onFileSave",
        "action": "command",
        "content": "npm test -- --run"
      }
    ],
    "specTemplates": [
      {
        "name": "React Component Spec",
        "type": "requirements",
        "filename": "react-component-requirements.md"
      }
    ]
  },
  "dependencies": {
    "external": ["node", "npm"],
    "kiroVersion": ">=1.0.0"
  },
  "examples": [
    {
      "title": "Create a new React component",
      "description": "Generate a new React component with TypeScript and tests",
      "prompt": "Create a Button component with props for variant and size"
    },
    {
      "title": "Set up Supabase authentication",
      "description": "Implement user authentication with Supabase",
      "prompt": "Help me set up email/password authentication with Supabase"
    }
  ],
  "createdAt": "2025-11-24T10:00:00Z",
  "updatedAt": "2025-11-24T15:30:00Z"
}
```

### Field Reference

#### Top-Level Fields

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| `id` | string | ✅ | kebab-case, 3-50 chars | Unique identifier |
| `name` | string | ✅ | 3-100 chars | Display name |
| `version` | string | ✅ | Semantic versioning | Bundle version (e.g., "1.0.0") |
| `description` | string | ✅ | 10-200 chars | Short description for cards |
| `longDescription` | string | ✅ | 20-2000 chars | Detailed description |
| `author` | object | ✅ | See below | Author information |
| `tags` | array | ✅ | 1-20 items, 2-30 chars each | Search tags |
| `categories` | array | ✅ | 1-10 items | Category IDs |
| `previewImage` | string | ❌ | URL or path | Preview image |
| `components` | object | ✅ | See below | Bundle components |
| `dependencies` | object | ❌ | See below | External dependencies |
| `examples` | array | ❌ | See below | Example use cases |
| `createdAt` | string | ✅ | ISO 8601 | Creation timestamp |
| `updatedAt` | string | ✅ | ISO 8601 | Last update timestamp |

#### Author Object

```json
{
  "author": {
    "name": "Author Name",      // Required: 1-100 chars
    "email": "email@example.com", // Optional: Valid email
    "url": "https://website.com"  // Optional: Valid URL
  }
}
```

#### Tags Array

```json
{
  "tags": [
    "react",           // Lowercase recommended
    "typescript",      // 2-30 characters each
    "frontend"         // 1-20 tags total
  ]
}
```

**Best Practices:**
- Use lowercase for consistency
- Include technology names (react, vue, python)
- Include use cases (testing, documentation, api)
- Include skill levels (beginner, advanced)

#### Categories Array

```json
{
  "categories": [
    "frontend",        // Must match category IDs in categories.json
    "full-stack"       // 1-10 categories maximum
  ]
}
```

**Note:** Category IDs must exist in your marketplace's `categories.json` file.

#### Components Object

See [Component Types](#component-types) for detailed specifications.

```json
{
  "components": {
    "mcpServers": [...],      // Optional
    "steeringFiles": [...],   // Optional
    "hooks": [...],           // Optional
    "specTemplates": [...]    // Optional
  }
}
```

#### Dependencies Object

```json
{
  "dependencies": {
    "external": [              // Optional: External tools required
      "node",
      "npm",
      "python"
    ],
    "kiroVersion": ">=1.0.0"   // Optional: Minimum Kiro version
  }
}
```

**Version Operators:**
- `>=1.0.0` - Greater than or equal to
- `>1.0.0` - Greater than
- `<=1.0.0` - Less than or equal to
- `<1.0.0` - Less than
- `=1.0.0` or `1.0.0` - Exact version

#### Examples Array

```json
{
  "examples": [
    {
      "title": "Example Title",           // Required: 1-100 chars
      "description": "What this does",    // Required: 1-500 chars
      "prompt": "Try this prompt"         // Optional: Example prompt
    }
  ]
}
```

---

## Component Types

### 1. MCP Servers

MCP (Model Context Protocol) servers provide additional tools and context to agents.

#### Directory Structure

```
mcp/
└── servers.json
```

#### servers.json Format

```json
{
  "mcpServers": {
    "server-name": {
      "command": "uvx",
      "args": ["package-name@latest"],
      "env": {
        "API_KEY": "your-key",
        "OTHER_VAR": "value"
      }
    }
  }
}
```

#### Manifest Entry

```json
{
  "components": {
    "mcpServers": [
      {
        "name": "server-name",           // Required: Server identifier
        "command": "uvx",                // Required: Command to run
        "args": ["package@latest"],      // Required: Command arguments
        "env": {                         // Optional: Environment variables
          "API_KEY": "your-key"
        }
      }
    ]
  }
}
```

#### Common Commands

| Command | Use Case | Example |
|---------|----------|---------|
| `uvx` | Python packages | `uvx supabase-mcp@latest` |
| `node` | Node.js scripts | `node server.js` |
| `npx` | npm packages | `npx some-package` |

#### Example: Supabase MCP Server

```json
{
  "components": {
    "mcpServers": [
      {
        "name": "supabase-mcp",
        "command": "uvx",
        "args": ["supabase-mcp-server@latest"],
        "env": {
          "SUPABASE_URL": "https://your-project.supabase.co",
          "SUPABASE_KEY": "your-anon-key"
        }
      }
    ]
  }
}
```

**Installation:** MCP servers are merged into `.kiro/mcp/servers.json`

### 2. Steering Files

Steering files are markdown documents that guide agent behavior with instructions and context.

#### Directory Structure

```
steering/
├── always-included.md
├── context-specific.md
└── manual-include.md
```

#### Manifest Entry

```json
{
  "components": {
    "steeringFiles": [
      {
        "filename": "always-included.md",    // Required: Filename (must end in .md)
        "inclusion": "always"                // Required: Inclusion mode
      },
      {
        "filename": "context-specific.md",
        "inclusion": "fileMatch",
        "fileMatchPattern": "**/*.{ts,tsx}"  // Required when inclusion is "fileMatch"
      },
      {
        "filename": "manual-include.md",
        "inclusion": "manual"
      }
    ]
  }
}
```

#### Inclusion Modes

| Mode | Description | When Included |
|------|-------------|---------------|
| `always` | Always in context | Every agent interaction |
| `fileMatch` | Conditional inclusion | When files matching pattern are open |
| `manual` | User-triggered | When user explicitly includes with # |

#### File Match Patterns

Use glob patterns to match files:

```json
{
  "fileMatchPattern": "**/*.{ts,tsx}"      // TypeScript files
}
```

**Common Patterns:**
- `**/*.ts` - All TypeScript files
- `**/*.{js,jsx}` - All JavaScript/JSX files
- `**/test/**` - All files in test directories
- `README*` - All README files

#### Example Steering File

**File:** `steering/react-best-practices.md`

```markdown
# React Best Practices

## Component Structure

When creating React components:

1. Use functional components with hooks
2. Define TypeScript interfaces for props
3. Use meaningful component names (PascalCase)
4. Keep components small and focused

## Example

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

## Testing

Always write tests for components:
- Unit tests for logic
- Integration tests for user interactions
- Accessibility tests
```

**Installation:** Steering files are copied to `.kiro/steering/`

### 3. Hooks

Hooks automate actions based on IDE events.

#### Directory Structure

```
hooks/
└── hooks.json
```

#### hooks.json Format

```json
{
  "hooks": [
    {
      "name": "Hook Name",
      "trigger": "onFileSave",
      "filePattern": "**/*.ts",
      "action": "command",
      "command": "npm test"
    }
  ]
}
```

#### Manifest Entry

```json
{
  "components": {
    "hooks": [
      {
        "name": "Run tests on save",     // Required: Hook name
        "trigger": "onFileSave",         // Required: Event trigger
        "action": "command",             // Required: "command" or "message"
        "content": "npm test -- --run"   // Required: Command or message
      }
    ]
  }
}
```

#### Trigger Types

| Trigger | Description | When Fired |
|---------|-------------|------------|
| `onFileSave` | File saved | After any file is saved |
| `onFileOpen` | File opened | When a file is opened |
| `onSessionStart` | Session started | When Kiro starts |
| `onAgentComplete` | Agent finishes | After agent execution |

#### Action Types

| Action | Description | Content Format |
|--------|-------------|----------------|
| `command` | Run shell command | Shell command string |
| `message` | Send message to agent | Message text |

#### Examples

**Run tests on save:**
```json
{
  "name": "Run tests on save",
  "trigger": "onFileSave",
  "action": "command",
  "content": "npm test -- --run"
}
```

**Lint on save:**
```json
{
  "name": "Lint on save",
  "trigger": "onFileSave",
  "action": "command",
  "content": "npm run lint"
}
```

**Remind about testing:**
```json
{
  "name": "Testing reminder",
  "trigger": "onAgentComplete",
  "action": "message",
  "content": "Don't forget to write tests for the new code!"
}
```

**Installation:** Hooks are registered in `.kiro/hooks/`

### 4. Spec Templates

Spec templates provide pre-configured requirement and design templates for common patterns.

#### Directory Structure

```
specs/
├── requirements.md
├── design.md
└── tasks.md
```

#### Manifest Entry

```json
{
  "components": {
    "specTemplates": [
      {
        "name": "React Component Requirements",  // Required: Template name
        "type": "requirements",                  // Required: "requirements", "design", or "tasks"
        "filename": "requirements.md"            // Required: Filename (must end in .md)
      },
      {
        "name": "API Design Template",
        "type": "design",
        "filename": "api-design.md"
      }
    ]
  }
}
```

#### Template Types

| Type | Description | Use Case |
|------|-------------|----------|
| `requirements` | Requirements document | Define what to build |
| `design` | Design document | Define how to build it |
| `tasks` | Tasks document | Define implementation steps |

#### Example Requirements Template

**File:** `specs/requirements.md`

```markdown
# Requirements Document

## Introduction

[Describe the feature or system you're building]

## Glossary

- **Term**: Definition

## Requirements

### Requirement 1

**User Story:** As a [role], I want [feature], so that [benefit]

#### Acceptance Criteria

1. WHEN [event] THEN the system SHALL [response]
2. WHILE [condition] THE system SHALL [response]
3. IF [condition] THEN the system SHALL [response]

### Requirement 2

...
```

**Installation:** Spec templates are copied to `.kiro/specs/templates/`

---

## Validation Rules

### Manifest Validation

The CLI validates manifests against the JSON schema. Common validation errors:

#### Missing Required Fields

```
❌ Validation failed: Missing required field 'version'
```

**Fix:** Add all required fields to manifest.json

#### Invalid ID Format

```
❌ Validation failed: 'id' must be in kebab-case format
```

**Fix:** Use lowercase letters, numbers, and hyphens only:
- ✅ `my-agent-bundle`
- ❌ `My_Agent_Bundle`
- ❌ `myAgentBundle`

#### Invalid Version Format

```
❌ Validation failed: 'version' must follow semantic versioning
```

**Fix:** Use format `MAJOR.MINOR.PATCH`:
- ✅ `1.0.0`
- ✅ `2.3.1`
- ❌ `1.0`
- ❌ `v1.0.0`

#### Invalid Category

```
❌ Validation failed: Category 'invalid-category' not found in categories.json
```

**Fix:** Use only category IDs defined in your marketplace's `categories.json`

### File Validation

The CLI also validates that referenced files exist:

```
❌ Validation failed: File 'steering/missing-file.md' referenced in manifest not found
```

**Fix:** Ensure all files referenced in the manifest exist in the bundle directory.

### Running Validation

```bash
kiro-agent validate path/to/bundle
```

**Output (Success):**
```
✅ Bundle validation successful!

Bundle: my-agent-bundle v1.0.0
Components:
  • 2 MCP servers
  • 3 steering files
  • 1 hook
  • 2 spec templates

Ready for packaging!
```

**Output (Failure):**
```
❌ Validation failed for bundle 'my-agent-bundle'

Issues found:
  • manifest.json: Missing required field 'version'
  • manifest.json: Invalid author.email format
  • steering/missing.md: File referenced in manifest not found

Fix these issues and run 'kiro-agent validate' again.
```

---

## Best Practices

### Manifest Best Practices

✅ **DO:**
- Use descriptive, unique IDs (kebab-case)
- Write clear, concise descriptions
- Include relevant tags for discoverability
- Provide example use cases
- Keep longDescription under 500 words
- Use semantic versioning
- Update `updatedAt` when making changes

❌ **DON'T:**
- Use special characters in IDs
- Write vague descriptions ("A helpful agent")
- Include too many tags (>10)
- Forget to update version numbers
- Include sensitive data (API keys, passwords)

### Component Best Practices

#### MCP Servers

✅ **DO:**
- Use environment variables for configuration
- Document required environment variables
- Test MCP servers before bundling
- Use version pinning (`@latest` or `@1.0.0`)

❌ **DON'T:**
- Hardcode API keys or secrets
- Use untested or experimental servers
- Forget to document setup requirements

#### Steering Files

✅ **DO:**
- Write clear, actionable guidance
- Include code examples
- Use markdown formatting
- Keep files focused (one topic per file)
- Use `always` inclusion for core guidance
- Use `fileMatch` for context-specific guidance

❌ **DON'T:**
- Write overly long documents (>1000 lines)
- Include outdated information
- Use vague language
- Duplicate content across files

#### Hooks

✅ **DO:**
- Use descriptive hook names
- Test hooks before bundling
- Document what the hook does
- Use appropriate triggers
- Keep commands simple

❌ **DON'T:**
- Create hooks that run too frequently
- Use long-running commands
- Forget to handle errors
- Create conflicting hooks

#### Spec Templates

✅ **DO:**
- Provide clear structure
- Include examples and placeholders
- Follow EARS patterns for requirements
- Make templates easy to customize

❌ **DON'T:**
- Create overly complex templates
- Include project-specific content
- Forget to document template usage

### Bundle Size

- **Recommended:** < 1MB
- **Maximum:** < 5MB
- **Large files:** Use external URLs instead

### Documentation

Always include a `README.md` with:
- Bundle description
- Installation instructions
- Configuration requirements
- Usage examples
- Troubleshooting tips

---

## Examples

### Minimal Bundle

A simple bundle with just a steering file:

**manifest.json:**
```json
{
  "id": "minimal-agent",
  "name": "Minimal Agent",
  "version": "1.0.0",
  "description": "A minimal example agent bundle",
  "longDescription": "This is a minimal example showing the simplest possible agent bundle with just a steering file.",
  "author": {
    "name": "Example Author"
  },
  "tags": ["example", "minimal"],
  "categories": ["productivity"],
  "components": {
    "steeringFiles": [
      {
        "filename": "guidance.md",
        "inclusion": "always"
      }
    ]
  },
  "createdAt": "2025-11-24T10:00:00Z",
  "updatedAt": "2025-11-24T10:00:00Z"
}
```

**steering/guidance.md:**
```markdown
# Minimal Agent Guidance

This agent helps with basic tasks.

## Rules

- Be helpful and concise
- Provide clear examples
- Ask clarifying questions when needed
```

### Full-Featured Bundle

A comprehensive bundle with all component types:

**manifest.json:**
```json
{
  "id": "full-stack-expert",
  "name": "Full-Stack Development Expert",
  "version": "2.1.0",
  "description": "Complete full-stack development agent with React, Node.js, and PostgreSQL support",
  "longDescription": "This comprehensive agent provides expert guidance for full-stack web development. Includes MCP servers for database access, steering files for best practices, automated testing hooks, and spec templates for common patterns. Perfect for building modern web applications with React frontends and Node.js backends.",
  "author": {
    "name": "Full Stack Team",
    "email": "team@fullstack.dev",
    "url": "https://fullstack.dev"
  },
  "tags": [
    "react",
    "nodejs",
    "postgresql",
    "typescript",
    "full-stack",
    "web-development"
  ],
  "categories": [
    "frontend",
    "backend",
    "full-stack"
  ],
  "previewImage": "/images/full-stack-expert.png",
  "components": {
    "mcpServers": [
      {
        "name": "postgres-mcp",
        "command": "uvx",
        "args": ["postgres-mcp-server@latest"],
        "env": {
          "DATABASE_URL": "postgresql://localhost:5432/mydb"
        }
      }
    ],
    "steeringFiles": [
      {
        "filename": "react-patterns.md",
        "inclusion": "fileMatch",
        "fileMatchPattern": "**/*.{tsx,jsx}"
      },
      {
        "filename": "nodejs-best-practices.md",
        "inclusion": "fileMatch",
        "fileMatchPattern": "**/server/**/*.ts"
      },
      {
        "filename": "general-guidance.md",
        "inclusion": "always"
      }
    ],
    "hooks": [
      {
        "name": "Run tests on save",
        "trigger": "onFileSave",
        "action": "command",
        "content": "npm test -- --run"
      },
      {
        "name": "Type check on save",
        "trigger": "onFileSave",
        "action": "command",
        "content": "tsc --noEmit"
      }
    ],
    "specTemplates": [
      {
        "name": "API Endpoint Requirements",
        "type": "requirements",
        "filename": "api-requirements.md"
      },
      {
        "name": "Component Design",
        "type": "design",
        "filename": "component-design.md"
      }
    ]
  },
  "dependencies": {
    "external": ["node", "npm", "postgresql"],
    "kiroVersion": ">=1.0.0"
  },
  "examples": [
    {
      "title": "Create REST API endpoint",
      "description": "Generate a new REST API endpoint with validation and tests",
      "prompt": "Create a POST /api/users endpoint with email validation"
    },
    {
      "title": "Build React component",
      "description": "Create a new React component with TypeScript and Storybook",
      "prompt": "Create a Card component with title, description, and image props"
    }
  ],
  "createdAt": "2025-10-15T08:00:00Z",
  "updatedAt": "2025-11-24T14:30:00Z"
}
```

---

## Packaging and Distribution

### Creating a Package

```bash
kiro-agent package path/to/bundle
```

This creates `bundle-name-version.zip` containing:
- manifest.json
- All component files
- README.md (if present)

### Distribution Methods

1. **GitHub Releases** (Recommended)
   - Upload ZIP to GitHub release
   - Update agents.json with download URL

2. **Direct Download**
   - Host ZIP on any web server
   - Provide URL in agents.json

3. **Local Installation**
   - Keep bundle directory locally
   - Install with `kiro-agent install ./path/to/bundle`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-11-24 | Initial specification |

---

## Resources

- **SKELETON_GUIDE.md** - How to create a marketplace
- **KIRO_USAGE.md** - How Kiro was used to build this
- **JSON Schema** - `skeleton/shared/schemas/manifest.schema.json`

---

## Support

For questions or issues with the bundle format:
- Open an issue on GitHub
- Check existing bundles for examples
- Consult the validation error messages

**Happy bundling! 🎃**
