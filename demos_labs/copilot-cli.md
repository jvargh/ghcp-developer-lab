# GitHub Copilot CLI Demo

Welcome to the GitHub Copilot CLI lab! You've already explored Copilot Chat features and customization inside VS Code - now it's time to bring Copilot into the **terminal and command-line workflows** where a surprising amount of real development happens. Throughout this lab you'll be working inside the **Photo Gallery & Portfolio** app: a Next.js 15 + TypeScript + Tailwind CSS project with a responsive gallery grid, drag-and-drop upload, and a growing API surface.

**Goal:** Master Copilot CLI to accelerate common development tasks - code generation, refactoring, reviewing, and orchestrating multi-agent workflows - directly from your shell.

## What You'll Learn

*   Launch GitHub Copilot CLI from VS Code Terminal
*   Configure a baseline session (model, context, instructions)
*   Use the explore → plan → fleet → verify → commit workflow for complex features
*   Use `/fleet` to parallelize multi-step implementation plans across subagents
*   Monitor background subagents with `/tasks`
*   Review code in-terminal with `/review` (targeted criteria, model switching)
*   Delegate fixes to the GitHub cloud coding agent with `/delegate`
*   Track work with GitHub issues and PRs from the terminal (GitHub MCP)
*   Create reusable workflow playbooks with Copilot CLI Skills
*   Use git worktrees for parallel feature development with separate agent sessions
*   Resume sessions and run one-shot inline prompts
*   Anchor context with `@file` and `!` commands for precise, scoped changes

**Estimated Time:** 50–60 minutes

---

## 📋 Table of Contents

- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Launch GitHub Copilot CLI from VS Code Terminal](#launch-github-copilot-cli-from-vs-code-terminal)
  - [Baseline Session Setup](#baseline-session-setup-best-practices)
  - [MCP Server Setup](#mcp-server-setup-required-for-plan-review)
  - [Quick Reference - When to Use Which Tool](#quick-reference---when-to-use-which-tool)
- [Step 1: Explore → Plan → Review → Fleet → Verify → Commit](#-step-1-explore--plan--review--fleet--verify--commit)
  - [1.1: Explore](#11-explore---understand-before-you-plan)
  - [1.2: Enter Plan Mode](#12-enter-plan-mode)
  - [1.3: Review the Plan](#13-review-the-plan)
  - [1.4: Validate the Plan Against Best Practices](#14-validate-the-plan-against-best-practices-mcp-gate)
  - [1.5: Execute with /fleet](#15-execute-with-fleet)
  - [1.6: Monitor with /tasks](#16-monitor-with-tasks)
  - [1.7: Approve Permissions and Validate](#17-approve-permissions-and-validate)
- [Step 2: Code Review in Terminal (/review)](#-step-2-code-review-in-terminal-review)
  - [2.1: Quick Scan](#21-quick-scan-no-prompt-review)
  - [2.2: Targeted Review with Criteria](#22-targeted-review-with-criteria)
  - [2.3: Knowledge Check](#23-knowledge-check-)
- [Step 3: Skills - Reusable Workflow Playbooks](#-step-3-skills---reusable-workflow-playbooks)
  - [3.1: List Available Skills](#31-list-available-skills)
  - [3.2: Create a Project Skill](#32-create-a-project-skill)
  - [3.3: Use the Skill as an Agent](#33-use-the-skill-as-an-agent)
  - [3.4: Verify the Route](#34-verify-the-route)
  - [3.5: (Optional) Create a Personal Skill](#35-optional-create-a-personal-skill)
- [(Optional) Step 4: Parallel Development with Git Worktrees + Agents](#-optional-step-4-parallel-development-with-git-worktrees--agents)
  - [4.1: Prepare the Repo](#41-prepare-the-repo)
  - [4.2: Create Two Worktrees](#42-create-two-worktrees)
  - [4.3: Assign Feature A - Photo Collections](#43-assign-feature-a---photo-collections)
  - [4.4: Assign Feature B - Upload Validation](#44-assign-feature-b---upload-validation)
  - [4.5: Merge and Verify](#45-merge-and-verify)
- [Step 5: Session Continuity - Resume and Inline Prompts](#-step-5-session-continuity---resume-and-inline-prompts)
  - [5.1: Resume a Previous Session](#51-resume-a-previous-session)
  - [5.2: One-Shot Inline Prompts](#52-one-shot-inline-prompts)
  - [5.3: Knowledge Check](#53-knowledge-check-)
- [Step 6: Precise Context Control - @file and ! Commands](#-step-6-precise-context-control---file-and--commands)
  - [6.1: Explore with !](#61-explore-with-)
  - [6.2: Implement with @file](#62-implement-with-file)
  - [6.3: Verify](#63-verify)
  - [6.4: (Optional) Chain ! and @file](#64-optional-chain--and-file)
- [Completion Checklist](#-completion-checklist)
- [Pro Tips Summary](#-pro-tips-summary)
- [What's Next?](#-whats-next)

---

## 🚀 Getting Started

### Prerequisites

*   GitHub Copilot Pro or Copilot for Business subscription
*   VS Code with PowerShell terminal
*   Node.js and npm installed
*   Git configured with a GitHub remote (required for `/delegate` and GitHub MCP steps)

### Launch GitHub Copilot CLI from VS Code Terminal

GitHub Copilot CLI runs as a dedicated terminal profile inside VS Code - not a regular PowerShell or bash terminal.

1.  Open **VS Code**
2.  Open **Terminal → New Terminal** (or press ``Ctrl+` `` )
3.  Click the **dropdown arrow (˅)** next to the `+` icon in the terminal tab bar
4.  In the profile list that appears, select **GitHub Copilot CLI** (listed alongside PowerShell, bash, etc.)
5.  A new terminal tab opens running the Copilot CLI interactive session - you'll see a `>` or `◆` prompt instead of a shell prompt

> **Can't see the profile?** If "GitHub Copilot CLI" is missing from the list, ensure the GitHub Copilot extension is installed and you are signed in. Run `Ctrl+Shift+P → GitHub Copilot: Sign In` if needed.

If prompted to authenticate, run:

```
/login
```

Once the session is open, run a sanity prompt to confirm everything is working:

**Action:**

```
what does this repo do
```

**Expected Result:** Copilot CLI responds in-session with a description of the current directory or project - you're ready to go.

---

### Baseline Session Setup (Best Practices)

Before any implementation work, initialise a clean, focused session by running each of the following in order.

**Action:**

```
/help
```

```
/model
```

```
/context
```

Best practices from the official docs:

*   Keep sessions **focused**; use `/new` (or `/clear`) before switching to an unrelated task
*   Use `/model` to switch based on task complexity:

| Model | Best for |
| --- | --- |
| **Claude Opus 4.5** | Complex architecture, deep reasoning, system design |
| **Claude Sonnet 4.5** | Day-to-day coding, routine tasks (fast + cost-efficient) |

*   Use `/context` to check token usage when sessions grow large

For long-running sessions, use the following commands to keep context clean:

**Action:**

```
/session
```

```
/compact
```

**Expected Result:** `/session` shows the current session ID and metadata. `/compact` summarises the conversation so far, freeing up context window space without losing important decisions.

---

### MCP Server Setup (Required for Plan Review)

In Step 1 you will validate your implementation plan against live documentation using MCP servers. Set these up now before you start coding.

#### GitHub MCP (built-in)

The GitHub MCP server is built into Copilot CLI and is already available without any additional configuration. Verify it is active:

```
/mcp show
```

**Expected Result:** `github` is listed with a connected status.

#### Microsoft Learn MCP (Azure + Next.js best practices)

Add the Microsoft Learn documentation MCP server to give Copilot access to official Azure and Next.js docs during plan validation. Run the interactive add command:

```
/mcp add
```

Fill in the configuration form (use **Tab** to navigate between fields):

| Field | Value |
| --- | --- |
| **Server Name** | `ms-learn` |
| **Server Type** | `HTTP` (Streamable HTTP) |
| **URL** | `https://learn.microsoft.com/api/mcp` |
| **HTTP Headers** | _(leave empty)_ |
| **Tools** | `*` |

Press **Ctrl+S** to save. The server connects immediately without restarting the CLI.

Verify both servers are active:

```
/mcp show
```

**Expected Result:** Two servers listed - `github` and `ms-learn`. You are now ready to use live documentation context in your plan reviews.

> **💡 Why this matters:** Using MCP servers during plan validation lets Copilot cross-reference your plan against official Next.js App Router patterns, Azure best practices, and GitHub coding standards - catching architectural misalignments before any code is written.

---

### Quick Reference - When to Use Which Tool

| Tool | Best for | Terminal? |
| --- | --- | --- |
| **Copilot CLI** | Complex multi-file features, fleet parallelism, delegate, MCP ops | ✅ Yes |
| **Copilot Chat (IDE)** | In-editor edits, inline explanations, quick completions | VS Code |
| **Copilot Spaces** | Long-running async tasks, team collaboration, context sharing | Browser |
| **Coding Agent (PR)** | Autonomous PR creation from issues, no local workspace needed | GitHub.com |

**💡 Pro Tip:** Use CLI and IDE **simultaneously** - they share `.copilot-instructions.md`, agents, prompts, skills, and MCP config. Use the CLI for orchestration and `/fleet` workflows; use the IDE for fast inline edits.

---

## 🎯 Step 1: Explore → Plan → Review → Fleet → Verify → Commit

This step follows the complete terminal-driven development lifecycle. You will explore the codebase before writing a plan, validate that plan against best practices using MCP before any code is written, implement with `/fleet`, run a security + quality review after implementation, verify with tests, then commit - all without leaving the terminal.

**Scenario:** Add a **bulk photo upload feature** to the Photo Gallery app - drag-and-drop multi-file selection, upload progress tracking, file validation (size + type), and tests.

**Why plan first:** Models achieve significantly higher success rates with a concrete plan before touching code. For multi-file changes spanning an API route, component updates, and tests, always plan before implementing.

### 1.1: Explore - Understand Before You Plan

Before entering plan mode, explore the current state of the relevant code. This avoids planning against stale assumptions.

**Action:** List all component files in the source tree:

```
!Get-ChildItem src -Recurse -Name
```

**Action:** Anchor to the upload component to understand its current state:

```
@src/components/upload/UploadZone.tsx

Review this component without writing any code. Tell me:
1. What file types and sizes does it currently validate?
2. Where does upload progress tracking currently happen (if at all)?
3. What would need to change to support multi-file drag-and-drop with per-file progress?
```

**Expected Result:** A concise gap analysis - what exists and what is missing - that directly informs the plan you will create in 1.1.

### 1.2: Enter Plan Mode

Press `Shift+Tab` to toggle into **plan mode** or use `/plan` - this is the documented entry point for the `/fleet` workflow.

Then enter the following prompt:

**Action:**

```
Add bulk photo upload with validation, progress tracking, and tests.
Constraints: TypeScript strict, Next.js App Router, no new frameworks,
single API endpoint, integrate with existing UploadZone component.
Before writing the plan, ask me clarifying questions about the file handling requirements.
```

Copilot will ask clarifying questions. Answer them as follows:

*   **What should the API route do with accepted files:** Validate and store them — mock storage for now, return success with file name and size metadata
*   **Upload concurrency strategy:** Upload files in parallel, max 3 concurrent uploads at a time
*   **Supported file types:** JPEG, PNG, WebP only — reject anything else with an inline error
*   **Test coverage scope:** Unit tests for validation logic, component tests for UploadZone progress UI, and integration tests for the API route error paths

**Expected Result:** Copilot generates a structured implementation plan broken down by workstream (API route, component changes, types, tests), then presents a menu:

```
 ❯ 1. Accept plan and build on autopilot (recommended)
   2. Accept plan and build on default permissions
   3. Exit plan mode and I will prompt myself
   4. Suggest changes
```

### 1.3: Review the Plan

**Do not select an option yet.** Read through the plan in the terminal and confirm it covers all four areas:

*   API route: `src/app/api/upload/route.ts`
*   `UploadZone` component updates (`src/components/upload/UploadZone.tsx`)
*   Progress tracking component
*   TypeScript interfaces and tests

If anything looks wrong or is missing, select **option 4 "Suggest changes"** and describe the correction. Copilot will revise and re-present the menu.

**💡 Pro Tip:** Editing the plan at this stage is far cheaper than correcting code after the fact. Remove anything out of scope, add constraints you forgot to mention, and clarify ambiguous steps before execution.

### 1.4: Validate the Plan Against Best Practices (MCP Gate)

> **⚠️ Do not accept the plan until this validation passes.** This step uses your MCP servers (GitHub + Microsoft Learn) to check the plan against real documentation.

**Action:** Select **option 4 "Suggest changes"** and enter:

```
Using the ms-learn and github MCP servers, review this implementation plan for: (1) Next.js App Router best practices - are API routes, server/client component boundaries, and file structure correct? (2) TypeScript strict mode alignment - do the proposed types follow TS strict patterns? (3) Security considerations - any input validation gaps in the upload endpoint? (4) Missing test coverage - does the plan include tests for error paths, not just happy paths? Return a pass/fail verdict for each area with one-line explanations. If any area fails, describe the minimum fix needed before proceeding.
```

**Expected Result:** A structured verdict across four areas. If any area fails, Copilot will revise the plan inline. Review the updated plan, then repeat option 4 if further changes are needed.

**💡 Pro Tip:** Think of this as a pre-flight checklist. It takes 60 seconds and can prevent hours of rework from a flawed plan.

### 1.5: Execute with `/fleet`

Once you're satisfied with the plan, choose your execution option:

```
   1. Accept plan and build on autopilot (recommended)
   2. Accept plan and build on default permissions
❯  3. Exit plan mode and I will prompt myself
   4. Suggest changes
```

*   **Option 1 — Fully autonomous:** Copilot assigns subagents to independent workstreams and executes without further permission prompts.
*   **Option 2 — Controlled permissions:** Same parallel execution but Copilot will pause to ask permission before each tool use.
*   **Option 3 — Manual trigger:** Exits plan mode so you can run `/fleet` yourself with full control over agent allocation and model selection.

**Step 1 — Set the model for your workstreams.** Review your plan and pick based on complexity:

```
/model
```

Choose **Claude Opus** for plans with complex logic (security, validation, architectural decisions). Use **Claude Sonnet** for plans that are primarily UI or mechanical scaffolding. The selected model applies to all subagents spawned by the fleet.

**Step 2 — Run fleet and name your agent types per workstream:**

```
/fleet Implement the plan. For each independent workstream: use a general-purpose agent for any workstream that involves multi-file reasoning, new logic, or cross-cutting concerns; use a task agent for any workstream that is primarily generating tests, running builds, or producing structured output from existing patterns. State which agent type you are using at the start of each workstream.
```

**Expected Result:** Subagents are spawned immediately — one per independent workstream from your plan. You'll see all tasks appear in `/tasks`. Each agent announces its type at the start, so you can verify the allocation matches your expectations.

**💡 Why name agents explicitly?** `general-purpose` agents use the full tool suite for reasoning-heavy work across multiple files. `task` agents run commands and return structured output — faster and more efficient when the workstream is about generating tests or executing build steps rather than designing new logic. Without explicit guidance, fleet assigns types based on its own heuristics.

### 1.6: Monitor with `/tasks`

**Action:**

```
/tasks
```

**Expected Result:** A live task list showing each subagent's status (running, complete, failed).

Keyboard controls inside the task list:

| Key | Action |
| --- | --- |
| ↑ / ↓ | Navigate tasks |
| Enter | View task details / summary |
| `k` | Kill a running task |
| `r` | Remove completed or killed tasks |
| Esc | Return to the main CLI prompt |

When you see tasks for the API route, component update, and tests running **concurrently** - that's `/fleet` in action.

### 1.7: Approve Permissions and Validate

When Copilot requests permissions (file writes, running `npm run dev`), approve them for the session.

After fleet completes, start the dev server without leaving the Copilot CLI terminal:

**Action:**

```
!npm run dev
```

Then open your browser and test:

*   Navigate to `http://localhost:3000/upload`
*   Test drag-and-drop with 3 or more images simultaneously
*   Confirm the progress bar appears during upload
*   Drop a `.pdf` file and confirm an inline error message appears per file

**Expected Result:** Multi-file uploads complete with per-file progress indicators. Invalid file types are rejected immediately with inline error messages - no page reload required.

Once you've finished testing, stop the dev server with `Ctrl+C` in the same terminal — the CLI prompt returns immediately and you can continue with the next step.

**💡 Pro Tip:** When tasks touch **different files** (API route vs. component vs. tests), `/fleet` runs them concurrently and saves significant wall-clock time. Single-file tasks don't benefit as much - reserve `/fleet` for plans with three or more independent workstreams.

---

## 🎯 Step 2: Code Review in Terminal (`/review`)

**Scenario:** Review `src/components/gallery/GalleryGrid.tsx` - the gallery's core component handling tag filtering, search, pagination, and likes tracking.

### 2.1: Quick Scan (No-Prompt Review)

Run `/review` without a prompt for a general health check across recently changed files:

**Action:**

```
/review
```

**Expected Result:** Copilot scans recent changes and surfaces the top issues across all modified files - a fast way to catch regressions before committing.

### 2.2: Targeted Review with Criteria

For a deep, focused review of the GalleryGrid component, anchor the review to the file with `@` and provide explicit criteria:

**Action:**

```
/review @src/components/gallery/GalleryGrid.tsx

Review this component for:
1. TypeScript type safety (no implicit any, proper interfaces)
2. Filter logic correctness (does tag filtering handle empty arrays correctly?)
3. Accessibility (aria-labels on interactive elements, keyboard navigation)
4. Performance (unnecessary re-renders, missing useMemo/useCallback)
5. Error handling for missing or malformed photo data

Return the top 5 issues in priority order with the smallest fix for each.
```

**Expected Result:** A prioritised list of five specific, actionable issues with minimal targeted fixes - not a full rewrite.

**💡 Pro Tip:** Use a **different model** for review than for coding. Run `/model` and switch to **Claude Opus 4.5** before executing `/review` - its deep reasoning capability surfaces subtle issues like incorrect boundary conditions or missing null checks that faster models may miss. Switch back to Sonnet 4.5 after the review pass.

### 2.3: Knowledge Check ✅

Before moving on, confirm you have all of the following:

*   A list of at least 3 specific issues identified in `GalleryGrid.tsx`
*   Accessibility gaps noted (these feed directly into Step 3)
*   TypeScript safety issues noted (these feed directly into Step 3)

**Expected Result:** Your review output is captured and ready to drive the next step. The targeted `/review` output should be noticeably more actionable than the no-prompt scan from 2.1.

---

## 🎯 Step 3: Skills - Reusable Workflow Playbooks

**What are Copilot CLI Skills?**

Skills encode your project's conventions into a reusable playbook. Instead of re-explaining TypeScript patterns, error handling standards, or file structure every session, you encode them once and Copilot follows them automatically.

| Without Skills | With Skills |
| --- | --- |
| Repeat conventions in every prompt | Encode once, reuse everywhere |
| Inconsistent output across sessions | Consistent output every time |
| Long prompts with context setup | Short, focused prompts |
| Individual knowledge, not shared | `.github/skills/` shared with team |

**Two skill scopes:**

| Scope | Location | Shared with |
| --- | --- | --- |
| **Project skills** | `.github/skills/<skill-name>/` in repo | Everyone who clones the repo |
| **Personal skills** | `~/.copilot/skills/<skill-name>/` | Only you, across all projects |

---

### 3.1: List Available Skills

**Action:**

```
/skills list
```

**Expected Result:** List of available skills in the session. May be empty if none added yet.

---

### 3.2: Create a Project Skill

**Action:** Ask Copilot to scaffold the skill for you:

```
Create a project skill at .github/skills/nextjs-api-routes/SKILL.md that encodes the App Router API route conventions for this codebase: NextRequest/NextResponse usage, discriminated union response types, input validation with 400/500 error shapes, and no implicit any.
```

**Expected Result:** A `SKILL.md` at `.github/skills/nextjs-api-routes/SKILL.md` with YAML frontmatter (`name`, `description`) and a Markdown body encoding the conventions.

**Action:** Review what Copilot created:

```
!cat .github/skills/nextjs-api-routes/SKILL.md
```

Confirm the file has:

*   `name` — lowercase with hyphens
*   `description` — tells Copilot _when_ to load this skill automatically
*   A Markdown body with the actual conventions Copilot will follow

**Action:** Reload skills so the new skill is available without restarting:

```
/skills reload
```

**Action:** Confirm it loaded:

```
/skills info nextjs-api-routes
```

---

### 3.3: Use the Skill as an Agent

To invoke a skill explicitly, prefix the skill name with `/` in your prompt. Copilot injects the full `SKILL.md` into context and follows its instructions for that task.

**Action:**

```
Use the /nextjs-api-routes skill to create a GET /api/photos route with pagination (page, limit) and optional tag filtering. Response shape: { photos: Photo[], total: number, page: number, hasMore: boolean }. File: src/app/api/photos/route.ts
```

**Expected Result:** A `src/app/api/photos/route.ts` file that follows the skill's conventions — correct `NextRequest`/`NextResponse` usage, typed responses, no implicit `any`, proper error handling.

**Action:** Validate the generated file actually applied the skill's conventions by asking Copilot to review it against the skill:

```
@src/app/api/photos/route.ts review this file against the /nextjs-api-routes skill. Does it follow all conventions? List any violations.
```

**Expected Result:** Copilot reports the file passes all conventions, or flags specific lines where conventions were not followed. If violations are found, ask Copilot to fix them before proceeding.

---

### 3.4: Verify the Route

Open a separate terminal (outside the Copilot CLI session) and run the build:

```
npm run build
```

**Expected Result:** Build passes with no type errors.

---

### 3.5 _(Optional)_ Create a Personal Skill

Personal skills live in `~/.copilot/skills/` and are available across all your projects — not committed to the repo.

**Action:**

```
Create a personal skill at ~/.copilot/skills/gallery-components/SKILL.md that enforces: functional components with TypeScript prop interfaces, 'use client' for hooks/event handlers, Tailwind CSS only (no inline styles), dark mode with bg-white dark:bg-slate-800, default export for component and named export for props interface.
```

**Action:** Reload and confirm the personal skill is discoverable:

```
/skills reload
```

```
/skills info gallery-components
```

**Action:** View the file to confirm the conventions were captured correctly:

```
!cat ~/.copilot/skills/gallery-components/SKILL.md
```

**💡 Pro Tip:** Use **project skills** (`.github/skills/`) for team conventions that should be version-controlled and shared. Use **personal skills** (`~/.copilot/skills/`) for your own workflow preferences that apply across projects.

---

## 🎯 (Optional) Step 4: Parallel Development with Git Worktrees + Agents

**The problem:** You have two features to build in parallel - but they touch overlapping files. A single CLI session would context-switch and mix concerns.

**The solution:** Git worktrees + separate CLI sessions. Each worktree is an independent checkout of the same repo on a separate branch. Each CLI session stays focused on its own feature.

**Parallel work without context switching.** With regular branches, you `git checkout` back and forth — each switch rewrites your working directory, restarts dev servers, and can lose unsaved state. With worktrees, each branch lives in its own physical directory, so you can:

*   Work on two features simultaneously in separate VS Code windows — no stashing, no checkout
*   Keep dev servers running on different branches at the same time (e.g., test `main` on port 3000 and a feature on port 3001)
*   Compare changes side-by-side by opening both directories
*   Avoid rebuild overhead — switching branches often invalidates caches (`node_modules`, `.next`); worktrees keep each branch's build state intact

**Scenario:**

*   **Feature A:** `feature/photo-collections` - add a "Collections" grouping system to the gallery
*   **Feature B:** `feature/upload-validation` - add server-side file validation to the upload pipeline

### 4.1 Prepare the Repo

Git worktrees require a clean working tree with at least one commit. Commit any current changes first:

```
git add .
git commit -m "Initial commit"
```

### 4.2 Create Two Worktrees

**Action:** From the repo root, create both worktrees:

```
# Create worktree + new branch for photo collections
git worktree add -b feature/photo-collections "..\ghcp-developer-lab-main.worktrees\photo-collections"

# Create worktree + new branch for upload validation
git worktree add -b feature/upload-validation "..\ghcp-developer-lab-main.worktrees\upload-validation"
```

**Action:** Verify both worktrees exist:

```
git worktree list
```

**Expected Result:** Three entries - the main worktree plus the two new ones, each on its own branch.

**To delete worktrees and branches:**

```
# Remove worktrees
git worktree remove "..\ghcp-developer-lab-main.worktrees\photo-collections"
git worktree remove "..\ghcp-developer-lab-main.worktrees\upload-validation"

# Delete branches
git branch -d feature/photo-collections feature/upload-validation
```

---

### 4.3 Assign Feature A - Photo Collections

**Action:** Open a **new VS Code terminal tab** (PowerShell). Navigate to the collections worktree and launch Copilot CLI in yolo mode:

```
Set-Location "..\ghcp-developer-lab-main.worktrees\photo-collections"
copilot --yolo
```

You are now in a Copilot CLI session scoped entirely to the `feature/photo-collections` branch.

**Action:** Press `Shift+Tab` to enter autopilot mode, then enter your feature prompt:

```
@src/components/gallery/GalleryGrid.tsx
@src/lib/mock-photo-data.ts

Add a Collections feature to the Photo Gallery:
- A collection groups photos by theme (e.g., "Architecture", "Nature", "Street")
- Add a Collection interface to mock-photo-data.ts
- Add collection filtering to GalleryGrid.tsx alongside existing tag filtering
- Collection filter appears as a horizontal scrollable row above the tag filters
- TypeScript strict - no any types
```

**Expected Result:** Copilot operates in autopilot mode - it plans and immediately implements the feature without further prompts.

**Action:** Once the agent finishes, commit the changes in the photo-collections worktree:

```
! git add .
! git commit -m "Add photo collections feature"
```

---

### 4.4 Assign Feature B - Upload Validation

**Action:** Open another **new VS Code terminal tab** (PowerShell). Navigate to the upload worktree and launch Copilot CLI in yolo mode:

```
Set-Location "..\ghcp-developer-lab-main.worktrees\upload-validation"
copilot --yolo
```

You are now in a separate Copilot CLI session scoped entirely to the `feature/upload-validation` branch - completely isolated from the collections session.

**Action:** Press `Shift+Tab` to enter autopilot mode, then enter the feature prompt:

```
@src/components/upload/UploadZone.tsx
@src/app/api/upload/route.ts

Add server-side validation to the upload pipeline:
- Validate file size on the server (reject > 10MB)
- Validate MIME type server-side (not just client extension)
- Return structured error: { error: string, code: 'FILE_TOO_LARGE' | 'INVALID_TYPE', filename: string }
- Update UploadZone to display server validation errors inline per file
- TypeScript strict throughout
```

**Expected Result:** The second agent plans and immediately implements upload validation in full autopilot mode.

**Action:** Once the agent finishes, commit the changes in the upload-validation worktree:

```
! git add .
! git commit -m "Add upload validation feature"
```

---

### 4.5 Merge and Verify

**Action:** When both features are complete, merge them back from the repo root from a regular terminal:

```
cd <repo-root>

# Merge collections
git merge feature/photo-collections

# Merge upload validation
git merge feature/upload-validation

# Run tests across both
npm test

# Clean up worktrees
git worktree remove "..\ghcp-developer-lab-main.worktrees\photo-collections"
git worktree remove "..\ghcp-developer-lab-main.worktrees\upload-validation"
```

**Expected Result:** Both features merged, tests pass, no conflicts.

> **⚠️ Merge Conflict?** If both branches modified the same file (e.g., `GalleryGrid.tsx`), Git will report a conflict like:
> ```
> CONFLICT (content): Merge conflict in src/components/gallery/GalleryGrid.tsx
> Automatic merge failed; fix conflicts and then commit the result.
> ```
> Open the conflicting file - Git marks the conflicting sections with `<<<<<<<`, `=======`, and `>>>>>>>`. Edit the file to keep the correct combination of both changes, then:
> ```
> git add src/components/gallery/GalleryGrid.tsx
> git commit -m "Merge feature/upload-validation - resolve conflicts"
> ```

**💡 Pro Tip:** Worktrees avoid the overhead of cloning. Each worktree shares the `.git` directory - branches stay in sync, you just need to push from the correct directory.

---

## 🎯 Step 5: Session Continuity - Resume and Inline Prompts

Real development is non-linear. You get interrupted, switch tasks, come back later. Copilot CLI gives you tools to maintain continuity without reloading context from scratch.

**Scenario:** You started the bulk upload feature yesterday and need to pick up where you left off.

### 5.1 Resume a Previous Session

**Action:** From your terminal (outside an active CLI session):

```
copilot --resume
```

This shows a list of previous sessions. Select the gallery bulk upload session.

Inside an active CLI session, you can also use:

```
/resume
```

**Expected Result:** Previous session context is restored - Copilot knows what you were working on and where you left off.

---

### 5.2 One-Shot Inline Prompts

For quick questions or utility commands, you don't need an interactive session. Use `copilot -p` for one-shot prompts directly from the terminal.

**Action:** Summarize a component:

```
copilot -p "In one paragraph, summarize what GalleryGrid.tsx does and what props it accepts"
```

**Action:** Generate a utility command:

```
copilot -p "Give me a PowerShell command to find all TypeScript files in src/ that import from mock-photo-data.ts"
```

**Action:** Quick explanation:

```
copilot -p "What is the difference between Server Components and Client Components in Next.js 15?"
```

**Expected Result:** Immediate answers without opening an interactive session.

---

### 5.3 Knowledge Check ✅

*   Successfully resumed a previous session
*   Used `copilot -p` for a one-shot inline prompt
*   Understood when to use interactive vs. inline mode

---

## 🎯 Step 6: Precise Context Control - `@file` and `!` Commands

Use `@file` to anchor Copilot to specific files and prevent scope drift. Use `!` to run a shell command and inject its output as context.

**Scenario:** Add localStorage persistence for liked photos in `GalleryGrid.tsx`.

### 6.1 Explore with `!`

```
!Get-ChildItem src -Recurse -Filter "*.tsx" | Select-Object Name, FullName
```

Copilot now sees the full component list and can make informed suggestions.

### 6.2 Implement with `@file`

```
@src/components/gallery/GalleryGrid.tsx

Add localStorage persistence for liked photos:
- Store liked photo IDs as a JSON array in localStorage key "gallery_likes"
- On mount, load from localStorage and sync with component state
- On like/unlike, update localStorage immediately
- Keep changes minimal - only modify this component, no new files
- TypeScript strict: photo IDs are strings
```

### 6.3 Verify

```
git diff --name-only
```

Only `GalleryGrid.tsx` should appear. Then open `http://localhost:3000/gallery`, like 3 photos, hard refresh (`Ctrl+F5`) — liked photos should still be liked.

### 6.4 _(Optional)_ Chain `!` and `@file`

```
!git log --oneline -10
@src/components/gallery/GalleryGrid.tsx

Based on the recent commits above, what edge cases might the localStorage persistence miss?
```

**💡 Pro Tip:** Combine `@file` with `"only modify this component, no new files"` to prevent scope creep in targeted fixes.

---

## ✅ Completion Checklist

Work through each item before moving to the next lab. Items marked _(Optional)_ are stretch goals.

### Setup

*   Launched Copilot CLI from VS Code Terminal using the terminal profile picker (not a regular shell)
*   Configured baseline session: `/help`, `/model`, `/context`
*   Added GitHub MCP (write access) and Microsoft Learn MCP with `/mcp add`
*   Know when to use CLI vs. IDE vs. Spaces vs. Coding Agent

### Explore → Plan → Validate

*   Used `!` and `@file` to explore the codebase before writing any plan
*   Entered plan mode with `Shift+Tab` and answered Copilot's clarifying questions
*   Reviewed the plan with `Ctrl+Y` and edited before execution
*   Ran the MCP review gate (ms-learn + GitHub) to validate plan against best practices
*   Resolved any plan `FAIL` verdicts before proceeding to fleet

### Fleet → Review → Verify → Commit

*   Used Option A or B to execute the plan with `/fleet`
*   Monitored subagents with `/tasks` (Enter, k, r, Esc)
*   Ran post-implementation `/review` before committing

### Advanced

*   Added the `nextjs-api-routes` skill and used it to generate a typed API route
*   _(Optional)_ Created a custom skill at `.github/skills/` or `~/.copilot/skills/`
*   Set up two git worktrees and ran agents in autopilot mode (`Shift+Tab` → plan → accept + fleet)
*   Resumed a previous session with `copilot --resume` or `/resume`
*   Used `copilot -p` for one-shot inline prompts
*   _(Optional)_ Combined `!git log` + `@file` for context-aware analysis (Step 6)
*   Created `.github/copilot-instructions.md` to encode team standards
*   Reviewed the Workflow Map and can describe each phase (Explore → Plan → Validate → Fleet → Review → Verify → Commit)

---

## 🔑 Pro Tips Summary

| Tip | Details |
| --- | --- |
| **Model for the task** | Opus 4.5 for deep reasoning and `/review`; Sonnet 4.5 for routine coding tasks |
| **Fleet for parallelism** | Use when 3+ independent workstreams; single-file tasks don't benefit |
| **Ctrl+Y before fleet** | Always review the plan in your editor before executing with fleet |
| **Skills = shared playbooks** | Store in `.github/skills/` - whole team benefits |
| `**@file**` **\+ "minimal changes"** | Prevents scope creep in bug fixes |
| `**!**` **command for live context** | Inject git log, file lists, build errors as live context |
| `**/delegate**` **pre-req** | Must be GitHub signed-in; push branch first for best results |
| **Worktrees for parallel features** | No cross-contamination; shared `.git` directory |
| `**copilot -p**` **for quick lookups** | Replaces ad-hoc StackOverflow/Google searches |
| **Custom instructions = no repetition** | Encode conventions once in `.github/copilot-instructions.md` |

---

## 🚀 What's Next?

You've mastered GitHub Copilot CLI. Here's where to go from here:

*   [**Copilot Spaces Demo**](spaces-demo.md) - async collaboration and long-running context sharing
*   [**Coding Agent Demo**](coding-agent.md) - autonomous PR creation from GitHub Issues
*   [**Customize Copilot Demo**](customize-copilot.md) - advanced prompt engineering and instruction tuning

**Keep Practicing:**

*   🗓️ **30 days:** Use `/plan` + `/fleet` for every feature ≥ 3 files
*   🗓️ **60 days:** Build out your `.github/skills/` library with 3+ playbooks
*   🗓️ **90 days:** Establish a team workflow: skills + instructions + MCP + delegate as standard process

---

_Lab 4 of 6 - GitHub Copilot Workshop_