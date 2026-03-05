# Customize Copilot Demo

At this point, you've explored features, data flow, context engineering, and prompt engineering. Now the focus shifts to customization.

**Goal:** Reduce repetition, avoid restating context, and get better results by configuring Copilot to match your workflow and standards.

## What You'll Learn

By the end of this demo, you will:

- Understand model switching and premium request usage in local Copilot workflows
- Use custom instructions, prompt files, and chat modes in VS Code
- Create role-based custom agents for repeatable tasks
- Understand Agent Skills and when to use them
- Understand MCP and how to configure it locally
- Know when to use each customization type (instructions vs prompt files vs agents)

**Estimated Time:** 30-35 minutes

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

Run the same prompt with 2-3 models and compare output quality, speed, and depth.

**Context files:**

```
- /src/app/gallery/page.tsx
- /src/lib/mock-photo-data.ts
- /src/components/gallery/GalleryGrid.tsx
```

**Prompt:**

```
Refactor this selected function for better performance and readability, and improve the TypeScript types.
Keep behavior unchanged.
```

**Discussion:**

- Which model gave the best balance of accuracy and speed?
- Which model was most concise vs most detailed?
- Which one aligned best with project conventions?

---

## 🧩 Step 2: Custom Responses (Instructions + Prompt Files + Custom Agents)

Copilot can adapt to your team workflow without repeating context every time.

### 2.1 Custom instructions (`.copilot-instructions.md`)

Custom instructions are always-on repo guidance that shape all chat responses.

**Technique guidelines:**

- Keep rules short and clear.
- Focus on repo-specific standards.
- Include architecture, libraries, testing, and security expectations.

**Seed instruction block (use in this repo):**

```
Modify UI

- Use Next.js App Router pages under app.
- TypeScript only; no any without a comment explaining why.
- Use Tailwind utilities; avoid custom CSS unless the class is reused 3+ times.
- Prefer src/components/ui/layout/\* and SectionContainer + SectionTitle for page structure.
- Mock data lives in src/lib/mock-\*.ts.
```

**Exercise:**

