# Demo Video Script - Haunted Agents Marketplace
## 🎃 Kiroween Hackathon - Skeleton Crew Category

**Duration**: 3 minutes  
**Target**: Hackathon judges and developers  
**Goal**: Showcase skeleton versatility and both applications

---

## 📝 Script Structure

### INTRO (0:00 - 0:20) - 20 seconds

**Visual**: Split screen showing both applications side-by-side

**Narration**:
> "Welcome to the Haunted Agents Marketplace - a skeleton template that powers multiple agent marketplace platforms. Today I'll show you how ONE codebase creates TWO completely different applications: the Kiro Agents Marketplace and the DevOps Automation Hub."

**On Screen**:
- Title: "Haunted Agents Marketplace 🎃"
- Subtitle: "One Skeleton, Infinite Possibilities"
- Show both URLs briefly

---

### PART 1: Application 1 - Kiro Agents Marketplace (0:20 - 1:00) - 40 seconds

**Visual**: Full screen of Kiro Agents Marketplace

**Narration**:
> "First, the Kiro Agents Marketplace - a platform for discovering specialized AI agents for Kiro IDE."

**Demo Actions** (show quickly):
1. **Homepage** (5 sec)
   - Scroll through agent cards
   - Point out: "React + Supabase Expert", "API Documentation Wizard", "Test-Driven Development Coach"
   - Show component icons (MCP servers, steering files, hooks, specs)

2. **Search** (5 sec)
   - Type "React" in search bar
   - Show filtered results with highlighted keywords

3. **Category Filter** (5 sec)
   - Click "Frontend" category
   - Show filtered results

4. **Agent Detail** (10 sec)
   - Click on "React + Supabase Expert"
   - Scroll to show:
     - Description
     - Installation command: `kiro-agent install react-supabase-expert`
     - Components included
     - Example use cases

**Narration continues**:
> "Users can search by technology, filter by category, and see exactly what each agent includes - MCP servers for tools, steering files for context, hooks for automation, and spec templates for workflows."

---

### PART 2: Application 2 - DevOps Automation Hub (1:00 - 1:40) - 40 seconds

**Visual**: Full screen of DevOps Automation Hub

**Narration**:
> "Now, the DevOps Automation Hub - built from the SAME skeleton but serving a completely different audience."

**Demo Actions** (show quickly):
1. **Homepage** (5 sec)
   - Show different branding (DevOps theme, different colors)
   - Scroll through DevOps agents: "CI/CD Pipeline Template", "Kubernetes Monitor", "Terraform Helper"
   - Point out different categories

2. **Search** (5 sec)
   - Type "Kubernetes" in search bar
   - Show DevOps-specific results

3. **Category Filter** (5 sec)
   - Click "Infrastructure" category
   - Show infrastructure-focused agents

4. **Agent Detail** (10 sec)
   - Click on "Terraform Helper"
   - Show:
     - DevOps-focused description
     - Installation command: `kiro-agent install terraform-helper`
     - Infrastructure-specific components

**Narration continues**:
> "Same search functionality, same component system, but completely different content - all driven by configuration files."

---

### PART 3: CLI Installation Demo (1:40 - 2:20) - 40 seconds

**Visual**: Terminal window

**Narration**:
> "Let's see the CLI in action. Installing an agent is a single command."

**Demo Actions**:
1. **Install CLI** (5 sec)
   ```bash
   npm install -g @haunted-agents/cli
   ```
   - Show installation progress

2. **List Available Commands** (5 sec)
   ```bash
   kiro-agent --help
   ```
   - Show: install, create, list, validate, package

3. **Install Agent** (15 sec)
   ```bash
   kiro-agent install react-supabase-expert
   ```
   - Show download progress
   - Show success message with installed components
   - Show example prompts

4. **List Installed** (5 sec)
   ```bash
   kiro-agent list
   ```
   - Show installed agents with versions and dates

**Narration continues**:
> "The CLI downloads the bundle, validates it, and installs all components to your Kiro environment - MCP servers, steering files, hooks, and spec templates - ready to use immediately."

---

### PART 4: Skeleton Versatility (2:20 - 2:50) - 30 seconds

**Visual**: Quick code walkthrough or diagram

**Narration**:
> "Here's the magic - both applications share the same skeleton codebase."

**Demo Actions** (show quickly):
1. **Show Repository Structure** (10 sec)
   - Highlight `skeleton/` folder (shared code)
   - Highlight `app1-kiro-marketplace/` (config only)
   - Highlight `app2-devops-hub/` (config only)

2. **Show Configuration Files** (10 sec)
   - Open `app1-kiro-marketplace/config/agents.json` (Kiro agents)
   - Open `app2-devops-hub/config/agents.json` (DevOps agents)
   - Open `branding.json` files side-by-side (different themes)

3. **Show Shared Components** (10 sec)
   - Briefly show `skeleton/web/src/components/AgentCard.tsx`
   - Point out: "No hardcoded content - all from configuration"

**Narration continues**:
> "The skeleton provides the foundation - React components, CLI commands, bundle system - while configuration files define the content. Change the config, get a new marketplace."

---

### CLOSING (2:50 - 3:00) - 10 seconds

