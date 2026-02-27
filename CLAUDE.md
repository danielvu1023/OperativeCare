# Claude Code Review Guidelines — postop-monitor

## Project Overview
A postoperative patient monitoring dashboard built with Next.js 16, React 19, TypeScript, Tailwind v4, and Supabase. Clinical staff use this to monitor patient vitals, receive alerts, and triage care routing in real time. **Incorrect data display or missed alerts could have patient safety consequences.**

## Stack
- **Framework:** Next.js 16 (Pages Router)
- **UI:** React 19, Tailwind CSS v4
- **Charts:** Recharts
- **Icons:** lucide-react
- **Database:** Supabase (local dev on port 54321)
- **Language:** TypeScript (strict)

## Code Review Priorities

### 1. Patient Safety (highest priority)
- Flag any logic in `utils/triageEngine.ts` that could produce incorrect severity levels
- Flag any vitals threshold changes in `utils/constants.ts` — these are clinical values
- Ensure triage routing (`PROVIDER_ROUTING`) always has a fallback — a missing route is a silent failure
- Alert generation logic must never silently swallow errors

### 2. Supabase / Data Layer
- All Supabase queries must handle errors explicitly — no unhandled `.error` fields
- RLS policies must be in place for any table exposed to the client
- Never expose the service role key client-side
- Prefer typed queries using generated types over raw `any`

### 3. TypeScript
- No use of `any` — use `unknown` with type guards if needed
- All component props must be typed (no implicit props)
- `VitalsSnapshot` and `TriageResult` are core types — changes to them need careful review

### 4. Component Conventions
- Components live in `/components`, one component per file, named with PascalCase
- No external UI component libraries — only lucide-react and recharts are permitted
- Tailwind utility classes only — no inline styles, no CSS modules
- Keep components focused — display logic only, business logic belongs in `/utils` or `/contexts`

### 5. Performance
- Vitals update on a simulation interval — avoid unnecessary re-renders in components that consume `VitalsContext`
- Flag any `useEffect` with missing or incorrect dependencies
- Recharts components can be expensive — avoid recreating them on every render

### 6. General
- No `console.log` left in production code
- No hardcoded patient data or PII in source files
- All new pages must be wrapped in the `<Layout>` component
- Simulation controls (`SimulationControls.tsx`) are dev/demo only — flag if they appear in production paths
