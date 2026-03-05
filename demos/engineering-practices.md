# Engineering Practices Demo

Welcome to the GitHub Copilot engineering practices demo! In this session, we go deeper into how Copilot actually works and how to use it strategically. You'll learn about data flows, context engineering, and prompt engineering—the three pillars of effective AI-assisted development.

## What You'll Learn

By the end of this demo, you will:

- [ ] Understand how Copilot processes requests from input to suggestion
- [ ] Know how semantic indexing enables meaning-based code search
- [ ] Master context engineering across Ask, Plan, and Agent modes
- [ ] Use content exclusions and .copilotignore effectively
- [ ] Apply advanced prompt engineering techniques (few-shot, chain of thought, RAG, step-back)
- [ ] Debug and inspect Copilot's decision-making process
- [ ] Share chat conversations with team members

**Estimated Time:** 25-30 minutes

## � Part 1: Understanding How Copilot Works

### 📊 Step 1: How GitHub Copilot Fulfills a Request

**Why this matters:** Understanding the complete data flow helps you write better prompts and trust AI recommendations.

#### The Request Journey

When you trigger Copilot, here's what happens behind the scenes:

1. **Context Assembly** - Copilot looks at open tabs, selected code, and workspace structure
2. **Secure Transmission** - Request goes through a proxy service
3. **Pre-Model Checks:**
   - Toxic/unsafe language filtering
   - Relevance testing (is it code-related?)
   - Prompt injection protection
4. **Model Processing** - LLM generates multiple possible responses, then discards the prompt
5. **Post-Model Filtering:**
   - Code quality checks
   - Security risk scanning
   - PII detection (emails, IPs)
   - Optional public code matching
6. **Delivery** - Suggestions appear in your editor for you to accept/reject

**💡 Key Insight:** Multiple safety and quality checks happen automatically before you see any suggestion.

#### Try It: Observe the Flow

**Prompt:**

```markdown
@workspace Explain the authentication flow in this repository. Walk me through each layer of security checks.
```

**What to notice:** Copilot assembles context from multiple files before answering.

---

### 🧠 Step 2: Semantic Indexing - Meaning Over Keywords

**Why this matters:** Copilot doesn't just match keywords—it understands _meaning_. This is why it finds relevant code even when you don't know exact names.

#### How Semantic Indexing Works

1. **Your Question** → Converted to an **embedding** (mathematical representation of meaning)
2. **Your Codebase** → Already processed into embeddings (functions, comments, files)
3. **Vector Similarity Search** → Compares question embedding to code embeddings
4. **Context Assembly** → Most relevant snippets gathered
5. **Response Generation** → LLM uses that context to answer

**Example:** Asking about "user authentication" will find code related to "login validation," "access control," or "session management" even without exact keyword matches.

#### Try It: Test Semantic Understanding

**Prompt 1:**

```markdown
@workspace How is user authentication handled in this repo?
```

**Prompt 2 (different wording, same meaning):**

```markdown
@workspace Where does login validation happen?
```

**Expected Result:** Both should surface similar authentication-related code, demonstrating semantic understanding.

---

## 🎯 Part 2: Context Engineering Mastery

### 📝 Step 3: Context Engineering Basics

**Core Principle:** Copilot is very good at gathering context automatically, but _you_ can deliberately shape that process for better results.

#### For Code Completions

**Context Sources:**

- Active file
- Nearby open tabs
- Related project files
- Repository structure

**Your Responsibility:**

- Use descriptive variable/function names
- Keep related files open
- Write meaningful comments
- Follow consistent patterns

#### Try It: Compare Weak vs. Strong Context

**Exercise A: Weak Context**

1. Close all tabs except one random file
2. Type a vague comment: `// add function`
3. Observe the generic suggestion

**Exercise B: Strong Context**

1. Open `src/app/layout.tsx` and `src/components/ui/layout/Hero.tsx`
2. Type a specific comment: `// Create a navigation component similar to Hero with logo and menu items`
3. Observe how Copilot uses patterns from open files

**💡 Pro Tip:** The clearer your code structure and context, the smarter Copilot becomes.

---

### 🎭 Step 4: Context Engineering Across Modes

Different Copilot Chat modes pull different context signals. Understanding this helps you choose the right mode.

#### Ask Mode (Quick Questions - Read-Only)

**Context Sources:**

- Selected code (highest priority)
- Surrounding files
- Chat history
- Semantic index
- Slash commands
- Custom instructions

**Best For:** Quick explanations, clarifications, refactoring suggestions

**Try It:**

```markdown
Select a complex function in src/lib/photo-helpers.ts, then ask:

/explain this function and suggest one improvement
```

#### Plan Mode (Strategic Thinking - Read-Only)

**Context Sources:**

