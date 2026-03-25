# AI Feature Specification Guide

This document defines how AI agents should implement new features in this repository.

The goal is to ensure predictable, maintainable, and safe feature development.

---

# Feature Development Principles

When implementing features:

- prioritize maintainability
- keep changes minimal
- respect existing architecture
- avoid introducing unnecessary dependencies

Always follow the repository's coding patterns.

---

# Feature Development Workflow

Before implementing a feature:

1. Understand the feature requirements
2. Identify relevant parts of the repository
3. Propose a short implementation plan
4. Confirm the plan if the feature is large
5. Implement the feature in small steps
6. Verify functionality

Do not skip these steps.

---

# Feature Specification Template

When defining a feature, use this structure.

## Feature Name

Short descriptive title.

## Purpose

Explain why the feature exists.

## User Story

Example:

As a user  
I want to search for books  
So that I can quickly find relevant results.

## Functional Requirements

List the required behaviors.

Example:

- User can type in search input
- Results update dynamically
- Display number of results
- Support empty state

## Non-Functional Requirements

Performance, accessibility, etc.

Example:

- Search should debounce requests
- Results should load quickly
- UI must remain responsive

## Affected Areas

Identify relevant parts of the codebase.

Example:

components/search  
lib/api  
app/books/page.tsx

## Implementation Plan

Step-by-step outline.

Example:

1. create search component
2. implement debounce logic
3. connect search to API
4. display results
5. handle empty state

## Edge Cases

Consider unusual scenarios.

Example:

- empty query
- API failure
- slow network
- no results

## Verification

How to confirm the feature works.

Example:

- manual testing
- lint and build checks
- test if available

---

# Implementation Rules

When implementing features:

- change the smallest number of files possible
- reuse existing utilities
- follow established folder structure
- avoid unnecessary refactors

---

# UI Consistency

New UI elements must:

- follow existing styling patterns
- reuse existing components
- avoid introducing new UI frameworks

---

# Performance Considerations

Avoid:

- unnecessary client components
- excessive state
- inefficient rendering

Prefer:

- server-side logic
- efficient data fetching
- memoization when needed

---

# Dependency Policy

Before adding a dependency:

1. check if the functionality already exists
2. consider native alternatives
3. evaluate bundle impact

Only add dependencies if necessary.

---

# Verification Workflow

After implementing a feature:

Run available checks.

Example:

npm run lint  
npm run build  

Verify functionality manually if tests are not available.

---

# Feature Review

Before finalizing a feature:

- ensure code clarity
- ensure minimal diff
- ensure architecture consistency

---

# When Requirements Are Unclear

If feature requirements are ambiguous:

- ask clarifying questions
- do not guess implementation details