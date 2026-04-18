# Lab Guides for Photo Gallery & Portfolio

This folder contains step-by-step demo guides for learning and practicing GitHub Copilot features in the Photo Gallery & Portfolio application. Each demo builds on the previous one, helping you master Copilot’s capabilities in a real-world Next.js project.

[Presentation](https://github.com/user-attachments/files/26226509/en-v022026-GitHub.Copilot.intermediate.pdf)

## Workshop Lab

### AI-Assisted Project Development ([ghcp-ai-assisted-project-template](https://github.com/jvargh/ghcp-ai-assisted-project-template))

**Purpose:** A reference guide outlining multiple approaches for building a project (e.g., a Survey App) using GitHub Copilot's customization features - prompts, instruction files, agents, and skills ranging from simple to fully orchestrated.

**Includes:**

- A sample [Survey App](https://github.com/jvargh/ghcp-ai-assisted-project-template/blob/main/Survey-App.md) requirements document as a working example
- `.github/prompts/` directory with reusable prompt file templates

---

## Optional Lab (Recommended After Demos labs)

### AI Native Development Lab ([ghcp-ai-native-dev-lab](https://github.com/jvargh/ghcp-ai-native-dev-lab))

**Why this lab first:** It teaches how to scale Copilot usage beyond ad-hoc prompting by building reliable, repeatable workflows using instructions, prompts, agents, and skills. That context makes the demos below more meaningful and easier to apply in real teams.

**What students will learn from the lab (high level):**

- The PROSE framework and why prompt quality breaks down in enterprise codebases
- Modular instructions (`.instructions.md`) to enforce team standards
- Reusable prompts (`.prompt.md`) and structured commands
- Multi-agent handoffs (`.agent.md`) for analysis vs. generation
- Skills packaging for organization-wide reuse

**Structure at a glance:**

- 90-minute session with Docs and Testing tracks
- Hands-on exercises + golden examples for comparison
- Scaling section on skills and Copilot CLI

---

## Demo Sequence & Descriptions

### 1\. Features Demo ([features-demo.md](features-demo.md))

**Overview:**  
Start here to explore Copilot’s core features. Learn how to use chat commands, generate code, and review AI suggestions.  
**Key Skills:**

- Discover available Copilot commands
- Get project summaries and code explanations
- Generate and review code completions
- Commit changes with Copilot

---

### 2\. Engineering Practices Demo ([engineering-practices.md](engineering-practices.md))

**Overview:**  
Dive deeper into professional Copilot tools for teams. Inspect Copilot’s decision process, share chat conversations, and explore system prompts for consistent code generation.  
**Key Skills:**

- Debug Copilot’s suggestions
- Export/import chat conversations
- Understand and manage system prompts
- Collaborate using shared conversations

---

### 3\. Customize Copilot Demo ([customize-copilot.md](customize-copilot.md))

**Overview:**  
Learn advanced customization techniques. Monitor premium usage, switch models, use prompt files, experiment with chat modes, and set up custom instructions for your team.  
**Key Skills:**

- Track Copilot premium usage
- Switch between AI models
- Create and use prompt files
- Utilize chat modes, custom instructions, and MCP servers

---

### 4\. Copilot CLI Demo ([copilot-cli.md](copilot-cli.md))

**Overview:**  
Master Copilot CLI for terminal-first development workflows. Install Copilot CLI, create custom instructions and hooks, build reusable skills and custom agents, and connect MCP servers for live data access—all from your shell.  
**Key Skills:**

- Install and authenticate GitHub Copilot CLI
- Create custom instructions and hooks for terminal workflows
- Build reusable CLI skills and custom agents
- Connect MCP servers to external tools
- Know when to use CLI vs. IDE vs. Spaces vs. Coding Agent

---

### 5\. Copilot Spaces Demo ([copilot-spaces.md](copilot-spaces.md))

**Overview:**  
Collaborate in dedicated Copilot Spaces. Create a Space, set goals, add context files, and work together to implement new features with AI assistance.  
**Key Skills:**

- Create and manage Copilot Spaces
- Set development goals
- Collaborate and share progress
- Implement and test new features

---

### 6\. Coding Agent Demo ([coding-agent.md](coding-agent.md))

**Overview:**  
Experience GitHub Copilot as a coding agent to accelerate building and enhancing features in your Photo Gallery & Portfolio application.  
**Key Skills:**

- Assign Copilot to GitHub issues
- Review Copilot-generated pull requests and session details
- Practice collaborative code review and iteration

---

## How to Use These Demos

1.  Start with the first demo and work through each guide in order.
2.  Follow the instructions and prompts in each file.
3.  Mark off completion checklists as you progress.
4.  Share your learnings and results with your team.

---
