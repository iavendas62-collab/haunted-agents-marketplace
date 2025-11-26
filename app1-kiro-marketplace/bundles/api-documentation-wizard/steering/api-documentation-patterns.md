# API Documentation Best Practices

This steering document provides expert guidance for creating comprehensive API documentation.

## Documentation Philosophy

### Developer-First Approach
- Write for developers who will consume your API
- Assume minimal context about your system
- Provide working examples for every endpoint
- Make it easy to get started quickly

### Completeness
- Document all endpoints, parameters, and responses
- Include error scenarios and edge cases
- Explain authentication and authorization
- Provide rate limiting and quota information

## OpenAPI/Swagger Specification

### Structure
```yaml
openapi: 3.0.0
info:
  title: Your API Name
  version: 1.0.0
  description: Clear, concise API description
  contact:
    name: API Support
    email: support@example.com
servers:
  - url: https://api.example.com/v1
    description: Production server
  - url: https://staging-api.example.com/v1
    description: Staging server
```

### Endpoint Documentation Pattern
```yaml
paths:
  /users/{userId}:
    get:
      summary: Get user by ID
      description: |
        Retrieves detailed information about a specific user.
        Requires authentication and appropriate permissions.
      operationId: getUserById
      tags:
        - Users
      parameters:
        - name: userId
          in: path
          required: true
          description: Unique identifier for the user
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: User found successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
              examples:
                success:
                  value:
                    id: "123e4567-e89b-12d3-a456-426614174000"
                    email: "user@example.com"
                    name: "John Doe"
                    createdAt: "2025-01-15T10:30:00Z"
        '404':
          description: User not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '401':
          description: Unauthorized - Invalid or missing authentication
```

## REST API Design Patterns

### Resource Naming
- Use plural nouns for collections: `/users`, `/products`
- Use hierarchical structure: `/users/{userId}/orders`
- Keep URLs lowercase with hyphens: `/user-profiles`
- Avoid verbs in URLs (use HTTP methods instead)

### HTTP Methods
- **GET**: Retrieve resources (idempotent, safe)
- **POST**: Create new resources
- **PUT**: Replace entire resource
- **PATCH**: Partial update of resource
- **DELETE**: Remove resource

### Status Codes
- **200 OK**: Successful GET, PUT, PATCH
- **201 Created**: Successful POST
- **204 No Content**: Successful DELETE
- **400 Bad Request**: Invalid input
- **401 Unauthorized**: Missing/invalid authentication
- **403 Forbidden**: Authenticated but not authorized
- **404 Not Found**: Resource doesn't exist
- **422 Unprocessable Entity**: Validation errors
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

## Authentication Documentation

### API Key Pattern
```markdown
## Authentication

This API uses API key authentication. Include your API key in the `X-API-Key` header:

```http
GET /api/users
Host: api.example.com
X-API-Key: your_api_key_here
```

To obtain an API key:
1. Sign up at https://example.com/signup
2. Navigate to Settings > API Keys
3. Generate a new API key
4. Store it securely (never commit to version control)
```

### OAuth 2.0 Pattern
```markdown
## Authentication

This API uses OAuth 2.0 for authentication.

### Authorization Code Flow

1. **Redirect user to authorization URL:**
   ```
   GET https://auth.example.com/oauth/authorize?
     client_id=YOUR_CLIENT_ID&
     redirect_uri=YOUR_REDIRECT_URI&
     response_type=code&
     scope=read write
   ```

2. **Exchange authorization code for access token:**
   ```http
   POST /oauth/token
   Content-Type: application/x-www-form-urlencoded

   grant_type=authorization_code&
   code=AUTHORIZATION_CODE&
   client_id=YOUR_CLIENT_ID&
   client_secret=YOUR_CLIENT_SECRET&
   redirect_uri=YOUR_REDIRECT_URI
   ```

3. **Use access token in requests:**
   ```http
   GET /api/users
   Authorization: Bearer YOUR_ACCESS_TOKEN
   ```

### Token Refresh
Access tokens expire after 1 hour. Use the refresh token to obtain a new access token:

```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&
refresh_token=YOUR_REFRESH_TOKEN&
client_id=YOUR_CLIENT_ID&
client_secret=YOUR_CLIENT_SECRET
```
```

