# Test-Driven Development Best Practices

This steering document provides expert guidance for practicing test-driven development (TDD).

## TDD Philosophy

### The Red-Green-Refactor Cycle

1. **Red**: Write a failing test that defines desired functionality
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve code quality while keeping tests green

### Why TDD?

- **Better Design**: Writing tests first leads to more modular, testable code
- **Confidence**: Comprehensive tests give confidence to refactor
- **Documentation**: Tests serve as living documentation
- **Fewer Bugs**: Catch issues early in development
- **Faster Debugging**: Failing tests pinpoint exact issues

## TDD Workflow

### Step 1: Write a Failing Test

```typescript
// Start with a test that describes what you want
describe('UserValidator', () => {
  it('should validate email format', () => {
    const validator = new UserValidator();
    
    expect(validator.isValidEmail('user@example.com')).toBe(true);
    expect(validator.isValidEmail('invalid-email')).toBe(false);
  });
});
```

**Run the test** - It should fail because `UserValidator` doesn't exist yet.

### Step 2: Write Minimal Implementation

```typescript
// Write just enough code to pass the test
class UserValidator {
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
```

**Run the test** - It should now pass.

### Step 3: Refactor

```typescript
// Improve the code while keeping tests green
class UserValidator {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  isValidEmail(email: string): boolean {
    if (!email || typeof email !== 'string') {
      return false;
    }
    return UserValidator.EMAIL_REGEX.test(email.trim());
  }
}
```

**Run the test** - It should still pass.

### Step 4: Add More Tests

```typescript
// Add tests for edge cases
describe('UserValidator', () => {
  it('should validate email format', () => {
    const validator = new UserValidator();
    
    expect(validator.isValidEmail('user@example.com')).toBe(true);
    expect(validator.isValidEmail('invalid-email')).toBe(false);
  });
  
  it('should handle null and undefined', () => {
    const validator = new UserValidator();
    
    expect(validator.isValidEmail(null as any)).toBe(false);
    expect(validator.isValidEmail(undefined as any)).toBe(false);
  });
  
  it('should trim whitespace', () => {
    const validator = new UserValidator();
    
    expect(validator.isValidEmail('  user@example.com  ')).toBe(true);
  });
});
```

## Unit Testing Best Practices

### Test Structure: AAA Pattern

```typescript
describe('Calculator', () => {
  it('should add two numbers', () => {
    // Arrange: Set up test data
    const calculator = new Calculator();
    const a = 5;
    const b = 3;
    
    // Act: Execute the function
    const result = calculator.add(a, b);
    
    // Assert: Verify the result
    expect(result).toBe(8);
  });
});
```

### Test Naming

Use descriptive names that explain what is being tested:

```typescript
// Good: Describes behavior
it('should return empty array when no users exist', () => {});
it('should throw error when email is invalid', () => {});
it('should calculate discount for premium users', () => {});

// Bad: Vague or implementation-focused
it('test1', () => {});
it('works', () => {});
it('calls getUserById', () => {});
```

### One Assertion Per Test (Generally)

```typescript
// Good: Focused test
it('should validate email format', () => {
  expect(validator.isValidEmail('user@example.com')).toBe(true);
});

it('should reject invalid email', () => {
  expect(validator.isValidEmail('invalid')).toBe(false);
});

// Acceptable: Related assertions
it('should create user with correct properties', () => {
  const user = createUser({ email: 'test@example.com', name: 'Test' });
  
  expect(user.email).toBe('test@example.com');
  expect(user.name).toBe('Test');
  expect(user.id).toBeDefined();
});
```

### Test Independence

Each test should be independent and not rely on other tests:

```typescript
// Good: Independent tests
describe('UserService', () => {
  let userService: UserService;
  
  beforeEach(() => {
    userService = new UserService();
  });
  
  it('should create user', () => {
    const user = userService.create({ email: 'test@example.com' });
    expect(user).toBeDefined();
  });
  
  it('should find user by id', () => {
    const created = userService.create({ email: 'test@example.com' });
    const found = userService.findById(created.id);
    expect(found).toEqual(created);
  });
});
```

## Mocking and Test Doubles

### When to Mock

- External services (APIs, databases)
- Time-dependent code
- Random number generation
- File system operations
- Complex dependencies

### Mock Example

