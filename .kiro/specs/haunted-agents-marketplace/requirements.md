# Requirements Document

## Introduction

The Haunted Agents Marketplace is a revolutionary **skeleton code template** for building agent marketplaces - created for the Kiroween Hackathon 🎃 **Skeleton Crew** category. Similar to the GPTs Store (OpenAI), Figma Plugins, or VS Code Extensions, this flexible foundation enables developers to create platforms where users can discover, share, and install customized AI agents.

The skeleton provides the core architecture for agent marketplaces: a CLI tool for installation/management, a web interface for discovery, and a bundle system for packaging agent configurations (MCP servers, steering files, hooks, spec templates).

**Skeleton Crew Demonstration:** To prove the template's versatility, we build TWO distinct applications from this foundation:

1. **Application 1: Kiro Agents Marketplace** - A marketplace for Kiro IDE agent bundles (React + Supabase experts, API wizards, testing coaches)
2. **Application 2: DevOps Automation Hub** - A marketplace for DevOps automation agents (CI/CD templates, infrastructure configs, monitoring setups)

Both applications share the same skeleton codebase but serve completely different use cases, demonstrating the template's flexibility and power.

**Hackathon Compliance:**
- ✅ Public repo with OSI open source license (MIT)
- ✅ `/.kiro` directory at root with specs, hooks, and steering (NOT in .gitignore)
- ✅ 2 separate repo folders: `/app1-kiro-marketplace` and `/app2-devops-hub`
- ✅ Functional deployed applications with URLs
- ✅ 3-minute demo video showing both applications
- ✅ Documentation of Kiro usage (spec-driven development, steering docs, hooks)

## Glossary

- **Marketplace**: The centralized platform for discovering and installing Haunted Agents
- **Haunted Agent**: A complete, customized AI agent bundle containing configuration files, MCP servers, steering rules, hooks, and spec templates
- **Agent Bundle**: A packaged collection of files that define an agent's behavior and capabilities
- **Registry**: The backend system that stores and serves agent bundle metadata and files
- **MCP Server**: Model Context Protocol server that provides additional tools and context to agents
- **Steering File**: Markdown files containing instructions and context that guide agent behavior
- **Hook**: Automated triggers that execute agent actions based on IDE events
- **Spec Template**: Pre-configured requirement and design templates for common development patterns
- **Bundle Manifest**: A JSON file describing an agent bundle's metadata, dependencies, and contents
- **Installation**: The process of downloading and configuring an agent bundle in a user's Kiro environment
- **Publisher**: A developer who creates and shares agent bundles on the marketplace
- **Consumer**: A user who browses and installs agent bundles from the marketplace

## Requirements

### Requirement 1

**User Story:** As a developer, I want to browse available Haunted Agents in a web marketplace, so that I can discover specialized agents that match my development needs.

#### Acceptance Criteria

1. WHEN a user visits the marketplace website THEN the Marketplace SHALL display a grid of available agent bundles with names, descriptions, and preview images
2. WHEN a user views an agent bundle card THEN the Marketplace SHALL show the bundle's included components (MCP servers, steering files, hooks, spec templates) with icons
3. WHEN a user clicks on a bundle THEN the Marketplace SHALL display a detail page with installation instructions and example use cases
4. WHEN the marketplace loads THEN the Marketplace SHALL render all bundle listings within 2 seconds
5. WHEN a user views bundle details THEN the Marketplace SHALL display the exact CLI command needed to install that agent

### Requirement 2

**User Story:** As a developer, I want to search for agents by use case or technology, so that I can quickly find agents that match my specific development workflow.

#### Acceptance Criteria

1. WHEN a user enters a search query THEN the Marketplace SHALL return relevant agent bundles ranked by relevance score
2. WHEN a user filters by category (use case or technology) THEN the Marketplace SHALL display only bundles matching the selected category
3. WHEN a user searches for a technology name (e.g., "Stripe", "Supabase") THEN the Marketplace SHALL return bundles tagged with that technology
4. WHEN search results are displayed THEN the Marketplace SHALL highlight matching keywords in bundle names and descriptions
5. WHEN no search results match the query THEN the Marketplace SHALL suggest alternative search terms or display popular bundles

### Requirement 3

**User Story:** As a developer, I want to install a Haunted Agent with a single CLI command, so that I can instantly transform my Kiro environment for a specific use case.

#### Acceptance Criteria

1. WHEN a user executes `kiro-agent install <agent-name>` THEN the CLI SHALL download the Agent Bundle from the Registry
2. WHEN an Agent Bundle is downloaded THEN the CLI SHALL validate the Bundle Manifest JSON structure
3. WHEN the Bundle Manifest is valid THEN the CLI SHALL copy MCP configs, steering files, hooks, and spec templates to .kiro directories
4. WHEN installation completes successfully THEN the CLI SHALL display a success message with the agent's capabilities and example prompts
5. IF an installation fails THEN the CLI SHALL display a clear error message indicating what went wrong

### Requirement 4

