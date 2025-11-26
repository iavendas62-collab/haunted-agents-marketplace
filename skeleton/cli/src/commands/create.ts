import chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs-extra';
import { BundleManifest } from '../../../shared/types/bundle';

/**
 * Create Command Handler
 * 
 * Implements the `kiro-agent create <bundle-name>` command.
 * 
 * **Validates: Requirements 5.1, 5.2**
 */
export class CreateCommand {
  /**
   * Execute the create command
   * 
   * @param args - Command arguments (bundle name)
   * @param options - Command options
   */
  async execute(args: string[], options: Record<string, any>): Promise<void> {
    // Parse bundle name from arguments
    const bundleName = args[0];
    
    if (!bundleName) {
      console.error(chalk.red('Error: Bundle name is required'));
      console.log(chalk.gray('Usage: kiro-agent create <bundle-name>'));
      process.exit(1);
    }

    // Convert bundle name to kebab-case for ID
    const bundleId = this.toKebabCase(bundleName);
    
    // Determine output directory
    const outputDir = options.output || path.join(process.cwd(), bundleId);
    
    // Check if directory already exists
    if (await fs.pathExists(outputDir)) {
      console.error(chalk.red(`Error: Directory '${outputDir}' already exists`));
      console.log(chalk.gray('Choose a different name or remove the existing directory.'));
      process.exit(1);
    }

    try {
      console.log(chalk.blue(`📦 Creating bundle: ${bundleName}...`));
      
      // Create bundle directory structure
      await this.createDirectoryStructure(outputDir);
      console.log(chalk.green('✓ Created directory structure'));
      
      // Generate template manifest
      const manifest = this.generateTemplateManifest(bundleId, bundleName);
      await this.writeManifest(outputDir, manifest);
      console.log(chalk.green('✓ Generated manifest.json'));
      
      // Create example files
      await this.createExampleFiles(outputDir);
      console.log(chalk.green('✓ Added example files'));
      
      // Create README
      await this.createReadme(outputDir, bundleName);
      console.log(chalk.green('✓ Created README.md'));
      
      // Display success message
      this.displaySuccessMessage(bundleId, outputDir);
      
    } catch (error) {
      console.error(chalk.red('❌ Bundle creation failed:'));
      console.error(chalk.red((error as Error).message));
      
      // Cleanup on failure
      if (await fs.pathExists(outputDir)) {
        await fs.remove(outputDir);
      }
      
      process.exit(1);
    }
  }

  /**
   * Create bundle directory structure
   * 
   * Creates: mcp/, steering/, hooks/, specs/ subdirectories
   * 
   * **Validates: Requirements 5.2**
   */
  private async createDirectoryStructure(outputDir: string): Promise<void> {
    await fs.ensureDir(outputDir);
    await fs.ensureDir(path.join(outputDir, 'mcp'));
    await fs.ensureDir(path.join(outputDir, 'steering'));
    await fs.ensureDir(path.join(outputDir, 'hooks'));
    await fs.ensureDir(path.join(outputDir, 'specs'));
  }

  /**
   * Generate template manifest with required fields
   * 
   * **Validates: Requirements 5.1**
   */
  private generateTemplateManifest(bundleId: string, bundleName: string): BundleManifest {
    const now = new Date().toISOString();
    
    return {
      id: bundleId,
      name: bundleName,
      version: '1.0.0',
      description: 'A brief description of your agent bundle',
      longDescription: 'A detailed description explaining what this agent does, what problems it solves, and how to use it effectively.',
      author: {
        name: 'Your Name',
        email: 'your.email@example.com',
        url: 'https://github.com/yourusername'
      },
      tags: ['example', 'template'],
      categories: ['general'],
      previewImage: '/images/preview.png',
      components: {
        mcpServers: [],
        steeringFiles: [],
        hooks: [],
        specTemplates: []
      },
      dependencies: {
        external: [],
        kiroVersion: '>=1.0.0'
      },
      examples: [
        {
          title: 'Example Use Case',
          description: 'Describe how to use this agent',
          prompt: 'Example prompt to try with this agent'
        }
      ],
      createdAt: now,
      updatedAt: now
    };
  }

  /**
   * Write manifest to file
   */
  private async writeManifest(outputDir: string, manifest: BundleManifest): Promise<void> {
    const manifestPath = path.join(outputDir, 'manifest.json');
    await fs.writeJson(manifestPath, manifest, { spaces: 2 });
  }

