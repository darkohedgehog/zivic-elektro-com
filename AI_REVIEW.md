# AI Code Review Guide

This document defines how AI agents should perform code reviews in this repository.

The goal is to identify real issues and improve code quality without unnecessary changes.

---

# Review Principles

Focus on:

- correctness
- maintainability
- performance
- security
- architectural consistency

Avoid unnecessary suggestions.

Only report meaningful improvements.

---

# Review Workflow

When reviewing code:

1. Understand the purpose of the change
2. Identify affected files
3. Check for correctness
4. Check for potential bugs
5. Check performance implications
6. Check security implications
7. Check architectural consistency

Provide clear feedback.

---

# Bug Detection

Look for common issues such as:

- undefined variables
- incorrect data handling
- improper async usage
- missing error handling
- incorrect assumptions about API responses

Focus on real runtime risks.

---

# Type Safety

If TypeScript is used:

- avoid `any`
- ensure correct typing
- ensure types are not weakened
- prefer existing shared types

---

# Performance Review

Check for:

- unnecessary client-side rendering
- unnecessary re-renders
- inefficient loops
- large dependencies
- expensive operations in render paths

Prefer efficient patterns.

---

# React / Next.js Review

Check for:

- hydration mismatch risks
- misuse of client components
- unnecessary state
- unnecessary effects
- improper server/client separation

Prefer server components when possible.

---

# Dependency Review

When dependencies are added:

Verify:

- necessity
- size impact
- maintenance status
- security implications

Avoid heavy dependencies.

---

# Security Review

Look for potential security risks:

- exposed secrets
- unsafe API usage
- improper input handling
- logging sensitive data

Never expose credentials.

---

# Architecture Consistency

Ensure:

- existing patterns are followed
- folder structure is respected
- utilities are reused
- no unnecessary abstractions are introduced

Avoid architectural drift.

---

# Diff Discipline

Focus on:

- meaningful changes
- minimal modifications
- clear logic

Avoid suggesting large refactors unless necessary.

---

# Review Output Format

When reporting issues use this structure:

Issue  
Description of the problem

Impact  
Why this matters

Suggestion  
Minimal improvement

---

# Severity Levels

Use these levels:

Critical  
Bug or security risk

Important  
Performance or architectural issue

Minor  
Code style or readability

---

# When No Issues Are Found

If the code is acceptable:

Explain why it is correct and safe.

Avoid inventing problems.

---

# Communication Style

Be concise.

Prioritize important issues.

Avoid unnecessary commentary.

If a change affects more than 10 files, review architectural impact first.