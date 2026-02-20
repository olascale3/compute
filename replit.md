# TrueCompute

## Overview
TrueCompute is an AI cost intelligence platform that tracks the true cost of every AI API call — dollars, tokens, and latency. It provides real-time cost tracking across OpenAI, Anthropic, Google, DeepSeek, Mistral, and 15+ providers with a multi-provider dashboard.

## Project Architecture
- **Monorepo**: Turborepo with pnpm workspaces
- **Frontend**: Next.js 16 app (apps/web) with Tailwind CSS v4, React 19
- **SDK**: TypeScript SDK package (packages/sdk) for wrapping AI clients
- **Database/Auth**: Supabase (external) for authentication and data storage
- **Build System**: Turbo for task orchestration, tsup for SDK bundling

## Project Structure
```
/
├── apps/
│   └── web/                  # Next.js frontend application
│       ├── src/
│       │   ├── app/          # Next.js App Router pages & API routes
│       │   ├── components/   # React components (dashboard UI)
│       │   ├── lib/          # Utilities (Supabase clients, pricing, rate-limit)
│       │   └── proxy.ts      # Auth proxy (Next.js 16 convention)
│       └── supabase/
│           └── migrations/   # SQL migration files
├── packages/
│   └── sdk/                  # @truecompute/sdk package
│       └── src/              # SDK source (client, transport, wrappers)
├── package.json              # Root workspace config
├── pnpm-workspace.yaml       # Workspace definition
└── turbo.json                # Turbo task config
```

## Key Configuration
- **Package Manager**: pnpm 10.12.4
- **Node.js**: v20
- **Dev Server**: Port 5000 (Next.js dev)
- **Production**: Custom server (`server.mjs`) with `node server.mjs` on port 5000 (VM deployment)

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_APP_URL` - Public app URL

## Recent Changes
- 2026-02-20: End-to-end testing and hardening — Added URL validation to all Supabase clients (client.ts, server.ts, admin.ts, proxy.ts). Wrapped all createAdminClient() calls in try/catch returning 503. Added autocomplete attributes to auth forms. Enhanced signout to always clear sb- cookies. Fallback client uses localhost.invalid (non-routable) when Supabase unconfigured. All routes tested: landing 200, login 200, signup 200, dashboard 307, onboarding 200, health 200, API routes 401 when unauthenticated, 503 when Supabase unavailable.
- 2026-02-20: Fixed deployment health checks — added custom server.mjs that returns 200 on both `/` and `/api/health` immediately during cold start. Renamed middleware.ts to proxy.ts (Next.js 16 convention). Added `force-static` to landing page. VM deployment with `node server.mjs` for run.
- 2026-02-20: Fixed pnpm version mismatch (9.15.0 -> 10.12.4) to match system pnpm, added .npmrc and build script approvals, verified deployment config with standalone Next.js build
- 2026-02-20: Removed standalone output mode from next.config.ts, switched to standard `next start` for production. VM deployment with `bash build.sh` for build and `next start -p 5000` for run. Health check at /api/health returns 200.
- 2026-02-20: Initial Replit setup — configured Next.js for port 5000, allowed all dev origins, set up environment variables and deployment config
