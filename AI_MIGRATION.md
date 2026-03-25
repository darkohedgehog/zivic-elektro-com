# AI Migration Guide

This document defines how AI coding agents should approach framework, library, dependency, and configuration migrations in this repository.

The goal is to perform migrations safely, incrementally, and with minimal disruption.

---

# Migration Principles

When performing migrations:

- prioritize stability over speed
- make incremental changes
- preserve existing behavior whenever possible
- avoid unnecessary refactors during migration
- keep diffs reviewable

Do not combine migration work with unrelated cleanup.

---

# Types of Migrations

Common migration categories include:

- framework upgrades
- library upgrades
- dependency major version changes
- configuration migrations
- API migrations
- build tooling migrations

Examples:

- Next.js 15 to 16
- React 18 to 19
- Strapi v4 to v5
- legacy config to new config format
- routing or i18n migration
- replacing deprecated APIs

---

# Migration Workflow

Always follow this workflow:

1. identify current version and target version
2. identify breaking changes
3. identify affected files and systems
4. propose a migration plan
5. perform migration in small steps
6. verify after each step
7. summarize remaining follow-up work

Do not skip steps.

---

# Pre-Migration Analysis

Before making any changes:

- identify the currently installed versions
- identify the target version
- identify deprecated APIs
- identify likely breaking changes
- inspect repository structure
- inspect build and runtime entry points

Read these files first if available:

AI_ONBOARDING.md
AI_CONTEXT.md
PROJECT_MAP.md
AGENTS.md
AI_TASKS.md
README.md

---

# Planning Rules

Before implementing a migration, produce a short plan that includes:

- migration goal
- affected areas
- expected breaking points
- verification steps
- rollback considerations

If the migration is large, break it into phases.

Example phases:

Phase 1
Update dependencies only

Phase 2
Fix compile and type errors

Phase 3
Fix runtime issues

Phase 4
Clean up deprecated code

---

# Incremental Migration Rule

Migrations must be incremental.

Always prefer:

- one dependency group at a time
- one subsystem at a time
- one config area at a time

Avoid:

- upgrading everything at once
- mixing migration with redesign
- changing architecture unless required

---

# Dependency Upgrade Rules

Before upgrading dependencies:

1. identify exact package versions
2. check whether the upgrade is major, minor, or patch
3. assume major upgrades may introduce breaking changes
4. update the minimum required packages first
5. avoid adding new dependencies during migration unless necessary

---

# Code Change Rules

During migrations:

- keep changes focused
- preserve naming and architecture where possible
- avoid broad rewrites unless required
- avoid reformatting unrelated files
- avoid changing business logic unless required by the migration

If behavior must change, explain why.

---

# Framework-Specific Guidance

## React / Next.js

Check for:

- deprecated APIs
- server vs client boundary issues
- routing changes
- metadata changes
- async params or dynamic API changes
- hydration mismatch risks
- config changes
- image config differences
- middleware / proxy convention changes

Preserve App Router patterns if already used.

---

## TypeScript

Check for:

- stricter type requirements
- changed library type definitions
- invalid implicit assumptions
- weakened types introduced during migration

Do not use `any` as a shortcut unless absolutely necessary and documented.

---

## Strapi / CMS / API Migrations

Check for:

- response shape changes
- field naming changes
- relation changes
- locale handling changes
- media object changes
- authentication and token changes
- deprecated endpoints or query params

Normalize response handling carefully.

---

## Build Tooling / Config Migrations

Check for:

- changed config formats
- renamed options
- deprecated settings
- environment variable assumptions
- new required keys
- plugin compatibility

Do not overwrite environment files.

---

# Verification After Each Step

After every migration step, verify the project.

Use available commands such as:

npm install
npm run lint
npm run build
npm test

Also verify manually when needed:

- app starts
- key routes load
- forms work
- API requests succeed
- images render
- localization still works
- production-critical features remain intact

Do not postpone all verification until the end.

---

# Runtime Debugging During Migration

If the migration introduces errors:

1. identify whether the issue is build-time, type-level, or runtime
2. isolate the affected subsystem
3. fix the smallest blocking issue first
4. continue iteratively

Do not apply speculative fixes across many files at once.

---

# Rollback Strategy

Before risky migrations, identify rollback options.

Examples:

- revert dependency changes
- restore lockfile
- revert config changes
- restore previous working branch

If the migration fails, prefer rollback and re-plan rather than piling on risky fixes.

---

# Task Size Rules

Migration changes should remain reviewable.

Small migration
1–3 files changed

Medium migration
3–8 files changed

Large migration
More than 8 files changed

If the migration affects more than 8 files or multiple subsystems:

pause and request confirmation before proceeding further.

---

# Reporting Format

When reporting migration progress, always explain:

- what was migrated
- what files changed
- what issues were encountered
- what was fixed
- what still needs attention
- how the change was verified

---

# Forbidden Actions

Never:

- modify secrets or credentials
- overwrite `.env` files
- perform destructive database changes without confirmation
- combine migration with unrelated refactors
- silently change business behavior without explanation

---

# When Requirements Are Unclear

If the migration target or scope is unclear:

- ask clarifying questions
- do not guess version targets
- do not apply broad upgrade changes without a plan

---

# Migration Completion Checklist

A migration is only considered complete when:

- dependencies are updated as intended
- lint passes
- build passes
- critical runtime paths work
- type errors are resolved
- major deprecations are addressed or documented
- follow-up work is clearly listed

---

# Final Rule

Prefer a slower, safer migration over a fast, risky one.