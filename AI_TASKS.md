# AI Tasks Guide

This document defines how AI coding agents should approach development tasks in this repository.

The goal is to ensure predictable, safe, and incremental changes.

---

# Task Execution Model

When implementing a task, follow this workflow:

1. Understand the problem
2. Analyze the repository
3. Identify relevant files
4. Propose a short implementation plan
5. Wait for confirmation if the change is large
6. Implement the change in small steps
7. Verify the result

Do not skip steps.

---

# Task Types

AI agents should categorize tasks before implementing them.

Common task types:

### Feature implementation

Example:

Add search functionality  
Add pagination  
Add new UI component

Expected workflow:

1. Identify affected areas
2. Design minimal implementation
3. Implement feature
4. Verify behavior

---

### Bug fixing

Example:

Hydration mismatch  
Runtime error  
Broken API request

Expected workflow:

1. Identify root cause
2. Locate relevant files
3. Apply minimal fix
4. Verify fix

---

### Refactoring

Example:

Improve code readability  
Extract reusable utility  
Simplify logic

Rules:

- Avoid changing behavior
- Keep diffs small
- Do not refactor unrelated code

---

### Performance improvements

Example:

Reduce bundle size  
Optimize rendering  
Improve API usage

Rules:

- Measure impact when possible
- Avoid speculative optimization

---

# Task Size Rules

Tasks should remain small and manageable.

Guidelines:

Small task  
1–3 files changed

Medium task  
3–5 files changed

Large task  
More than 5 files changed

If a change affects more than 5 files:

Stop and ask for confirmation.

---

# Editing Strategy

Always:

- modify the smallest number of files possible
- reuse existing utilities
- follow existing patterns

Avoid:

- introducing new architecture
- adding unnecessary dependencies
- modifying unrelated files

---

# Safe Development Workflow

Before editing code:

1. Read the following files if available:

AI_ONBOARDING.md  
AI_CONTEXT.md  
PROJECT_MAP.md  
AGENTS.md

2. Understand project structure

3. Identify entry points and dependencies

---

# Implementation Steps

When implementing a change:

Step 1  
Explain the plan.

Step 2  
Identify affected files.

Step 3  
Implement minimal changes.

Step 4  
Explain modifications.

Step 5  
Suggest verification commands.

Example:

npm run lint  
npm run build

---

# Verification

After completing a task:

Ensure:

- project builds successfully
- lint passes
- tests pass if present

If verification fails:

Investigate and fix.

---

# Communication Style

When reporting results:

Be concise and technical.

Always explain:

- which files changed
- what changed
- why it changed

---

# When Requirements Are Unclear

If instructions are ambiguous:

Ask clarifying questions.

Do not guess requirements.

---

# Forbidden Actions

Never:

- modify environment variables
- expose secrets
- delete large sections of code
- rewrite the project architecture