  /**
   * Create example files in the bundle
   * 
   * **Validates: Requirements 5.1**
   */
  private async createExampleFiles(outputDir: string): Promise<void> {
    // Example MCP server config
    const mcpExample = {
      name: 'example-mcp-server',
      command: 'uvx',
      args: ['example-package@latest'],
      env: {
        'EXAMPLE_VAR': 'value'
      }
    };
    await fs.writeJson(
      path.join(outputDir, 'mcp', 'example-server.json'),
      mcpExample,
      { spaces: 2 }
    );

    // Example steering file
    const steeringExample = `# Example Steering File

This steering file provides context and instructions to guide the agent's behavior.

## Purpose

Describe what this steering file helps the agent understand or do better.

## Guidelines

- Guideline 1: Explain a best practice or pattern
- Guideline 2: Provide context about your domain
- Guideline 3: Set expectations for code style or approach

## Examples

\`\`\`typescript
// Example code showing the pattern you want the agent to follow
function exampleFunction() {
  // Implementation
}
\`\`\`

## References

- [Documentation](https://example.com/docs)
- [Best Practices](https://example.com/best-practices)
`;
    await fs.writeFile(
      path.join(outputDir, 'steering', 'example-steering.md'),
      steeringExample
    );

    // Example hook
    const hookExample = {
      name: 'example-hook',
      trigger: 'on_file_save',
      action: 'message',
      content: 'Remember to follow the coding standards defined in the steering files.'
    };
    await fs.writeJson(
      path.join(outputDir, 'hooks', 'example-hook.json'),
      hookExample,
      { spaces: 2 }
    );

    // Example spec template
    const specExample = `# Requirements Template

## Introduction

[Describe the feature or system being specified]

## Glossary

- **Term**: Definition

## Requirements

### Requirement 1

**User Story:** As a [role], I want [feature], so that [benefit]

#### Acceptance Criteria

1. WHEN [condition] THEN the system SHALL [response]
2. WHEN [condition] THEN the system SHALL [response]
`;
    await fs.writeFile(
      path.join(outputDir, 'specs', 'requirements-template.md'),
      specExample
    );
  }

  /**
   * Create README file for the bundle
   */
  private async createReadme(outputDir: string, bundleName: string): Promise<void> {
    const readme = `# ${bundleName}

A Haunted Agent bundle for Kiro.

## Description

[Describe what this agent does and what problems it solves]

## Components

### MCP Servers

- **example-mcp-server**: [Describe what this MCP server provides]

### Steering Files

- **example-steering.md**: [Describe what guidance this provides]

### Hooks

- **example-hook**: [Describe what this hook automates]

### Spec Templates

- **requirements-template.md**: [Describe what this template helps with]

## Installation

\`\`\`bash
kiro-agent install ${bundleName.toLowerCase().replace(/\s+/g, '-')}
\`\`\`

## Usage

[Provide examples of how to use this agent effectively]

## Requirements

- Kiro version: >=1.0.0
- External dependencies: [List any required tools or services]

## Author

[Your Name]

## License

MIT
`;
    await fs.writeFile(path.join(outputDir, 'README.md'), readme);
  }

  /**
   * Display success message
   */
  private displaySuccessMessage(bundleId: string, outputDir: string): void {
    console.log('');
    console.log(chalk.green.bold('✓ Bundle created successfully!'));
    console.log('');
    console.log(chalk.bold('Next steps:'));
    console.log(chalk.gray(`  1. cd ${path.basename(outputDir)}`));
    console.log(chalk.gray('  2. Edit manifest.json with your bundle details'));
    console.log(chalk.gray('  3. Add your MCP servers, steering files, hooks, and spec templates'));
    console.log(chalk.gray('  4. Run: kiro-agent validate'));
    console.log(chalk.gray('  5. Run: kiro-agent package'));
    console.log('');
    console.log(chalk.bold('Directory structure:'));
    console.log(chalk.gray('  ├── manifest.json       # Bundle metadata'));
    console.log(chalk.gray('  ├── mcp/                # MCP server configs'));
    console.log(chalk.gray('  ├── steering/           # Steering files'));
    console.log(chalk.gray('  ├── hooks/              # Hook definitions'));
    console.log(chalk.gray('  ├── specs/              # Spec templates'));
    console.log(chalk.gray('  └── README.md           # Documentation'));
    console.log('');
  }

  /**
   * Convert string to kebab-case
   */
  private toKebabCase(str: string): string {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
