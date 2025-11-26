# Testing Strategy Design Template

## Overview

[Provide a high-level overview of the testing strategy for this feature/system]

## Testing Philosophy

### Test-Driven Development Approach

We follow the Red-Green-Refactor cycle:
1. **Red**: Write failing tests that define desired behavior
2. **Green**: Implement minimal code to pass tests
3. **Refactor**: Improve code quality while keeping tests green

### Testing Pyramid

```
        /\
       /  \      E2E Tests (Few)
      /____\     
     /      \    Integration Tests (Some)
    /________\   
   /          \  Unit Tests (Many)
  /__________  \
```

- **Unit Tests (70%)**: Fast, isolated tests of individual functions/classes
- **Integration Tests (20%)**: Tests of component interactions
- **E2E Tests (10%)**: Full system tests from user perspective

## Test Categories

### 1. Unit Tests

**Purpose**: Verify individual units of code in isolation

**Scope**: Functions, classes, modules

**Characteristics**:
- Fast execution (< 1ms per test)
- No external dependencies
- Use mocks/stubs for dependencies
- High code coverage

**Example**:
```typescript
describe('UserValidator', () => {
  it('should validate email format', () => {
    const validator = new UserValidator();
    expect(validator.isValidEmail('user@example.com')).toBe(true);
    expect(validator.isValidEmail('invalid')).toBe(false);
  });
});
```

### 2. Integration Tests

**Purpose**: Verify components work together correctly

**Scope**: Multiple modules, database, external services

**Characteristics**:
- Slower execution (< 100ms per test)
- Use real dependencies where possible
- Test database with test data
- Verify data flow between components

**Example**:
```typescript
describe('UserService Integration', () => {
  it('should create and retrieve user from database', async () => {
    const user = await userService.create({ email: 'test@example.com' });
    const found = await userService.findById(user.id);
    expect(found).toEqual(user);
  });
});
```

### 3. Property-Based Tests

**Purpose**: Verify properties hold for all inputs

**Scope**: Algorithms, data transformations, invariants

**Characteristics**:
- Generate random inputs
- Verify universal properties
- Find edge cases automatically
- Run 100+ iterations

**Example**:
```typescript
import fc from 'fast-check';

describe('Sorting properties', () => {
  it('should maintain array length', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const sorted = [...arr].sort((a, b) => a - b);
        expect(sorted.length).toBe(arr.length);
      })
    );
  });
});
```

### 4. End-to-End Tests

**Purpose**: Verify complete user workflows

**Scope**: Full system from UI to database

**Characteristics**:
- Slowest execution (seconds per test)
- Test critical user journeys
- Use real browser/environment
- Minimal number of tests

**Example**:
```typescript
describe('User Registration E2E', () => {
  it('should allow user to register and login', async () => {
    await page.goto('/register');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });
});
```

## Test Organization

### Directory Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx          # Unit tests
│   │   └── Button.integration.test.tsx  # Integration tests
│   └── UserForm/
│       ├── UserForm.tsx
│       └── UserForm.test.tsx
├── services/
│   ├── UserService.ts
│   ├── UserService.test.ts          # Unit tests
│   └── UserService.integration.test.ts  # Integration tests
├── utils/
│   ├── validation.ts
│   └── validation.test.ts
└── __tests__/
    ├── e2e/
    │   └── user-registration.e2e.test.ts
    └── properties/
        └── sorting.property.test.ts
