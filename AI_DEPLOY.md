# AI Deployment Guide

This document defines safe deployment procedures for AI coding agents.

The goal is to ensure safe deployments without breaking production systems.

---

# Deployment Principles

Always prioritize:

- system stability
- minimal downtime
- safe rollback capability

Never deploy risky changes without confirmation.

---

# Deployment Environments

Typical environments used in this project:

Development
Local environment for development and testing.

Staging
Optional environment for testing before production.

Production
Live environment serving users.

Never assume that development and production environments are identical.

---

# Infrastructure Overview

Typical deployment stack:

Application
Node.js application (Next.js or backend service)

Process manager
PM2

Reverse proxy
Nginx

Server
Linux VPS

Optional
Docker containers

---

# Safe Deployment Workflow

When deploying changes:

Step 1  
Verify repository state.

Ensure the code builds successfully.

Example:

npm install  
npm run build  

Step 2  
Run quality checks.

Example:

npm run lint  

Step 3  
Ensure environment variables exist.

Never modify or overwrite `.env` files.

Step 4  
Restart or reload the application safely.

Example:

pm2 restart app-name

Step 5  
Verify application health.

Check:

- logs
- HTTP response
- application status

---

# Docker Deployment

If Docker is used:

1. Build the image

docker build -t app-image .

2. Stop old container

docker stop container-name

3. Start new container

docker run -d -p PORT:PORT app-image

Never remove persistent volumes.

---

# Nginx Configuration

When modifying Nginx:

Always validate configuration before reload.

Example:

nginx -t

If configuration is valid:

systemctl reload nginx

Never restart nginx without validation.

---

# Database Safety

Never modify production databases directly without confirmation.

Avoid:

- destructive migrations
- dropping tables
- modifying schemas without backups

Always verify backups exist before migrations.

---

# Logging and Monitoring

After deployment verify:

Application logs

Example:

pm2 logs app-name

Server status

Example:

htop

HTTP health check

Example:

curl http://localhost:PORT

---

# Rollback Strategy

If deployment fails:

1. Restore previous build
2. Restart application
3. Verify logs
4. Confirm service availability

Never attempt risky fixes directly on production.

---

# Forbidden Actions

AI agents must never:

- delete `.env` files
- expose API keys
- modify server firewall rules
- remove Docker volumes
- drop database tables

---

# Verification Checklist

After deployment verify:

- application starts
- endpoints respond
- logs contain no errors
- reverse proxy works
- database connections succeed

---

# Communication

When performing deployment tasks always report:

- what was deployed
- which commands were executed
- verification results

Never run commands on production servers without explicit user confirmation.