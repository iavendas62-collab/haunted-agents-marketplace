# How Kiro Was Used to Build the Haunted Agents Marketplace

## Overview

This document details how Kiro's advanced features were leveraged to build the Haunted Agents Marketplace skeleton template for the Kiroween Hackathon. We demonstrate the power of **spec-driven development**, **steering documents**, and **agent hooks** in creating a complex, production-ready codebase.

## Table of Contents

1. [Spec-Driven Development](#spec-driven-development)
2. [Steering Strategies](#steering-strategies)
3. [Agent Hooks](#agent-hooks)
4. [Impressive Code Generation Examples](#impressive-code-generation-examples)
5. [Spec-Driven vs Vibe Coding](#spec-driven-vs-vibe-coding)

---

## Spec-Driven Development

### What is Spec-Driven Development?

Spec-driven development is a methodology where you create detailed specifications (requirements, design, and tasks) before writing any code. Kiro's spec system provides a structured workflow:

1. **Requirements Document** - Define what the system should do using EARS (Easy Approach to Requirements Syntax) patterns
2. **Design Document** - Architect the solution with components, interfaces, and correctness properties
3. **Tasks Document** - Break down implementation into actionable coding tasks

### How We Used It

For the Haunted Agents Marketplace, we created comprehensive specs in `.kiro/specs/haunted-agents-marketplace/`:

#### Requirements Document (`requirements.md`)

We defined 10 major requirements with 50+ acceptance criteria using EARS patterns:

```markdown
**User Story:** As a developer, I want to install a Haunted Agent with a single CLI command, 
so that I can instantly transform my Kiro environment for a specific use case.

#### Acceptance Criteria

1. WHEN a user executes `kiro-agent install <agent-name>` THEN the CLI SHALL download the Agent Bundle from the Registry
2. WHEN an Agent Bundle is downloaded THEN the CLI SHALL validate the Bundle Manifest JSON structure
3. WHEN the Bundle Manifest is valid THEN the CLI SHALL copy MCP configs, steering files, hooks, and spec templates to .kiro directories
```

**Benefits:**
- Clear, unambiguous requirements that both humans and AI can understand
- Traceability from requirements to implementation
- Compliance with INCOSE quality rules (active voice, measurable criteria, no vague terms)

#### Design Document (`design.md`)

We created a comprehensive design with:

- **Architecture diagrams** showing the skeleton template structure
- **Component interfaces** with TypeScript type definitions
- **22 Correctness Properties** - Universal properties that must hold across all executions
- **Testing strategy** with property-based testing approach

Example correctness property:

```markdown
### Property 9: Component file installation
*For any* valid bundle with components, installation SHALL copy all MCP configs to `.kiro/mcp/`, 
steering files to `.kiro/steering/`, hooks to `.kiro/hooks/`, and spec templates to `.kiro/specs/`.
**Validates: Requirements 3.3**
```

**Benefits:**
- Every requirement has corresponding correctness properties
- Properties are testable with property-based testing
- Design decisions are documented and justified
- Architecture is clear before coding begins

#### Tasks Document (`tasks.md`)

We broke down the implementation into 26 major tasks with 85+ sub-tasks:

```markdown
- [ ] 4. Implement CLI install command
  - [ ] 4.1 Create install command handler
  - [ ] 4.2 Implement bundle installer
  - [ ]* 4.3 Write property test for component installation
    - **Property 9: Component file installation**
    - **Validates: Requirements 3.3**
  - [ ] 4.4 Implement MCP configuration merging
```

**Benefits:**
- Clear implementation order (incremental progress)
- Each task references specific requirements
- Optional tasks marked with `*` for MVP flexibility
- Checkpoints ensure tests pass at key milestones

### The Spec-Driven Workflow

1. **Start with rough idea** → "I want to build an agent marketplace"
2. **Kiro generates requirements** → Structured EARS-compliant requirements
3. **Iterate on requirements** → Refine until they're complete and correct
4. **Kiro generates design** → Architecture, components, correctness properties
5. **Iterate on design** → Ensure it addresses all requirements
6. **Kiro generates tasks** → Actionable implementation plan
7. **Execute tasks one-by-one** → Kiro implements each task with full context

### Key Advantages

✅ **Correctness by Design** - Correctness properties ensure the system behaves correctly
✅ **Incremental Progress** - Tasks build on each other systematically
✅ **Full Context** - Kiro always has requirements and design available
✅ **Traceability** - Every line of code traces back to a requirement
✅ **Quality Assurance** - Property-based tests validate universal properties

---

## Steering Strategies

### What are Steering Documents?

Steering documents are markdown files in `.kiro/steering/` that provide additional context and instructions to Kiro. They guide Kiro's behavior and decision-making during development.

### Our Steering Strategy: `skeleton-dev.md`

We created a comprehensive steering document (`.kiro/steering/skeleton-dev.md`) that enforces best practices for skeleton development:

#### Core Principles Enforced

**1. Configurability First**

```markdown
**All domain-specific content MUST be externalized to configuration files.**

- ❌ **NEVER** hardcode agent names, categories, or branding in components
- ✅ **ALWAYS** load from configuration files (agents.json, branding.json, categories.json)
```

**Impact:** Kiro consistently avoided hardcoding and used configuration contexts throughout the codebase.

**2. Separation of Concerns**

```markdown
The repository structure separates the reusable skeleton from specific applications:

/skeleton/          # Reusable template code (domain-agnostic)
/app1-*/            # Application 1 (specific configuration)
/app2-*/            # Application 2 (specific configuration)
```

**Impact:** Kiro maintained clean separation between skeleton and applications, ensuring reusability.

**3. Type Safety**

```markdown
Use TypeScript interfaces to enforce configuration structure:

interface BundleManifest {
  id: string;
  name: string;
  version: string;
  // ... all required fields
}
```

**Impact:** All components have proper TypeScript types, catching errors at compile time.

### Steering in Action

**Example 1: Component Development**

When Kiro created the `AgentCard` component, the steering document ensured:
- Props were properly typed with interfaces
- Configuration was loaded from `ConfigContext`
- No hardcoded agent names or categories
- TailwindCSS utility classes for styling

**Example 2: CLI Command Structure**

The steering document provided a template for CLI commands:

```typescript
class CommandName implements CLICommand {
  async execute(args: string[], options: Record<string, any>): Promise<void> {
    // 1. Validate inputs
    // 2. Perform operation
    // 3. Provide clear feedback
    // 4. Handle errors gracefully
  }
}
```

**Impact:** All CLI commands follow consistent patterns with proper error handling.

### Steering Best Practices We Discovered

1. **Be Specific** - Provide concrete examples of good and bad patterns
2. **Use Visual Markers** - ✅ and ❌ make guidelines instantly clear
3. **Include Code Examples** - Show exactly what you want
4. **Document Rationale** - Explain WHY, not just WHAT
5. **Keep It Updated** - Evolve steering as patterns emerge

---

## Agent Hooks

### What are Agent Hooks?

Agent hooks are automated triggers that execute agent actions based on IDE events. They enable continuous feedback and automation during development.

### Our Hook: Test-on-Save

We created `.kiro/hooks/test-on-save.json`:

```json
{
  "hooks": [
    {
      "name": "Run tests on save",
      "trigger": "onFileSave",
      "filePattern": "**/*.{ts,tsx}",
      "action": "command",
      "command": "npm test -- --run --changed"
    }
  ]
}
```

### Impact on Development Process

**Before Hooks:**
1. Write code
2. Manually run `npm test`
3. See failures
4. Fix code
5. Manually run `npm test` again
6. Repeat...

**With Hooks:**
1. Write code
2. Save file → Tests run automatically
3. See immediate feedback
4. Fix code
5. Save file → Tests run automatically
6. Instant validation ✅

### Benefits Realized

✅ **Faster Feedback Loop** - Errors caught within seconds of writing code
✅ **Reduced Context Switching** - No need to switch to terminal
✅ **Continuous Validation** - Every save ensures tests still pass
✅ **Confidence** - Know immediately if changes break anything

### Other Hook Ideas

While we focused on test-on-save, other useful hooks include:

- **Lint-on-save** - Auto-format code on save
- **Type-check-on-save** - Run TypeScript compiler
- **Update-docs-on-change** - Regenerate documentation when code changes
- **Deploy-on-commit** - Trigger deployment pipeline

---

## Impressive Code Generation Examples

### Example 1: Property-Based Test Generation

**Context:** We needed to implement Property 9 - Component file installation

**Kiro's Input:**
- Requirements document with acceptance criteria
- Design document with correctness property
- Task description referencing the property

**Kiro's Output:**

```typescript
describe('Property 9: Component file installation', () => {
  it('should copy all components to correct directories for any valid bundle', () => {
    fc.assert(
      fc.property(
        bundleArbitraryWithComponents,
        async (bundle) => {
          const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-'));
          const kiroDir = path.join(tempDir, '.kiro');
          
          // Create .kiro structure
          await fs.mkdir(path.join(kiroDir, 'mcp'), { recursive: true });
          await fs.mkdir(path.join(kiroDir, 'steering'), { recursive: true });
          await fs.mkdir(path.join(kiroDir, 'hooks'), { recursive: true });
          await fs.mkdir(path.join(kiroDir, 'specs'), { recursive: true });
          
          const installer = new Installer(kiroDir);
          await installer.install(bundle, bundlePath);
          
          // Verify MCP configs copied
          if (bundle.components.mcpServers) {
            const mcpPath = path.join(kiroDir, 'mcp', 'servers.json');
            expect(await fs.pathExists(mcpPath)).toBe(true);
          }
          
          // Verify steering files copied
          if (bundle.components.steeringFiles) {
            for (const file of bundle.components.steeringFiles) {
              const steeringPath = path.join(kiroDir, 'steering', file.filename);
              expect(await fs.pathExists(steeringPath)).toBe(true);
            }
          }
          
          // Verify hooks copied
          if (bundle.components.hooks) {
            const hooksPath = path.join(kiroDir, 'hooks', 'hooks.json');
            expect(await fs.pathExists(hooksPath)).toBe(true);
          }
          
          // Verify spec templates copied
          if (bundle.components.specTemplates) {
            for (const template of bundle.components.specTemplates) {
              const specPath = path.join(kiroDir, 'specs', template.filename);
              expect(await fs.pathExists(specPath)).toBe(true);
            }
          }
          
          await fs.remove(tempDir);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**What's Impressive:**
- Generated complete property-based test with smart generators
- Proper setup/teardown with temp directories
- Tests all component types dynamically
- Runs 100 iterations with random data
- Correctly tagged with property number and requirement

### Example 2: Complete CLI Command Implementation

**Context:** Implement the `validate` command

**Kiro's Input:**
- Task: "Create validate command handler"
- Design document with command interface
- Requirements for validation

**Kiro's Output:**

Complete implementation including:
- Command class with proper interface
- Manifest loading and validation
- File existence checks
- Detailed error reporting
- Success messaging
- Unit tests
- Integration with Commander.js

All in one go, with proper error handling and user-friendly output.

### Example 3: React Component with Full Type Safety

**Context:** Create the AgentCard component

**Kiro's Input:**
- Design document with component interface
- Steering document with configurability rules
- Requirements for card display

**Kiro's Output:**

```typescript
interface AgentCardProps {
  agent: BundleManifest;
  onClick: (agentId: string) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick }) => {
  const { config } = useConfig();
  const isFeatured = config.featured?.includes(agent.id);
  
  return (
    <article 
      className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(agent.id)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick(agent.id)}
    >
      {isFeatured && (
        <span className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold">
          Featured
        </span>
      )}
      
      <img 
        src={agent.previewImage || '/default-preview.png'} 
        alt={`${agent.name} preview`}
        className="w-full h-48 object-cover rounded"
      />
      
      <h3 className="text-xl font-bold mt-2">{agent.name}</h3>
      <p className="text-gray-600 mt-1">{agent.description}</p>
      
      <div className="flex gap-2 mt-3">
        {agent.components.mcpServers && (
          <span className="flex items-center gap-1 text-sm">
            🔧 MCP Servers
          </span>
        )}
        {agent.components.steeringFiles && (
          <span className="flex items-center gap-1 text-sm">
            📝 Steering
          </span>
        )}
        {agent.components.hooks && (
          <span className="flex items-center gap-1 text-sm">
            🪝 Hooks
          </span>
        )}
        {agent.components.specTemplates && (
          <span className="flex items-center gap-1 text-sm">
            📋 Specs
          </span>
        )}
      </div>
    </article>
  );
};
```

**What's Impressive:**
- Proper TypeScript interfaces
- Uses ConfigContext (not hardcoded)
- Accessibility features (ARIA, keyboard navigation)
- Responsive design with TailwindCSS
- Shows all component types with icons
- Handles missing data gracefully

---

## Spec-Driven vs Vibe Coding

### What is "Vibe Coding"?

Vibe coding is the traditional approach of giving an AI agent a rough idea and letting it generate code directly without formal specifications. It's fast to start but often leads to issues.

### Comparison

| Aspect | Vibe Coding | Spec-Driven Development |
|--------|-------------|------------------------|
| **Initial Speed** | ⚡ Very fast - start coding immediately | 🐢 Slower - write specs first |
| **Long-term Speed** | 🐌 Slows down - lots of rework and fixes | 🚀 Accelerates - clear path forward |
| **Code Quality** | ⚠️ Inconsistent - depends on prompt quality | ✅ High - follows design patterns |
| **Correctness** | ❌ Hard to verify - no formal properties | ✅ Verifiable - property-based tests |
| **Maintainability** | 😰 Difficult - unclear why code exists | 😊 Easy - traceable to requirements |
| **Collaboration** | 🤷 Hard - no shared understanding | 👥 Easy - specs are source of truth |
| **Testing** | 🎲 Ad-hoc - test what you remember | 🎯 Systematic - test all properties |
| **Changes** | 💥 Risky - unclear what breaks | 🛡️ Safe - know what's affected |

### Real Example: MCP Configuration Merging

**Vibe Coding Approach:**

```
Prompt: "Make the install command merge MCP configs without overwriting existing ones"
```

Result:
- Code might work for simple cases
- Edge cases missed (what if keys conflict?)
- No tests for all scenarios
- Unclear what "merge" means exactly
- Hard to verify correctness

**Spec-Driven Approach:**

1. **Requirement:**
```markdown
WHEN an Agent Bundle is installed THEN the Marketplace SHALL merge MCP server 
configurations into the user's mcp.json file without overwriting unrelated entries
```

2. **Correctness Property:**
```markdown
Property 11: MCP configuration merging
*For any* bundle containing MCP server configurations, installation SHALL merge 
the server entries into the existing `mcp.json` file without overwriting unrelated entries.
```

3. **Property-Based Test:**
```typescript
fc.assert(
  fc.property(
    existingMcpConfigArbitrary,
    bundleWithMcpServersArbitrary,
    (existingConfig, bundle) => {
      const merged = mergeMcpConfig(existingConfig, bundle.components.mcpServers);
      
      // Property: All existing servers preserved
      for (const [key, value] of Object.entries(existingConfig.mcpServers)) {
        if (!bundle.components.mcpServers.some(s => s.name === key)) {
          expect(merged.mcpServers[key]).toEqual(value);
        }
      }
      
      // Property: All new servers added
      for (const server of bundle.components.mcpServers) {
        expect(merged.mcpServers[server.name]).toBeDefined();
      }
    }
  ),
  { numRuns: 100 }
);
```

Result:
- Tests 100 random scenarios automatically
- Catches edge cases (conflicts, empty configs, etc.)
- Clear definition of "merge" behavior
- Verifiable correctness
- Confidence in implementation

### When to Use Each Approach

**Use Vibe Coding When:**
- Prototyping quick ideas
- Building throwaway code
- Very simple, isolated features
- Learning/experimenting

**Use Spec-Driven Development When:**
- Building production systems
- Complex features with many requirements
- Code that needs to be maintained
- Working in teams
- Correctness is critical
- **Building for a hackathon where quality matters!** 🎃

### Our Experience

For the Haunted Agents Marketplace:

**Time Investment:**
- Specs: ~2 hours to write requirements, design, and tasks
- Implementation: ~6 hours to execute all tasks

**Results:**
- ✅ 85+ tasks completed systematically
- ✅ 22 correctness properties implemented
- ✅ Property-based tests with 100+ iterations each
- ✅ Two complete applications from one skeleton
- ✅ Clean, maintainable, well-documented code
- ✅ High confidence in correctness

**Without Specs (estimated):**
- Would have taken 10+ hours of trial and error
- Many bugs discovered late
- Inconsistent code patterns
- Unclear if requirements met
- Difficult to verify correctness

### The Verdict

**Spec-driven development is slower to start but much faster overall.** The upfront investment in specifications pays massive dividends in code quality, correctness, and development velocity.

For the Kiroween Hackathon, spec-driven development enabled us to build a complex, production-ready skeleton template with confidence and clarity.

---

## Conclusion

Kiro's advanced features - **spec-driven development**, **steering documents**, and **agent hooks** - transformed how we built the Haunted Agents Marketplace. These features enabled:

✅ **Systematic Development** - Clear path from idea to implementation
✅ **High Quality Code** - Consistent patterns and best practices
✅ **Verifiable Correctness** - Property-based testing ensures correctness
✅ **Fast Iteration** - Automated testing with hooks
✅ **Maintainability** - Well-documented and traceable code

The result is a production-ready skeleton template that demonstrates the power of AI-assisted development when combined with formal specifications and intelligent tooling.

**Kiro isn't just a code generator - it's a development partner that helps you build correct, maintainable software systematically.** 🎃

---

## Resources

- **Specs**: `.kiro/specs/haunted-agents-marketplace/`
- **Steering**: `.kiro/steering/skeleton-dev.md`
- **Hooks**: `.kiro/hooks/test-on-save.json`
- **Code**: `skeleton/`, `app1-kiro-marketplace/`, `app2-devops-hub/`

## Contact

For questions about how Kiro was used in this project, please open an issue on GitHub or reach out to the development team.
