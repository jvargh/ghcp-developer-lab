# Features Demo

Welcome to this repository! You're probably wondering what it is and how it works. We will be working with this repository for the duration of this training, so it's important to find out what it's doing now!

Let's start by learning how to choose the right Copilot capability for each stage of development.

## Table of Contents

- [What You'll Learn](#what-youll-learn)
- [🚀 Getting Started](#getting-started)
- [🎯 Step 1: Discover Available Features and Modes](#step-1-discover-available-features-and-modes)
  - [1.2 Developer Tool Integration: Command Palette](#12-developer-tool-integration-command-palette)
  - [1.3 Keyboard Shortcuts and Productivity Workflows](#13-keyboard-shortcuts-and-productivity-workflows)
  - [1.4 Session Controls + Model Picker (Latest UX)](#14-session-controls--model-picker-latest-ux)
- [📚 Step 2: Planning in the IDE with Copilot Chat](#step-2-planning-in-the-ide-with-copilot-chat)
  - [2.1 Get Project Overview](#21-get-project-overview)
  - [2.2 Brainstorm and Prioritize Improvements](#22-brainstorm-and-prioritize-improvements)
  - [2.3 Explain Selected Code](#23-explain-selected-code)
  - [2.4 Plan and Implement a Footer Update](#24-plan-and-implement-a-footer-update)
  - [2.5 Context-Aware Coding with Inline Chat](#25-context-aware-coding-with-inline-chat)
  - [2.6 Command-Based AI Interactions: Slash Commands](#26-command-based-ai-interactions-slash-commands)
  - [2.7 Code Exploration and Learning](#27-code-exploration-and-learning)
- [💻 Step 3: Code Creation with Completions + Chat](#step-3-code-creation-with-completions--chat)
  - [3.1 Inline Suggestions and Code Completions](#31-inline-suggestions-and-code-completions)
  - [3.2 Predictive Code Completion and Real-Time Assistance](#32-predictive-code-completion-and-real-time-assistance)
  - [3.3 Boilerplate Code Generation](#33-boilerplate-code-generation)
  - [3.4 Natural Language to Code: Comments-Driven Development](#34-natural-language-to-code-comments-driven-development)
  - [3.5 Alternative Code Suggestions: Multiple Implementations](#35-alternative-code-suggestions-multiple-implementations)
- [🧪 Step 4: Testing and Debugging with Copilot](#step-4-testing-and-debugging-with-copilot)
  - [4.1 Automated Unit Test Generation](#41-automated-unit-test-generation)
  - [4.2 Debug a Local Issue](#42-debug-a-local-issue)
- [📝 Step 5: Review and Commit Your Changes](#step-5-review-and-commit-your-changes)
  - [Option A: AI-Powered Review (Premium Feature)](#option-a-ai-powered-review-premium-feature)
  - [Option B: Manual Review (Free Alternative)](#option-b-manual-review-free-alternative)
  - [Commit Your Changes](#commit-your-changes)
- [✅ Completion Checklist](#completion-checklist)
- [🚀 What's Next?](#whats-next)

---

## What You'll Learn

By the end of this demo, you will:

- Understand how Copilot supports planning, coding, testing, reviews, and operations
- Know how to use Copilot Chat and Agent mode, and use `/plan` for structured planning
- Be able to generate and refine code with completions and chat prompts
- Know how to use Copilot for test/debug and local workflow troubleshooting
- Use AI-assisted code completion including inline suggestions, predictive completion, and boilerplate generation
- Leverage developer tool integration with command palette, keyboard shortcuts, and productivity workflows
- Use conversational AI for natural language coding queries and prompt-driven code generation
- Apply context-aware coding assistance with inline chat for in-editor edits and explanations
- Run command-based AI interactions with slash commands (`/explain`, `/tests`, `/fix`)
- Tune reasoning models with Thinking Effort in the model picker
- Generate code from natural language comments and descriptions
- Explore and understand existing code with AI-powered explanations and code review assistance
- Compare alternative code suggestions and select optimal implementations
- Generate unit tests automatically with AI-assisted test writing

**Estimated Time:** 30-40 minutes

## 🚀 Getting Started

More information on installation can be found in the [README](../README.md) file. For a quick start, use the following steps:

1.  **Open the repository in your IDE** (e.g., VS Code)
2.  **Create new branch:** `git checkout -b USERNAME-copilot-exercises`
3.  **Install packages**: Run `npm install` in the terminal
4.  **Start the development server**: Run `npm run dev`
5.  **Open the project in your browser**: Go to [http://localhost:3000](http://localhost:3000) for a live preview

Continue with the demo by following the steps below.

## 🎯 Step 1: Discover Available Features and Modes

**Goal:** See available commands and understand where each mode fits.

**Action:** Type the following command in the Copilot chat:

```
/help
```

**Expected Result:** You'll see a list of available commands and features.

**Follow-up Prompt- In VS Code Copilot Chat:**

```
Explain when to use Ask mode, Plan mode, and Agent mode for this repository
```

**Expected Result:** A practical guide on when to chat vs. delegate to the agent.

### 1.2 Developer Tool Integration: Command Palette

**Goal:** Learn to access Copilot features through the VS Code command palette.

**Action:**

1.  **Open the Command Palette:** Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2.  **Type:** `Copilot` to see all available Copilot commands
3.  **Try these commands** (exact names may vary slightly by version):
    - `GitHub Copilot: Focus on Chat View` - Opens the Copilot Chat panel
    - `GitHub Copilot: Enable/Disable Completions` - Toggle inline suggestions on/off
    - `GitHub Copilot: Open Completions Panel` - See multiple suggestion alternatives

**Expected Result:** You'll see the full list of Copilot commands available in your IDE.

### 1.3 Keyboard Shortcuts and Productivity Workflows

**Goal:** Master the key shortcuts for efficient Copilot usage.

| Action                    | Windows/Linux | Mac            |
| ------------------------- | ------------- | -------------- |
| Accept inline suggestion  | `Tab`         | `Tab`          |
| Dismiss suggestion        | `Esc`         | `Esc`          |
| See next suggestion       | `Alt+]`       | `Option+]`     |
| See previous suggestion   | `Alt+[`       | `Option+[`     |
| Trigger inline suggestion | `Alt+\`       | `Option+\`     |
| Open Completions Panel    | `Ctrl+Enter`  | `Ctrl+Enter`   |
| Open inline chat          | `Ctrl+I`      | `Cmd+I`        |
| Open Copilot Chat         | `Ctrl+Alt+I`  | `Cmd+Option+I` |

**Action:** Try each shortcut while editing a file. Navigate to any `.tsx` file and practice triggering and cycling through suggestions.

**💡 Pro Tip:** Combine `Alt+]` / `Alt+[` to quickly cycle through alternative suggestions without leaving your editor flow.

### 1.4 Session Controls + Model Picker (Latest UX)

**Goal:** Practice modern chat controls for steering long-running agent requests.

**Action - Steering and queueing:**

1. Start a longer request in Agent mode.
2. While it is still running, send another message and choose one of:
   - **Add to Queue** (run next)
   - **Steer with Message** (redirect current flow)
   - **Stop and Send** (cancel current and run new)

**Expected Result:** You can keep momentum during long tasks without waiting for the agent to finish before redirecting it.

**Action - Thinking Effort:**

1. Open the model picker in Copilot Chat (click the model name near the input box).
2. Select a reasoning model (e.g., `o3` or `o4-mini`).
3. Adjust the **Thinking** slider — choose **Low**, **Medium**, or **High** based on task complexity.
4. Send a prompt like: `Analyse the architecture of this project and suggest structural improvements.`

**Expected Result:** Higher thinking effort produces more thorough, step-by-step reasoning — useful for complex planning or architectural questions. Lower effort is faster for simple tasks.

---

## 📚 Step 2: Planning in the IDE with Copilot Chat

### 2.1 Get Project Overview

**Prompt:**

```
Give me a summary of the project and give an overview of the most impactful files.
```

**Follow-up Action:**

- Select the first page in the "Most Impactful Files"
- Highlight the first section

### 2.2 Brainstorm and Prioritize Improvements

**Prompt:**

```
Given this codebase, suggest the top 5 practical improvements for maintainability and user experience. Rank by impact and effort.
```

**Expected Result:** Prioritized ideas with clear trade-offs.

### 2.3 Explain Selected Code

**Goal:** Use the `/explain` slash command to get a detailed breakdown of a specific piece of code.

**Action:**

1.  **Open** `src/components/gallery/GalleryGrid.tsx`
2.  **Highlight** the filtering logic - select the section where photos are filtered by tags and search query (look for `.filter(` calls). 
3.  **Open Copilot Chat.** Selection should show up with from and to line numbers. Now type:

```
/explain
```

**What this does:** Copilot will explain the highlighted code section in detail - breaking down the filter chain, how tag matching works, and what each conditional branch does.

**Expected Result:** A plain-English walkthrough of the selected code, making it easy to understand logic you didn't write.

### 2.4 Plan and Implement a Footer Update

**Action:** Open Copilot Chat in Agent mode and run:

```
/plan Add a small footer to src/app/layout.tsx with logo and copyright info. Include validation steps.
```

Copilot will propose a step-by-step plan and it should save it a plan.md file. Review it, then let the agent execute it.

**Validate:** Once the footer is added, start the dev server (`npm run dev`) and open [http://localhost:3000](http://localhost:3000) to confirm the footer appears.

**💡 Pro Tip:** Use `/plan` before making larger or riskier edits — it gives you a reviewable checklist before the agent writes any code.

### 2.5 Context-Aware Coding with Inline Chat
**Note:** Ensure that `editor.inlinesuggest.enabled` is enabled in your VS Code settings.

**Goal:** Use inline chat (`Ctrl+I` / `Cmd+I`) to make targeted edits and get explanations directly in the editor.

**Action:**

1.  **Open a file:** Navigate to `src/components/ui/cards/FeatureCard.tsx`
2.  **Select a code block:** Highlight the component body (e.g., from the opening `function` line to the closing `}`)
3.  **Open inline chat:** Press `Ctrl+I` (Windows/Linux) or `Cmd+I` (Mac)
4.  **Type a request:**

```
Add a subtle drop shadow that deepens on hover using Tailwind classes
```

1.  **Review the diff:** Copilot shows inline changes. Accept with **Accept** or discard with **Discard**.
2.  If accepted, validate by going to the home page which shows 3 feature cards (“Smart Upload”, “Client Proofing”, “Public Sharing”). Hover over each card and you should see the **shadow deepen smoothly**.

**Follow-up:** Use inline chat (`Ctrl+I` / `Cmd+I`) and select a different section of code and enter:

```
Explain what this code does line by line
```

**Expected Result:** Copilot provides context-aware explanations and edits right where you're working - no need to switch to the chat panel.

**💡 Pro Tip:** Inline chat is ideal for small, targeted edits and quick explanations in specific code locations.

### 2.6 Command-Based AI Interactions: **Slash Commands**

**Goal:** Use slash commands for quick, command-driven workflows in Copilot Chat.

**Action:** Open Copilot Chat and try each of these slash commands:

> **Note:** `/explain` was covered in section 2.3. Below are two more essential slash commands.

`/tests` **\- Generate test cases:**

1.  Highlight the `StatsGrid` component in `src/components/ui/stats/StatsGrid.tsx`
2.  In Copilot Chat, type:

```
/tests Generate unit tests for this component including edge cases for empty stats arrays
```

`/fix` **\- Fix issues in selected code:**

1.  Highlight a function or component that has a potential issue (e.g., the icon color logic in `src/components/ui/cards/FeatureCard.tsx`)
2.  In Copilot Chat, type:

```
/fix
```

**Expected Result:** Each slash command provides a focused, purpose-built response without requiring a lengthy prompt.

**💡 Pro Tip:** Slash commands are faster than typing full prompts for common tasks. Combine them with code selection for best results.

### 2.7 Code Exploration and Learning

**Goal:** Use Copilot to understand unfamiliar code and get code review assistance.

**Action 1 - Understand existing code:**

1.  Open `src/components/upload/UploadZone.tsx`
2.  Select the entire file contents such that the selection shows up in Copilot chat.
3.  Ask in Copilot Chat:

```
Walk me through how this upload component works. Explain the state management, event handlers, and how the drag-and-drop flow is implemented.
```

**Expected Result:** A detailed walkthrough of the component's logic, helping you understand unfamiliar code quickly.

**Action 2 - Code review assistance:**

Select any component file you've modified and ask:

```
Review this code for potential issues: performance concerns, accessibility gaps, error handling, and adherence to React best practices. Suggest specific improvements.
```

**Expected Result:** A code review with actionable suggestions, similar to a peer review.

## 💻 Step 3: Code Creation with Completions + Chat

### 3.1 Inline Suggestions and Code Completions

1.  **Navigate to file:** Open [`src/app/layout.tsx`](src/app/layout.tsx)
2.  **Find location:** Go to line 55 `{/* REPLACE THIS COMMENT */}`
3.  **Remove the comment on line 55** and replace it with the following comment:

```
{
  /* Create a footer for this section. It should contain the logo and copyright information. */
}
```

1.  **Wait for suggestion:** Copilot will suggest code automatically
2.  **Accept suggestion:** Press `Tab` to accept or `Esc` to dismiss
3.  **Check your changes:** Save the file and refresh [http://localhost:3000](http://localhost:3000) to see your new footer

**(Optional) Follow-up:** Once the footer is generated, ask Copilot to refine it:

```
Refactor this footer to match the existing styling patterns in this repository and keep dark mode support.
```

### 3.2 Predictive Code Completion and Real-Time Assistance

**Goal:** Experience how Copilot predicts your next lines of code as you type.

**Action:**

1.  **Open file:** Navigate to `src/lib/mock-photo-data.ts`
2.  **Start typing a new entry:** At the end of the last data array element, after closing brace }, start typing a new object with just the opening brace `{`
3.  **Observe:** Copilot will predict the full object structure based on the existing pattern, filling in fields like `id`, `title`, `url`, etc.
4.  **Accept and continue:** Press `Tab` to accept, then immediately start the next entry and Copilot will continue predicting

**What to notice:**

- Copilot adapts suggestions in real time as you type each character
- Suggestions are context-aware, matching the data structure of surrounding entries
- The more you type, the more specific and accurate the predictions become

### 3.3 Boilerplate Code Generation

**Goal:** Use Copilot to quickly scaffold common code patterns.

**Action 1 - Generate a new component:**

1.  **Open the file:** `src/components/ui/cards/InfoCard.tsx` (already exists as a blank file and ready to use)
2.  **Type the following comment at the top of the empty file:**

```
// React component InfoCard that displays a title, description, and an optional image.
// Uses Tailwind CSS for styling with dark mode support.
// Props: title (string), description (string), imageUrl (optional string)
```

1.  **Press Enter** and wait for Copilot to suggest the full component boilerplate
2.  **Accept** with `Tab`
3.  If the implementation does not seem complete, then run 'Fix this file based on comments and any ensuing errors' from Copilot chat.
4.  To visualize this component in the web page, prompt Copilot to wire it into `src/app/page.tsx` (or another page), then validate in the browser.

**Action 2 - Generate a TypeScript interface:**

In the same file or a new one, type:

```
// Interface for a photo gallery album containing id, name, description, coverImage, photos array, and creation date
```

**Expected Result:** Copilot generates full boilerplate code from descriptive comments - interfaces, components, hooks, and more.

### 3.4 Natural Language to Code: Comments-Driven Development

**Goal:** Write natural language descriptions and let Copilot generate the corresponding program logic.

**Action:**

1.  **Open** `src/lib/mock-photo-data.ts`
2.  **Add the following comment at the bottom of the file:**

```typescript
// Function that filters photos by tag name, sorts them by date in descending order,
// and returns only the top N results
```

1.  **Press Enter** and let Copilot generate the function implementation
2.  **Accept** and try adding another comment:

```typescript
// Function that groups photos by their category and returns an object where
// keys are category names and values are arrays of photos
```

**Expected Result:** Complete function implementations generated from plain English descriptions.

**💡 Pro Tip:** The more specific your comment, the better the generated code. Include parameter names, return types, and edge case handling in your descriptions.

**Outcome:**

1.   Select the generated code from above and in chat run
``` 
create an implementation that visualizes these on the web portal
```
2.  This should result in updates to `src/app/explore/page.tsx` (and related files if needed). Then open [http://localhost:3000/explore](http://localhost:3000/explore).
3.  On that page:
  - **Filter by Tag** section: clicking any tag pill calls `getPhotosByTag(tag, 5)` and displays the top 5 most recent photos matching that tag
  - **All Categories** section: uses `groupPhotosByCategory()` to show every category with its photos

### 3.5 Alternative Code Suggestions: Multiple Implementations

**Goal:** View and compare multiple code suggestions from Copilot to select the optimal solution.

**Action:**

1.  **Open** `src/lib/mock-photo-data.ts` and scroll to the bottom of the file
2.  **Type a comment** describing what you want:

```
// Function to search photos by title with case-insensitive partial matching
```

1.  **Open the Completions Panel:** Press `Ctrl+Enter` (Windows/Linux) or `Ctrl+Enter` (Mac) and wait a few seconds.
2.  **Compare suggestions:** The panel shows multiple alternative implementations side by side
3.  **Select the best:** Click **Accept** on the implementation you prefer

**Alternative approach - Cycle inline:**

- Press `Alt+]` to see the next suggestion
- Press `Alt+[` to see the previous suggestion
- Compare the different approaches before accepting

**What to look for when comparing:**

- Performance differences (e.g., `filter` vs. `reduce`)
- Readability and code style consistency
- Edge case handling
- TypeScript type safety

**Expected Result:** You'll see that Copilot can offer different algorithms, patterns, and styles for the same task - empowering you to choose the best fit.

## 🧪 Step 4: Testing and Debugging with Copilot

### 4.1 Automated Unit Test Generation

**Goal:** Use Copilot to generate complete, runnable unit tests.

**Before starting**, ask Copilot in chat:

```
Suggest test cases for the footer change in src/app/layout.tsx, including accessibility and responsive behavior checks.
```

This gives you a mental model of what good tests look like before generating them.

**Action 1 - Generate tests with slash command:**

1.  **Open** `src/components/ui/stats/StatsGrid.tsx`
2.  **Select the entire component code**
3.  **In Copilot Chat, type:**

```
/tests
```

**Expected Result:** Copilot generates a full test file with imports, test setup, and multiple test cases.

**Action 2 - Generate tests with a detailed prompt:**

In Copilot Chat, run the following prompt:

```
Generate a comprehensive unit test file for src/components/gallery/GalleryGrid.tsx using Jest and React Testing Library. Include tests for:
- Rendering with mock data
- Empty state handling
- Filter/tag selection behavior
- Accessibility (ARIA roles, alt text)
- Responsive grid layout classes
```

**Expected Result:** A complete test file you can save and run.

**Action 3 - AI-assisted test writing with inline chat:**

1.  **Create a new test file:** `src/components/ui/layout/Hero.test.tsx`
2.  **Type a comment:**

```
// Tests for the Hero component
```

1.  **Press Enter** and let Copilot suggest the test boilerplate
2.  **After accepting**, use inline chat (`Ctrl+I`) on the generated tests and ask:

```
Add edge case tests for missing props and very long text content
```

#### **💡 Pro Tip:** Start with `/tests` for quick generation, then use inline chat to refine and add edge cases incrementally.

### 4.2 Debug a Local Issue

If you see an error, paste it into chat and ask:

```
Help me debug this error from the local terminal/dev server. Explain root cause and give the smallest safe fix.
```

**Follow-up:** Once fixed, ask for a quick browser validation checklist:

```
Give me a quick manual validation checklist I can run in the browser for this footer update.
```

## 📝 Step 5: Review and Commit Your Changes

### Option A: AI-Powered Review (Premium Feature)

If you have premium access:

1.  **Select generated code:** Highlight the footer code that was created
2.  **Open Copilot menu:** Right-click → Select "Copilot"
3.  **Get review:** Choose "Review and Comment"
4.  **Process feedback:** Review suggestions and accept/discard as needed

**Optional quality-of-life tip (latest UX):** In the chat response context menu, use **Copy Final Response** when you want only the final markdown answer (without tool-call details).

### Option B: Manual Review (Free Alternative)

If you don't have premium access:

1.  **Read the code:** Review what was generated
2.  **Check functionality:** Does it match the requirements?
3.  **Verify style:** Does it follow the project's coding standards?

### Commit Your Changes

1.  **Open Source Control:** Click the Source Control icon in the left sidebar
2.  **Generate commit message:** Hover over the commit message box → Click "Generate Commit Message with Copilot"
3.  **Review and edit:** Modify the generated message if needed
4.  **Commit:** Click "Commit" then "Sync Changes" to push

**🎉 Success indicator:** You should see your changes in the git history!

## ✅ Completion Checklist

Mark off each item as you complete it:

**Developer Tool Integration**

- Used command palette (`Ctrl+Shift+P`) to discover Copilot commands
- Practiced keyboard shortcuts for accepting, dismissing, and cycling suggestions

**Conversational AI & Modes**

- Used `/help` command successfully
- Understood when to use Copilot Chat vs Agent mode, and `/plan` for structured work
- Got project summary using Copilot Chat
- Practiced steering/queueing during a long-running agent request

**Context-Aware Coding & Slash Commands**

- Used inline chat (`Ctrl+I`) to edit code in-place
- Explained code with `/explain`
- Tried `/tests` and `/fix` slash commands

**AI-Assisted Code Completion**

- Generated and refined footer code with inline suggestions
- Experienced predictive code completion in real time
- Generated boilerplate code from descriptive comments

**Natural Language to Code**

- Generated function implementations from natural language comments

**Alternative Code Generation**

- Used Completions Panel (`Ctrl+Enter`) to compare multiple suggestions
- Cycled through alternatives with `Alt+]` / `Alt+[`

**Code Exploration & Learning**

- Used Copilot to understand unfamiliar code
- Got code review assistance from Copilot

**Automated Testing**

- Generated unit tests with `/tests` command
- Created a test file with AI-assisted test writing

**Review & Commit**

- Reviewed the generated code
- Committed changes to git

## 🚀 What's Next?

Congratulations! You've completed your first GitHub Copilot demo.

👉 [**Start Engineering Practices Demo**](./engineering-practices.md)
