import chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs-extra';
import { validateManifest } from '../../../shared/utils/validation';
import { BundleManifest } from '../../../shared/types/bundle';

/**
 * Validate Command Handler
 * 
 * Implements the `kiro-agent validate <bundle-path>` command.
 * 
 * **Validates: Requirements 5.3, 5.4**
 */
export class ValidateCommand {
  /**
   * Execute the validate command
   * 
   * @param args - Command arguments (bundle path)
   * @param options - Command options
   */
  async execute(args: string[], options: Record<string, any>): Promise<void> {
    // Parse bundle path from arguments (default to current directory)
    const bundlePath = args[0] || process.cwd();
    
    // Resolve to absolute path
    const absolutePath = path.resolve(bundlePath);
    
    // Check if directory exists
    if (!(await fs.pathExists(absolutePath))) {
      console.error(chalk.red(`Error: Directory '${bundlePath}' does not exist`));
      process.exit(1);
    }

    // Check if it's a directory
    const stats = await fs.stat(absolutePath);
    if (!stats.isDirectory()) {
      console.error(chalk.red(`Error: '${bundlePath}' is not a directory`));
      console.log(chalk.gray('Please provide a path to a bundle directory.'));
      process.exit(1);
    }

    try {
      console.log(chalk.blue(`🔍 Validating bundle at: ${bundlePath}...`));
      console.log('');
      
      // Load manifest
      const manifest = await this.loadManifest(absolutePath);
      console.log(chalk.green('✓ Manifest loaded successfully'));
      
      // Validate manifest structure against schema
      await this.validateManifestStructure(manifest);
      console.log(chalk.green('✓ Manifest structure is valid'));
      
      // Check all referenced files exist
      await this.validateReferencedFiles(absolutePath, manifest);
      console.log(chalk.green('✓ All referenced files exist'));
      
      // Display success message
      this.displaySuccessMessage(manifest, absolutePath);
      
    } catch (error) {
      console.error(chalk.red('❌ Validation failed:'));
      console.error(chalk.red((error as Error).message));
      console.log('');
      console.log(chalk.gray('Fix these issues and run validation again.'));
      process.exit(1);
    }
  }

