# React + Supabase Best Practices

This steering document provides expert guidance for building React applications with Supabase.

## Architecture Patterns

### Component Organization
- Use functional components with hooks
- Separate business logic into custom hooks
- Keep components focused and single-purpose
- Use TypeScript for type safety

### Supabase Client Setup
```typescript
// Create a singleton Supabase client
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

## Authentication Best Practices

### Session Management
- Always check for existing sessions on app load
- Use `onAuthStateChange` to listen for auth events
- Store minimal user data in React state
- Implement proper logout flows

### Protected Routes
```typescript
// Use a ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" />
  
  return children
}
```

## Database Operations

### Type-Safe Queries
- Generate TypeScript types from your database schema
- Use Supabase CLI: `supabase gen types typescript`
- Import and use generated types in your queries

### Custom Hooks Pattern
```typescript
// Create reusable hooks for data operations
export function useTodos() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchTodos()
  }, [])
  
  async function fetchTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) console.error(error)
    else setTodos(data)
    setLoading(false)
  }
  
  return { todos, loading, refetch: fetchTodos }
}
```

## Real-Time Subscriptions

### Subscription Lifecycle
- Set up subscriptions in useEffect
- Always clean up subscriptions on unmount
- Handle reconnection gracefully

### Example Pattern
```typescript
useEffect(() => {
  const subscription = supabase
    .channel('todos-channel')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'todos' },
      (payload) => {
        // Handle real-time updates
        handleRealtimeUpdate(payload)
      }
    )
    .subscribe()
  
  return () => {
    subscription.unsubscribe()
  }
}, [])
```

## Error Handling

### Consistent Error Patterns
- Always check for errors in Supabase responses
- Display user-friendly error messages
- Log errors for debugging
- Implement retry logic for transient failures

### Error Boundary
```typescript
// Use error boundaries for graceful degradation
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }
    return this.props.children
  }
}
```

## Performance Optimization

### Query Optimization
- Use `.select()` to fetch only needed columns
- Implement pagination for large datasets
- Use `.single()` when expecting one result
- Cache frequently accessed data

### React Optimization
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Debounce search inputs
- Use lazy loading for routes

## Security Best Practices

### Row Level Security (RLS)
- Always enable RLS on tables
- Write policies that match your business logic
- Test policies thoroughly
- Use authenticated user ID in policies

### Environment Variables
- Never commit API keys to version control
- Use environment variables for all secrets
- Validate environment variables on startup
- Use different keys for dev/staging/prod

## Testing

### Unit Tests
- Test custom hooks with @testing-library/react-hooks
- Mock Supabase client in tests
- Test error handling paths
- Verify loading states

### Integration Tests
- Test authentication flows end-to-end
- Verify database operations
- Test real-time subscriptions
- Use test database for integration tests

## Code Generation Preferences

When generating code:
1. Always use TypeScript with strict mode
2. Include proper error handling
3. Add loading states for async operations
4. Implement proper cleanup in useEffect
5. Use descriptive variable names
6. Add JSDoc comments for complex functions
7. Follow React hooks rules strictly
8. Prefer composition over inheritance
9. Keep components under 200 lines
10. Extract reusable logic into custom hooks

## Common Patterns to Implement

### Authentication Context
Provide a global auth context with user state and auth methods.

### Data Fetching Hook
Create a generic `useSupabaseQuery` hook for consistent data fetching.

### Optimistic Updates
Implement optimistic UI updates for better UX.

### Form Handling
Use controlled components with validation before submission.

### File Uploads
Implement file uploads to Supabase Storage with progress indicators.
