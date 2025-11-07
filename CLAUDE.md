# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Production build
npm run preview          # Preview production build

# Code Quality
npm run validate         # Run all checks (type-check + lint + format + test)
npm run type-check       # TypeScript validation
npm run lint             # ESLint check
npm run lint:fix         # Auto-fix lint issues
npm run format           # Format with Prettier
npm run format:check     # Check formatting only

# Testing
npm test                 # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:ui          # Run tests with Vitest UI
npm run test:coverage    # Generate coverage report

# Single test file
npm test -- src/path/to/test.test.ts
```

## Architecture Overview

### Environment Configuration Pattern

**Critical**: All environment variables are validated at startup in `src/config/env.ts`. The app will NOT start if variables are missing or invalid.

```typescript
// ALWAYS use the validated config, NEVER use import.meta.env directly
import { config } from '../config/env';

// Correct:
const client = createClient(config.supabase.url, config.supabase.anonKey);

// Incorrect:
const client = createClient(import.meta.env.VITE_SUPABASE_URL, ...);
```

Required environment variables:

- `VITE_SUPABASE_URL` - Must be https:// and contain .supabase.co
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_GEMINI_API_KEY` - Google Gemini API key

### State Management Pattern

The app uses **Zustand with Supabase persistence** (not localStorage) for all state management. All 9 stores follow this pattern:

```typescript
// Example: src/stores/budgetStore.ts
export const useBudgetStore = create<State>()(
  persist(
    (set, get) => ({
      data: [],
      fetchData: async () => {
        // 1. Get authenticated user
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // 2. Query Supabase with RLS
        const { data } = await supabase.from('table').select('*').eq('user_id', user.id);

        // 3. Update state
        set({ data });
      },
    }),
    { name: 'storage-key', partialize: state => ({ data: state.data }) }
  )
);
```

**Key stores:**

- `budgetStore` - Budget CRUD with spending calculation
- `settingsStore` - User preferences synced to Supabase
- `transactionStore` - Financial transactions (split, recurring)
- `setupStore` - First-run setup flow guard

### Database Schema

Three main tables in Supabase with Row-Level Security (RLS):

1. **budgets** - User budgets by category/period
2. **user_settings** - User preferences (theme, notifications, locale)
3. **budget_alerts** - Budget threshold notifications

Migration file: `supabase/migrations/20251021_budgets_and_settings.sql`

**RLS Pattern**: All tables have policies that filter by `auth.uid() = user_id`. The anon key is safe to expose client-side because RLS enforces user isolation.

### Code Splitting

**All page components are lazy-loaded** to reduce initial bundle size (881KB → 359KB, 60% reduction).

```typescript
// src/App.tsx pattern
const Dashboard = lazy(() => import('./pages/Dashboard'));

// All routes wrapped in Suspense with PageLoader fallback
<Suspense fallback={<PageLoader />}>
  <Routes>...</Routes>
</Suspense>
```

When creating new pages, follow this pattern.

### Logging System

**Never use `console.error` directly**. Use the centralized logger:

```typescript
import { logger } from '../utils/logger';

logger.debug('Debug info', { context: 'optional' });
logger.info('User action completed', { userId: '...' });
logger.warn('Potential issue detected');
logger.error('Operation failed', error as Error, { transactionId: '...' });
```

The logger is configured for Sentry integration (ready when needed).

## Component Patterns

### Budget Components

- `BudgetCard` - Display budget with status (healthy/warning/exceeded)
- `BudgetForm` - CRUD form with validation
- `BudgetList` - Main budget management UI, calculates spending vs budget

### Settings Components

- `SettingsPanel` - Full settings UI synced to Supabase
- All toggles persist to `user_settings` table (not just localStorage)

## Testing

- Framework: Vitest 3.2 + React Testing Library 16.3
- Test files: `*.test.ts` or `*.test.tsx` alongside source files
- Setup: `src/test/setup.ts`
- Utilities: `src/test/utils.tsx` (custom render with providers)

**Current coverage**: 15 tests (expanding)

When writing tests:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/utils'; // Use custom render

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});
```

## Database Migrations

To apply the budget/settings schema:

1. Go to Supabase dashboard → SQL Editor
2. Copy contents of `supabase/migrations/20251021_budgets_and_settings.sql`
3. Run the migration
4. Verify tables exist with RLS enabled

## Security Notes

- **VITE\_\* variables are bundled client-side** - Only use for public keys
- Supabase anon key is safe to expose (protected by RLS)
- Never commit `.env` file (already in .gitignore)
- Pre-commit hooks enforce formatting and linting via Husky

## CI/CD

- GitHub Actions: `.github/workflows/ci.yml` (quality checks) and `deploy.yml`
- Runs on every push: type-check, lint, format, test, coverage, security audit
- Deployment target: Vercel (configured for automatic deploys)

## PWA

- Manifest: `public/manifest.json`
- Service Worker: `public/sw.js`
- Cache strategy: cache-first for static, network-first for API
- Push notifications ready (requires backend integration)

## Common Gotchas

1. **First run**: App redirects to `/setup` until `setupStore.isInitialized === true`
2. **Auth required**: Most Supabase queries need `auth.getUser()` first
3. **RLS policies**: If queries return empty, check user is authenticated
4. **Bundle size**: Always lazy-load new page components
5. **Type safety**: Supabase types are in `src/types/supabase.ts` (auto-generated)