  /**
   * Load manifest.json from bundle directory
   * 
   * **Validates: Requirements 5.3**
   */
  private async loadManifest(bundlePath: string): Promise<BundleManifest> {
    const manifestPath = path.join(bundlePath, 'manifest.json');
    
    // Check if manifest.json exists
    if (!(await fs.pathExists(manifestPath))) {
      throw new Error(
        `manifest.json not found in bundle directory.\n\n` +
        `Expected location: ${manifestPath}\n\n` +
        `Every bundle must have a manifest.json file at its root.`
      );
    }

    // Read and parse manifest
    try {
      const manifestContent = await fs.readFile(manifestPath, 'utf-8');
      const manifest = JSON.parse(manifestContent);
      return manifest;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(
          `Invalid JSON in manifest.json:\n\n` +
          `  ${error.message}\n\n` +
          `Please fix the JSON syntax errors.`
        );
      }
      throw error;
    }
  }

  /**
   * Validate manifest structure against JSON schema
   * 
   * **Validates: Requirements 5.3**
   */
  private async validateManifestStructure(manifest: BundleManifest): Promise<void> {
    const result = validateManifest(manifest);
    
    if (!result.valid && result.errors) {
      const errorMessages = result.errors
        .map((err) => `  • ${err.field}: ${err.message}`)
        .join('\n');
      
      throw new Error(
        `Manifest validation failed:\n\n${errorMessages}\n\n` +
        `Please fix these issues in manifest.json.`
      );
    }
  }

  /**
   * Validate that all referenced files exist
   * 
   * **Validates: Requirements 5.3**
   */
  private async validateReferencedFiles(
    bundlePath: string,
    manifest: BundleManifest
  ): Promise<void> {
    const missingFiles: string[] = [];
    const components = manifest.components;

    // Check MCP server files
    if (components.mcpServers && components.mcpServers.length > 0) {
      // MCP servers are typically in mcp/ directory
      // For now, we just check that the mcp directory exists if servers are defined
      const mcpDir = path.join(bundlePath, 'mcp');
      if (!(await fs.pathExists(mcpDir))) {
        missingFiles.push('mcp/ directory (required for MCP servers)');
      }
    }

    // Check steering files
    if (components.steeringFiles && components.steeringFiles.length > 0) {
      for (const steeringFile of components.steeringFiles) {
        const filePath = path.join(bundlePath, 'steering', steeringFile.filename);
        if (!(await fs.pathExists(filePath))) {
          missingFiles.push(`steering/${steeringFile.filename}`);
        }
      }
    }

    // Check hook files
    if (components.hooks && components.hooks.length > 0) {
      // Hooks are typically in hooks/ directory
      const hooksDir = path.join(bundlePath, 'hooks');
      if (!(await fs.pathExists(hooksDir))) {
        missingFiles.push('hooks/ directory (required for hooks)');
      }
    }

    // Check spec template files
    if (components.specTemplates && components.specTemplates.length > 0) {
      for (const specTemplate of components.specTemplates) {
        const filePath = path.join(bundlePath, 'specs', specTemplate.filename);
        if (!(await fs.pathExists(filePath))) {
          missingFiles.push(`specs/${specTemplate.filename}`);
        }
      }
    }

    // If any files are missing, throw error
    if (missingFiles.length > 0) {
      const fileList = missingFiles.map((file) => `  • ${file}`).join('\n');
      throw new Error(
        `Referenced files not found:\n\n${fileList}\n\n` +
        `All files referenced in the manifest must exist in the bundle directory.`
      );
    }
  }

  /**
   * Display validation success message
   * 
   * **Validates: Requirements 5.4**
   */
  private displaySuccessMessage(manifest: BundleManifest, bundlePath: string): void {
    console.log('');
    console.log(chalk.green.bold('✓ Bundle validation successful!'));
    console.log('');
    console.log(chalk.bold(`${manifest.name} v${manifest.version}`));
    console.log(chalk.gray(manifest.description));
    console.log('');
    
    // List all validated components
    console.log(chalk.bold('Validated components:'));
    
    const components = manifest.components;
    let componentCount = 0;
    
    if (components.mcpServers && components.mcpServers.length > 0) {
      console.log(chalk.gray(`  • ${components.mcpServers.length} MCP server(s)`));
      components.mcpServers.forEach((server) => {
        console.log(chalk.gray(`    - ${server.name}`));
      });
      componentCount += components.mcpServers.length;
    }
    
    if (components.steeringFiles && components.steeringFiles.length > 0) {
      console.log(chalk.gray(`  • ${components.steeringFiles.length} steering file(s)`));
      components.steeringFiles.forEach((file) => {
        console.log(chalk.gray(`    - ${file.filename}`));
      });
      componentCount += components.steeringFiles.length;
    }
    
    if (components.hooks && components.hooks.length > 0) {
      console.log(chalk.gray(`  • ${components.hooks.length} hook(s)`));
      components.hooks.forEach((hook) => {
        console.log(chalk.gray(`    - ${hook.name}`));
      });
      componentCount += components.hooks.length;
    }
    
    if (components.specTemplates && components.specTemplates.length > 0) {
      console.log(chalk.gray(`  • ${components.specTemplates.length} spec template(s)`));
      components.specTemplates.forEach((template) => {
        console.log(chalk.gray(`    - ${template.filename}`));
      });
      componentCount += components.specTemplates.length;
    }
    
    if (componentCount === 0) {
      console.log(chalk.gray('  (No components defined)'));
    }
    
    console.log('');
    console.log(chalk.green('✓ Bundle is ready for distribution!'));
    console.log('');
    console.log(chalk.bold('Next steps:'));
    console.log(chalk.gray('  • Run: kiro-agent package'));
    console.log(chalk.gray('  • Share your bundle with the community'));
    console.log('');
  }
}
