# AGENTS.md

This file defines rules and expectations for AI coding agents working in this repository.

The goal is to maintain stability, code quality, and predictable changes.

---

# Core Principles

1. Make minimal and focused changes.
2. Preserve existing architecture and patterns.
3. Prefer clarity and maintainability over clever code.
4. Avoid unnecessary abstractions.
5. Do not introduce breaking changes unless explicitly requested.

---

# Repository Exploration

Before modifying code:

- Analyze the repository structure
- Identify entry points
- Identify existing utilities and helpers
- Identify coding patterns used across the codebase

Do not introduce new patterns if a pattern already exists.

---

# Editing Rules

When modifying code:

- Change the smallest possible number of files
- Avoid large refactors
- Avoid renaming files unless necessary
- Avoid changing formatting of unrelated code
- Reuse existing utilities

Explain all changes briefly.

---

# Dependency Policy

Before adding a dependency:

1. Check if functionality already exists in the project
2. Prefer native APIs or existing libraries
3. Avoid adding heavy dependencies

Dependencies should only be added if necessary.

---

# Type Safety

If TypeScript is used:

- Avoid `any`
- Prefer explicit types
- Use existing shared types when available
- Avoid weakening type safety

---

# Performance Guidelines

Avoid:

- unnecessary client components
- unnecessary re-renders
- large bundles
- expensive operations in render loops

Prefer:

- server-side logic
- memoization when needed
- efficient data fetching

---

# Security Rules

Never modify or expose:

- environment variables
- API keys
- authentication logic

Never log sensitive data.

---

# Testing and Validation

After making changes:

- suggest lint
- suggest build
- suggest tests if present

Example:

npm run lint  
npm run build  

---

# Commit Discipline

Changes should be:

- small
- logical
- easy to review

Prefer multiple small commits over a single large change.

---

# When Uncertain

If requirements are unclear:

- ask clarifying questions
- do not guess
- do not introduce speculative changes

#Always read the following files first:

AI_CONTEXT.md
PROJECT_MAP.md
README.md