- Custom instructions
- Workspace overview
- Step-by-step task breakdown
- Semantic index for deeper understanding

**Best For:** Thinking through complex changes before implementation

**Try It:**

```markdown
Create a detailed plan to add a "favorites" feature to the photo gallery. Include:

- Data model changes
- UI component updates
- State management approach
- Testing considerations

Break it into phases with risk assessment for each.
```

#### Agent Mode (Autonomous Execution)

**Context Sources:**

- Summarized workspace view
- Tool descriptions
- MCP servers (if connected)
- Custom instructions
- Goal and guardrails you provide

**Best For:** Multi-file changes, coordinated refactoring, implementing features

**Try It:**

```markdown
Add dark mode toggle functionality to the navigation. Update relevant components and ensure consistent theming across the app.
```

**💡 Common Theme:** Intentional context → Better outcomes, regardless of mode.

---

### 🎓 Step 5: Context Engineering Best Practices

#### Practice 1: Leverage Chat History

Chat history provides continuity. Build on previous conversations instead of starting fresh each time.

**Try It:**

```markdown
First prompt:
@workspace Review the photo upload flow in src/app/upload/page.tsx

Follow-up prompt (in same chat):
Now suggest error handling improvements based on what we just discussed.
```

#### Practice 2: Be Intentional About Scope

**Try It - Repository Scope:**

```markdown
@workspace What are the main architectural patterns used in this repository?
```

**Try It - File Scope:**

```markdown
In src/components/gallery/GalleryGrid.tsx, how can we optimize the filtering performance?
```

#### Practice 3: Use Custom Instructions

Custom instructions enforce standards and preferences automatically.

**Location in VS Code:**

- Open Settings (Ctrl+, or Cmd+,)
- Search for "Copilot: Instructions"
- Add repository-specific or personal guidelines

**Example Instructions:**

```
- Always use TypeScript with explicit types
- Prefer functional components with hooks
- Follow the Tailwind CSS patterns in this repo
- Include error handling in all async functions
```

---

### 🚫 Step 6: Content Exclusions with .copilotignore

**Why this matters:** Context engineering isn't just about _adding_ context—it's also about intentionally _removing_ sensitive, irrelevant, or noisy content.

#### What Gets Excluded

When you exclude content:

1. Code completions won't work in those files
2. Excluded files won't influence suggestions in other files
3. They won't inform Copilot Chat responses

#### Try It: Create a .copilotignore File

**Step 1: Ask Copilot to create it**

**Prompt:**

```markdown
Create a .copilotignore file that excludes:

- node_modules
- .next build outputs
- .env.local and other environment files
- test coverage reports
```

**Step 2: Save the file to your workspace root**

**Step 3: Validate it works**

**Test Prompts (should return appropriate boundaries):**

```markdown
Are there any files in node_modules?
→ Expected: Copilot should indicate content exclusion

What's in my .env.local file?
→ Expected: Copilot should not access it
```

**💡 Pro Tip:** Use exclusions for security, compliance, and focus—not just privacy.

---

### 📐 Step 7: The Context Gathering Formula

**The Formula:**

```
LLM Input = User Prompt + System Prompt + Context Gathered - Content Exclusions
```

Let's break it down:

1. **User Prompt** - What you type (be clear and specific)
2. **System Prompt** - Built-in behavior + custom instructions (`.copilot-instructions.md` in repo root)
3. **Context Gathered** - Selected code, open tabs, repo index, chat history, patterns
4. **Content Exclusions** - `.copilotignore`, settings, exclusion policies

**Try It: See the Formula in Action**

**Step 1: Create a .copilot-instructions.md file (if not exists)**

**Prompt:**

```markdown
Create a .copilot-instructions.md file for this repository that enforces:

- Use Next.js 15 App Router patterns
- All components must have TypeScript interfaces
- Follow the existing dark mode patterns
- Include JSDoc comments for complex functions
```

**Step 2: Save to workspace root**

**Step 3: Test it**

```markdown
Create a new PhotoCard component for displaying individual photos in the gallery.
```

**Expected Result:** Copilot should follow the patterns defined in your instructions.

---

## 🔧 Part 3: Debugging and Collaboration

### 🐛 Step 8: Inspect Copilot's Decision Process with Debug View

**Why this matters:** When suggestions seem unexpected, the debug view shows exactly what context Copilot used and how it reasoned.

#### Method 1: Using Keyboard Shortcut

