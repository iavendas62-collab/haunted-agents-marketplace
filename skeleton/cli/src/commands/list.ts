import chalk from 'chalk';
import { LocalRegistry } from '../core/localRegistry';
import { InstalledBundle } from '../../../shared/types/bundle';

/**
 * List Command Handler
 * 
 * Implements the `kiro-agent list` command.
 * 
 * **Validates: Requirements 6.1, 6.2, 6.3, 6.4**
 */
export class ListCommand {
  private localRegistry: LocalRegistry;

  constructor() {
    this.localRegistry = new LocalRegistry();
  }

  /**
   * Execute the list command
   * 
   * @param args - Command arguments (none expected)
   * @param options - Command options
   */
  async execute(args: string[], options: Record<string, any>): Promise<void> {
    try {
      // Read from local registry
      const installed = await this.localRegistry.getInstalled();

      // Handle empty installed list (Requirement 6.4)
      if (installed.length === 0) {
        this.displayEmptyMessage();
        return;
      }

      // Display installed bundles
      this.displayInstalledBundles(installed);
      
    } catch (error) {
      console.error(chalk.red('❌ Failed to list installed agents:'));
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  }

  /**
   * Display helpful message when no agents are installed
   * 
   * **Validates: Requirements 6.4**
   */
  private displayEmptyMessage(): void {
    console.log('');
    console.log(chalk.yellow('📭 No agents installed yet'));
    console.log('');
    console.log(chalk.gray('Discover and install specialized agents from the marketplace:'));
    console.log(chalk.cyan('  🌐 https://kiro-marketplace.vercel.app'));
    console.log('');
    console.log(chalk.gray('To install an agent, run:'));
    console.log(chalk.white('  kiro-agent install <bundle-id>'));
    console.log('');
  }

  /**
   * Display all installed bundles with details
   * 
   * **Validates: Requirements 6.1, 6.2, 6.3**
   */
  private displayInstalledBundles(installed: InstalledBundle[]): void {
    console.log('');
    console.log(chalk.bold(`📦 Installed Agents (${installed.length})`));
    console.log('');

    installed.forEach((bundle, index) => {
      // Display bundle name and version (Requirement 6.1)
      console.log(chalk.bold.cyan(`${index + 1}. ${bundle.id} v${bundle.version}`));
      
      // Display installation date (Requirement 6.2)
      const installDate = new Date(bundle.installedAt);
      console.log(chalk.gray(`   Installed: ${installDate.toISOString()}`));
      
      // Indicate active components (Requirement 6.3)
      console.log(chalk.gray('   Components:'));
      
      if (bundle.components.mcpServers && bundle.components.mcpServers.length > 0) {
        console.log(chalk.gray(`     • MCP Servers: ${bundle.components.mcpServers.join(', ')}`));
      }
      
      if (bundle.components.steeringFiles && bundle.components.steeringFiles.length > 0) {
        console.log(chalk.gray(`     • Steering Files: ${bundle.components.steeringFiles.join(', ')}`));
      }
      
      if (bundle.components.hooks && bundle.components.hooks.length > 0) {
        console.log(chalk.gray(`     • Hooks: ${bundle.components.hooks.join(', ')}`));
      }
      
      if (bundle.components.specTemplates && bundle.components.specTemplates.length > 0) {
        console.log(chalk.gray(`     • Spec Templates: ${bundle.components.specTemplates.join(', ')}`));
      }
      
      console.log('');
    });
  }
}
