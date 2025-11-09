# 💰 AbundanceCoach - Financial Wellness Platform

> Holistic financial management platform combining personal finance tracking with mindfulness, AI coaching, and manifestation practices.

[![CI/CD](https://github.com/bilalmachraa82/Abundacecoach/workflows/CI/badge.svg)](https://github.com/bilalmachraa82/Abundacecoach/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Features

### 💳 Financial Management

- **Transaction Tracking**: Income & expense management with categories
- **Split Transactions**: Divide expenses across multiple categories
- **Recurring Transactions**: Automated daily/weekly/monthly entries
- **Smart Caching**: 5-minute intelligent cache for optimal performance
- **Bank Import**: CSV import with multi-bank format detection

### 📊 Analytics & Insights

- **Financial Health Score**: Comprehensive scoring algorithm
- **Cash Flow Analysis**: 6-month visualization
- **Expense Breakdown**: Category-based pie charts
- **Custom Dashboards**: Personalized metric displays

### 🎯 Goal Tracking

- **10 Goal Categories**: Emergency fund, retirement, house, travel, etc.
- **Progress Visualization**: Real-time progress tracking
- **Priority Levels**: High/medium/low prioritization

### 🤖 AI-Powered Coaching

- **Financial Advisor**: Conversational AI coach (Portuguese)
- **Receipt Scanner**: OCR-powered invoice/receipt processing
- **Spending Analysis**: AI-powered pattern recognition

### 🧘 Wellbeing & Manifestation

- **Gratitude Journal**: 4-category journaling system
- **Feng Shui Advisor**: AI-powered guidance
- **Manifestation Tracker**: Goal visualization with milestones
- **Grabovoi Codes**: 9 prosperity codes with daily assignments

## 🚀 Tech Stack

- **Frontend**: React 18.3 + TypeScript 5.5 + Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **State**: Zustand 4.5
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini Pro
- **Testing**: Vitest 3.2 + React Testing Library 16.3

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your credentials to .env

# Start development server
npm run dev
```

Visit `http://localhost:5173`

## 🧪 Available Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run type-check       # TypeScript check

npm test                 # Run tests
npm run test:coverage    # Tests with coverage
npm run validate         # Run all checks
```

## 🔒 Security

See [SECURITY.md](SECURITY.md) for details.

**Important**: Never commit `.env` file. All secrets should be in `.env` (gitignored).

## 📊 Project Stats

- **60+ React Components** (3 new budget components)
- **15 Utility Functions**
- **9 Zustand Stores** (+2: budget, settings)
- **5 Custom Hooks**
- **3 Database Tables** (transactions, budgets, user_settings)
- **15 Tests** (expanding)
- **Bundle Size:** 359KB (60% reduction!)
- **PWA Ready:** ✅
- **Offline Support:** ✅

## 🗺️ Roadmap

### ✅ Phase 1 - Foundation (Complete)

- [x] Core financial tracking
- [x] Authentication & security
- [x] Testing infrastructure
- [x] CI/CD pipeline

### 🚧 Phase 2 - Enhancement (In Progress)

- [x] AI coach
- [x] Receipt OCR
- [ ] Predictive analytics
- [ ] Budget customization

### 📅 Phase 3 - Advanced (Planned)

- [ ] Multi-currency
- [ ] Open Banking (PSD2)
- [ ] Mobile app
- [ ] Investment tracking

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

**Built with ❤️ - Empowering financial freedom**

[Edit in StackBlitz ⚡️](https://stackblitz.com/~/github.com/bilalmachraa82/Abundacecoach)