```

### Naming Conventions

- Unit tests: `*.test.ts`
- Integration tests: `*.integration.test.ts`
- Property tests: `*.property.test.ts`
- E2E tests: `*.e2e.test.ts`

## Testing Patterns

### AAA Pattern (Arrange-Act-Assert)

```typescript
it('should calculate total price with discount', () => {
  // Arrange: Set up test data
  const cart = new ShoppingCart();
  cart.addItem({ price: 100, quantity: 2 });
  const discount = 0.1; // 10% discount
  
  // Act: Execute the function
  const total = cart.calculateTotal(discount);
  
  // Assert: Verify the result
  expect(total).toBe(180); // 200 - 20 = 180
});
```

### Given-When-Then Pattern

```typescript
describe('User authentication', () => {
  it('should authenticate user with valid credentials', () => {
    // Given: A user with valid credentials
    const user = { email: 'user@example.com', password: 'password123' };
    
    // When: User attempts to login
    const result = authService.login(user.email, user.password);
    
    // Then: Authentication succeeds
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
  });
});
```

### Test Fixtures

```typescript
// test/fixtures/users.ts
export const validUser = {
  email: 'user@example.com',
  name: 'Test User',
  role: 'user'
};

export const adminUser = {
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin'
};

// Usage in tests
import { validUser } from '../fixtures/users';

it('should create user', () => {
  const user = userService.create(validUser);
  expect(user.email).toBe(validUser.email);
});
```

## Mocking Strategy

### When to Mock

✅ **Mock**:
- External APIs
- Database connections (in unit tests)
- File system operations
- Time-dependent code
- Random number generation
- Third-party services

❌ **Don't Mock**:
- Code you own (in integration tests)
- Simple utilities
- Data structures
- Pure functions

### Mock Examples

**Mock External API**:
```typescript
const mockHttpClient = {
  get: vi.fn().mockResolvedValue({ data: { id: 1, name: 'Test' } })
};

const service = new UserService(mockHttpClient);
```

**Mock Database**:
```typescript
const mockDb = {
  query: vi.fn().mockResolvedValue([{ id: 1, email: 'test@example.com' }])
};

const repository = new UserRepository(mockDb);
```

**Spy on Methods**:
```typescript
const spy = vi.spyOn(service, 'sendEmail');
await service.registerUser({ email: 'test@example.com' });
expect(spy).toHaveBeenCalledWith('test@example.com', expect.any(String));
```

## Test Data Management

### Test Database

**Setup**:
```typescript
beforeAll(async () => {
  // Create test database
  db = await createTestDatabase();
  await db.migrate();
});

afterAll(async () => {
  // Clean up
  await db.close();
});

beforeEach(async () => {
  // Clear data before each test
  await db.truncate();
});
```

### Factories

```typescript
// test/factories/userFactory.ts
export function createUser(overrides = {}) {
  return {
    id: generateId(),
    email: `user${Date.now()}@example.com`,
    name: 'Test User',
    role: 'user',
    createdAt: new Date().toISOString(),
    ...overrides
  };
}

// Usage
const user = createUser({ role: 'admin' });
```

### Builders

```typescript
class UserBuilder {
  private user: Partial<User> = {};
  
  withEmail(email: string) {
    this.user.email = email;
    return this;
  }
  
  withRole(role: string) {
    this.user.role = role;
    return this;
  }
  
  build(): User {
    return {
      id: generateId(),
      email: this.user.email || 'default@example.com',
      name: this.user.name || 'Test User',
      role: this.user.role || 'user',
      createdAt: new Date().toISOString()
    };
  }
}

// Usage
const admin = new UserBuilder()
  .withEmail('admin@example.com')
  .withRole('admin')
  .build();
```

## Coverage Goals

### Code Coverage Targets

- **Overall**: 80%+ coverage
- **Critical paths**: 100% coverage
- **Utilities**: 90%+ coverage
- **UI components**: 70%+ coverage

### Coverage Metrics

- **Line Coverage**: Percentage of lines executed
- **Branch Coverage**: Percentage of branches taken
- **Function Coverage**: Percentage of functions called
- **Statement Coverage**: Percentage of statements executed

### Coverage Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.ts',
        '**/*.config.ts'
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    }
  }
});
```

## Test Execution

### Local Development

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- UserService.test.ts

