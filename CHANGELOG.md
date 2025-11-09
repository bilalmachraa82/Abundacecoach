# Changelog

All notable changes to AbundanceCoach will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- MFA/2FA authentication (coming soon)
- Open Banking integration (planned)
- Admin dashboard (planned)

## [0.2.0] - 2025-10-21

### Added - FASE 2: Features Críticas & Performance

#### Budget Management (100% Funcional)

- Complete CRUD operations for budgets
- Real-time spending tracking against budgets
- Budget status indicators (healthy/warning/exceeded)
- Visual progress bars for budget consumption
- Category-based budgets (weekly/monthly/yearly)
- Budget alerts system

#### Database

- `budgets` table with RLS policies
- `budget_alerts` table for notifications
- `user_settings` table for persistent settings
- Automatic `updated_at` triggers
- Optimized indexes for performance

#### Settings - Fully Functional

- Supabase persistence (no more localStorage!)
- Auto-sync across devices
- Theme toggle (dark/light mode)
- Compact mode option
- Notification preferences:
  - Email notifications
  - Push notifications (PWA)
  - Budget alerts
  - Goal reminders
  - Weekly reports
- Localization settings:
  - Language selection (pt-PT, pt-BR, en-US)
  - Currency selection (EUR, USD, GBP)

#### Performance Optimization

- React.lazy() + Suspense code splitting
- 60% bundle size reduction (881KB → 359KB)
- Route-based lazy loading (10 pages)
- Optimized chunk sizes
- Loading fallbacks

#### PWA (Progressive Web App)

- Complete manifest.json
- Service Worker implementation
- Offline support
- Cache strategies (cache-first, network-first)
- Push notification handlers
- App shortcuts
- Installable app

### Changed

- Budget page now uses real data from Supabase
- Settings page now persists to database
- All pages now lazy-loaded for better performance

### Performance

- Initial bundle: 881KB → 359KB (59% improvement)
- First Contentful Paint: Improved
- Time to Interactive: Reduced significantly

## [0.1.0] - 2025-10-21

### Added - FASE 1: Segurança & Infraestrutura

#### Security

- Environment variable validation with TypeScript
- Removed exposed credentials from git
- Created `.env.example` with placeholders
- Updated `.gitignore` with 2025 patterns
- Resolved 50% of npm vulnerabilities (10 → 5)
- Centralized logging system
- Type-safe configuration

#### Development Infrastructure

- Prettier 3.6 + Tailwind plugin
- ESLint 9.9 advanced configuration
- Husky 9.1 + lint-staged pre-commit hooks
- Vitest 3.2 + React Testing Library 16.3
- Test utilities and helpers
- 15 initial unit tests

#### CI/CD

- GitHub Actions quality checks workflow
- Security audit automation
- Build verification
- Deploy workflow (Vercel ready)
- Code coverage reporting

#### Documentation

- Comprehensive README.md
- SECURITY.md with policies
- Contributing guidelines
- Environment setup guide

#### Code Quality

- All code formatted with Prettier (130+ files)
- Consistent code style enforced
- Pre-commit hooks prevent bad code
- TypeScript strict mode enabled

### Fixed

- Security vulnerabilities (10 → 5 resolved)
- Environment variable exposure
- Missing gitignore patterns

### Performance

- Initial setup for future optimizations
- Caching strategies documented

---

## Version History

- **v0.2.0** - Features Críticas & Performance (Fase 2)
- **v0.1.0** - Segurança & Infraestrutura (Fase 1)
- **v0.0.0** - Initial template (StackBlitz Bolt)

---

[Unreleased]: https://github.com/bilalmachraa82/Abundacecoach/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/bilalmachraa82/Abundacecoach/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/bilalmachraa82/Abundacecoach/releases/tag/v0.1.0
