---
on:
  schedule: daily on weekdays

permissions:
  contents: read
  issues: read
  pull-requests: read

tools:
  github:
    toolsets: [default]

safe-outputs:
  create-issue:
    max: 1
---

# Daily Activity Report

Generate a concise daily summary of recent repository activity and create a GitHub issue with the findings.

## Task

Review the repository activity from the **past 24 hours** and produce a clear, human-readable report. The report should help the team quickly understand what happened yesterday and what needs attention today.

## Steps

1. **Gather New Issues** — Search for issues opened in the past 24 hours. For each issue, note the title, issue number, author, and any labels.

2. **Gather Merged Pull Requests** — Search for pull requests merged in the past 24 hours. For each PR, note the title, PR number, author, and the branch it was merged into.

3. **Identify Open Blockers** — Search for open issues or open pull requests that are labeled `blocked`, `blocker`, or `help wanted`. List each one with its title, number, author, and how long it has been open.

4. **Compose the Report** — Write a clear Markdown report following the format below.

5. **Create a GitHub Issue** — Create a new issue in this repository titled `Daily Activity Report — {TODAY'S DATE}` using the report as the issue body. Add the label `daily-report` if it exists; otherwise skip the label.

## Report Format

Use this structure for the issue body:

```
## 📋 Daily Activity Report — {TODAY'S DATE}

### 🆕 New Issues ({COUNT})
<!-- List each new issue as a bullet. If none, write "No new issues today." -->
- #{NUMBER} — {TITLE} (opened by @{AUTHOR}, labels: {LABELS})

### ✅ Merged Pull Requests ({COUNT})
<!-- List each merged PR as a bullet. If none, write "No pull requests merged today." -->
- #{NUMBER} — {TITLE} (merged by @{MERGER}, into `{BASE_BRANCH}`)

### 🚧 Open Blockers ({COUNT})
<!-- List each open blocker as a bullet. If none, write "No open blockers. 🎉" -->
- #{NUMBER} — {TITLE} (@{AUTHOR}, open for {DAYS} days)

---
*Report generated automatically. Human team members are behind every action — automation is a productivity tool used by the team.*
```

## Important Notes

- Attribute bot-triggered activity by checking the PR/issue merger, reviewer, or assignee fields: if the author is a bot (e.g. `dependabot[bot]`, `github-actions[bot]`, `Copilot`), credit the human who merged or approved it instead (use the `merged_by` field on PRs, or the last human reviewer/assignee on issues).
- If a section has no items, explicitly state that (e.g. "No new issues today.") rather than leaving it empty.
- Keep the tone neutral and informative — this report is for the engineering team.
- Use precise GitHub issue/PR search filters (`created:>=YESTERDAY`, `merged:>=YESTERDAY`, `state:open label:blocked`, etc.) to scope results to the correct time window.
