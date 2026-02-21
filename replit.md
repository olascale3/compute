# TrueCompute

## Overview
TrueCompute is an AI cost intelligence platform that tracks the true cost of every AI API call — dollars, tokens, and latency. It provides real-time cost tracking across OpenAI, Anthropic, Google, DeepSeek, Mistral, and 15+ providers with a multi-provider dashboard.

## Project Architecture
- **Monorepo**: Turborepo with pnpm workspaces
- **Frontend**: Next.js 16 app (apps/web) with Tailwind CSS v4, React 19
- **SDK**: TypeScript SDK package (packages/sdk) for wrapping AI clients
- **Database**: Replit PostgreSQL (Neon-backed) for all data storage
- **Auth**: Custom email/password auth with bcrypt + HTTP-only session cookies (no external auth provider)
- **Build System**: Turbo for task orchestration, tsup for SDK bundling

## Project Structure
```
/
├── apps/
│   └── web/                  # Next.js frontend application
│       ├── src/
│       │   ├── app/          # Next.js App Router pages & API routes
│       │   ├── components/   # React components (dashboard UI)
│       │   ├── lib/          # Utilities (db, auth, pricing, rate-limit)
│       │   │   ├── db.ts     # PostgreSQL connection pool & query helpers
│       │   │   ├── auth.ts   # Auth: signup, login, sessions, org membership
│       │   │   ├── api-key.ts # API key generation & hashing
│       │   │   └── pricing/  # Cost calculator & model pricing data
│       │   └── proxy.ts      # Auth middleware (Next.js 16 convention)
│       └── server.mjs        # Custom production server for health checks
├── packages/
│   └── sdk/                  # @truecompute/sdk package
│       └── src/              # SDK source (client, transport, wrappers)
├── package.json              # Root workspace config
├── pnpm-workspace.yaml       # Workspace definition
└── turbo.json                # Turbo task config
```

## Database Schema
- **users** - Email/password accounts (bcrypt hashed)
- **sessions** - Session tokens (SHA-256 hashed, with expiry)
- **organizations** - Teams/companies with unique slugs
- **org_members** - User-org membership with roles (owner, admin, member)
- **api_keys** - SDK API keys (SHA-256 hashed, prefix stored for display)
- **events** - AI API call tracking (provider, model, tokens, cost, latency)
- **budgets** - Monthly spending limits and alerts

## Auth Flow
1. User signs up via `/api/auth/signup` (creates user + session)
2. Session token stored in `tc_session` HTTP-only cookie (30-day TTL)
3. Middleware (`proxy.ts`) validates session for protected routes
4. After signup, user creates org via `/onboarding` -> `/api/v1/onboard`
5. Onboarding creates org + membership + default API key
6. Dashboard accessible after org creation

## Key Configuration
- **Package Manager**: pnpm 10.12.4
- **Node.js**: v20
- **Dev Server**: Port 5000 (Next.js dev)
- **Production**: Custom server (`server.mjs`) with `node server.mjs` on port 5000 (VM deployment)
- **Session Cookie**: `tc_session`, HTTP-only, SameSite=lax, 30-day expiry

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-provisioned by Replit)
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` - PostgreSQL details
- `NEXT_PUBLIC_APP_URL` - Public app URL

## API Routes
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/signout` - Sign out (clears session)
- `GET /api/v1/usage?view=overview|providers|models|queries` - Cost analytics
- `GET/POST/DELETE /api/v1/keys` - API key management
- `GET/POST /api/v1/budgets` - Budget management
- `POST /api/v1/onboard` - Create organization
- `POST /api/v1/events` - Ingest AI API call events (SDK endpoint)
- `GET /api/health` - Health check

## Recent Changes
- 2026-02-21: MVP migration — Replaced non-functional Supabase with Replit PostgreSQL. Built custom auth layer (bcrypt + sessions). Rewrote all API routes to use PostgreSQL directly. Full end-to-end flow working: signup -> onboarding -> dashboard -> event ingestion -> cost analytics.
- 2026-02-20: Initial Replit setup — configured Next.js for port 5000, deployment config, health checks