1. Press `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (Mac)
2. Type "Copilot Chat Debug"
3. Select **"Copilot Chat Debug: Focus on Copilot Chat Debug View"**

#### Method 2: Using the Menu

1. Go to **View** → **Command Palette**
2. Type "Copilot Chat Debug"
3. Select **"Copilot Chat Debug: Focus on Copilot Chat Debug View"**

#### What You'll See in the Debug Panel

- **User Prompts:** The exact text you typed
- **System Prompts:** Background instructions sent to Copilot (including custom instructions)
- **Context:** What files, code snippets, and metadata were included
- **Metadata:** Token usage, model information, settings
- **Response Details:** How the model formulated its answer

**Try It: Trace a Request**

1. Open the Debug view
2. Ask Copilot:
   ```markdown
   @workspace How does pagination work in this repository?
   ```
3. In the debug panel, expand the request details
4. Observe what context was gathered and sent to the model

**💡 Pro Tip:** Use the debug view when suggestions seem off—you can see exactly what context was used and adjust your approach.

---

### 💬 Step 9: Share Chat Conversations with Your Team

**Why this matters:** Sharing successful prompts and conversations helps your team learn effective AI collaboration patterns and build institutional knowledge.

#### Export a Chat Conversation

**Method 1: Keyboard Shortcut**

1. Press `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (Mac)
2. Type "Chat: Export"
3. Select **"Chat: Export Chat..."**

**Method 2: Menu Navigation**

1. Go to **View** → **Command Palette**
2. Type "Chat: Export"
3. Select **"Chat: Export Chat..."**

**What happens:** Creates a file containing your entire chat history that you can share with teammates.

#### Import a Chat Conversation

**Method 1: Keyboard Shortcut**

1. Press `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (Mac)
2. Type "Chat: Import"
3. Select **"Chat: Import Chat..."**

**Method 2: Menu Navigation**

1. Go to **View** → **Command Palette**
2. Type "Chat: Import"
3. Select **"Chat: Import Chat..."**

**Use Case:** Import conversations shared by teammates to see their successful prompting strategies.

**🎯 Best Practices for Sharing:**

- Export conversations that solved complex problems
- Include context about when and why certain approaches worked
- Share examples of effective context engineering
- Document successful prompt patterns for your team

---

## 🎨 Part 4: Prompt Engineering Techniques

Now that you understand context engineering, let's level up with advanced prompting techniques. When combined with strong context, these dramatically improve response quality.

### 📚 Step 10: Prompt Engineering Techniques Overview

There are four core techniques that will transform how you interact with Copilot:

1. **Few-Shot Prompting** - Show examples of what you want
2. **Chain of Thought** - Ask for step-by-step reasoning
3. **Retrieval Augmented Generation (RAG)** - Ground responses in specific sources
4. **Step-Back Prompting** - Zoom out before diving in

Let's practice each one.

---

### 🎯 Step 11: Few-Shot Prompting (Learning by Example)

**Technique:** Give 2-3 examples of input → output to establish the pattern you want.

**Best For:** New patterns, domain-specific tasks, consistent formatting

#### Try It: Generate Data Transform Function

**Prompt:**

```markdown
Create a function to format photo metadata for display. Follow these examples:

Example 1:
Input: { date: "2024-03-15", size: 2048576, tags: ["landscape", "sunset"] }
Output: "March 15, 2024 • 2.0 MB • landscape, sunset"

Example 2:
Input: { date: "2024-01-08", size: 524288, tags: ["portrait"] }
Output: "January 8, 2024 • 512 KB • portrait"

Example 3:
Input: { date: "2024-12-25", size: 1048576, tags: ["holiday", "family", "indoor"] }
Output: "December 25, 2024 • 1.0 MB • holiday, family, indoor"

Now create the formatPhotoMetadata() function that follows this pattern.
```

**Expected Result:** A function that matches the exact format shown in examples.

**💡 Key Benefit:** Speed and clarity—you demonstrate the pattern instead of describing it.

---

### 🔗 Step 12: Chain of Thought (Step-by-Step Reasoning)

**Technique:** Ask Copilot to work through problems step by step for more reliable, logical answers.

**Best For:** Debugging, comparing approaches, complex decisions, multi-step logic

#### Try It: Debug a Performance Issue

**Prompt:**

```markdown
In src/components/gallery/GalleryGrid.tsx, the filtering feels slow when there are many photos.

Walk me through step by step:

1. Identify potential performance bottlenecks
2. Explain why each one impacts performance
3. Rank solutions by impact vs. effort
4. Recommend the best first step

Show your reasoning at each step.
```

**Expected Result:** A structured analysis with clear reasoning at each stage.

#### Try It: Compare Architecture Approaches

**Prompt:**

```markdown
We need to add a "favorites" feature. Walk me through step by step:

1. Compare these approaches:
   - Local storage only
   - Context API + local storage
   - Server state with backend API

2. For each approach, analyze:
   - Data persistence
   - Performance
   - Complexity
   - Scalability

