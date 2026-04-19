# Customize Copilot Demo

At this point, you've explored features, data flow, context engineering, and prompt engineering. Now the focus shifts to customization.

**Goal:** Reduce repetition, avoid restating context, and get better results by configuring Copilot to match your workflow and standards.

## Table of Contents

- [What You'll Learn](#what-youll-learn)
- [TL;DR: Customize Copilot](#tldr-customize-copilot)
- [📌 Customization Comparison](#customization-comparison)
- [📊 Step 1: Model Switching + Premium Request Awareness](#step-1-model-switching--premium-request-awareness-local)
  - [1.1 Monitor premium usage in VS Code](#11-monitor-premium-usage-in-vs-code)
  - [1.2 Compare model behavior on the same task](#12-compare-model-behavior-on-the-same-task)
- [🧩 Step 2: Custom Responses (Instructions + Prompt Files + Custom Agents)](#step-2-custom-responses-instructions--prompt-files--custom-agents)
  - [2.1 Scoped instructions files](#21-scoped-instructions-files-instructionsmd)
  - [2.2 Prompt files](#22-prompt-files-promptmd)
  - [2.3 Custom agents (local, role-based)](#23-custom-agents-local-role-based)
  - [2.4 Agent Skills](#24-agent-skills)
- [🔁 Step 3: Agent Mode - Add a "Featured" Badge End-to-End](#step-3-agent-mode--add-a-featured-badge-end-to-end)
- [🔌 Step 4: Model Context Protocol (MCP)](#step-4-model-context-protocol-mcp)
- [✅ Completion Checklist](#completion-checklist)
- [🚀 What's Next?](#whats-next)

---

## What You'll Learn

By the end of this demo, you will:

- Understand model switching and premium request usage in local Copilot workflows
- Use custom instructions, prompt files, and chat modes in VS Code
- Create role-based custom agents for repeatable tasks
- Understand Agent Skills and when to use them
- Understand MCP and how to configure it locally
- Know when to use each customization type (instructions vs prompt files vs agents vs skills)

**Estimated Time:** 40-45 minutes

---

## TL;DR: Customize Copilot

In this section, you'll configure Copilot so you can code seamlessly in your IDE while staying aligned with team practices.

1.  **Model + premium awareness**: choose the right model for the task.
2.  **Custom responses**: use instructions, prompt files, and mode/agent config to shape output automatically.
3.  **MCP**: connect external tools and data so Copilot can retrieve live context.

## 📌 Customization Comparison

| Capability          | Setup Location                                                | Invocation              | Best Use                        |
| ------------------- | ------------------------------------------------------------- | ----------------------- | ------------------------------- |
| Custom Instructions | `.copilot-instructions.md`                                    | Automatic               | Always-on standards             |
| Prompt Files        | `.github/prompts/*.prompt.md`                                 | Manual (`/prompt-name`) | Repeatable task templates       |
| Custom Agents       | `.github/agents/*.agent.md`                                   | Explicit mode selection | Role-based task workflows       |
| Agent Skills        | `.github/skills/*/SKILL.md` or `~/.copilot/skills/*/SKILL.md` | Relevance-triggered     | Reusable multi-step workflows   |
| MCP                 | `.vscode/mcp.json` + server config                            | Tool-assisted prompts   | Live external context + actions |

---

## 📊 Step 1: Model Switching + Premium Request Awareness (Local)

### 1.1 Monitor premium usage in VS Code

1.  Open VS Code with Copilot enabled.
2.  Check Copilot status/usage indicators in the IDE (Copilot status area / chat model picker / usage UI if available in your version).
3.  Note your current usage before and after running this demo.

### 1.2 Compare model behavior on the same task

You'll run the **same prompt against three models** and compare how each responds - covering code quality, explanation depth, and adherence to project conventions.

**Target:** The filter + pagination logic inside `GalleryGrid.tsx` (lines 31–52):

```
// Filter photos based on selected tags and search query
const filteredPhotos = mockPhotos.filter((photo) => {
  const matchesTags =
    selectedTags.length === 0 ||
    selectedTags.some((tag) => photo.tags.includes(tag.toLowerCase()));
  const matchesSearch =
    searchQuery === "" ||
    photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.tags.some((tag) =>
      tag.toLowerCase().includes(searchQuery.toLowerCase()),
    ) ||
    (photo.photographer &&
      photo.photographer.toLowerCase().includes(searchQuery.toLowerCase()));
  return matchesTags && matchesSearch;
});

const totalPhotos = filteredPhotos.length;
const photosPerPage = limit;
const startIndex = 0; // ← always 0, pagination is cumulative
const endIndex = currentPage * photosPerPage;
const displayedPhotos = filteredPhotos.slice(startIndex, endIndex);
const hasMore = endIndex < totalPhotos;
```

> **🟢 Use Ask mode for this exercise.**  
> In the Copilot Chat panel, set the mode dropdown to **Ask** (not Agent or Edit).
>
> - **Ask** returns code in the chat window only - nothing is written to disk, making it safe to compare multiple models against the same unchanged file.
> - **Edit** would stage an inline diff in the editor; you'd have to accept/reject before switching models.
> - **Agent** autonomously reads files, plans, and applies changes immediately - the file would be modified after the first run and subsequent models would see different input.

**Steps:**

1.  Open `src/components/gallery/GalleryGrid.tsx` in VS Code.
2.  Select lines 31–52 (the block above).
3.  Open Copilot Chat, confirm the mode is set to **Ask**, and attach the selection using the paperclip / `#selection`.
4.  Switch to **GPT-4.1** in the model picker. Paste the prompt below and send. Record results in the table - **do not click "Apply"**.
5.  Switch to **Claude Sonnet**. Re-attach `#selection` (file is still unchanged). Send the same prompt. Record results.
6.  Switch to **GPT-5.4-mini** (or another reasoning model available to you). Re-attach and send again.
7.  Once the table is complete, pick your preferred response and manually apply it to the file.

**Prompt (use exactly as-is for each model):**

```
The selected code in GalleryGrid.tsx handles filtering and pagination.
There are two issues I can see:
1. `startIndex` is hardcoded to 0, which is misleading since pagination is cumulative (not page-based).
2. The search logic repeats `.toLowerCase()` on every render with no memoization.

Please refactor this block to:
- Remove or rename the unused `startIndex` variable
- Extract the filter predicate into a named, memoized `useMemo` with the correct deps
- Tighten the TypeScript - `searchQuery` comparisons can use a helper to avoid repetition
- Keep all existing behavior unchanged

Show only the refactored block, not the full file.
```

**What to observe per model. You can also use Copilot to help answer questions below:**

| Observation                               | GPT-4.1 | Claude Sonnet | o4-mini |
| ----------------------------------------- | ------- | ------------- | ------- |
| Did it use `useMemo`?                     |         |               |         |
| Did it remove/rename `startIndex`?        |         |               |         |
| Did it extract a search helper?           |         |               |         |
| Explanation depth (short / medium / long) |         |               |         |
| Followed project naming style?            |         |               |         |
| Felt production-ready without edits?      |         |               |         |

**Discussion:**

- Which model caught all three issues without extra prompting?
- Which gave the most useful explanation alongside the code?
- Did any model introduce behavior changes (e.g., change `currentPage * limit` logic)?
- Which response would you paste in fastest and move on?

---

## 🧩 Step 2: Custom Responses (Instructions + Prompt Files + Custom Agents)

**Quick Reference - when to reach for each type:**

| Type              | Use it when…                                                                         |
| ----------------- | ------------------------------------------------------------------------------------ |
| **Instructions**  | You want a rule applied _always_, to every response in scope - no invocation needed  |
| **Prompt files**  | You have a _repeatable task_ you invoke on demand (e.g. `/write-test`, `/review-pr`) |
| **Custom agents** | You want a _role_ with a persona, tools, and workflow you switch into explicitly     |
| **Skills**        | You have a _multi-step workflow_ Copilot should trigger automatically when relevant  |

Copilot can adapt to your team workflow without repeating context every time.

### 2.1 Scoped instructions files (`.instructions.md`)

In the Engineering Practices demo you created a component-scoped instructions file. Here you will create a second one scoped to mock data files, showing that multiple instructions files can coexist and target different parts of the codebase.

**Technique guidelines:**

- Use YAML front matter with `applyTo` to scope rules to specific paths.
- Keep rules short and clear.
- Focus on conventions that differ from the repo-wide defaults.

**Exercise:**

- Create `.github/instructions/mock-data.instructions.md` with the following content:

```
---
applyTo: "src/lib/mock-*.ts"
---
- Every mock data array must export a TypeScript type or interface for its items
- Use realistic placeholder values (not "test1", "foo", "Lorem ipsum")
- Include at least one optional field in each interface
- Sort arrays by a date field in descending order (newest first)
- Add a JSDoc comment above each exported array explaining its purpose
```

- Ask Copilot to generate new mock data using below prompt. Validate that it read the `mock-data.instructions.md` during the run.

```
Create a mock-collection-data.ts file in src/lib/ with sample photo collections data.
```

**Output:**

- Verify the output includes an exported interface, realistic values, an optional field, descending date sort, and a JSDoc comment above the array.

```
compare src/lib/mock-*.ts and ensure it follows instructions in mock-data.instructions.md
```

- Open `src/lib/mock-photo-data.ts` and compare it side by side with your new file. The existing file was written without these instructions, so you should see these differences:

| Rule from instructions             | `mock-photo-data.ts` (existing)         | Your new file (expected)                           |
| ---------------------------------- | --------------------------------------- | -------------------------------------------------- |
| JSDoc comment above exported array | No JSDoc comment                        | Has a `/** ... */` comment above the array         |
| Descending date sort               | Not sorted by date                      | Items ordered newest-to-oldest                     |
| Optional field with `?`            | Has optional fields, but by coincidence | Intentionally includes at least one `?` field      |
| Realistic placeholder values       | Uses generic names like "John Doe"      | Uses more varied, realistic names and descriptions |

If your new file matches the right column, the scoped instructions worked. If it looks like the left column, check that the `applyTo` glob matches `src/lib/mock-*.ts` and regenerate.

### 2.2 Prompt files (`.prompt.md`)

Prompt files are reusable templates for specific workflows.

**Prompt file techniques:**

- One file = one clear purpose.
- Be explicit about expected output and constraints.
- Reference concrete files and patterns in the repo.

**Exercise A: Use existing prompt files**

```
/generate-mock-photo-data 3
```

```
/generate-new-ui for the recent galleries table in the admin page.
Make it a reusable replacement component and place it in the layout folder.
```

**Exercise B: Use the unit test prompt file**

This repo includes a ready-made prompt file for unit test generation at `.github/prompts/generate-unit-tests.prompt.md`.

1.  Open `.github/prompts/generate-unit-tests.prompt.md` and review the rules it defines (coverage rules, style guidelines, example structure).
2.  Open `src/components/ui/cards/FeatureCard.tsx` so it is in context.
3.  Invoke the prompt file:

```
/generate-unit-tests for @file:FeatureCard.tsx
```

1.  Review the generated tests and verify they follow the rules defined in the prompt file.
2.  Try it again with a different component to confirm reusability:

```
/generate-unit-tests for @file:GalleryGrid.tsx
```

**Expected Result:** After running both prompts, verify that each generated test file follows the same prompt-file template. You should not need to retype any testing rules in chat. Confirm all of the following and report back in a tabular comparison format:

- Similar file layout (imports, setup/mocks, grouped test cases)
- Coverage of the same categories required by the prompt (rendering, interactions, edge cases)
- Consistent naming/assertion style across both files
- Reuse of the same conventions from `.github/prompts/generate-unit-tests.prompt.md` rather than ad-hoc formatting

### 2.3 Custom agents (local, role-based)

Custom agents define a purpose-driven role in your repo so your team does not repeat instructions each time.

Create agent definitions under `.github/agents/` with purpose, behavior, allowed tools, and output style. This is done using the Gear icon in Copilot Chat.

**Status in this repo:**

The following local custom agents are now available:

- `.github/agents/security-review.agent.md`
- `.github/agents/frontend-standards.agent.md`

**What to include in** `<purpose>.agent.md`**:**

- Role and scope
- Tool access boundaries
- Required checks
- Output format (summary, risks, fixes, next steps)

**What these two agents cover:**

- `security-review.agent.md`
- Role: security-focused reviewer for Next.js code changes
- Checks: auth/authz, data exposure, validation, XSS/CSRF, secrets, API route hardening
- Output: risk level, severity-based findings, recommended fixes, next steps
- `frontend-standards.agent.md`
- Role: frontend standards reviewer for Next.js + TypeScript + Tailwind
- Checks: App Router conventions, TS typing quality, component structure, accessibility, responsive design
- Output: compliance summary, standards violations, fixes, consistency improvements

**Quick exercise (local):**

1.  Open Copilot Chat.
2.  Open a target file (for example `src/components/gallery/GalleryGrid.tsx`).
3.  From the mode dropdown at the top of Copilot Chat, select the **security-review** agent. Then run:

```
Review the selected file and return summary, risks, fixes, and next steps.
```

1.  Switch the mode dropdown to the **frontend-standards** agent. Then run:

```
Review this component against project conventions and suggest fixes.
```

**Expected Result:** You get structured, role-specific output without restating review criteria every time.

---

### 2.4 Agent Skills

#### What skills are

Agent Skills let you teach Copilot a repeatable workflow once and reuse it when relevant.

A skill is a folder containing `SKILL.md` plus optional scripts/templates/resources.

#### Where to store skills

- Team scope: `.github/skills/`
- Personal scope: `~/.copilot/skills/`

#### Existing skill in this repo

- `ui-test-generation` in `.github/skills/ui-test-generation/SKILL.md`

#### How skills differ from prompts and agents

Unlike prompt files (manually invoked) and custom agents (explicitly selected), Agent Skills are **relevance-triggered.** Copilot applies the workflow automatically when your intent matches the skill description. No `/slash` command or `@agent` prefix needed.

#### How skills are discovered in VS Code

In VS Code Copilot Chat (Agent mode), skills in `.github/skills/` are picked up automatically from the workspace. Copilot scans the skill descriptions and triggers the matching one when your intent aligns - no invocation needed. To confirm a skill was used, check the **tool calls** shown inline in the chat response (the collapsible "Used X tool" steps).

#### Exercise: Use the existing skill

1.  Open `.github/skills/ui-test-generation/SKILL.md` and skim the workflow.
2.  Open a target component, for example `src/components/ui/cards/FeatureCard.tsx`.
3.  In Copilot Chat (change to Agent mode), run a prompt that triggers the skill. Ensure the run reads the ui-test-generation skill.

```
Add UI tests for FeatureCard and include a validation checklist.
```

**Note:** Use copilot to help with the below

1.  Confirm the response follows the skill workflow:
    - Tests are generated for the component
    - The checklist is included
    - References `.github/prompts/generate-unit-tests.prompt.md` if needed

**Expected Result:** The UI tests and checklist are produced without restating the workflow steps.

#### Exercise: Debug and Refine Skills

To verify a skill was applied and iterate on it:

1.  Open VS Code Copilot Chat in **Agent mode**.
2.  Run the same skill-triggering prompt: `Add UI tests for FeatureCard and include a validation checklist.`
3.  In the chat response, expand the collapsible **tool call steps** to inspect:
    - Which skill file was read
    - What steps the skill executed
    - Which files were accessed or created
4.  If the skill was **not triggered**, check:
    - Does the `SKILL.md` description match your intent?
    - Is the skill stored in `.github/skills/` (team scope)?
    - Are there other skills with overlapping descriptions?

Edit the `SKILL.md` description to be more specific, then re-run your prompt.

`Note: Try running Steps 3 and 4 through Copilot to see if the response matches your conclusion.`

**Expected Result:** You understand how to diagnose and improve custom skills using the debug output.

---

## 🔁 Step 3: Agent Mode - Add a "Featured" Badge End-to-End

**What you'll build:** A visible "Featured" badge on select gallery photos, implemented entirely by Copilot's Agent mode while you observe its plan → act → validate loop.

**End outcome:** When you open the gallery page, at least two photos display a "Featured" badge overlay. The mock data, component code, and build all reflect the change with zero manual edits.

### Background: How Agent mode works

Unlike Ask (read-only) or Edit (single-file diffs), Agent mode runs an autonomous loop:

1. **Plan** - reads files, gathers context, decides what to change.
2. **Act** - edits code, creates files, runs terminal commands.
3. **Validate** - runs the build or tests to check for errors.
4. **Iterate** - if something fails, it diagnoses and fixes automatically.

You'll see this loop in action during the exercise below.

### Exercise: Add a "Featured" badge with Agent mode

**Setup:**

1. Open `src/components/gallery/GalleryGrid.tsx` in the editor.
2. Open Copilot Chat and set the mode dropdown to **Agent**.

**Run the prompt:**

3. Paste the following prompt and send it:

```
Add a "Featured" badge to photos in the gallery grid. Specifically:
1. Add a `featured` boolean field (optional) to the Photo interface in src/lib/mock-photo-data.ts.
2. Set `featured: true` on at least 2 existing photos in the mock data array.
3. In GalleryGrid.tsx, render a small "Featured" badge (e.g. a yellow/amber overlay label) on photos where featured is true.
4. Run `npm run build` to verify there are no errors.
```

**While Copilot runs, watch the Todo's based tool-call steps in chat.** You will see it:

- Read `mock-photo-data.ts` and `GalleryGrid.tsx` (plan)
- Edit the `Photo` interface and mock data (act)
- Edit `GalleryGrid.tsx` to render the badge (act)
- Run `npm run build` in the terminal (validate)
- Fix any type or build errors if they occur (iterate)

### Verify the result

`Note: Try running below steps through Copilot to see if the response matches your conclusion.`

4. After Copilot finishes, confirm each change:

| What to check                                                   | Where to look                            | Pass? |
| --------------------------------------------------------------- | ---------------------------------------- | ----- |
| `Photo` interface now has `featured?: boolean`                  | `src/lib/mock-photo-data.ts` (top)       |       |
| At least 2 photos have `featured: true`                         | `src/lib/mock-photo-data.ts` (entries)   |       |
| A "Featured" badge renders conditionally on `featured === true` | `src/components/gallery/GalleryGrid.tsx` |       |
| Build passes with no errors                                     | Terminal output from `npm run build`     |       |

5. Run the dev server (`npm run dev`) and open the gallery page in your browser. You should see the badge on the featured photos.

### Reflect: What did Agent mode do differently?

Fill in from what you observed in the chat tool-call steps:

| Agent loop phase | What Copilot did                                          |
| ---------------- | --------------------------------------------------------- |
| **Plan**         | Which files did it read first?                            |
| **Act**          | How many files did it edit, and in what order?            |
| **Validate**     | Did it run a build or lint command?                       |
| **Iterate**      | Did it hit an error and self-correct? If so, what was it? |

**Key takeaway:** Agent mode handles multi-file, multi-step changes autonomously - you provide the goal, it figures out the plan and verifies the result.

---

## 🔌 Step 4: Model Context Protocol (MCP)

MCP is an open standard for structured context sharing between AI clients and external systems.

### Why MCP matters

- Avoids manually pasting large context into chat.
- Lets Copilot fetch live data when needed.
- Enables custom tool integrations for your internal systems.

### Setup: Configure the GitHub MCP server and Workspace Scoping

**Prerequisite: Push your project to GitHub.** The GitHub MCP server queries your remote repo, so the code must exist there first. Switch to **Agent** mode and run the following prompt (update the remote URL with your GitHub username):

```
Initialize a git repo if not already initialized, add all files, commit with the message "Initial commit", then add the remote origin https://github.com/<your-github-username>/ghcp-developer-lab.git and push to main.
```

> **Note:** Replace `<your-github-username>` with your actual GitHub username. You must create an empty repo named `ghcp-developer-lab` on GitHub first (no README, no .gitignore).

**Configure the MCP server:**

6.  Open (or create) `.vscode/mcp.json` in the workspace root.
7.  Add the following configuration:

```
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

8.  Save the file. VS Code will detect the MCP server automatically.
9.  Switch to **Agent** mode in Copilot Chat.
10. Check that MCP tools are available (look for the tools icon or tool list in the chat input area).

### Exercise: Use MCP tools in a prompt

1.  Switch to **Agent mode** in Copilot Chat.
2.  First, confirm MCP is connected and authenticated:

```
Using available tools, who am I authenticated as on GitHub?
```

Copilot should call a GitHub MCP tool and return your username. If it can't, recheck the `.vscode/mcp.json` config and ensure you are signed into GitHub in VS Code.

3.  Now query a real public repo to see MCP fetch live data. Since this project uses Next.js, use the framework's own repo as a meaningful reference:

```
Using available tools, list the 5 most recently opened issues in vercel/next.js that mention "App Router". Summarize each one in a sentence.
```

Observe how Copilot:

- Selects the right MCP tool (search or list issues)
- Makes a tool call and receives structured JSON
- Formats the result as a readable summary

**Expected Result:** Copilot returns live issue data from a public GitHub repo - no copy-paste, no manual browsing.

### Exercise: Combine MCP data with a specific file

You can attach a local file alongside an MCP prompt to ground live data in your actual codebase:

1.  Attach `src/components/gallery/GalleryGrid.tsx` using the paperclip / `#file`.
2.  Run the following prompt:

```
Using available tools, search GitHub for open issues or discussions in vercel/next.js related to client-side filtering or pagination performance.
Then review the attached file and suggest if any of those findings apply to it.
```

Observe how Copilot:

- Fetches live data from GitHub via MCP
- Uses the attached file as local context
- Cross-references both to produce actionable suggestions

**Expected Result:** Copilot merges live public data with your local code - demonstrating how MCP bridges external context into your workspace.

---

## ✅ Completion Checklist

Mark off each item as you complete it:

### Model & Premium Awareness

- Compared model outputs and noted premium usage patterns
- Understood model selection for different task types

### Custom Responses

- Added/validated repo custom instructions
- Used existing prompt files and created one new prompt file
- Explored Ask/Edit/Agent mode differences
- Defined at least one custom agent in `.github/agents/`
- Understood when to use instructions vs prompt files vs custom agents vs skills

### Agent Skills

- Reviewed Agent Skills structure and understood relevance-triggering
- Triggered the `ui-test-generation` skill and confirmed it was applied
- Verified skill execution via inline tool call steps in Agent mode
- Refined a skill description and re-ran to confirm the change

### MCP & Integration

- Connected/inspected MCP tools locally (GitHub server configured)
- Used MCP data combined with workspace context
- Attached a file alongside an MCP prompt to combine live data with local code

---

## 🚀 What's Next?

Congratulations! You've configured Copilot to match your workflow with custom instructions, prompt files, agents, skills, and MCP. Next, learn how to collaborate in dedicated Copilot Spaces.

👉 [**Start Copilot CLI Demo**](./copilot-cli.md)
