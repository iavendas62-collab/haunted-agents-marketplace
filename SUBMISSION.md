# Hackathon Submission

## Category

**Primary Category**: Skeleton Crew

## Project Information

**Project Name**: Haunted Agents Marketplace Skeleton

**Repository**: [GitHub URL]

**License**: MIT

## Applications

### App 1: Kiro Agents Marketplace
**Deployment URL**: TODO - [Vercel URL]

A marketplace for discovering and installing AI agent bundles that enhance the Kiro IDE. Features specialized agents for React + Supabase development, API documentation, and test-driven development. Demonstrates the skeleton's capability for developer tool marketplaces.

### App 2: DevOps Automation Hub
**Deployment URL**: TODO - [Vercel URL]

A marketplace for DevOps automation bundles including CI/CD pipelines, Kubernetes monitoring, and Terraform helpers. Demonstrates the skeleton's versatility by serving a completely different domain (infrastructure automation) using the same codebase with different configuration.

## Architecture

The skeleton consists of three main components:

1. **Web Frontend** (React + TypeScript + Vite): Configurable marketplace UI for browsing and discovering agents
2. **CLI Tool** (Node.js + Commander): Command-line interface for installing, creating, and managing agent bundles
3. **Bundle System**: Standardized format for packaging agent configurations (MCP servers, steering files, hooks, spec templates)

All domain-specific content (agent listings, categories, branding) is defined in JSON configuration files, enabling the same codebase to power multiple marketplace applications.

## Essential Files Included

### Root Structure
- `/.kiro/` - Kiro configuration (specs, hooks, steering)
- `/skeleton/` - Shared skeleton codebase
- `/app1-kiro-marketplace/` - Application 1 configuration and assets
- `/app2-devops-hub/` - Application 2 configuration and assets
- `LICENSE` - MIT License
- `README.md` - Project documentation
- `KIRO-USAGE.md` - Detailed explanation of Kiro usage
- `package.json` - Monorepo workspace configuration

### Skeleton Components
- `/skeleton/web/` - React frontend application
- `/skeleton/cli/` - Node.js CLI tool
- `/skeleton/shared/` - Shared types and schemas

### Application Configurations
- `config/branding.json` - Marketplace branding and theme
- `config/categories.json` - Category definitions
- `config/agents.json` - Agent bundle registry
- `bundles/` - Example agent bundles with manifests

## Demo Video

**Video URL**: TODO - [YouTube URL]

**Duration**: 3 minutes

**Content**: Demonstrates both applications, shows skeleton versatility, highlights configuration-driven approach, and shows CLI bundle installation.

## Kiro Usage

See `KIRO-USAGE.md` for detailed explanation of:
- Spec-driven development workflow
- Steering document strategies
- Agent hook automation
- MCP integration
- Vibe coding for component generation