```typescript
// Mock external API
describe('WeatherService', () => {
  it('should fetch weather data', async () => {
    // Arrange: Mock the HTTP client
    const mockHttpClient = {
      get: vi.fn().mockResolvedValue({
        data: { temperature: 72, condition: 'sunny' }
      })
    };
    
    const weatherService = new WeatherService(mockHttpClient);
    
    // Act
    const weather = await weatherService.getWeather('New York');
    
    // Assert
    expect(weather.temperature).toBe(72);
    expect(mockHttpClient.get).toHaveBeenCalledWith('/weather?city=New York');
  });
});
```

### Spy Example

```typescript
// Spy on method calls
describe('Logger', () => {
  it('should log errors to console', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation();
    
    const logger = new Logger();
    logger.error('Something went wrong');
    
    expect(consoleSpy).toHaveBeenCalledWith('Something went wrong');
    
    consoleSpy.mockRestore();
  });
});
```

## Integration Testing

### Database Integration Tests

```typescript
describe('UserRepository Integration', () => {
  let db: Database;
  let userRepo: UserRepository;
  
  beforeAll(async () => {
    // Set up test database
    db = await createTestDatabase();
    userRepo = new UserRepository(db);
  });
  
  afterAll(async () => {
    // Clean up
    await db.close();
  });
  
  beforeEach(async () => {
    // Clear data before each test
    await db.query('DELETE FROM users');
  });
  
  it('should create and retrieve user', async () => {
    // Create user
    const user = await userRepo.create({
      email: 'test@example.com',
      name: 'Test User'
    });
    
    // Retrieve user
    const found = await userRepo.findById(user.id);
    
    expect(found).toEqual(user);
  });
});
```

### API Integration Tests

```typescript
describe('User API Integration', () => {
  let app: Express;
  let server: Server;
  
  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });
  
  afterAll(() => {
    server.close();
  });
  
  it('should create user via POST /users', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'test@example.com', name: 'Test' })
      .expect(201);
    
    expect(response.body.email).toBe('test@example.com');
    expect(response.body.id).toBeDefined();
  });
});
```

## Property-Based Testing

### What is Property-Based Testing?

Instead of testing specific examples, test properties that should hold for all inputs.

### Example with fast-check

```typescript
import fc from 'fast-check';

describe('Array sorting properties', () => {
  it('should maintain array length', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        (arr) => {
          const sorted = [...arr].sort((a, b) => a - b);
          expect(sorted.length).toBe(arr.length);
        }
      )
    );
  });
  
  it('should be idempotent', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        (arr) => {
          const sorted1 = [...arr].sort((a, b) => a - b);
          const sorted2 = [...sorted1].sort((a, b) => a - b);
          expect(sorted1).toEqual(sorted2);
        }
      )
    );
  });
  
  it('should have elements in ascending order', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        (arr) => {
          const sorted = [...arr].sort((a, b) => a - b);
          for (let i = 1; i < sorted.length; i++) {
            expect(sorted[i]).toBeGreaterThanOrEqual(sorted[i - 1]);
          }
        }
      )
    );
  });
});
```

## Test Organization

### File Structure

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
├── services/
│   ├── UserService.ts
│   └── UserService.test.ts
└── utils/
    ├── validation.ts
    └── validation.test.ts
```

### Test Suites

```typescript
describe('UserService', () => {
  describe('create', () => {
    it('should create user with valid data', () => {});
    it('should throw error with invalid email', () => {});
    it('should generate unique ID', () => {});
  });
  
  describe('update', () => {
    it('should update user fields', () => {});
    it('should throw error if user not found', () => {});
  });
  
  describe('delete', () => {
    it('should delete user', () => {});
    it('should throw error if user not found', () => {});
  });
});
```

## Test Coverage

### What to Test

✅ **Do Test:**
- Business logic
- Edge cases and boundary conditions
- Error handling
- Data transformations
- Validation logic
- Integration points

❌ **Don't Test:**
- Third-party libraries
- Framework internals
- Trivial getters/setters
- Configuration files

### Coverage Goals

- **Unit Tests**: 80%+ code coverage
- **Integration Tests**: Critical user flows
- **Property Tests**: Complex algorithms and data structures

## Common Testing Patterns

### Testing Async Code

```typescript
describe('AsyncService', () => {
  it('should handle async operations', async () => {
    const result = await asyncService.fetchData();
    expect(result).toBeDefined();
  });
  
  it('should handle errors', async () => {
    await expect(asyncService.fetchInvalidData()).rejects.toThrow('Not found');
  });
});
```

### Testing Promises

```typescript
it('should resolve promise', () => {
  return expect(service.getData()).resolves.toBe('data');
});

