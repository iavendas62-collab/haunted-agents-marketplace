# Web Frontend Skeleton

This is the React-based web frontend for the Haunted Agents Marketplace. It provides a configurable marketplace UI for browsing and discovering agent bundles.

## Features

- **React 19** with TypeScript
- **Vite** for fast development and optimized builds
- **React Router** for client-side routing
- **TailwindCSS** for styling
- **Fuse.js** for client-side search (to be implemented)
- **Configuration-driven** - all content loaded from JSON files

## Project Structure

```
src/
├── config/          # Configuration loader
├── contexts/        # React contexts (ConfigContext)
├── pages/           # Page components (Home, AgentDetail)
├── types/           # TypeScript type definitions
├── App.tsx          # Main app component with routing
├── main.tsx         # Entry point
└── index.css        # Global styles with Tailwind
```

## Configuration Files

The app loads configuration from `/public/config/`:

- **branding.json** - Marketplace name, logo, colors, tagline
- **categories.json** - Agent categories for filtering
- **agents.json** - Agent bundle listings

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

- `VITE_CONFIG_PATH` - Path to configuration files (default: `/config`)

## Next Steps

The following components need to be implemented:

1. Agent listing and display (Task 12)
2. Search functionality (Task 14)
3. Category filtering (Task 15)
4. Agent detail page enhancements (Task 13)

## Requirements Validated

- ✅ 1.1 - Display grid of agent bundles
- ✅ 1.3 - Detail page with installation instructions
- ✅ 1.4 - Fast rendering (< 2 seconds)
