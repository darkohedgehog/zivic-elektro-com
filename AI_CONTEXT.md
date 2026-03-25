# AI_CONTEXT.md

This repository contains a production web application.

## Tech Stack

Frontend:
- Next.js (App Router)
- TypeScript
- TailwindCSS
- React

Backend:
- Strapi CMS or WordPress (WPGraphQL)

Infrastructure:
- VPS deployment
- Nginx reverse proxy
- Node.js runtime
- PM2 process manager

## Architecture

Key directories:

/app → Next.js routes  
/components → reusable UI components  
/lib → utilities and API helpers  
/hooks → React hooks  
/types → shared TypeScript types  

## Coding Patterns

- Prefer server components
- Avoid unnecessary client components
- Data fetching should happen on the server when possible
- Reuse shared utilities
- Use strict TypeScript types

## Performance Guidelines

- Avoid large client bundles
- Avoid unnecessary re-renders
- Prefer memoization when needed
- Avoid heavy dependencies

## UI Guidelines

- Use TailwindCSS for styling
- Prefer existing UI components
- Avoid introducing new styling frameworks

## Editing Rules

- Make minimal changes
- Do not refactor unrelated files
- Preserve existing architecture