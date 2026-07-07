https://space-dashboard-indol.vercel.app/

# space-dashboard

A barebones starter template: **Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Supabase (auth + storage)**.

This template ships the *plumbing* only — typed Supabase clients, session-refresh middleware, and storage helpers — with no example pages, so you can build your UI on top of a clean foundation.

## Stack

| Concern    | Choice                                   |
| ---------- | ---------------------------------------- |
| Framework  | Next.js 16 (App Router, `src/` dir)      |
| Language   | TypeScript                               |
| Styling    | Tailwind CSS v4                          |
| Components | shadcn/ui (Radix base)                   |
| Backend    | Supabase via `@supabase/ssr`             |

## Getting started

1. **Install dependencies** (already done if you scaffolded locally):

   ```bash
   npm install
   ```

2. **Configure Supabase.** Copy the example env file and fill in your project
   values from the [Supabase dashboard](https://supabase.com/dashboard/project/_/settings/api):

   ```bash
   cp .env.example .env.local
   ```

   | Variable                        | Where to find it                  |
   | ------------------------------- | --------------------------------- |
   | `NEXT_PUBLIC_SUPABASE_URL`      | Project Settings → API → Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project Settings → API → anon/publishable key |

3. **Run the dev server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## How the Supabase wiring works

| File                                | Use it for                                                        |
| ----------------------------------- | ----------------------------------------------------------------- |
| `src/lib/supabase/client.ts`        | Client Components (`"use client"`) — `createClient()`             |
| `src/lib/supabase/server.ts`        | Server Components, Route Handlers, Server Actions — `await createClient()` |
| `src/lib/supabase/middleware.ts`    | `updateSession()` — refreshes the auth token on every request     |
| `src/proxy.ts`                      | Wires `updateSession` into Next.js (the renamed middleware convention) |
| `src/lib/supabase/storage.ts`       | Upload / download / signed-URL helpers for Supabase Storage       |

### Reading the current user

```ts
// Server Component
import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();
```

### Protecting routes

Uncomment the redirect block in `src/lib/supabase/middleware.ts` and adjust the
public-path list to gate unauthenticated users.

## Adding shadcn components

```bash
npx shadcn@latest add card input label dialog
```

Components land in `src/components/ui`. A sample `button` is already included.

## Project structure

```
src/
├── app/                  # routes (App Router)
├── components/ui/        # shadcn components
├── lib/
│   ├── utils.ts          # cn() helper
│   └── supabase/         # clients, session helper, storage helpers
└── proxy.ts              # session refresh (renamed middleware convention)
```
