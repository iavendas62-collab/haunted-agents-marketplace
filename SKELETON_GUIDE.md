# Skeleton Guide: Building Your Own Agent Marketplace

## Overview

The Haunted Agents Marketplace skeleton is a **reusable template** for building agent marketplace platforms. This guide will walk you through creating your own customized marketplace by configuring the skeleton for your specific domain.

**What You Get:**
- 🎨 **Web Frontend** - React-based marketplace UI for browsing and discovering agents
- 🛠️ **CLI Tool** - Command-line interface for installing and managing agent bundles
- 📦 **Bundle System** - Standardized format for packaging agent configurations

**Key Principle:** The skeleton is **domain-agnostic**. All domain-specific content (agent listings, categories, branding) is defined in configuration files, not hardcoded in the source code.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Understanding the Architecture](#understanding-the-architecture)
3. [Configuration Files](#configuration-files)
4. [Creating Your Marketplace](#creating-your-marketplace)
5. [Creating Agent Bundles](#creating-agent-bundles)
6. [Customizing the Web Frontend](#customizing-the-web-frontend)
7. [Deploying Your Marketplace](#deploying-your-marketplace)
8. [Advanced Customization](#advanced-customization)
9. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Git installed
- Basic knowledge of JSON and React (for customization)

### 5-Minute Setup

1. **Clone the repository:**
```bash
git clone https://github.com/haunted-agents/marketplace.git
cd marketplace
```

2. **Install dependencies:**
```bash
npm install
cd skeleton/web && npm install
cd ../cli && npm install
cd ../shared && npm install
```

3. **Create your application directory:**
```bash
mkdir app3-my-marketplace
cd app3-my-marketplace
mkdir config bundles public/images
```

4. **Copy configuration templates:**
```bash
cp ../app1-kiro-marketplace/config/branding.json config/
cp ../app1-kiro-marketplace/config/categories.json config/
cp ../app1-kiro-marketplace/config/agents.json config/
```

5. **Customize the configuration files** (see [Configuration Files](#configuration-files))

6. **Run the web frontend:**
```bash
cd ../skeleton/web
VITE_CONFIG_PATH=../../app3-my-marketplace/config npm run dev
```

7. **Open your browser** to `http://localhost:5173`

That's it! You now have a working marketplace. Continue reading to learn how to customize it.

---

## Understanding the Architecture

### Directory Structure

```
/
├── skeleton/                    # Reusable template code (DO NOT MODIFY)
│   ├── web/                     # React frontend
│   ├── cli/                     # Node.js CLI tool
│   └── shared/                  # Shared types and schemas
│
├── app1-kiro-marketplace/       # Example: Kiro Agents Marketplace
│   ├── config/                  # Configuration files
│   ├── bundles/                 # Agent bundle definitions
│   └── public/images/           # Preview images
│
├── app2-devops-hub/             # Example: DevOps Automation Hub
│   ├── config/                  # Configuration files
│   ├── bundles/                 # Agent bundle definitions
│   └── public/images/           # Preview images
│
└── app3-my-marketplace/         # YOUR marketplace
    ├── config/                  # YOUR configuration files
    ├── bundles/                 # YOUR agent bundles
    └── public/images/           # YOUR preview images
```

### How It Works

1. **Skeleton Code** - Generic, reusable components that work with any configuration
2. **Configuration Files** - JSON files that define your marketplace's content and branding
3. **Agent Bundles** - Packaged collections of MCP servers, steering files, hooks, and spec templates
4. **Web Frontend** - Loads configuration and displays your agents
5. **CLI Tool** - Installs bundles into users' Kiro environments

**Key Insight:** You never modify the skeleton code. You only create configuration files and agent bundles.

---

## Configuration Files

Your marketplace is defined by three JSON configuration files in the `config/` directory:

### 1. branding.json

Defines your marketplace's visual identity and branding.

**Structure:**
```json
{
  "name": "Your Marketplace Name",
  "logo": "/images/your-logo.svg",
  "primaryColor": "#6366f1",
  "secondaryColor": "#8b5cf6",
  "accentColor": "#ec4899",
  "tagline": "Your catchy tagline here",
  "description": "A longer description of your marketplace",
  "footer": {
    "copyright": "© 2025 Your Organization",
    "links": [
      {
        "text": "Documentation",
        "url": "https://your-docs-url.com"
      },
      {
        "text": "GitHub",
        "url": "https://github.com/your-org/your-repo"
      }
    ]
  },
  "hero": {
    "title": "Hero Section Title",
    "subtitle": "Hero section subtitle",
    "ctaText": "Call to Action Button Text",
    "backgroundGradient": "from-indigo-500 via-purple-500 to-pink-500"
  }
}
```

**Fields Explained:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Your marketplace name (shown in header) |
| `logo` | string | ✅ | Path to logo image (relative to public/) |
| `primaryColor` | string | ✅ | Primary brand color (hex code) |
| `secondaryColor` | string | ✅ | Secondary brand color (hex code) |
| `accentColor` | string | ✅ | Accent color for highlights (hex code) |
| `tagline` | string | ✅ | Short tagline (1-2 sentences) |
| `description` | string | ✅ | Longer description (2-3 sentences) |
| `footer.copyright` | string | ✅ | Copyright text |
| `footer.links` | array | ✅ | Footer links (text + url) |
| `hero.title` | string | ✅ | Hero section main title |
| `hero.subtitle` | string | ✅ | Hero section subtitle |
| `hero.ctaText` | string | ✅ | Call-to-action button text |
| `hero.backgroundGradient` | string | ✅ | Tailwind gradient classes |

**Example - Gaming Marketplace:**
```json
{
  "name": "Game Dev Agents Hub",
  "logo": "/images/gamedev-logo.svg",
  "primaryColor": "#ef4444",
  "secondaryColor": "#dc2626",
  "accentColor": "#f59e0b",
  "tagline": "Level up your game development with AI agents",
  "description": "Discover specialized AI agents for Unity, Unreal, Godot, and more. Build better games faster.",
  "footer": {
    "copyright": "© 2025 Game Dev Agents Hub",
    "links": [
      { "text": "Docs", "url": "https://docs.gamedevagents.com" },
      { "text": "Discord", "url": "https://discord.gg/gamedev" }
    ]
  },
  "hero": {
    "title": "Build Better Games",
    "subtitle": "AI-powered agents for game developers",
    "ctaText": "Explore Agents",
    "backgroundGradient": "from-red-500 via-orange-500 to-yellow-500"
  }
}
```

### 2. categories.json

Defines the categories for organizing your agents.

**Structure:**
```json
{
  "categories": [
    {
      "id": "category-id",
      "name": "Category Display Name",
      "icon": "🎨",
      "description": "Category description"
    }
  ]
}
```

**Fields Explained:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier (kebab-case) |
| `name` | string | ✅ | Display name shown in UI |
| `icon` | string | ✅ | Emoji icon (single emoji) |
| `description` | string | ✅ | Short description of category |

**Example - Gaming Marketplace:**
```json
{
  "categories": [
    {
      "id": "unity",
      "name": "Unity Development",
      "icon": "🎮",
      "description": "Agents for Unity game engine development"
    },
    {
      "id": "unreal",
      "name": "Unreal Engine",
      "icon": "🎯",
      "description": "Agents for Unreal Engine development"
    },
    {
      "id": "2d-art",
      "name": "2D Art & Animation",
      "icon": "🎨",
      "description": "Pixel art, sprites, and 2D animation tools"
    },
    {
      "id": "3d-modeling",
      "name": "3D Modeling",
      "icon": "🗿",
      "description": "3D modeling, texturing, and rigging"
    },
    {
      "id": "audio",
      "name": "Audio & Music",
      "icon": "🎵",
      "description": "Sound effects, music composition, and audio design"
    }
  ]
}
```

**Tips:**
- Keep category IDs short and descriptive
- Use relevant emojis that represent the category
- Aim for 4-8 categories (too many = overwhelming)
- Descriptions should be 1 sentence

### 3. agents.json

Defines the agent bundles available in your marketplace.

**Structure:**
```json
{
  "version": "1.0.0",
  "featured": ["bundle-id-1", "bundle-id-2"],
  "bundles": [
    {
      "id": "bundle-id",
      "name": "Bundle Display Name",
      "version": "1.0.0",
      "description": "Short description",
      "longDescription": "Detailed description with multiple sentences...",
      "author": {
        "name": "Author Name",
        "email": "author@example.com",
        "url": "https://author-website.com"
      },
      "tags": ["tag1", "tag2", "tag3"],
      "categories": ["category-id-1", "category-id-2"],
      "previewImage": "/images/bundle-preview.png",
      "components": {
        "mcpServers": [...],
        "steeringFiles": [...],
        "hooks": [...],
        "specTemplates": [...]
      },
      "examples": [
        {
          "title": "Example Use Case",
          "description": "Description of what this does",
          "prompt": "Example prompt to try"
        }
      ],
      "createdAt": "2025-11-24T10:00:00Z",
      "updatedAt": "2025-11-24T10:00:00Z"
    }
  ]
}
```

**Top-Level Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | ✅ | Registry version (semantic versioning) |
| `featured` | array | ❌ | Array of bundle IDs to feature |
| `bundles` | array | ✅ | Array of bundle manifests |

**Bundle Manifest Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier (kebab-case) |
| `name` | string | ✅ | Display name |
| `version` | string | ✅ | Bundle version (semantic versioning) |
| `description` | string | ✅ | Short description (1-2 sentences) |
| `longDescription` | string | ✅ | Detailed description (multiple sentences) |
| `author` | object | ✅ | Author information |
| `tags` | array | ✅ | Search tags (lowercase) |
| `categories` | array | ✅ | Category IDs (must match categories.json) |
| `previewImage` | string | ❌ | Path to preview image |
| `components` | object | ✅ | Bundle components (see below) |
| `examples` | array | ❌ | Example use cases |
| `createdAt` | string | ✅ | ISO 8601 timestamp |
| `updatedAt` | string | ✅ | ISO 8601 timestamp |

**Component Types:**

See [Creating Agent Bundles](#creating-agent-bundles) for detailed component structure.

---

## Creating Your Marketplace

### Step-by-Step Guide

#### Step 1: Create Application Directory

```bash
mkdir app3-my-marketplace
cd app3-my-marketplace
mkdir -p config bundles public/images
```

#### Step 2: Define Your Branding

Create `config/branding.json`:

```json
{
  "name": "My Awesome Marketplace",
  "logo": "/images/logo.svg",
  "primaryColor": "#3b82f6",
  "secondaryColor": "#2563eb",
  "accentColor": "#f59e0b",
  "tagline": "Your marketplace tagline",
  "description": "A description of what your marketplace offers.",
  "footer": {
    "copyright": "© 2025 My Organization",
    "links": [
      { "text": "Docs", "url": "https://docs.example.com" },
      { "text": "GitHub", "url": "https://github.com/example" }
    ]
  },
  "hero": {
    "title": "Welcome to My Marketplace",
    "subtitle": "Discover amazing agents",
    "ctaText": "Get Started",
    "backgroundGradient": "from-blue-500 via-cyan-500 to-teal-500"
  }
}
```

#### Step 3: Define Your Categories

Create `config/categories.json`:

```json
{
  "categories": [
    {
      "id": "productivity",
      "name": "Productivity",
      "icon": "⚡",
      "description": "Boost your productivity with these agents"
    },
    {
      "id": "creativity",
      "name": "Creativity",
      "icon": "🎨",
      "description": "Creative tools and artistic agents"
    }
  ]
}
```

#### Step 4: Create Your First Agent Bundle

See [Creating Agent Bundles](#creating-agent-bundles) for detailed instructions.

#### Step 5: Register Your Bundles

Create `config/agents.json`:

```json
{
  "version": "1.0.0",
  "featured": ["my-first-agent"],
  "bundles": [
    {
      "id": "my-first-agent",
      "name": "My First Agent",
      "version": "1.0.0",
      "description": "A helpful agent for getting started",
      "longDescription": "This agent helps you get started with the marketplace by providing examples and guidance.",
      "author": {
        "name": "Your Name",
        "email": "you@example.com"
      },
      "tags": ["beginner", "tutorial", "getting-started"],
      "categories": ["productivity"],
      "previewImage": "/images/my-first-agent.png",
      "components": {
        "steeringFiles": [
          {
            "filename": "getting-started.md",
            "inclusion": "always"
          }
        ]
      },
      "examples": [
        {
          "title": "Get Started",
          "description": "Learn the basics",
          "prompt": "Help me understand how to use this agent"
        }
      ],
      "createdAt": "2025-11-24T10:00:00Z",
      "updatedAt": "2025-11-24T10:00:00Z"
    }
  ]
}
```

#### Step 6: Add Preview Images

Add your logo and preview images to `public/images/`:

```bash
# Add your logo
cp /path/to/your/logo.svg public/images/logo.svg

# Add preview images for each bundle
cp /path/to/preview.png public/images/my-first-agent.png
```

#### Step 7: Test Your Marketplace

```bash
cd ../../skeleton/web
VITE_CONFIG_PATH=../../app3-my-marketplace/config npm run dev
```

Open `http://localhost:5173` and verify:
- ✅ Your branding appears correctly
- ✅ Categories are displayed
- ✅ Your agent bundle is listed
- ✅ Featured badge shows on featured agents
- ✅ Search works
- ✅ Category filtering works

---

## Creating Agent Bundles

Agent bundles are packages that contain MCP servers, steering files, hooks, and spec templates.

### Bundle Directory Structure

```
bundles/my-agent/
├── manifest.json              # Bundle metadata
├── README.md                  # Bundle documentation
├── mcp/                       # MCP server configs (optional)
│   └── servers.json
├── steering/                  # Steering files (optional)
│   ├── always-included.md
│   └── context-specific.md
├── hooks/                     # Hook definitions (optional)
│   └── hooks.json
└── specs/                     # Spec templates (optional)
    ├── requirements.md
    └── design.md
```

### Creating a Bundle with the CLI

```bash
# Install the CLI globally
cd skeleton/cli
npm link

# Create a new bundle
kiro-agent create my-agent

# This generates:
# bundles/my-agent/
#   ├── manifest.json
#   ├── README.md
#   ├── mcp/
#   ├── steering/
#   ├── hooks/
#   └── specs/
```

### Bundle Manifest (manifest.json)

The manifest describes your bundle:

```json
{
  "id": "my-agent",
  "name": "My Agent",
  "version": "1.0.0",
  "description": "Short description",
  "longDescription": "Detailed description...",
  "author": {
    "name": "Your Name",
    "email": "you@example.com",
    "url": "https://yourwebsite.com"
  },
  "tags": ["tag1", "tag2"],
  "categories": ["category1"],
  "previewImage": "/images/my-agent.png",
  "components": {
    "mcpServers": [
      {
        "name": "my-mcp-server",
        "command": "uvx",
        "args": ["my-mcp-package@latest"],
        "env": {
          "API_KEY": "your-api-key"
        }
      }
    ],
    "steeringFiles": [
      {
        "filename": "my-steering.md",
        "inclusion": "always"
      }
    ],
    "hooks": [
      {
        "name": "My Hook",
        "trigger": "onFileSave",
        "action": "command",
        "content": "npm test"
      }
    ],
    "specTemplates": [
      {
        "name": "My Spec Template",
        "type": "requirements",
        "filename": "requirements-template.md"
      }
    ]
  },
  "dependencies": {
    "external": ["node", "npm"],
    "kiroVersion": ">=1.0.0"
  },
  "examples": [
    {
      "title": "Example 1",
      "description": "How to use this feature",
      "prompt": "Show me how to..."
    }
  ],
  "createdAt": "2025-11-24T10:00:00Z",
  "updatedAt": "2025-11-24T10:00:00Z"
}
```

### Component Types

#### 1. MCP Servers

MCP servers provide additional tools and context to agents.

**File:** `mcp/servers.json`

```json
{
  "mcpServers": {
    "my-server": {
      "command": "uvx",
      "args": ["my-package@latest"],
      "env": {
        "API_KEY": "your-key"
      }
    }
  }
}
```

**Manifest Entry:**
```json
{
  "components": {
    "mcpServers": [
      {
        "name": "my-server",
        "command": "uvx",
        "args": ["my-package@latest"],
        "env": { "API_KEY": "your-key" }
      }
    ]
  }
}
```

#### 2. Steering Files

Steering files guide agent behavior with instructions and context.

**File:** `steering/my-steering.md`

```markdown
# My Steering Document

## Purpose

This steering document provides guidance for...

## Rules

- Always follow best practices
- Use TypeScript for type safety
- Write tests for all functions

## Examples

...
```

**Manifest Entry:**
```json
{
  "components": {
    "steeringFiles": [
      {
        "filename": "my-steering.md",
        "inclusion": "always"
      }
    ]
  }
}
```

**Inclusion Options:**
- `"always"` - Always included in context
- `"manual"` - User must explicitly include with #
- `"fileMatch"` - Included when specific files are open

#### 3. Hooks

Hooks automate actions based on IDE events.

**File:** `hooks/hooks.json`

```json
{
  "hooks": [
    {
      "name": "Run tests on save",
      "trigger": "onFileSave",
      "filePattern": "**/*.ts",
      "action": "command",
      "command": "npm test"
    }
  ]
}
```

**Manifest Entry:**
```json
{
  "components": {
    "hooks": [
      {
        "name": "Run tests on save",
        "trigger": "onFileSave",
        "action": "command",
        "content": "npm test"
      }
    ]
  }
}
```

#### 4. Spec Templates

Spec templates provide pre-configured requirement and design templates.

**File:** `specs/requirements-template.md`

```markdown
# Requirements Document

## Introduction

[Your introduction here]

## Requirements

### Requirement 1

**User Story:** As a [role], I want [feature], so that [benefit]

#### Acceptance Criteria

1. WHEN [event] THEN the system SHALL [response]
...
```

**Manifest Entry:**
```json
{
  "components": {
    "specTemplates": [
      {
        "name": "My Requirements Template",
        "type": "requirements",
        "filename": "requirements-template.md"
      }
    ]
  }
}
```

### Validating Your Bundle

```bash
kiro-agent validate bundles/my-agent
```

This checks:
- ✅ Manifest is valid JSON
- ✅ All required fields are present
- ✅ All referenced files exist
- ✅ Version format is correct

### Packaging Your Bundle

```bash
kiro-agent package bundles/my-agent
```

This creates `my-agent-1.0.0.zip` containing all bundle files.

---

## Customizing the Web Frontend

### Using Your Configuration

The web frontend automatically loads configuration from your application directory:

```bash
cd skeleton/web
VITE_CONFIG_PATH=../../app3-my-marketplace/config npm run dev
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_CONFIG_PATH` | Path to config directory | `../../app1-kiro-marketplace/config` |
| `VITE_REGISTRY_URL` | URL to agents.json | (uses local config) |

### Building for Production

```bash
cd skeleton/web
VITE_CONFIG_PATH=../../app3-my-marketplace/config npm run build
```

This creates a `dist/` directory with your customized marketplace.

### Customizing Styles

The skeleton uses TailwindCSS. Colors from `branding.json` are automatically applied.

**To add custom styles:**

1. Create `app3-my-marketplace/styles/custom.css`:
```css
/* Custom styles for your marketplace */
.my-custom-class {
  /* your styles */
}
```

2. Import in your build process (advanced)

---

## Deploying Your Marketplace

### Option 1: Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add app3-my-marketplace/
git commit -m "Add my marketplace"
git push
```

2. **Connect to Vercel:**
- Go to [vercel.com](https://vercel.com)
- Import your repository
- Set build settings:
  - **Framework Preset:** Vite
  - **Root Directory:** `skeleton/web`
  - **Build Command:** `npm run build`
  - **Output Directory:** `dist`

3. **Set Environment Variables:**
```
VITE_CONFIG_PATH=../../app3-my-marketplace/config
```

4. **Deploy!**

Your marketplace will be live at `https://your-project.vercel.app`

### Option 2: Netlify

Similar to Vercel:
- Build command: `npm run build`
- Publish directory: `skeleton/web/dist`
- Environment: `VITE_CONFIG_PATH=../../app3-my-marketplace/config`

### Option 3: Static Hosting

Build locally and upload to any static host:

```bash
cd skeleton/web
VITE_CONFIG_PATH=../../app3-my-marketplace/config npm run build
# Upload dist/ to your hosting provider
```

---

## Advanced Customization

### Custom Components

To add custom React components:

1. Create components in `skeleton/web/src/components/`
2. Use TypeScript interfaces for props
3. Load data from ConfigContext
4. Follow the skeleton development guidelines

**Example:**
```typescript
import { useConfig } from '../contexts/ConfigContext';

export const CustomComponent: React.FC = () => {
  const { config } = useConfig();
  
  return (
    <div>
      <h2>{config.branding.name}</h2>
      {/* Your custom content */}
    </div>
  );
};
```

### Custom CLI Commands

To add custom CLI commands:

1. Create command in `skeleton/cli/src/commands/`
2. Implement `CLICommand` interface
3. Register in `skeleton/cli/src/index.ts`

### Multiple Marketplaces

You can run multiple marketplaces from the same skeleton:

```bash
# Marketplace 1
VITE_CONFIG_PATH=../../app1-kiro-marketplace/config npm run dev

# Marketplace 2
VITE_CONFIG_PATH=../../app2-devops-hub/config npm run dev

# Marketplace 3
VITE_CONFIG_PATH=../../app3-my-marketplace/config npm run dev
```

Each marketplace is completely independent with its own branding, categories, and agents.

---

## Troubleshooting

### Common Issues

#### Issue: "Cannot find config files"

**Solution:** Ensure `VITE_CONFIG_PATH` points to the correct directory:
```bash
VITE_CONFIG_PATH=../../app3-my-marketplace/config npm run dev
```

#### Issue: "Categories not showing"

**Solution:** Verify `categories.json` is valid JSON and in the config directory.

#### Issue: "Agents not loading"

**Solution:** Check `agents.json`:
- Valid JSON syntax
- All category IDs match `categories.json`
- All required fields are present

#### Issue: "Images not loading"

**Solution:** Ensure images are in `public/images/` and paths in config are correct:
```json
{
  "logo": "/images/logo.svg",  // ✅ Correct
  "logo": "images/logo.svg"    // ❌ Wrong (missing leading /)
}
```

#### Issue: "CLI commands not working"

**Solution:** Link the CLI globally:
```bash
cd skeleton/cli
npm link
kiro-agent --help
```

### Getting Help

- **Documentation:** Check this guide and BUNDLE_FORMAT.md
- **Examples:** Look at app1-kiro-marketplace and app2-devops-hub
- **Issues:** Open an issue on GitHub
- **Community:** Join our Discord server

---

## Best Practices

### Configuration

✅ **DO:**
- Use descriptive category IDs and names
- Keep descriptions concise (1-2 sentences)
- Use high-quality preview images (1200x630px recommended)
- Test your configuration before deploying

❌ **DON'T:**
- Hardcode values in skeleton code
- Use special characters in IDs (use kebab-case)
- Create too many categories (4-8 is ideal)
- Forget to update timestamps in agents.json

### Bundle Creation

✅ **DO:**
- Write clear, helpful steering documents
- Provide example use cases
- Test bundles before publishing
- Use semantic versioning

❌ **DON'T:**
- Include sensitive data (API keys, passwords)
- Create bundles larger than 5MB
- Reference files that don't exist
- Skip validation before packaging

### Deployment

✅ **DO:**
- Test locally before deploying
- Use environment variables for configuration
- Set up CI/CD for automatic deployments
- Monitor your marketplace after launch

❌ **DON'T:**
- Deploy without testing
- Hardcode URLs or paths
- Forget to set environment variables
- Skip error monitoring

---

## Next Steps

1. **Create your marketplace** following this guide
2. **Build agent bundles** for your domain
3. **Deploy to production** using Vercel or Netlify
4. **Share with your community** and gather feedback
5. **Iterate and improve** based on user needs

## Resources

- **BUNDLE_FORMAT.md** - Detailed bundle specification
- **KIRO_USAGE.md** - How Kiro was used to build this
- **Example Marketplaces:**
  - `app1-kiro-marketplace/` - Kiro Agents Marketplace
  - `app2-devops-hub/` - DevOps Automation Hub

---

**Happy building! 🎃**

If you create a marketplace using this skeleton, we'd love to hear about it. Share your marketplace with the community!
