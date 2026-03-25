# AI Debugging Guide

This document defines how AI coding agents should approach debugging in this repository.

The goal is to identify the root cause of issues and apply minimal, safe fixes.

---

# Debugging Principles

When encountering a bug:

1. Identify the symptoms
2. Locate the likely source of the problem
3. Analyze the root cause
4. Propose a minimal fix
5. Verify the solution

Do not guess. Always investigate first.

---

# Common Bug Categories

AI agents should categorize bugs before fixing them.

### Runtime errors

Examples:

- undefined is not a function
- cannot read property of undefined
- API request failures

Approach:

1. locate the failing code
2. inspect data flow
3. validate assumptions
4. apply minimal fix

---

### Build errors

Examples:

- TypeScript errors
- Next.js build failures
- dependency conflicts

Approach:

1. inspect error output
2. identify failing file
3. resolve the root issue
4. re-run build

---

### Hydration issues (React / Next.js)

Examples:

- hydration mismatch
- inconsistent server/client output

Common causes:

- Date.now()
- Math.random()
- browser-only logic in server components
- mismatched rendering

Approach:

1. identify client vs server logic
2. isolate dynamic values
3. move logic to correct component type

---

### Data fetching bugs

Examples:

- API returns unexpected data
- incorrect response handling
- missing error handling

Approach:

1. inspect API response
2. validate data types
3. ensure proper error handling

---

### Performance problems

Examples:

- unnecessary re-renders
- large bundle sizes
- slow page loads

Approach:

1. identify expensive operations
2. inspect rendering logic
3. optimize data fetching or memoization

---

# Debugging Workflow

When fixing a bug:

Step 1  
Explain the observed issue.

Step 2  
Locate the relevant files.

Step 3  
Analyze possible causes.

Step 4  
Propose the minimal fix.

Step 5  
Apply the fix.

Step 6  
Verify the result.

---

# Investigation Rules

Before editing code:

- inspect relevant files
- trace data flow
- identify assumptions in the code

Avoid editing multiple areas of the project without understanding the root cause.

---

# Minimal Fix Rule

Always prefer the smallest possible fix.

Avoid:

- large refactors
- introducing new abstractions
- changing unrelated code

---

# Logging Strategy

If the issue is unclear:

- add temporary logs
- inspect runtime values
- remove logs after debugging

Never log sensitive data.

---

# Verification

After applying a fix:

Run verification commands when possible.

Examples:

npm run lint  
npm run build  

If tests exist:

run tests and ensure they pass.

---

# When Root Cause Is Unclear

If the issue cannot be reproduced:

- explain possible causes
- propose investigation steps
- do not apply speculative fixes

---

# Safety Rules

Never modify:

- environment variables
- authentication secrets
- production credentials

Never expose sensitive data.

---

# Reporting Fixes

When reporting a fix:

Always explain:

- what caused the issue
- what was changed
- why the change fixes the problem

If multiple possible causes exist, list them and test them one by one.