## Request/Response Examples

### Complete Example Pattern
```markdown
### Create User

Creates a new user account.

**Endpoint:** `POST /users`

**Request Headers:**
```http
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "name": "Jane Smith",
  "role": "user"
}
```

**Success Response (201 Created):**
```json
{
  "id": "789e4567-e89b-12d3-a456-426614174000",
  "email": "newuser@example.com",
  "name": "Jane Smith",
  "role": "user",
  "createdAt": "2025-11-25T14:30:00Z",
  "updatedAt": "2025-11-25T14:30:00Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is already registered"
      }
    ]
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired access token"
  }
}
```
```

## Error Handling Documentation

### Standard Error Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": [
      {
        "field": "fieldName",
        "message": "Specific field error"
      }
    ],
    "requestId": "req_123456789",
    "timestamp": "2025-11-25T14:30:00Z"
  }
}
```

### Common Error Codes
Document all possible error codes:
- `VALIDATION_ERROR`: Input validation failed
- `UNAUTHORIZED`: Authentication required or failed
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

## Pagination Documentation

### Cursor-Based Pagination
```markdown
## Pagination

This API uses cursor-based pagination for list endpoints.

**Request:**
```http
GET /users?limit=20&cursor=eyJpZCI6MTIzfQ
```

**Parameters:**
- `limit` (optional): Number of items per page (default: 20, max: 100)
- `cursor` (optional): Pagination cursor from previous response

**Response:**
```json
{
  "data": [
    { "id": "1", "name": "User 1" },
    { "id": "2", "name": "User 2" }
  ],
  "pagination": {
    "nextCursor": "eyJpZCI6MTI1fQ",
    "hasMore": true
  }
}
```
```

## Rate Limiting Documentation

```markdown
## Rate Limits

API requests are rate limited to ensure fair usage:

- **Free tier**: 100 requests per hour
- **Pro tier**: 1,000 requests per hour
- **Enterprise**: Custom limits

**Rate Limit Headers:**
Every response includes rate limit information:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

**Rate Limit Exceeded Response (429):**
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 3600 seconds.",
    "retryAfter": 3600
  }
}
```
```

## Versioning Documentation

```markdown
## API Versioning

This API uses URL versioning. The current version is v1.

**Base URL:** `https://api.example.com/v1`

### Version Support
- **v1**: Current version (stable)
- **v2**: Beta (available for testing)

### Breaking Changes
We maintain backward compatibility within major versions. Breaking changes will only be introduced in new major versions with at least 6 months notice.

### Deprecation Policy
Deprecated endpoints will:
1. Be marked as deprecated in documentation
2. Return a `Deprecation` header
3. Be supported for at least 12 months
4. Be removed in the next major version
```

## Code Generation Preferences

When generating API documentation:
1. Always include complete request/response examples
2. Document all possible status codes
3. Provide authentication examples
4. Include error scenarios
5. Add rate limiting information
6. Document pagination if applicable
7. Use consistent formatting
8. Include timestamps in ISO 8601 format
9. Provide cURL examples for quick testing
10. Add links to related endpoints

## Interactive Documentation

### Swagger UI Integration
- Generate interactive API documentation
- Allow developers to test endpoints directly
- Provide "Try it out" functionality
- Include authentication configuration

### Postman Collections
- Export OpenAPI spec to Postman
- Provide pre-configured environment variables
- Include example requests for all endpoints
- Share collection link in documentation

## Documentation Structure

### Recommended Sections
1. **Introduction**: Overview and getting started
2. **Authentication**: How to authenticate
3. **Endpoints**: Detailed endpoint documentation
4. **Data Models**: Schema definitions
5. **Error Handling**: Error codes and formats
6. **Rate Limiting**: Limits and headers
7. **Webhooks**: Event notifications (if applicable)
8. **SDKs**: Client libraries (if available)
9. **Changelog**: Version history
10. **Support**: How to get help

## Testing Documentation

Provide guidance for testing:
- Sandbox/test environment URLs
- Test API keys
- Sample data for testing
- Common testing scenarios
- Integration test examples