**Visual**: Split screen again with both applications + GitHub repo

**Narration**:
> "One skeleton template, infinite possibilities. Check out the code on GitHub, try the live demos, and build your own agent marketplace."

**On Screen**:
- GitHub URL
- Live Demo URLs:
  - Kiro Marketplace: [URL]
  - DevOps Hub: [URL]
- CLI: `npm install -g @haunted-agents/cli`
- "Built with Kiro IDE 🎃"

---

## 🎬 Production Notes

### Recording Setup
- **Screen Resolution**: 1920x1080 (Full HD)
- **Recording Tool**: OBS Studio, Loom, or ScreenFlow
- **Audio**: Clear voiceover with minimal background noise
- **Cursor**: Highlight cursor for visibility

### Visual Guidelines
- **Font Size**: Large enough to read (16-18pt minimum)
- **Transitions**: Quick cuts, no fancy effects (keep it professional)
- **Pacing**: Fast but not rushed - judges need to follow along
- **Highlights**: Use cursor highlights or zoom for important details

### Key Messages to Emphasize
1. ✅ **Skeleton Versatility**: One codebase, multiple applications
2. ✅ **Configuration-Driven**: No code changes needed for new marketplace
3. ✅ **Complete Solution**: Web + CLI + Bundle system
4. ✅ **Real Functionality**: Working search, filters, installation
5. ✅ **Kiro Integration**: Specs, steering, hooks all demonstrated

### What to Show
- ✅ Both applications working
- ✅ Different branding and content
- ✅ Search and filter functionality
- ✅ CLI installation process
- ✅ Shared skeleton code
- ✅ Configuration files

### What to Avoid
- ❌ Long loading times (pre-load pages)
- ❌ Errors or bugs (test everything first)
- ❌ Too much code detail (keep it high-level)
- ❌ Slow pacing (judges have limited time)
- ❌ Technical jargon (keep it accessible)

---

## 📋 Pre-Recording Checklist

### Technical Setup
- [ ] Both applications deployed and working
- [ ] CLI installed and tested
- [ ] All demo commands tested and working
- [ ] Browser tabs pre-loaded (no loading delays)
- [ ] Terminal commands prepared (copy-paste ready)
- [ ] Screen recording software configured
- [ ] Audio levels tested

### Content Preparation
- [ ] Script reviewed and timed
- [ ] Demo flow practiced (aim for 2:45 to allow buffer)
- [ ] Backup recordings of each section
- [ ] Transitions planned
- [ ] Closing screen prepared with URLs

### Quality Checks
- [ ] Test recording to verify quality
- [ ] Check audio clarity
- [ ] Verify screen resolution
- [ ] Test cursor visibility
- [ ] Confirm text readability

---

## 🎯 Success Criteria

The demo video should:
- ✅ Be under 3 minutes
- ✅ Show both applications clearly
- ✅ Demonstrate skeleton versatility
- ✅ Show CLI installation workflow
- ✅ Highlight configuration-driven approach
- ✅ Be professional and polished
- ✅ Include all required URLs and links
- ✅ Be engaging and easy to follow

---

## 📝 Narration Script (Full Text)

**[0:00 - 0:20] INTRO**
Welcome to the Haunted Agents Marketplace - a skeleton template that powers multiple agent marketplace platforms. Today I'll show you how ONE codebase creates TWO completely different applications: the Kiro Agents Marketplace and the DevOps Automation Hub.

**[0:20 - 1:00] APP 1**
First, the Kiro Agents Marketplace - a platform for discovering specialized AI agents for Kiro IDE. Users can search by technology, filter by category, and see exactly what each agent includes - MCP servers for tools, steering files for context, hooks for automation, and spec templates for workflows.

**[1:00 - 1:40] APP 2**
Now, the DevOps Automation Hub - built from the SAME skeleton but serving a completely different audience. Same search functionality, same component system, but completely different content - all driven by configuration files.

**[1:40 - 2:20] CLI**
Let's see the CLI in action. Installing an agent is a single command. The CLI downloads the bundle, validates it, and installs all components to your Kiro environment - MCP servers, steering files, hooks, and spec templates - ready to use immediately.

**[2:20 - 2:50] SKELETON**
Here's the magic - both applications share the same skeleton codebase. The skeleton provides the foundation - React components, CLI commands, bundle system - while configuration files define the content. Change the config, get a new marketplace.

**[2:50 - 3:00] CLOSING**
One skeleton template, infinite possibilities. Check out the code on GitHub, try the live demos, and build your own agent marketplace.

---

## 🔗 Links to Include

**In Video Description**:
- GitHub Repository: [Your GitHub URL]
- Live Demo - Kiro Marketplace: [Vercel URL]
- Live Demo - DevOps Hub: [Vercel URL]
- CLI Installation: `npm install -g @haunted-agents/cli`
- Documentation: [README link]
- Kiro IDE: https://kiro.ai

**Tags**: 
#Kiroween #Hackathon #SkeletonCrew #AIAgents #Marketplace #OpenSource #React #TypeScript #CLI

---

**Script Version**: 1.0  
**Last Updated**: 2025-11-25  
**Estimated Recording Time**: 2:45 - 2:55 (with buffer for 3:00 limit)
