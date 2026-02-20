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
│       │   └── middleware.ts # Auth middleware
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
- **Package Manager**: pnpm 9.15.0
- **Node.js**: v20
- **Dev Server**: Port 5000 (Next.js dev)
- **Production**: Next.js standalone build on port 5000

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_APP_URL` - Public app URL

## Recent Changes
- 2026-02-20: Initial Replit setup — configured Next.js for port 5000, allowed all dev origins, set up environment variables and deployment config
