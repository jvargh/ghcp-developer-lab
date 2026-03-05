# Features Demo

Welcome to this repository! You're probably wondering what it is and how it works. We will be working with this repository for the duration of this training, so it's important to find out what it's doing now!

Let's start by learning how to choose the right Copilot capability for each stage of development.

## What You'll Learn

By the end of this demo, you will:

- [ ] Understand how Copilot supports planning, coding, testing, reviews, and operations
- [ ] Know how to use Ask, Plan, and Agent modes in Copilot Chat
- [ ] Be able to generate and refine code with completions and chat prompts
- [ ] Know how to use Copilot for test/debug and local workflow troubleshooting

**Estimated Time:** 15-20 minutes

## 🚀 Getting Started

More information on installation can be found in the [README](../README.md) file. For a quick start, use the following steps:

1. **Open the repository in your IDE** (e.g., VS Code)
2. **Create new branch:** `git checkout -b USERNAME-copilot-exercises`
3. **Install packages**: Run `npm install` in the terminal
4. **Start the development server**: Run `npm run dev`
5. **Open the project in your browser**: Go to [http://localhost:3000](http://localhost:3000) for a live preview

Continue with the demo by following the steps below.

## 🎯 Step 1: Discover Available Features and Modes

Mode: Ask

**Goal:** See available commands and understand where each mode fits.

**Action:** Type the following command in the Copilot chat:
Prompt

```markdown
/help
```

**Expected Result:** You'll see a list of available commands and features.

**Follow-up Prompt:**

```markdown
In VS Code Copilot Chat, explain when to use Ask mode, Plan mode, and Agent mode for this repository.
```

**Expected Result:** A practical mode-selection guide grounded in this project.

---

## 📚 Step 2: Planning in the IDE with Copilot Chat

### 2.1 Get Project Overview

**Prompt:**

```markdown
@workspace Give me a summary of the project and give an overview of the most impactful files.
```

**Follow-up Action:**

- Select the first page in the "Most Impactful Files"
- Highlight the first section

### 2.2 Brainstorm and Prioritize Improvements

**Prompt:**

```markdown
Given this codebase, suggest the top 5 practical improvements for maintainability and user experience. Rank by impact and effort.
```

**Expected Result:** Prioritized ideas with clear trade-offs.

### 2.3 Explain Selected Code

**Prompt:**

```markdown
@workspace /explain
```

**What this does:** Copilot will explain the highlighted code section in detail.

### 2.4 Create a Plan Before Editing

**Prompt:**

```markdown
Create a step-by-step plan to add a small footer update in src/app/layout.tsx with minimal risk. Include validation steps.
```

**💡 Pro Tip:** Use Plan mode for larger or riskier changes before you start editing.

## 💻 Step 3: Code Creation with Completions + Chat

### Code Completions Instructions

1. **Navigate to file:** Open [`src/app/layout.tsx`](src/app/layout.tsx)
2. **Find location:** Go to line 52 `{/* REPLACE THIS COMMENT */}`
3. **Remove line 52 comment:** and replace it with the following comment:

```tsx
{
  /* Create a footer for this section. It should contain the logo and copyright information. */
}
```

5. **Wait for suggestion:** Copilot will suggest code automatically
6. **Accept suggestion:** Press `Tab` to accept or `Esc` to dismiss
7. **Check your changes:** Save the file and refresh [http://localhost:3000](http://localhost:3000) to see your new footer

### Refine with Chat

After accepting a completion, ask Copilot:

```markdown
Refactor this footer to match the existing styling patterns in this repository and keep dark mode support.
```

**Expected Result:** Cleaner code aligned to project conventions.

## 🧪 Step 4: Testing and Debugging with Copilot

### 4.1 Generate Test Ideas

**Prompt:**

```markdown
Suggest test cases for the footer change in src/app/layout.tsx, including accessibility and responsive behavior checks.
```

### 4.2 Debug a Local Issue

If you see an error, paste it into chat and ask:

```markdown
Help me debug this error from the local terminal/dev server. Explain root cause and give the smallest safe fix.
```

### 4.3 Optional Prompt for Validation

```markdown
Give me a quick manual validation checklist I can run in the browser for this footer update.
```

## 📝 Step 5: Review and Commit Your Changes

### Option A: AI-Powered Review (Premium Feature)

If you have premium access:

1. **Select generated code:** Highlight the footer code that was created
2. **Open Copilot menu:** Right-click → Select "Copilot"
3. **Get review:** Choose "Review and Comment"
4. **Process feedback:** Review suggestions and accept/discard as needed

### Option B: Manual Review (Free Alternative)

If you don't have premium access:

1. **Read the code:** Review what was generated
2. **Check functionality:** Does it match the requirements?
3. **Verify style:** Does it follow the project's coding standards?

### Commit Your Changes

1. **Open Source Control:** Click the Source Control icon in the left sidebar
2. **Generate commit message:** Hover over the commit message box → Click "Generate Commit Message with Copilot"
3. **Review and edit:** Modify the generated message if needed
4. **Commit:** Click "Commit" then "Sync Changes" to push

**🎉 Success indicator:** You should see your changes in the git history!

## 🚀 Step 6: Deployment and Operations (IDE Guidance)

Use Copilot Chat to assist with local deployment-readiness and troubleshooting tasks:

**Prompt: CI/CD guidance**

```markdown
Based on this Next.js repository, suggest a minimal CI workflow checklist (lint, build, tests) and common failure points to watch.
```

**Prompt: troubleshooting guidance**

```markdown
If deployment fails with a build error, what local checks should I run first in this project?
```

**Expected Result:** A practical runbook you can use before handing work off.

## ✅ Completion Checklist

Mark off each item as you complete it:

- [ ] Used `/help` command successfully
- [ ] Compared Ask, Plan, and Agent modes for this repo
- [ ] Got project summary with `@workspace`
- [ ] Explained code with `@workspace /explain`
- [ ] Generated and refined footer code with AI
- [ ] Used Copilot prompts for testing/debugging guidance
- [ ] Reviewed the generated code
- [ ] Used Copilot for CI/CD or deployment-readiness guidance
- [ ] Committed changes to git

## 🚀 What's Next?

Congratulations! You've completed your first GitHub Copilot demo.

👉 **[Start Engineering Practices Demo](./engineering-practices.md)**