3. Make a recommendation with reasoning
```

**💡 Key Benefit:** More thoughtful, accurate responses that you can validate and trust.

---

### 📖 Step 13: Retrieval Augmented Generation (RAG)

**Technique:** Ground the model in real, relevant information from external sources before it answers.

**How It Works:** Retrieve relevant content → Include in context → Generate response

**Best For:** Accuracy-critical tasks, knowledge-heavy work, company-specific information

#### Understanding RAG in Copilot

RAG happens automatically when you:

- Use `@workspace` to reference the indexed repository
- Reference specific files or code snippets
- Connect to MCP servers for external data sources

#### Try It: Reference-Grounded Code Generation

**Prompt:**

```markdown
@workspace Based on the patterns used in src/components/ui/cards/FeatureCard.tsx and src/components/gallery/GalleryGrid.tsx, create a new PhotoCard component that:

- Uses the same Tailwind styling patterns
- Follows the dark mode implementation approach
- Matches the prop interface style
- Includes similar TypeScript typing

Pull implementation details directly from those files.
```

**Expected Result:** Code that closely matches your existing patterns because it retrieved and used them as reference.

#### Try It: MCP-Style RAG Prompt (Conceptual)

**Prompt:**

```markdown
Using the component patterns documented in COMPONENT_USAGE_GUIDE.md and the mock data structure in src/lib/mock-photo-data.ts, create a photo carousel component that matches our established conventions.
```

**💡 Key Benefit:** Responses grounded in real information from your codebase or connected knowledge sources.

---

### 🎪 Step 14: Step-Back Prompting (Zoom Out, Then Dive In)

**Technique:** Ask a higher-level question about principles or context _before_ solving the specific problem.

**Best For:** Complex analysis, architectural decisions, tricky problems where understanding the bigger picture improves the solution

#### Try It: Refactor with Principle-First Approach

**Step 1: Zoom Out**

**Prompt:**

```markdown
Before we refactor the file upload logic, explain the key principles we should follow for:

- Secure file uploads in a Next.js application
- Error handling and user feedback
- Progress tracking and cancellation
- File validation and size limits

Focus on best practices and security considerations.
```

**Step 2: Apply to Specific Code**

**Prompt:**

```markdown
Now, using those principles, review src/components/upload/UploadZone.tsx and suggest specific improvements. Prioritize security and user experience.
```

**Expected Result:** More thoughtful refactoring because the model reasoned about principles first.

#### Try It: Architecture Decision

**Step 1: Establish Context**

**Prompt:**

```markdown
What are the trade-offs between client-side state management approaches for a photo gallery with filtering, pagination, and search? Consider:

- React Context
- Zustand
- Local component state with URL params
- Server state libraries (TanStack Query)

Explain the architectural implications of each.
```

**Step 2: Make Specific Recommendation**

**Prompt:**

```markdown
Given our current Next.js 15 App Router setup and the need to add favorites + collections features, which approach should we use? Provide implementation guidance.
```

**💡 Key Benefit:** Better decisions because you engaged the model's understanding of broader concepts before specific implementation.

---

## ✅ Completion Checklist

Mark off each item as you complete it:

### Understanding Copilot Internals

- [ ] Understand the request flow from input to suggestion
- [ ] Know how semantic indexing works with embeddings
- [ ] Can explain the context gathering formula

### Context Engineering

- [ ] Practiced context engineering basics (strong vs. weak context)
- [ ] Used Ask, Plan, and Agent modes with appropriate context
- [ ] Applied context engineering best practices (chat history, scope, custom instructions)
- [ ] Created and tested a .copilotignore file
- [ ] Created a .copilot-instructions.md file for repo-level guidance

### Debugging & Collaboration

- [ ] Used the Copilot Chat Debug view to inspect requests
- [ ] Exported a chat conversation
- [ ] Imported a chat conversation

### Prompt Engineering Techniques

- [ ] Applied few-shot prompting with examples
- [ ] Used chain of thought for step-by-step reasoning
- [ ] Practiced RAG by referencing specific files
- [ ] Applied step-back prompting for architectural decisions

## 🎓 Key Takeaways

1. **Data Flow Awareness** - Multiple safety checks happen before suggestions reach you
2. **Semantic Understanding** - Copilot searches by meaning, not just keywords
3. **Context is King** - The quality of context directly impacts the quality of responses
4. **Mode Selection Matters** - Use Ask for quick help, Plan for strategy, Agent for execution
5. **Engineering Context** - You're not just writing prompts, you're architecting context
6. **Debug When Needed** - Use the debug view to understand unexpected results
7. **Prompt Strategically** - Combine few-shot, chain of thought, RAG, and step-back for powerful results

## 🚀 What's Next?

Congratulations! You've mastered the engineering foundations of GitHub Copilot. You now understand how to deliberately shape context and craft strategic prompts.

👉 **[Start Customize Copilot Demo](./customize-copilot.md)**
