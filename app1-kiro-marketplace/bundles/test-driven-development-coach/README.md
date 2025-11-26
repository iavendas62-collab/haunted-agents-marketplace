# Test-Driven Development Coach Bundle

Transform your Kiro into a TDD expert!

## What's Included

### 📚 Steering Files
- **TDD Best Practices**: Comprehensive guidance on the Red-Green-Refactor cycle, unit testing, integration testing, property-based testing, mocking strategies, and test organization

### 🪝 Hooks
- **Run Tests on Save**: Automatically runs your test suite when you save files, providing instant feedback on code changes

### 📋 Spec Templates
- **Test-First Requirements Template**: Structured template for defining requirements with test strategies
- **Testing Strategy Design Template**: Complete template for designing comprehensive testing strategies

## Installation

```bash
kiro-agent install test-driven-development-coach
```

## Example Use Cases

### Write Unit Tests First
```
Help me write unit tests for a user authentication function that validates email and password, then implement the function to pass the tests
```

### Create Integration Tests
```
Write integration tests for my REST API user endpoints (create, read, update, delete) with proper setup and teardown
```

### Implement Property-Based Tests
```
Create property-based tests for my sorting algorithm that verify it works correctly for any input array
```

## What You'll Get

- Red-Green-Refactor workflow guidance
- Comprehensive unit testing patterns
- Integration testing strategies
- Property-based testing with fast-check
- Mocking and test double patterns
- Test organization best practices
- Automated test execution on file save
- Test coverage strategies
- Spec templates for test-first development

## TDD Workflow

### 1. Red - Write Failing Test
```typescript
it('should validate email format', () => {
  expect(validator.isValidEmail('user@example.com')).toBe(true);
});
```

### 2. Green - Make It Pass
```typescript
class Validator {
  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
```

### 3. Refactor - Improve Code
```typescript
class Validator {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  isValidEmail(email: string): boolean {
    return email && Validator.EMAIL_REGEX.test(email.trim());
  }
}
```

## Testing Patterns Included

### Unit Testing
- AAA pattern (Arrange-Act-Assert)
- Test independence
- Descriptive test names
- Edge case coverage

### Integration Testing
- Database integration tests
- API integration tests
- Setup and teardown patterns

### Property-Based Testing
- Universal property verification
- Automatic edge case discovery
- Invariant testing

### Mocking
- External service mocking
- Dependency injection
- Spy patterns

## Best Practices

- Write tests before implementation
- Keep tests simple and focused
- Test behavior, not implementation
- Use descriptive test names
- Maintain test independence
- Aim for high coverage
- Refactor tests like production code

## Requirements

- Node.js 18+
- npm or yarn
- Jest or Vitest
- Kiro IDE 1.0.0+

## Perfect For

- Developers learning TDD
- Teams adopting test-first practices
- Projects requiring high code quality
- Developers who want better test coverage
- Anyone building robust, maintainable code

## Learn More

- [Test-Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [fast-check (Property Testing)](https://fast-check.dev/)
