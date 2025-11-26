# Skeleton Development Guidelines

## Overview

This steering document provides guidelines for developing and maintaining the Haunted Agents Marketplace skeleton template. The skeleton is designed to be a **reusable foundation** for building agent marketplace platforms across different domains.

## Core Principles

### 1. Configurability First

**All domain-specific content MUST be externalized to configuration files.**

- ❌ **NEVER** hardcode agent names, categories, or branding in components
- ✅ **ALWAYS** load from configuration files (agents.json, branding.json, categories.json)
- ✅ **ALWAYS** use the ConfigContext to access configuration data

**Example - Bad:**
```typescript
// DON'T DO THIS
const categories = ['Frontend', 'Backend', 'DevOps'];
```

**Example - Good:**
```typescript
// DO THIS
const { categories } = useConfig();
```

### 2. Separation of Skeleton and Applications

The repository structure separates the reusable skeleton from specific applications:

```
/skeleton/          # Reusable template code (domain-agnostic)
/app1-*/            # Application 1 (specific configuration)
/app2-*/            # Application 2 (specific configuration)
```

**Rules:**
- Skeleton code should work with ANY valid configuration
- Applications only contain configuration files and assets
- No business logic in application directories

### 3. Component Reusability

All React components in `skeleton/web/src/components/` must be generic:

- Accept data through props (typed interfaces)
- Use configuration from ConfigContext
- No assumptions about specific agent types or categories
- Style using TailwindCSS utility classes (configurable via branding)

### 4. Type Safety

Use TypeScript interfaces to enforce configuration structure:

```typescript
interface BundleManifest {
  id: string;
  name: string;
  version: string;
  // ... all required fields
}
```

This ensures applications provide valid configuration data.

## Development Workflow

### Adding New Features

When adding features to the skeleton:

1. **Design for configurability** - Can this be driven by configuration?
2. **Create TypeScript interfaces** - Define the shape of configuration data
3. **Update schema** - Add to manifest.schema.json if needed
4. **Test with both applications** - Verify it works for different domains
5. **Document in SKELETON_GUIDE.md** - Explain how to configure the feature

### Modifying Components

When modifying existing components:

1. **Check both applications** - Ensure changes don't break either app
2. **Maintain backward compatibility** - Don't remove configuration options
3. **Update types** - Keep TypeScript interfaces in sync
4. **Test edge cases** - Empty lists, missing images, long text, etc.

### Configuration Changes

When adding new configuration options:

1. **Update TypeScript types** - Add to config interfaces
2. **Provide defaults** - Handle missing optional fields gracefully
3. **Update both applications** - Add the new config to app1 and app2
4. **Document** - Explain the new option in SKELETON_GUIDE.md

## CLI Development

### Command Structure

All CLI commands follow this pattern:

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

### Error Handling

- Use descriptive error messages
- Suggest solutions when possible
- Exit with appropriate status codes
- Log errors to stderr, success to stdout

### File Operations

- Always check if files exist before reading
- Create directories if they don't exist
- Handle permission errors gracefully
- Clean up on failure (rollback changes)

## Bundle System

### Manifest Validation

Every bundle must have a valid manifest.json:

- Validate against manifest.schema.json
- Check all referenced files exist
- Verify version format (semantic versioning)
- Ensure required fields are present

### Component Installation

When installing bundle components:

1. **MCP Servers** → `.kiro/mcp/` (merge with existing)
2. **Steering Files** → `.kiro/steering/` (with inclusion settings)
3. **Hooks** → `.kiro/hooks/` (register in hooks system)
4. **Spec Templates** → `.kiro/specs/` (make available in workflow)

### Conflict Resolution

When files conflict during installation:

- Prompt user for action (overwrite/skip/rename)
- Never silently overwrite user files
- Provide clear information about conflicts
- Allow batch operations (apply to all)

## Testing Strategy

### Unit Tests

- Test each command independently
- Mock file system operations
- Test error conditions
- Verify output messages

### Property-Based Tests