it('should reject promise', () => {
  return expect(service.getInvalidData()).rejects.toThrow();
});
```

### Testing Callbacks

```typescript
it('should call callback with result', (done) => {
  service.getData((error, result) => {
    expect(error).toBeNull();
    expect(result).toBe('data');
    done();
  });
});
```

### Testing Timers

```typescript
describe('Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  
  afterEach(() => {
    vi.useRealTimers();
  });
  
  it('should execute after delay', () => {
    const callback = vi.fn();
    
    setTimeout(callback, 1000);
    
    expect(callback).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(1000);
    
    expect(callback).toHaveBeenCalled();
  });
});
```

## Error Testing

### Testing Exceptions

```typescript
describe('Validator', () => {
  it('should throw error for invalid input', () => {
    expect(() => {
      validator.validate(null);
    }).toThrow('Input cannot be null');
  });
  
  it('should throw specific error type', () => {
    expect(() => {
      validator.validate(null);
    }).toThrow(ValidationError);
  });
});
```

### Testing Error Messages

```typescript
it('should provide helpful error message', () => {
  try {
    validator.validate({ email: 'invalid' });
    fail('Should have thrown error');
  } catch (error) {
    expect(error.message).toContain('Invalid email format');
    expect(error.field).toBe('email');
  }
});
```

## Test Maintenance

### Keep Tests Simple

- Tests should be easier to understand than the code they test
- Avoid complex logic in tests
- Use helper functions for common setup

### Update Tests with Code

- When changing functionality, update tests first
- Ensure tests fail before fixing them
- Keep tests in sync with implementation

### Refactor Tests

- Apply DRY principle to test code
- Extract common setup to beforeEach
- Create test utilities and helpers
- Remove obsolete tests

## Code Generation Preferences

When generating test code:
1. Always follow the AAA pattern (Arrange, Act, Assert)
2. Use descriptive test names
3. Write independent tests
4. Include edge cases and error scenarios
5. Mock external dependencies
6. Use TypeScript for type safety
7. Add comments for complex test logic
8. Group related tests with describe blocks
9. Use beforeEach/afterEach for setup/teardown
10. Aim for readable, maintainable tests

## TDD Anti-Patterns to Avoid

### Testing Implementation Details

```typescript
// Bad: Testing internal implementation
it('should call private method', () => {
  const spy = vi.spyOn(service as any, '_internalMethod');
  service.publicMethod();
  expect(spy).toHaveBeenCalled();
});

// Good: Testing public behavior
it('should return correct result', () => {
  const result = service.publicMethod();
  expect(result).toBe(expectedValue);
});
```

### Fragile Tests

```typescript
// Bad: Brittle test that breaks with minor changes
it('should render exact HTML', () => {
  expect(component.innerHTML).toBe('<div class="user"><span>John</span></div>');
});

// Good: Test behavior, not structure
it('should display user name', () => {
  expect(component.textContent).toContain('John');
});
```

### Test Interdependence

```typescript
// Bad: Tests depend on execution order
let userId;

it('should create user', () => {
  userId = createUser().id;
});

it('should find user', () => {
  const user = findUser(userId); // Depends on previous test
  expect(user).toBeDefined();
});

// Good: Independent tests
it('should find created user', () => {
  const userId = createUser().id;
  const user = findUser(userId);
  expect(user).toBeDefined();
});
```

## Testing Tools

### Recommended Testing Stack

- **Test Runner**: Vitest or Jest
- **Assertion Library**: Built-in (expect)
- **Mocking**: vi.mock (Vitest) or jest.mock
- **Property Testing**: fast-check
- **Coverage**: Built-in coverage tools
- **Integration Testing**: Supertest (for APIs)

### Configuration Example (Vitest)

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', '**/*.test.ts']
    }
  }
});
```

## Continuous Testing

### Watch Mode

Run tests automatically on file changes:
```bash
npm test -- --watch
```

### Pre-commit Hooks

Run tests before committing:
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test"
    }
  }
}
```

### CI/CD Integration

Run tests in CI pipeline:
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
      - run: npm test
```