**User Story:** As a developer, I want installed agents to integrate seamlessly with my Kiro environment, so that I can use them immediately without manual configuration.

#### Acceptance Criteria

1. WHEN an Agent Bundle is installed THEN the Marketplace SHALL merge MCP server configurations into the user's mcp.json file
2. WHEN steering files are installed THEN the Marketplace SHALL place them in the .kiro/steering directory with appropriate inclusion settings
3. WHEN hooks are installed THEN the Marketplace SHALL register them in the Kiro hooks system
4. WHEN spec templates are installed THEN the Marketplace SHALL make them available in the spec creation workflow
5. WHEN configuration conflicts are detected THEN the Marketplace SHALL prompt the user to resolve conflicts before proceeding

### Requirement 5

**User Story:** As a developer, I want to create and package my custom agent, so that I can share my specialized workflows with the community.

#### Acceptance Criteria

1. WHEN a Publisher runs `kiro-agent create` THEN the CLI SHALL generate a template Bundle Manifest with required fields
2. WHEN a Publisher adds files to the bundle directory THEN the CLI SHALL organize them into the correct subdirectories (mcp/, steering/, hooks/, specs/)
3. WHEN a Publisher runs `kiro-agent validate` THEN the CLI SHALL check the manifest structure and verify all referenced files exist
4. WHEN validation passes THEN the CLI SHALL display a success message confirming the bundle is ready for distribution
5. WHEN a Publisher runs `kiro-agent package` THEN the CLI SHALL create a distributable .zip file with all bundle contents

### Requirement 6

**User Story:** As a developer, I want to list my installed agents, so that I can see what's currently active in my Kiro environment.

#### Acceptance Criteria

1. WHEN a user runs `kiro-agent list` THEN the CLI SHALL display all installed agent bundles with their names and versions
2. WHEN displaying installed agents THEN the CLI SHALL show the installation date for each bundle
3. WHEN an agent is listed THEN the CLI SHALL indicate which components are active (MCP servers, steering files, hooks)
4. WHEN no agents are installed THEN the CLI SHALL display a helpful message with a link to the marketplace
5. WHEN listing agents THEN the CLI SHALL read from a local registry file tracking installations

### Requirement 7

**User Story:** As a developer, I want example Haunted Agents that showcase different use cases, so that I can understand the platform's potential.

#### Acceptance Criteria

1. WHEN the marketplace launches THEN the Registry SHALL include at least 3 curated example agents
2. WHEN example agents are displayed THEN the Marketplace SHALL highlight them with a "Featured" badge
3. WHEN a featured agent is viewed THEN the Marketplace SHALL show a compelling description of its use case and benefits
4. WHEN example agents are installed THEN the CLI SHALL provide working configurations that demonstrate real capabilities
5. THE example agents SHALL cover diverse use cases: frontend development, API integration, and testing workflows

### Requirement 8

**User Story:** As a hackathon judge, I want to see a live demo of both applications, so that I can evaluate the skeleton's versatility and execution quality.

#### Acceptance Criteria

1. WHEN the demo video starts THEN the Video SHALL show both applications side-by-side highlighting their different use cases
2. WHEN demonstrating Application 1 THEN the Video SHALL show the Kiro Agents Marketplace with agent installation and usage
3. WHEN demonstrating Application 2 THEN the Video SHALL show the DevOps Hub with automation template deployment
4. WHEN showing the skeleton code THEN the Video SHALL highlight the shared foundation and configuration differences
5. WHEN the demo concludes THEN the Video SHALL be under 3 minutes and uploaded to YouTube as a public video

### Requirement 9

**User Story:** As a hackathon judge, I want to understand how Kiro was used to build this project, so that I can evaluate the effective use of Kiro features.

#### Acceptance Criteria

1. WHEN reviewing the submission THEN the Repository SHALL contain a KIRO_USAGE.md file documenting all Kiro features used
2. WHEN documenting spec-driven development THEN the File SHALL explain how the spec structure guided implementation and compare it to vibe coding
3. WHEN documenting steering docs THEN the File SHALL describe specific steering strategies that improved Kiro's responses
4. WHEN documenting agent hooks THEN the File SHALL list automated workflows and their impact on development process
5. WHEN documenting the development process THEN the File SHALL include examples of impressive code generation and workflow improvements

### Requirement 10

**User Story:** As a hackathon participant, I want the repository structure to comply with all Skeleton Crew requirements, so that my submission is not disqualified.

#### Acceptance Criteria

1. WHEN the repository is created THEN the Root SHALL contain a `/.kiro` directory with specs, hooks, and steering subdirectories
2. WHEN configuring git THEN the .gitignore SHALL NOT exclude the `/.kiro` directory or any of its subdirectories
3. WHEN organizing applications THEN the Repository SHALL contain two separate folders: `/app1-kiro-marketplace` and `/app2-devops-hub`
4. WHEN adding a license THEN the Repository SHALL include an OSI-approved open source license file (MIT) visible in the About section
5. WHEN the repository is finalized THEN the Root SHALL be public and contain all source code, assets, and setup instructions