- Use fast-check for generating test data
- Run minimum 100 iterations per property
- Tag tests with property numbers from design.md
- Test with diverse, random inputs

### Integration Tests

- Test complete workflows (install → list → verify)
- Use temporary directories for file operations
- Clean up after tests
- Test both applications end-to-end

## Code Style

### TypeScript

- Use strict mode
- Prefer interfaces over types for objects
- Use async/await over promises
- Avoid `any` type (use `unknown` if needed)

### React

- Use functional components with hooks
- Extract reusable logic to custom hooks
- Keep components small and focused
- Use TypeScript for prop types

### Naming Conventions

- Components: PascalCase (AgentCard.tsx)
- Functions: camelCase (fetchAgents)
- Constants: UPPER_SNAKE_CASE (DEFAULT_REGISTRY_URL)
- Files: kebab-case for configs (agents.json)

## Performance Considerations

### Web Frontend

- Lazy load images
- Debounce search input (300ms)
- Memoize expensive computations
- Use React.memo for pure components

### CLI

- Stream large files (don't load into memory)
- Use async operations for I/O
- Cache registry data locally
- Provide progress indicators for long operations

## Accessibility

### Web Frontend

- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Use ARIA labels where needed

## Documentation

### Code Comments

- Explain WHY, not WHAT
- Document complex algorithms
- Add JSDoc for public APIs
- Keep comments up to date

### User Documentation

- SKELETON_GUIDE.md - How to use the skeleton
- BUNDLE_FORMAT.md - Bundle specification
- README.md - Project overview and setup
- KIRO_USAGE.md - How Kiro was used in development

## Common Pitfalls

### ❌ Hardcoding Domain-Specific Content

```typescript
// BAD
if (agent.id === 'react-supabase-expert') {
  // special handling
}
```

### ❌ Assuming Configuration Structure

```typescript
// BAD
const logo = config.branding.logo; // might be undefined
```

```typescript
// GOOD
const logo = config.branding?.logo ?? '/default-logo.svg';
```

### ❌ Not Handling Missing Data

```typescript
// BAD
agents.map(agent => <AgentCard agent={agent} />)
```

```typescript
// GOOD
{agents.length > 0 ? (
  agents.map(agent => <AgentCard key={agent.id} agent={agent} />)
) : (
  <EmptyState message="No agents found" />
)}
```

## Maintenance Checklist

Before committing changes:

- [ ] Code works with both app1 and app2
- [ ] All tests pass (unit + property + integration)
- [ ] TypeScript compiles without errors
- [ ] No hardcoded domain-specific content
- [ ] Configuration changes documented
- [ ] Error handling is comprehensive
- [ ] Code follows style guidelines
- [ ] Comments are clear and helpful

## Getting Help

When stuck:

1. Check existing code for similar patterns
2. Review the design document for architecture decisions
3. Test with both applications to verify behavior
4. Ask Kiro for suggestions (use steering context!)

## Kiro-Specific Tips

### Using Specs

- Reference requirements.md when implementing features
- Check design.md for architecture decisions
- Follow tasks.md for implementation order

### Using Steering

- This file is always included in Kiro context
- Add domain-specific steering to application directories
- Use file-match patterns for context-specific guidance

### Using Hooks

- Set up test-on-save for rapid feedback
- Use hooks for repetitive tasks
- Document hooks in .kiro/hooks/

## Version Control

### Commit Messages

Follow conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Maintenance tasks

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

## Deployment

### Web Frontend

- Deploy both applications to Vercel
- Set environment variables per application
- Test deployed versions before announcing

### CLI

- Publish to npm with semantic versioning
- Test installation from npm before releasing
- Update documentation with new version

## Success Metrics

A well-maintained skeleton should:

- ✅ Support new applications with only configuration changes
- ✅ Have comprehensive test coverage (>80%)
- ✅ Provide clear error messages
- ✅ Be easy to understand and modify
- ✅ Work reliably across different environments
- ✅ Have up-to-date documentation

---

**Remember:** The skeleton's power comes from its flexibility. Every decision should prioritize configurability and reusability over convenience for a single use case.