# Run with coverage
npm test -- --coverage
```

### CI/CD Pipeline

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v2
```

## Performance Testing

### Benchmarking

```typescript
describe('Performance', () => {
  it('should process 1000 items in under 100ms', () => {
    const items = Array.from({ length: 1000 }, (_, i) => i);
    
    const start = performance.now();
    const result = processItems(items);
    const duration = performance.now() - start;
    
    expect(duration).toBeLessThan(100);
    expect(result.length).toBe(1000);
  });
});
```

### Load Testing

```typescript
describe('Load Test', () => {
  it('should handle 100 concurrent requests', async () => {
    const requests = Array.from({ length: 100 }, () => 
      api.get('/users')
    );
    
    const results = await Promise.all(requests);
    
    expect(results.every(r => r.status === 200)).toBe(true);
  });
});
```

## Error Testing

### Exception Testing

```typescript
describe('Error handling', () => {
  it('should throw ValidationError for invalid input', () => {
    expect(() => {
      validator.validate(null);
    }).toThrow(ValidationError);
  });
  
  it('should include error details', () => {
    try {
      validator.validate({ email: 'invalid' });
      fail('Should have thrown');
    } catch (error) {
      expect(error.message).toContain('Invalid email');
      expect(error.field).toBe('email');
    }
  });
});
```

### Async Error Testing

```typescript
describe('Async errors', () => {
  it('should reject with error', async () => {
    await expect(service.fetchInvalidData())
      .rejects
      .toThrow('Not found');
  });
});
```

## Test Maintenance

### Refactoring Tests

- Extract common setup to `beforeEach`
- Create test utilities and helpers
- Use factories for test data
- Remove duplicate test code

### Updating Tests

- Update tests when requirements change
- Keep tests in sync with implementation
- Remove obsolete tests
- Add tests for new features

### Test Smells

❌ **Avoid**:
- Tests that depend on execution order
- Tests with complex logic
- Tests that test implementation details
- Flaky tests that pass/fail randomly
- Slow tests that block development

✅ **Prefer**:
- Independent, isolated tests
- Simple, readable tests
- Tests that verify behavior
- Fast, reliable tests
- Tests that provide value

## Documentation

### Test Documentation

Each test should be self-documenting:
- Use descriptive test names
- Follow consistent patterns
- Add comments for complex logic
- Group related tests

### Example

```typescript
describe('UserService', () => {
  describe('create', () => {
    it('should create user with valid data', () => {
      // Test implementation
    });
    
    it('should throw ValidationError for invalid email', () => {
      // Test implementation
    });
    
    it('should generate unique ID for each user', () => {
      // Test implementation
    });
  });
  
  describe('update', () => {
    it('should update user fields', () => {
      // Test implementation
    });
    
    it('should throw NotFoundError if user does not exist', () => {
      // Test implementation
    });
  });
});
```

## Continuous Improvement

### Metrics to Track

- Test execution time
- Test coverage percentage
- Number of flaky tests
- Test failure rate
- Time to fix failing tests

### Regular Reviews

- Review test coverage reports
- Identify untested code paths
- Remove obsolete tests
- Improve slow tests
- Fix flaky tests

## Tools and Libraries

### Testing Stack

- **Test Runner**: Vitest / Jest
- **Assertion Library**: expect (built-in)
- **Mocking**: vi.mock / jest.mock
- **Property Testing**: fast-check
- **Coverage**: Built-in coverage tools
- **E2E Testing**: Playwright / Cypress
- **API Testing**: Supertest

### Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
});
```

## Success Criteria

Testing strategy is successful when:
- ✅ All tests pass consistently
- ✅ Coverage goals are met
- ✅ Tests run quickly (< 10s for unit tests)
- ✅ Tests catch bugs before production
- ✅ Tests provide confidence to refactor
- ✅ Tests serve as documentation
- ✅ New features include tests
- ✅ CI/CD pipeline includes tests