1.  Create/update `.copilot-instructions.md` with the block above.
2.  Ask Copilot to generate a small UI component.
3.  Verify that responses follow these rules automatically.

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
/generate-unit-tests for FeatureCard
```

1.  Review the generated tests and verify they follow the rules defined in the prompt file.
2.  Try it again with a different component to confirm reusability:

```
/generate-unit-tests for GalleryGrid
```

**Expected Result:** Both invocations should produce tests that follow the same structure, coverage rules, and style guidelines without restating any of the requirements.

### 2.3 Custom agents (local, role-based)

Custom agents define a purpose-driven role in your repo so your team does not repeat instructions each time.

Create agent definitions under `.github/agents/` with purpose, behavior, allowed tools, and output style.

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

1.  Open Copilot Chat and switch to Agent mode.
2.  Open a target file (for example `src/components/gallery/GalleryGrid.tsx`).
3.  Run one of the following prompts:

```
Use @security-review to review the selected file and return summary, risks, fixes, and next steps.
```

```
Use @frontend-standards to review this component against project conventions and suggest fixes.
```

**Expected Result:** You get structured, role-specific output without restating review criteria every time.

---

## 🧭 Step 3: Use Chat Modes Intentionally

1.  Review `.github/chatmodes/Plan.chatmode.md`.
2.  In Copilot Chat, switch to **Plan** mode.
3.  Run:

```
Help me plan a new page for creating galleries.
Include component structure, data flow, validations, and testing plan.
```

1.  Compare with Ask/Agent mode for the same task.

**Key idea:** mode selection changes how Copilot reasons and executes.

---

## 🧠 Step 4: When to Use What (Decision Guide)

**Rule of thumb:**

- Standards for consistency → custom instructions
- Reusable tasks for consistency → prompt files
- Role-driven workflows for customization → custom agents

See the [Customization Comparison](#-customization-comparison) table at the end of this demo for a full side-by-side reference including Agent Skills and MCP.

---

## ⚙️ Step 5: Agent Skills

### What skills are

Agent Skills let you teach Copilot a repeatable workflow once and reuse it when relevant.

A skill is a folder containing `SKILL.md` plus optional scripts/templates/resources.

### Where to store skills

- Team scope: `.github/skills/`
- Personal scope: `~/.copilot/skills/`

### Existing skill in this repo

- `ui-test-generation` in `.github/skills/ui-test-generation/SKILL.md`

### How skills differ from prompts and agents

Unlike prompt files (manually invoked) and custom agents (explicitly selected), Agent Skills are **relevance-triggered** — Copilot applies the workflow automatically when your intent matches the skill description. No `/slash` command or `@agent` prefix needed.

### Exercise: Use the existing skill

1.  Open `.github/skills/ui-test-generation/SKILL.md` and skim the workflow.
2.  Open a target component, for example `src/components/ui/cards/FeatureCard.tsx`.
3.  In Copilot Chat (Agent or Ask mode), run a prompt that triggers the skill:

```
Add UI tests for FeatureCard and include a validation checklist.
```

1.  Confirm the response follows the skill workflow:
    - Tests are generated for the component
    - The checklist is included
    - References `.github/prompts/generate-unit-tests.prompt.md` if needed

**Expected Result:** The UI tests and checklist are produced without restating the workflow steps.

---

## 🔁 Step 6: Agent Mode Architecture (Behind the Scenes)

Agent mode runs a plan-act-validate loop:

1.  You provide a goal prompt.
2.  Copilot gathers workspace + environment + tool context.
3.  Model proposes a plan and selects tools.
4.  Copilot performs actions (read/edit/run).
5.  Results are validated (build/test/errors).
6.  If needed, it iterates until task completion.

**Key idea:** continuous iteration with guarded tool access until a working outcome is reached.

### Exercise: Observe the plan-act-validate loop

1.  Switch to **Agent** mode in Copilot Chat.
2.  Run the following prompt:

```
Add a "Featured" badge to photos in the gallery grid where `featured` is true.
Update the mock data so at least two photos are featured.
Run the build to verify there are no errors.
```

Watch the iteration steps Copilot takes and note:

- Which files it reads first (context gathering)
- What edits it proposes (action)
- Whether it runs a build or lint check (validation)
- If it self-corrects after an error (iteration)

After completion, review the changes and confirm:

- Mock data in `src/lib/mock-photo-data.ts` has featured entries
- `GalleryGrid.tsx` renders the badge conditionally
- The build passes without errors

**Expected Result:** You see Copilot loop through multiple steps (read → edit → validate → fix) until the feature works end-to-end.

---

## 🔌 Step 7: Model Context Protocol (MCP)

MCP is an open standard for structured context sharing between AI clients and external systems.

### Why MCP matters

- Avoids manually pasting large context into chat.
- Lets Copilot fetch live data when needed.
- Enables custom tool integrations for your internal systems.

### Setup: Configure the GitHub MCP server

1.  Open (or create) `.vscode/mcp.json` in the workspace root.
2.  Add the following configuration:

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

1.  Save the file. VS Code will detect the MCP server automatically.
2.  Switch to **Agent** mode in Copilot Chat.
3.  Check that MCP tools are available (look for the tools icon or tool list in the chat input area).

### Exercise: Use MCP tools in a prompt

1.  In Agent mode, run the following prompt to use a GitHub MCP tool:

```
Using available tools, list the open issues in this repository and summarize them.
```

Observe how Copilot:

- Discovers available MCP tools from the configured server
- Selects the appropriate tool (for example, list issues)
- Makes a tool call and receives structured data
- Summarizes the result in the chat response

Try a second prompt that combines MCP data with workspace context:

```
Using available tools, find the most recent pull request and explain how its changes relate to the gallery page code in this repo.
```

**Expected Result:** Copilot fetches live data from GitHub via MCP tools and combines it with local workspace context to produce a meaningful answer — without you pasting any external data manually.

---

## ✅ Completion Checklist

Mark off each item as you complete it:

- Compared model outputs and noted premium usage patterns
- Added/validated repo custom instructions
- Used existing prompt files and created one new prompt file
- Explored Plan/Ask/Agent mode differences
- Defined at least one custom agent in `.github/agents/`
- Understood when to use instructions vs prompt files vs custom agents
- Reviewed Agent Skills structure and authored one skill outline
- Connected or inspected MCP tools locally
