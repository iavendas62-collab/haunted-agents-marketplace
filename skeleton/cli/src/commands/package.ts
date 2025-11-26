import chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs-extra';
import archiver from 'archiver';
import { validateManifest } from '../../../shared/utils/validation';
import { BundleManifest } from '../../../shared/types/bundle';

/**
 * Package Command Handler
 * 
 * Implements the `kiro-agent package <bundle-path>` command.
 * 
 * **Validates: Requirements 5.5**
 */
export class PackageCommand {
  /**
   * Execute the package command
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
      return; // For testing purposes
    }

    // Check if it's a directory
    const stats = await fs.stat(absolutePath);
    if (!stats.isDirectory()) {
      console.error(chalk.red(`Error: '${bundlePath}' is not a directory`));
      console.log(chalk.gray('Please provide a path to a bundle directory.'));
      process.exit(1);
      return; // For testing purposes
    }

    try {
      console.log(chalk.blue(`📦 Packaging bundle at: ${bundlePath}...`));
      console.log('');
      
      // Load and validate manifest
      const manifest = await this.loadManifest(absolutePath);
      console.log(chalk.green('✓ Manifest loaded successfully'));
      
      // Validate manifest structure
      await this.validateManifestStructure(manifest);
      console.log(chalk.green('✓ Manifest structure is valid'));
      
      // Validate referenced files exist
      await this.validateReferencedFiles(absolutePath, manifest);
      console.log(chalk.green('✓ All referenced files exist'));
      
      // Determine output path
      const outputDir = options.output || process.cwd();
      const outputFilename = `${manifest.id}-${manifest.version}.zip`;
      const outputPath = path.join(outputDir, outputFilename);
      
      // Ensure output directory exists
      await fs.ensureDir(outputDir);
      
      // Create ZIP archive
      await this.createZipArchive(absolutePath, outputPath, manifest);
      console.log(chalk.green(`✓ Created ZIP archive: ${outputFilename}`));
      
      // Display success message
      this.displaySuccessMessage(manifest, outputPath);
      
    } catch (error) {
      console.error(chalk.red('❌ Packaging failed:'));
      console.error(chalk.red((error as Error).message));
      console.log('');
      console.log(chalk.gray('Fix these issues and try again.'));
      process.exit(1);
    }
  }

  /**
   * Load manifest.json from bundle directory
   * 
   * **Validates: Requirements 5.5**
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
   * **Validates: Requirements 5.5**
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
   * **Validates: Requirements 5.5**
   */
  private async validateReferencedFiles(
    bundlePath: string,
    manifest: BundleManifest
  ): Promise<void> {
    const missingFiles: string[] = [];
    const components = manifest.components;

    // Check MCP server files
    if (components.mcpServers && components.mcpServers.length > 0) {
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
   * Create ZIP archive with all bundle contents
   * 
   * **Validates: Requirements 5.5**
   */
  private async createZipArchive(
    bundlePath: string,
    outputPath: string,
    manifest: BundleManifest
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Create output stream
      const output = fs.createWriteStream(outputPath);
      const archive = archiver('zip', {
        zlib: { level: 9 } // Maximum compression
      });

      // Handle stream events
      output.on('close', () => {
        resolve();
      });

      archive.on('error', (err) => {
        reject(new Error(`Failed to create ZIP archive: ${err.message}`));
      });

      // Pipe archive to output file
      archive.pipe(output);

      // Add manifest.json
      archive.file(path.join(bundlePath, 'manifest.json'), { name: 'manifest.json' });

      // Add README.md if it exists
      const readmePath = path.join(bundlePath, 'README.md');
      if (fs.existsSync(readmePath)) {
        archive.file(readmePath, { name: 'README.md' });
      }

      // Add component directories
      const components = manifest.components;

      // Add mcp/ directory if it has servers
      if (components.mcpServers && components.mcpServers.length > 0) {
        const mcpDir = path.join(bundlePath, 'mcp');
        if (fs.existsSync(mcpDir)) {
          archive.directory(mcpDir, 'mcp');
        }
      }

      // Add steering/ directory if it has files
      if (components.steeringFiles && components.steeringFiles.length > 0) {
        const steeringDir = path.join(bundlePath, 'steering');
        if (fs.existsSync(steeringDir)) {
          archive.directory(steeringDir, 'steering');
        }
      }

      // Add hooks/ directory if it has hooks
      if (components.hooks && components.hooks.length > 0) {
        const hooksDir = path.join(bundlePath, 'hooks');
        if (fs.existsSync(hooksDir)) {
          archive.directory(hooksDir, 'hooks');
        }
      }

      // Add specs/ directory if it has templates
      if (components.specTemplates && components.specTemplates.length > 0) {
        const specsDir = path.join(bundlePath, 'specs');
        if (fs.existsSync(specsDir)) {
          archive.directory(specsDir, 'specs');
        }
      }

      // Finalize the archive
      archive.finalize();
    });
  }

  /**
   * Display packaging success message
   * 
   * **Validates: Requirements 5.5**
   */
  private displaySuccessMessage(manifest: BundleManifest, outputPath: string): void {
    console.log('');
    console.log(chalk.green.bold('✓ Bundle packaged successfully!'));
    console.log('');
    console.log(chalk.bold(`${manifest.name} v${manifest.version}`));
    console.log(chalk.gray(manifest.description));
    console.log('');
    console.log(chalk.bold('Package details:'));
    console.log(chalk.gray(`  • Location: ${outputPath}`));
    
    // Get file size
    const stats = fs.statSync(outputPath);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    console.log(chalk.gray(`  • Size: ${fileSizeInKB} KB`));
    
    console.log('');
    console.log(chalk.bold('Next steps:'));
    console.log(chalk.gray('  • Upload the ZIP file to your bundle registry'));
    console.log(chalk.gray('  • Update your agents.json with the bundle metadata'));
    console.log(chalk.gray('  • Share your bundle with the community!'));
    console.log('');
  }
}
