# GitHub Copilot Spaces Demo

Welcome to the GitHub Copilot Spaces demo! In this exercise, you'll learn how to create and utilize GitHub Copilot Spaces to collaborate on development tasks within the Photo Gallery & Portfolio application.

## Table of Contents

- [What You'll Learn](#what-youll-learn)
- [🚀 Step 1: Commit and Push Your Code to GitHub](#step-1-commit-and-push-your-code-to-github)
- [🎯 Step 2: Create Your First Copilot Space](#step-2-create-your-first-copilot-space)
  - [Setup](#setup)
  - [Group A Option: Security Analysis & Hardening](#group-a-option-security-analysis--hardening)
  - [Group B Option: Documentation Generation & API Design](#group-b-option-documentation-generation--api-design)
  - [Share your Space (Optional)](#share-your-space-optional)
- [🤝 Step 3: Collaborate and Share](#step-3-collaborate-and-share)
  - [Group A Option](#group-a-option-1)
  - [Group B Option](#group-b-option-1)
  - [Final Discussion](#final-discussion)
- [💡 Advanced: Space Evolution Over Time](#advanced-space-evolution-over-time)
- [✅ Completion Checklist](#completion-checklist)
- [🚀 What's Next?](#whats-next)

---

## What You'll Learn

By the end of this demo, you will:

- Understand what GitHub Copilot Spaces are and their benefits
- Know how to create a new Copilot Space with modern context management
- Be able to set up a Space with specific goals, context, and MCP integrations
- Complete development tasks using collaborative AI assistance
- Share and manage Spaces with team members and monitor execution with Agent Debug Panel
- Combine Copilot Spaces with Agents app for parallel team workflows (NEW - April 2026)
- Use terminal tools and MCP within Spaces for automated actions

**Estimated Time:** 25-30 minutes

## 🚀 Step 1: Commit and Push Your Code to GitHub

Before using Copilot Spaces with your repository, your latest local changes need to be available on GitHub.

**Exercise:**

1.  Open the **Source Control** panel in VS Code (`Ctrl+Shift+G`).
2.  Review the list of changed files. Stage all changes by clicking the **+** icon next to **Changes**, or run:

```
git add .
```

1.  Enter a commit message (e.g., `Initial setup for Copilot Spaces lab`) and commit:

```
git commit -m "Initial setup for Copilot Spaces lab"
```

1.  Push your branch to GitHub:

```
git push origin HEAD
```

1.  Verify the push by opening your repository on GitHub and confirming your latest commit appears.

**💡 Pro Tip:** If you haven't set the upstream branch yet, use `git push -u origin <branch-name>` on the first push.

**Alternative: Use Agent Mode with GitHub MCP**

Instead of running manual git commands, you can ask Copilot in **Agent** mode to handle the commit and push for you. Make sure the GitHub MCP server is configured in `.vscode/mcp.json`, then run:

```
Commit all current changes with the message "Initial setup for Copilot Spaces lab" and push to the remote repository.
```

Copilot will stage, commit, and push your changes using the available terminal and MCP tools.

---

## 🎯 Step 2: Create Your First Copilot Space

**Goal:** Set up a dedicated Copilot Space for working on gallery features.

### Setup

1.  Go to `https://github.com/copilot/spaces`
2.  Select `Create Space`

### 💡 Pro Tip: Using Copilot Spaces with Agents App (v1.115+ Feature - Optional Workflow)

**For advanced team workflows**, you can combine Copilot Spaces with the Agents app:

1. **Create a Copilot Space** to define shared context, instructions, and goals for your team
2. **Share the Space link** with team members
3. **Each team member can open the Agents app** and run the task in an **isolated worktree**
4. **Parallel execution**: Multiple team members run the same Space task simultaneously without stepping on each other's code
5. **Review and merge**: Each person reviews their agent's changes, creates a PR, and merges individually

**Example workflow:**
- Space: "Implement Password Reset Feature"  
- Team: 5 developers  
- Execution: Each developer runs the agent in the Agents app with the Space as context → 5 isolated worktrees  
- Outcome: 5 pull requests with the same security and style standards from the Space instructions

This approach combines the **shared context benefits of Spaces** with the **parallel execution power of Agents app**.

---

### Group A Option: Security Analysis & Hardening

1.  Type in name `Photo Gallery - Security Assessment`
2.  Select the owner `Username` OR `OrgName`
3.  Add in description `Implement security best practices for the photo gallery application`
4.  Select `Save`

**Adding instructions**

1.  Select `Instructions` and add the following prompt:

```
You are a security expert helping to analyze and improve the security posture of a Next.js 15 photo gallery application. Focus on:

- File upload security vulnerabilities and mitigations
- Input validation and sanitization
- Authentication and authorization patterns
- XSS prevention in user-generated content
- Secure image processing and storage
- OWASP Top 10 web application security risks
- Next.js specific security best practices

Provide specific code examples and security recommendations that follow industry standards and OWASP guidelines. Consider both client-side and server-side security measures.
```

1.  Select save

**Adding sources**

1.  Select `Add sources` and select `Add files and repositories`
2.  Add the following files and press `save`

```
src/components/upload/UploadZone.tsx
src/lib/mock-photo-data.ts
src/app/layout.tsx
next.config.ts
```

1.  Select `Add sources` and select `Add text content`
2.  Add the following content. Use title `OWASP Top 10 2021 - Key Security Risks for Web Applications` and press `save`

```
1. **A01 Broken Access Control** - Users can act outside of their intended permissions
2. **A02 Cryptographic Failures** - Failures related to cryptography which often leads to sensitive data exposure
3. **A03 Injection** - User-supplied data is not validated, filtered, or sanitized by the application
4. **A04 Insecure Design** - Risks related to design and architectural flaws
5. **A05 Security Misconfiguration** - Missing appropriate security hardening across any part of the application stack
6. **A06 Vulnerable and Outdated Components** - Using components with known vulnerabilities
7. **A07 Identification and Authentication Failures** - Confirmation of the user's identity, authentication, and session management
8. **A08 Software and Data Integrity Failures** - Code and infrastructure that does not protect against integrity violations
9. **A09 Security Logging and Monitoring Failures** - Failures in logging and monitoring coupled with missing or ineffective integration with incident response
10. **A10 Server-Side Request Forgery** - SSRF flaws occur whenever a web application is fetching a remote resource without validating the user-supplied URL

## Next.js Security Headers

- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

## File Upload Security Considerations

- File type validation
- File size limits
- Malware scanning
- Secure file storage
- Image processing vulnerabilities
```

**Outcome:** You now have a fully configured Copilot Space with security-focused instructions, relevant project source files, and OWASP reference material loaded as context. This Space is ready to use in Step 3, where you'll ask it to perform a security analysis of the photo gallery application.

### Group B Option: Documentation Generation & API Design

> Follow the same [Setup](#setup) steps above to create a new Space, then continue below.

1.  Type in name `Photo Gallery - Documentation Hub`
2.  Select the owner `Username` OR `OrgName`
3.  Add in description `Create comprehensive documentation and API design documentation for the photo gallery application`
4.  Select `Save`

**Adding instructions**

1.  Select `Instructions` and add the following prompt:

```
You are a technical documentation specialist helping to create comprehensive documentation for a Next.js 15 photo gallery application. Focus on:

- API documentation using OpenAPI/Swagger specifications
- Component documentation with usage examples
- Architecture decision records (ADRs)
- User guides and installation instructions
- Code documentation and inline comments
- README improvements and contribution guidelines
- Performance optimization documentation

Follow industry best practices for technical writing, API documentation standards (OpenAPI 3.0), and modern documentation tools. Create clear, actionable documentation that serves both developers and end users.
```

1.  Select save

**Adding sources**

1.  Select `Add sources` and select `Add files and repositories`
2.  Add the following files and press `save`

```
README.md
src/components/ui/index.ts
src/app/page.tsx
package.json
```

1.  Select `Add sources` and select `Add text content`
2.  Add the following content. Use name `Documentation Standards` and press `save`

```
## API Documentation

- OpenAPI 3.0 specification with complete schemas
- Clear endpoint naming and HTTP status codes
- Request/response examples and error handling
- Authentication and rate limiting documentation

## Code Documentation

- Function/method purpose and parameters
- Usage examples and dependencies
- Error conditions and return values
- Performance considerations

## Architecture Documentation

- Decision records (ADRs) with context and rationale
- System design and component relationships
- Deployment and configuration guides
- Troubleshooting and maintenance procedures

## Tools & Formats

- **API Docs**: Swagger UI, Postman, Insomnia
- **Code Docs**: JSDoc, TypeDoc, inline comments
- **Wikis**: GitHub Wiki, Notion, Confluence
- **Static Sites**: Docusaurus, GitBook, MkDocs
```

**Expected Outcome:** Your Space now has documentation instructions, source files, standards, AND optional live GitHub MCP tools to analyze existing docs and suggest improvements.

**Outcome:** You now have a fully configured Copilot Space with documentation-focused instructions, relevant project source files, and documentation standards loaded as context. This Space is ready to use in Step 3, where you'll ask it to generate API specs, component docs, and architecture decision records for the photo gallery application.

### Share your Space \[OPTIONAL\]

**This option is ONLY if you made the Owner an organization**

1.  Select `Share` on the top right side
2.  Update `No Access` to `Viewer`
3.  Copy the link and send to the Option B Group.

**Expected Result:** A new Copilot Space will be created and opened, providing you with a dedicated environment for this development session.

## 🤝 Step 3: Collaborate and Share

**Goal:** Use the Copilot Space you created in Step 2 to complete the task listed below.

**Challenge:** If your group created the Space in an organization, switch Copilot Spaces to try out the other group's Space! I.e, if you chose **Group B** in Step 2, try the **Group A** Space this time and vice versa.

### Group A Option

1.  Go to `https://github.com/copilot/spaces` and open the **Photo Gallery - Security Assessment** Space
2.  Type in the following prompt to analyze security vulnerabilities:

```
I need help identifying and fixing security vulnerabilities in our photo gallery application. Please analyze our file upload component and suggest:

1. How to validate file types securely (not just by extension)
2. Protection against malicious file uploads and XSS attacks
3. Proper input sanitization for photo titles and tags
4. Content Security Policy (CSP) headers for Next.js
5. Rate limiting strategies for upload endpoints

Based on the OWASP Top 10 guidelines, what are the most critical security issues I should address first in this photo gallery application?
```

1.  Ask another question! What else do you want to learn?

### Group B Option

1.  Go to `https://github.com/copilot/spaces` and open the **Photo Gallery - Documentation Hub** Space
2.  Type in the following prompt to create comprehensive documentation:

```
I need to create professional documentation for our photo gallery application. Please help me:

1. Generate an OpenAPI 3.0 specification for our photo management API endpoints
2. Create detailed component documentation with usage examples for our UI components
3. Write an Architecture Decision Record (ADR) for choosing Next.js 15 with TypeScript
4. Improve our README with installation, development, and deployment instructions
5. Create a contributing guide for other developers

Following industry best practices, what documentation structure would you recommend for this type of application?
```

1.  Ask another question! What else do you want to learn?

### Monitoring Space Execution with Agent Debug Panel (v1.115+ Feature)

**If you're using the Agents app to run your Space task in parallel:**

1. While your agent is running, open **Agent Debug Panel** (`Ctrl+Shift+P` → "Debug: Show Panel")
2. Monitor the agent's execution in real-time:
   - **Context Gathering** - See which Space files and sources were loaded
   - **Tool Calls** - Watch browser/terminal tools execute (e.g., npm install, security scans)
   - **MCP Requests** - If enabled, see live GitHub MCP tool calls
   - **Reasoning Steps** - Understand how the agent interpreted your Space instructions
3. After completion, review the changes. Note where the agent followed versus deviated from Space instructions
4. If needed, refine the Space instructions and re-run in a new agent session

**Why this matters:** You get full visibility into how well your Space context is guiding the agent's work across your team.

---

### Final Discussion

**How were you able to collaborate with your team using Copilot Spaces?**

- Shared a single Space with the team so everyone had the same context, instructions, and source files — no need to repeat setup or re-explain the codebase.
- Could hand off the Space link and a teammate could immediately continue the conversation with full context.
- The Space acted as a shared knowledge base, keeping security findings or documentation decisions in one place.
- **(NEW)** With the Agents app, multiple team members can run the same Space task in parallel, each in an isolated worktree, without context pollution or merge conflicts during execution.

**How did Copilot's suggestions help (or hinder) your collaboration?**

- ✅ Copilot gave consistent, context-aware answers because the instructions and source files were pre-loaded — everyone got responses aligned with the same security/documentation standards.
- ✅ It accelerated repetitive tasks like generating boilerplate docs, listing OWASP risks, or drafting CSP headers.
- ✅ **(NEW in v1.115+)** With Agent Debug Panel, you can inspect exactly which Space sources and instructions the agent used, making it easier to refine Spaces for better results.
- ❌ Copilot may have generated overly generic recommendations when the source files didn't provide enough detail about the actual implementation (e.g., no real API routes exist yet).
- ❌ **(NEW)** If multiple agents ran the same task simultaneously, coordination needed to avoid duplicate work (e.g., both agents writing the same security header logic).

**What would you do differently next time to improve teamwork and productivity?**

- Add more source files upfront (e.g., all component files, config files) so Copilot has a fuller picture of the codebase.
- Write more specific instructions to narrow Copilot's focus to the exact task at hand instead of broad topics.
- Split large tasks into separate Spaces (e.g., one for upload security, one for auth) rather than covering everything in a single Space.
- **(NEW)** If running the same Space task with multiple agents:
  - Assign different aspects to different agents (e.g., "Agent 1: analyze upload security, Agent 2: analyze authentication")
  - Use the Agent Debug Panel to monitor parallel execution and coordinate hand-offs
  - Define clear ownership in Space instructions to avoid duplicate work
- **(OPTIONAL)** Add MCP tools to your Space so agents can query live GitHub data (issues, PRs, dependencies) for more accurate recommendations

Share your thoughts and any tips you discovered for making the most of Copilot Spaces in a team setting.

---

## 💡 Advanced: Space Evolution Over Time

**What if your Space grows beyond a single session?**

Later in your project, you can:
1. **Update Space instructions** as you learn what works → agents get smarter
2. **Archive old Spaces** that are no longer relevant → keep your Space list focused
3. **Clone a Space** to experiment with new instructions without disrupting the original
4. **Link multiple Spaces** (security → documentation → deployment) to create a workflow pipeline

Example pipeline:
```
Security Assessment Space
↓ (findings feed into)
Architecture Space  
↓ (designs feed into)
Documentation Space
↓ (outputs feed into)
Deployment Space
```

---

## ✅ Completion Checklist

Mark off each item as you complete it:

### Core Space Creation
- Committed and pushed local changes to GitHub
- Created a new GitHub Copilot Space with a clear security or documentation focus
- Set detailed instructions incorporating industry standards
- Added relevant project files to the Space context
- Used the Space to analyze existing code structure

### Advanced Features (April 2026)
- Added MCP tools to your Space for live GitHub data access (optional)
- Understood how to combine Spaces with Agents app for parallel team workflows
- Used Agent Debug Panel to monitor agent execution against Space instructions
- Observed how Space sources and instructions guided agent reasoning

### Collaboration & Iteration
- Documented progress and decisions within the Space
- Shared or saved the Space for future collaboration
- Discussed team workflow improvements based on Space execution
- Planned how to evolve your Space over time as the project grows

## 🚀 What's Next?

Congratulations! You've successfully created and used a GitHub Copilot Space for focused development work.

👉 [**Start GitHub Copilot Coding Agent Demo**](./coding-agent.md)
