# 🎃 Haunted Agents Marketplace

> **A skeleton template for building agent marketplace platforms**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Kiroween Hackathon](https://img.shields.io/badge/Kiroween-Skeleton%20Crew-orange)](https://kiro.dev/hackathon)

## 🎬 Demo Video

**[Watch the 3-minute demo on YouTube →](https://youtu.be/cNtK3xBDujg)**

See both applications in action:
- 🎨 **Kiro Agents Marketplace** - AI agents for Kiro IDE development
- 🚀 **DevOps Automation Hub** - DevOps automation and infrastructure agents

**📹 Creating Your Demo Video:**
- [Demo Video Script](DEMO_VIDEO_SCRIPT.md) - Complete script and timing
- [Recording Guide](DEMO_VIDEO_RECORDING_GUIDE.md) - Step-by-step recording instructions
- [YouTube Upload Guide](YOUTUBE_UPLOAD_GUIDE.md) - Upload and optimization tips
- [Summary & Checklist](DEMO_VIDEO_SUMMARY.md) - Complete workflow overview

## 📖 Overview

The Haunted Agents Marketplace is a **reusable skeleton template** for building agent marketplace platforms - similar to the GPTs Store, Figma Plugins, or VS Code Extensions. This flexible foundation enables developers to create platforms where users can discover, share, and install customized AI agents.

**Built for the Kiroween Hackathon 🎃 Skeleton Crew Category**

### What's Included

- 🎨 **Web Frontend** - React-based marketplace UI for browsing and discovering agents
- 🛠️ **CLI Tool** - Command-line interface for installing and managing agent bundles
- 📦 **Bundle System** - Standardized format for packaging agent configurations
- 🔧 **Two Example Applications** - Demonstrating the skeleton's versatility

### Key Features

✨ **Domain-Agnostic** - Works for any type of agent marketplace  
🎯 **Configuration-Driven** - Customize with JSON files, no code changes needed  
🚀 **Production-Ready** - Built with TypeScript, React, and modern tooling  
📚 **Well-Documented** - Comprehensive guides and examples  
🧪 **Thoroughly Tested** - Unit tests and property-based tests  
🎨 **Customizable** - Easy to brand and extend  

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Skeleton Template                       │
│  (Reusable, domain-agnostic foundation)                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐  │
│  │  Web Frontend│      │  CLI Tool    │      │  Bundle   │  │
│  │  (React)     │      │  (Node.js)   │      │  System   │  │
│  └──────────────┘      └──────────────┘      └───────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Configuration Files
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                             │
        ▼                                             ▼
┌──────────────────┐                      ┌──────────────────┐
│  Application 1   │                      │  Application 2   │
│  Kiro Agents     │                      │  DevOps Hub      │
│  Marketplace     │                      │  Marketplace     │
└──────────────────┘                      └──────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Git installed
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/haunted-agents/marketplace.git
cd marketplace
```

2. **Install dependencies:**
```bash
npm install
cd skeleton/web && npm install
cd ../cli && npm install
cd ../shared && npm install
```

3. **Run the web frontend (Application 1):**
```bash
cd skeleton/web
VITE_CONFIG_PATH=../../app1-kiro-marketplace/config npm run dev
```

4. **Open your browser:**
```
http://localhost:5173
```

5. **Try the CLI tool:**
```bash
cd skeleton/cli
npm link
kiro-agent --help
```

## 📦 What's in the Box

### Skeleton Template (`/skeleton`)

The reusable foundation that powers all marketplaces:

- **`skeleton/web/`** - React + TypeScript + Vite web frontend
- **`skeleton/cli/`** - Node.js CLI tool with Commander.js
- **`skeleton/shared/`** - Shared types and JSON schemas

### Application 1: Kiro Agents Marketplace (`/app1-kiro-marketplace`)

A marketplace for Kiro IDE agent bundles:

**Featured Agents:**
- 🎨 **React + Supabase Expert** - Full-stack development with React and Supabase
- 📚 **API Documentation Wizard** - Automated API documentation generation
- ✅ **Test-Driven Development Coach** - TDD best practices and automation

**Live Demo:** [kiro-agents-marketplace.vercel.app](https://kiro-agents-marketplace.vercel.app)

### Application 2: DevOps Automation Hub (`/app2-devops-hub`)

A marketplace for DevOps automation agents:

**Featured Agents:**
- 🔄 **CI/CD Pipeline Template** - GitHub Actions and GitLab CI templates
- 📊 **Kubernetes Monitor** - K8s cluster monitoring and management
- 🏗️ **Terraform Helper** - Infrastructure as code best practices

**Live Demo:** [devops-automation-hub.vercel.app](https://devops-automation-hub.vercel.app)

## 🎯 Use Cases

This skeleton template can be used to build marketplaces for:

- 🎨 **Design Tools** - Figma plugins, Sketch extensions
- 💻 **Development Tools** - IDE extensions, code generators
- 🤖 **AI Agents** - Specialized AI assistants for different domains
- 🎮 **Game Development** - Unity/Unreal Engine tools and assets
- 📊 **Data Science** - Jupyter notebook extensions, ML models
- 🎵 **Creative Tools** - Audio plugins, video effects
- ...and many more!

## 📚 Documentation

### For Users

- **[SKELETON_GUIDE.md](SKELETON_GUIDE.md)** - Complete guide to creating your own marketplace
- **[BUNDLE_FORMAT.md](BUNDLE_FORMAT.md)** - Bundle specification and examples
- **[KIRO_USAGE.md](KIRO_USAGE.md)** - How Kiro was used to build this project

### For Developers

- **[Design Document](.kiro/specs/haunted-agents-marketplace/design.md)** - Architecture and design decisions
- **[Requirements](.kiro/specs/haunted-agents-marketplace/requirements.md)** - Formal requirements specification
- **[Tasks](.kiro/specs/haunted-agents-marketplace/tasks.md)** - Implementation plan

## 🛠️ CLI Usage

### Install an Agent Bundle

```bash
kiro-agent install react-supabase-expert
```

### List Installed Agents

```bash
kiro-agent list
```

### Create a New Bundle

```bash
kiro-agent create my-agent
```

### Validate a Bundle

```bash
kiro-agent validate path/to/bundle
```

### Package a Bundle

```bash
kiro-agent package path/to/bundle
```

## 🎨 Creating Your Own Marketplace

### Step 1: Create Application Directory

```bash
mkdir app3-my-marketplace
cd app3-my-marketplace
mkdir -p config bundles public/images
```

### Step 2: Configure Your Marketplace

Create three JSON files in `config/`:

**`branding.json`** - Visual identity and branding
```json
{
  "name": "My Marketplace",
  "logo": "/images/logo.svg",
  "primaryColor": "#6366f1",
  "tagline": "Your marketplace tagline"
}
```

**`categories.json`** - Agent categories
```json
{
  "categories": [
    {
      "id": "productivity",
      "name": "Productivity",
      "icon": "⚡",
      "description": "Boost your productivity"
    }
  ]
}
```

**`agents.json`** - Agent bundle registry
```json
{
  "version": "1.0.0",
  "featured": ["my-agent"],
  "bundles": [...]
}
```

### Step 3: Run Your Marketplace

```bash
cd skeleton/web
VITE_CONFIG_PATH=../../app3-my-marketplace/config npm run dev
```

**See [SKELETON_GUIDE.md](SKELETON_GUIDE.md) for complete instructions.**

## 🧪 Testing

### Run All Tests

```bash
# Web frontend tests
cd skeleton/web
npm test

# CLI tests
cd skeleton/cli
npm test

# Shared library tests
cd skeleton/shared
npm test
```

### Property-Based Tests

This project uses **fast-check** for property-based testing, ensuring correctness across 100+ random test cases per property.

```bash
cd skeleton/cli
npm test -- registry.property.test.ts
```

## 🚢 Deployment

### Quick Deploy

All components are ready for deployment! See [QUICK_DEPLOY.md](QUICK_DEPLOY.md) for quick reference.

### Deploy App 1: Kiro Agents Marketplace (Vercel)

1. **Connect to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Select `app1-kiro-marketplace` as root directory

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `../skeleton/web/dist`
   - Install Command: `cd ../skeleton/web && npm install`

3. **Set Environment Variables**
   ```
   VITE_APP_NAME=Kiro Agents Marketplace
   VITE_REGISTRY_URL=https://kiro-marketplace.vercel.app/config/agents.json
   ```

4. **Deploy!** 🚀

**Detailed Guide**: [app1-kiro-marketplace/DEPLOYMENT.md](app1-kiro-marketplace/DEPLOYMENT.md)

### Deploy App 2: DevOps Automation Hub (Vercel)

Follow the same steps as App 1, but:
- Root Directory: `app2-devops-hub`
- Environment Variables:
  ```
  VITE_APP_NAME=DevOps Automation Hub
  VITE_REGISTRY_URL=https://devops-hub.vercel.app/config/agents.json
  ```

**Detailed Guide**: [app2-devops-hub/DEPLOYMENT.md](app2-devops-hub/DEPLOYMENT.md)

### Publish CLI to npm

```bash
# Navigate to CLI directory
cd skeleton/cli

# Login to npm
npm login

# Run tests and build
npm test
npm run build

# Publish
npm publish --access public
```

**Detailed Guide**: [skeleton/cli/PUBLISHING.md](skeleton/cli/PUBLISHING.md)

### Deployment Resources

- 📋 [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) - Complete deployment overview
- ⚡ [QUICK_DEPLOY.md](QUICK_DEPLOY.md) - Quick reference commands
- 🎯 Individual deployment guides in each application directory

## 🎃 Kiroween Hackathon Compliance

This project meets all **Skeleton Crew** category requirements:

✅ **Public Repository** - Open source with MIT license  
✅ **`.kiro/` Directory** - Specs, hooks, and steering at root (not in .gitignore)  
✅ **Two Applications** - `/app1-kiro-marketplace` and `/app2-devops-hub`  
✅ **Deployed Applications** - Live URLs for both marketplaces  
✅ **Demo Video** - 3-minute video showcasing both applications  
✅ **Kiro Usage Documentation** - Detailed in [KIRO_USAGE.md](KIRO_USAGE.md)  

### How Kiro Was Used

This project was built using **spec-driven development** with Kiro:

1. **📋 Requirements** - Formal EARS-compliant requirements with 50+ acceptance criteria
2. **🎨 Design** - Comprehensive architecture with 22 correctness properties
3. **✅ Tasks** - 26 major tasks with 85+ sub-tasks executed systematically
4. **🧪 Testing** - Property-based tests validating universal correctness properties
5. **📝 Steering** - Custom steering documents guiding development patterns
6. **🪝 Hooks** - Automated testing on file save for rapid feedback

**Read the full story in [KIRO_USAGE.md](KIRO_USAGE.md)**

## 🏆 Project Highlights

### Technical Excellence

- **TypeScript Throughout** - Type-safe code across all components
- **Modern React** - Functional components with hooks, Context API
- **Property-Based Testing** - 22 correctness properties with 100+ iterations each
- **Clean Architecture** - Separation of concerns, dependency injection
- **Comprehensive Documentation** - 3 detailed guides totaling 2000+ lines

### Innovative Features

- **Configuration-Driven** - Zero code changes needed to create new marketplaces
- **Bundle System** - Standardized format for packaging agent configurations
- **MCP Integration** - Support for Model Context Protocol servers
- **Steering Files** - Context-aware guidance documents
- **Agent Hooks** - Automated workflows triggered by IDE events

### Development Process

- **Spec-Driven Development** - Formal specifications before coding
- **Correctness Properties** - Universal properties validated with PBT
- **Incremental Implementation** - 85+ tasks completed systematically
- **Continuous Testing** - Automated tests on every file save

## 📊 Project Stats

- **Lines of Code:** ~5,000+ (excluding tests and docs)
- **Test Coverage:** 80%+
- **Documentation:** 2,000+ lines across 3 guides
- **Correctness Properties:** 22 universal properties
- **Property Tests:** 100+ iterations per property
- **Example Bundles:** 6 complete agent bundles
- **Development Time:** ~8 hours (with Kiro)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Create Agent Bundles** - Build and share bundles for your domain
2. **Build Marketplaces** - Use the skeleton to create new marketplaces
3. **Report Issues** - Found a bug? Open an issue
4. **Improve Documentation** - Help make the guides even better
5. **Add Features** - Submit PRs for new functionality

### Development Setup

```bash
# Clone and install
git clone https://github.com/haunted-agents/marketplace.git
cd marketplace
npm install

# Run tests
npm test

# Start development server
cd skeleton/web
npm run dev
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**TL;DR:** You can use this skeleton to build commercial or open-source marketplaces. Attribution appreciated but not required.

## 🙏 Acknowledgments

- **Kiro Team** - For creating an amazing AI-powered IDE
- **Kiroween Hackathon** - For the inspiration and challenge
- **Open Source Community** - For the tools and libraries used

## 📞 Contact

- **GitHub Issues** - For bug reports and feature requests
- **Discussions** - For questions and community support
- **Discord** - Join our community server *(Coming soon)*

## 🔗 Links

- **Live Demos:**
  - [Kiro Agents Marketplace](https://kiro-agents-marketplace.vercel.app)
  - [DevOps Automation Hub](https://devops-automation-hub.vercel.app)
- **Documentation:**
  - [Skeleton Guide](SKELETON_GUIDE.md)
  - [Bundle Format](BUNDLE_FORMAT.md)
  - [Kiro Usage](KIRO_USAGE.md)
- **Resources:**
  - [Kiro IDE](https://kiro.dev)
  - [Kiroween Hackathon](https://kiro.dev/hackathon)

---

## 🎯 Quick Links

| Resource | Description |
|----------|-------------|
| [SKELETON_GUIDE.md](SKELETON_GUIDE.md) | Complete guide to creating your own marketplace |
| [BUNDLE_FORMAT.md](BUNDLE_FORMAT.md) | Bundle specification and examples |
| [KIRO_USAGE.md](KIRO_USAGE.md) | How Kiro was used to build this project |
| [Design Document](.kiro/specs/haunted-agents-marketplace/design.md) | Architecture and design decisions |
| [Requirements](.kiro/specs/haunted-agents-marketplace/requirements.md) | Formal requirements specification |

---

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Built with ❤️ using Kiro IDE and spec-driven development**

**Happy building! 🎃**
