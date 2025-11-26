# @haunted-agents/cli

> CLI tool for managing Haunted Agent bundles - Install, create, and manage AI agent configurations for Kiro IDE

[![npm version](https://img.shields.io/npm/v/@haunted-agents/cli.svg)](https://www.npmjs.com/package/@haunted-agents/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is this?

The Haunted Agents CLI is a command-line tool for managing **agent bundles** - packaged collections of AI agent configurations that include:

- 🔌 **MCP Servers** - Model Context Protocol servers for extended capabilities
- 📝 **Steering Files** - Instructions and context that guide agent behavior
- 🪝 **Hooks** - Automated triggers for agent actions
- 📋 **Spec Templates** - Pre-configured requirement and design templates

## Installation

### Global Installation (Recommended)

```bash
npm install -g @haunted-agents/cli
```

### Local Installation

```bash
npm install @haunted-agents/cli
```

## Quick Start

```bash
# Install an agent bundle
kiro-agent install react-supabase-expert

# List installed agents
kiro-agent list

# Get help
kiro-agent --help
```

## Commands

### `install <bundle-id>`

Install an agent bundle from the registry.

```bash
kiro-agent install react-supabase-expert
```

**Options:**
- `--force` - Reinstall even if already installed
- `--registry <url>` - Use a custom registry URL

**Example:**
```bash
kiro-agent install api-wizard --force
```

### `list`

List all installed agent bundles.

```bash
kiro-agent list
```

Shows:
- Bundle name and version
- Installation date
- Active components (MCP servers, steering files, hooks, spec templates)

### `create <bundle-name>`

Create a new agent bundle with template files.

```bash
kiro-agent create my-custom-agent
```

This generates:
- `manifest.json` - Bundle metadata
- `mcp/` - Directory for MCP server configs
- `steering/` - Directory for steering files
- `hooks/` - Directory for hook definitions
- `specs/` - Directory for spec templates
- `README.md` - Bundle documentation

### `validate <bundle-path>`

Validate a bundle's structure and manifest.

```bash
kiro-agent validate ./my-custom-agent
```

Checks:
- ✓ Manifest JSON is valid
- ✓ All required fields are present
- ✓ Referenced files exist
- ✓ Version format is correct

### `package <bundle-path>`

Package a bundle into a distributable ZIP file.

```bash
kiro-agent package ./my-custom-agent
```

Creates a `.zip` file ready for distribution.

**Options:**
- `--output <path>` - Specify output directory

## Configuration

The CLI stores configuration in `~/.kiro-agent/`:

```
~/.kiro-agent/
├── config.json          # CLI configuration
└── registry.json        # Installed bundles registry
```

### Custom Registry

To use a custom registry:

```bash
kiro-agent install my-agent --registry https://my-registry.com/agents.json
```

Or set it globally in `~/.kiro-agent/config.json`:

```json
{
  "registryUrl": "https://my-registry.com/agents.json"
}
```

## Bundle Format

A bundle is a directory with this structure:

```
my-agent/
├── manifest.json              # Required: Bundle metadata
├── mcp/
│   └── servers.json          # MCP server configurations
├── steering/
│   ├── always-included.md    # Always-included steering
│   └── context-specific.md   # Conditionally-included steering
├── hooks/
│   └── hooks.json            # Hook definitions
├── specs/
│   ├── requirements.md       # Spec templates
│   └── design.md
└── README.md                  # Bundle documentation
```

### Manifest Schema

```json
{
  "id": "my-agent",
  "name": "My Custom Agent",
  "version": "1.0.0",
  "description": "A custom agent for...",
  "author": {
    "name": "Your Name",
    "email": "you@example.com"
  },
  "tags": ["tag1", "tag2"],
  "categories": ["category1"],
  "components": {
    "mcpServers": [...],
    "steeringFiles": [...],
    "hooks": [...],
    "specTemplates": [...]
  }
}
```

See [BUNDLE_FORMAT.md](../../BUNDLE_FORMAT.md) for complete specification.

## Examples

### Installing Multiple Agents

```bash
kiro-agent install react-supabase-expert
kiro-agent install api-wizard
kiro-agent install test-coach
```

### Creating and Publishing a Bundle

```bash
# Create bundle
kiro-agent create my-agent

# Edit files in my-agent/
# ...

# Validate
kiro-agent validate ./my-agent

# Package
kiro-agent package ./my-agent

# Distribute the generated ZIP file
```

### Checking Installed Agents

```bash
kiro-agent list
```

Output:
```
Installed Agents:

react-supabase-expert (v1.0.0)
  Installed: 2025-11-24
  Components: 1 MCP server, 2 steering files, 1 hook

api-wizard (v1.0.0)
  Installed: 2025-11-24
  Components: 2 steering files, 1 spec template
```

## Troubleshooting

### "Unable to connect to registry"

Check your internet connection and verify the registry URL is accessible.

### "Bundle already installed"

Use `--force` to reinstall:
```bash
kiro-agent install my-agent --force
```

### "Validation failed"

Run validate to see specific errors:
```bash
kiro-agent validate ./my-agent
```

### Permission Errors

On Unix systems, you may need to use `sudo` for global installation:
```bash
sudo npm install -g @haunted-agents/cli
```

## Development

### Setup

```bash
# Clone repository
git clone https://github.com/yourusername/haunted-agents-marketplace.git
cd haunted-agents-marketplace/skeleton/cli

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test
```

### Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Run specific test
npm test -- registry.test.ts
```

### Building

```bash
npm run build
```

Output is in `dist/` directory.

### Architecture

#### Core Components

- **LocalRegistry** (`src/core/localRegistry.ts`) - Manages local installation registry at `~/.kiro-agent/registry.json`
- **Registry** (`src/core/registry.ts`) - Fetches bundles from remote registry with retry logic and error handling
- **Installer** (`src/core/installer.ts`) - Handles bundle installation to .kiro directories
- **Commands** (`src/commands/`) - CLI command implementations

#### Features

- ✅ Local registry management (getInstalled, addInstalled, removeInstalled, isInstalled)
- ✅ Remote registry client with exponential backoff retry (3 attempts: 1s, 2s, 4s)
- ✅ Bundle search functionality (searches name, description, tags, categories)
- ✅ Network error handling with clear error messages
- ✅ MCP configuration merging without overwriting
- ✅ TypeScript with strict type checking
- ✅ Comprehensive test coverage with Vitest

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

MIT © Haunted Agents Team

## Links

- [GitHub Repository](https://github.com/yourusername/haunted-agents-marketplace)
- [Documentation](https://github.com/yourusername/haunted-agents-marketplace#readme)
- [Issue Tracker](https://github.com/yourusername/haunted-agents-marketplace/issues)
- [Kiro Agents Marketplace](https://kiro-marketplace.vercel.app)
- [DevOps Automation Hub](https://devops-hub.vercel.app)

## Related Projects

- [Kiro IDE](https://kiro.ai) - The AI-powered IDE
- [MCP Specification](https://modelcontextprotocol.io) - Model Context Protocol

---

Made with 🎃 for the Kiroween Hackathon
