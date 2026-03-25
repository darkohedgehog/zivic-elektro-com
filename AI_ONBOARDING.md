# AI Onboarding Guide

This document provides context for AI coding agents working in this repository.

Your goal is to understand the project quickly and make safe, minimal changes.

---

# Project Overview

This repository contains a production web application.

Typical stack used in this project:

Frontend
- Next.js (App Router)
- React
- TypeScript
- TailwindCSS

Backend
- Strapi CMS or WordPress (WPGraphQL)

Infrastructure
- VPS hosting
- Nginx reverse proxy
- Node.js runtime
- PM2 process manager

---

# Primary Goals

When working in this repository:

- Maintain stability
- Avoid breaking changes
- Keep changes small and easy to review
- Preserve existing architecture

Do not introduce unnecessary abstractions or dependencies.

---

# Repository Structure

Important directories:

app/
Next.js routes and layouts

components/
Reusable UI components

lib/
Utility functions and API helpers

hooks/
React hooks

types/
Shared TypeScript types

public/
Static assets

---

# Key Entry Points

These files define the main application structure.

app/layout.tsx  
Root layout

app/page.tsx  
Homepage

next.config.ts  
Next.js configuration

tailwind.config.ts  
Tailwind configuration

tsconfig.json  
TypeScript configuration

---

# Coding Patterns

Follow the patterns already used in the repository.

Important rules:

- Prefer server components
- Avoid unnecessary client components
- Use existing utilities instead of creating new ones
- Use strict TypeScript types
- Avoid introducing `any`

---

# UI and Styling

This project uses:

TailwindCSS

Guidelines:

- Prefer existing components
- Avoid introducing new UI frameworks
- Keep styles consistent with existing patterns

---

# Performance Guidelines

Avoid:

- unnecessary client-side code
- large bundles
- unnecessary re-renders

Prefer:

- server-side data fetching
- memoization when needed
- efficient rendering

---

# Security Rules

Never expose or modify:

- environment variables
- API keys
- authentication secrets

Never log sensitive information.

---

# Dependency Policy

Before adding a dependency:

1. Check if functionality already exists
2. Prefer native APIs
3. Avoid heavy dependencies

Dependencies should only be added if necessary.

---

# Editing Workflow

Before making changes:

1. Analyze repository structure
2. Identify relevant files
3. Propose a short plan

During edits:

- modify the smallest number of files possible
- avoid large refactors
- keep changes focused

After edits:

Suggest verification commands.

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

---

# Files to Read First

Before making any changes, read these files if they exist:

AGENTS.md  
AI_CONTEXT.md  
PROJECT_MAP.md  
README.md