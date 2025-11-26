import chalk from 'chalk';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs-extra';
import { Registry } from '../core/registry';
import { LocalRegistry } from '../core/localRegistry';
import { BundleManifest, InstallResult } from '../../../shared/types/bundle';

/**
 * Install Command Handler
 * 
 * Implements the `kiro-agent install <bundle-id>` command.
 * 
 * **Validates: Requirements 3.1**
 */
export class InstallCommand {
  private registry: Registry;
  private localRegistry: LocalRegistry;

  constructor() {
    this.registry = new Registry();
    this.localRegistry = new LocalRegistry();
  }

  /**
   * Execute the install command
   * 
   * @param args - Command arguments (bundle ID)
   * @param options - Command options (e.g., --force)
   */
  async execute(args: string[], options: Record<string, any>): Promise<void> {
    // Parse bundle ID from arguments
    const bundleId = args[0];
    
    if (!bundleId) {
      console.error(chalk.red('Error: Bundle ID is required'));
      console.log(chalk.gray('Usage: kiro-agent install <bundle-id>'));
      process.exit(1);
    }

    try {
      console.log(chalk.blue(`📦 Installing bundle: ${bundleId}...`));
      
      // Check if already installed (unless --force flag is used)
      if (!options.force && await this.localRegistry.isInstalled(bundleId)) {
        console.error(chalk.yellow(`⚠️  Bundle '${bundleId}' is already installed.`));
        console.log(chalk.gray('Use --force to reinstall.'));
        process.exit(1);
      }

      // Fetch bundle from registry
      console.log(chalk.gray('Fetching bundle metadata from registry...'));
      const bundle = await this.registry.fetchBundle(bundleId);
      
      console.log(chalk.green(`✓ Found: ${bundle.name} v${bundle.version}`));
      
      // Download bundle (for now, we'll work with a temporary directory)
      // In a real implementation, this would download the ZIP and extract it
      const tempDir = path.join(os.tmpdir(), `kiro-agent-${bundleId}-${Date.now()}`);
      await fs.ensureDir(tempDir);
      
      // For now, we'll simulate having the bundle files
      // In a real implementation, we would:
      // 1. Download the ZIP from bundle.downloadUrl
      // 2. Extract it to tempDir
      // 3. Validate the manifest
      
      // Install the bundle
      console.log(chalk.gray('Installing bundle components...'));
      
      // Import installer dynamically to avoid circular dependency
      const { Installer } = await import('../core/installer');
      const installer = new Installer(this.localRegistry);
      const result = await installer.install(bundle, tempDir);
      
      if (result.success) {
        // Display success message
        this.displaySuccessMessage(bundle, result);
      } else {
        console.error(chalk.red('❌ Installation failed:'));
        result.errors?.forEach((error: string) => {
          console.error(chalk.red(`  • ${error}`));
        });
        process.exit(1);
      }
      
      // Cleanup temp directory
      await fs.remove(tempDir);
      
    } catch (error) {
      console.error(chalk.red('❌ Installation failed:'));
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  }

  /**
   * Display installation success message
   * 
   * **Validates: Requirements 3.4**
   */
  private displaySuccessMessage(bundle: BundleManifest, result: InstallResult): void {
    console.log('');
    console.log(chalk.green.bold('✓ Installation successful!'));
    console.log('');
    console.log(chalk.bold(`${bundle.name} v${bundle.version}`));
    console.log(chalk.gray(bundle.description));
    console.log('');
    
    // Display installed components
    console.log(chalk.bold('Installed components:'));
    if (result.installedComponents.mcpServers > 0) {
      console.log(chalk.gray(`  • ${result.installedComponents.mcpServers} MCP server(s)`));
    }
    if (result.installedComponents.steeringFiles > 0) {
      console.log(chalk.gray(`  • ${result.installedComponents.steeringFiles} steering file(s)`));
    }
    if (result.installedComponents.hooks > 0) {
      console.log(chalk.gray(`  • ${result.installedComponents.hooks} hook(s)`));
    }
    if (result.installedComponents.specTemplates > 0) {
      console.log(chalk.gray(`  • ${result.installedComponents.specTemplates} spec template(s)`));
    }
    console.log('');
    
    // Display example usage prompts
    if (bundle.examples && bundle.examples.length > 0) {
      console.log(chalk.bold('Example usage:'));
      bundle.examples.forEach(example => {
        console.log(chalk.cyan(`  • ${example.title}`));
        if (example.prompt) {
          console.log(chalk.gray(`    "${example.prompt}"`));
        }
      });
      console.log('');
    }
    
    console.log(chalk.gray('The agent is now ready to use in your Kiro environment!'));
  }
}
