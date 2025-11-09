# 🚀 Deployment Guide - AbundanceCoach

Guia completo de deployment para produção, alinhado com best practices de Outubro 2025.

## 📋 Pré-requisitos

- Node.js 20.19+ ou 22.12+
- npm ou yarn
- Conta Supabase
- Google Gemini API key
- (Opcional) Vercel account para deploy

## 🔧 Configuração do Ambiente

### 1. Clonar Repositório

```bash
git clone https://github.com/bilalmachraa82/Abundacecoach.git
cd Abundacecoach
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Environment Variables

```bash
cp .env.example .env
```

Edite `.env` com suas credenciais:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GEMINI_API_KEY=your-gemini-api-key
```

⚠️ **IMPORTANTE**: Nunca commitar o arquivo `.env`!

### 4. Configurar Supabase

#### Criar Projeto Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie novo projeto
3. Copie URL e Anon Key

#### Executar Migrations

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Link ao projeto
supabase link --project-ref your-project-ref

# Executar migrations
supabase db push
```

Ou manualmente no dashboard:

1. Acesse SQL Editor no Supabase
2. Execute `supabase/migrations/20250104213455_pale_truth.sql`
3. Execute `supabase/migrations/20250105002125_old_wind.sql`
4. Execute `supabase/migrations/20251021_budgets_and_settings.sql`

### 5. Obter Google Gemini API Key

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie nova API key
3. Adicione ao `.env`

## 🏗️ Build de Produção

### Verificar Código

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format checking
npm run format:check

# Tests
npm run test:run

# All-in-one validation
npm run validate
```

### Build

```bash
npm run build
```

Build output em `dist/`:

- Bundle principal: ~359KB
- Lazy chunks por rota
- Assets otimizados

### Preview Local

```bash
npm run preview
```

Acesse: `http://localhost:4173`

## 🌐 Deploy para Vercel

### Opção 1: Via CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy produção
vercel --prod
```

### Opção 2: Via GitHub

1. Conecte repositório ao Vercel
2. Configure environment variables no dashboard
3. Deploy automático em cada push

### Configurar Environment Variables no Vercel

Dashboard → Settings → Environment Variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GEMINI_API_KEY=your-gemini-api-key
```

## 🔐 Segurança em Produção

### Checklist de Segurança

- [ ] `.env` NÃO commitado
- [ ] Environment variables no Vercel/hosting
- [ ] Supabase RLS policies ativas
- [ ] HTTPS ativo
- [ ] CSP headers configurados
- [ ] Rate limiting configurado
- [ ] npm audit executado

### Regenerar Keys Expostas

Se credenciais foram expostas:

1. **Supabase:**
   - Dashboard → Settings → API
   - Regenerar keys
   - Atualizar em todos os ambientes

2. **Gemini API:**
   - Google AI Studio → API Keys
   - Revogar key antiga
   - Criar nova

## 📱 PWA Deployment

### Verificar Manifest

```bash
# Validar manifest.json
npx web-app-manifest-cli validate public/manifest.json
```

### Service Worker

Service Worker está em `public/sw.js` e será servido automaticamente.

### Testar PWA

1. Build produção
2. Servir com HTTPS (obrigatório para PWA)
3. Chrome DevTools → Application → Manifest
4. Verificar "Installable"

### Lighthouse Audit

```bash
npm install -g @lhci/cli

# Run audit
lhci autorun
```

Target scores:

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+
- PWA: ✅

## 🗄️ Database Migrations

### Adicionar Nova Migration

```bash
# Criar migration
supabase migration new migration_name

# Editar arquivo em supabase/migrations/

# Aplicar
supabase db push
```

### Rollback

```bash
supabase db reset
```

## 📊 Monitoring

### Recomendado para Produção

- **Error Tracking:** Sentry
- **Analytics:** Plausible ou Posthog
- **Performance:** Vercel Analytics
- **Logs:** Vercel Logs ou LogRocket

### Configurar Sentry (Opcional)

```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: import.meta.env.MODE,
});
```

## 🔄 CI/CD

### GitHub Actions

Workflows já configurados em `.github/workflows/`:

- `ci.yml` - Quality checks em cada push
- `deploy.yml` - Deploy automático para produção

### Configurar Secrets no GitHub

Repository → Settings → Secrets and variables → Actions:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_GEMINI_API_KEY
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

## 🧪 Testing em Produção

### Smoke Tests

```bash
# Build
npm run build

# Serve
npx serve dist

# Test endpoints
curl http://localhost:3000
curl http://localhost:3000/manifest.json
curl http://localhost:3000/sw.js
```

### E2E Tests (Futuro)

```bash
# Com Playwright
npx playwright test
```

## 📈 Performance Optimization

### Checklist

- [x] Code splitting implementado
- [x] Lazy loading de rotas
- [x] Service Worker caching
- [ ] Image optimization (add later)
- [ ] Font optimization (add later)
- [ ] CDN para static assets

### Bundle Analysis

```bash
npm run build

# Analyze
npx vite-bundle-visualizer
```

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variables Não Carregam

- Verificar prefixo `VITE_`
- Rebuild após mudanças
- Verificar typos

### Supabase Connection Fails

- Verificar URL e anon key
- Verificar RLS policies
- Verificar CORS settings

### PWA Não Instala

- Verificar HTTPS
- Verificar manifest.json válido
- Verificar Service Worker registado
- Chrome DevTools → Application → Service Workers

## 📞 Suporte

- **Docs:** README.md
- **Security:** SECURITY.md
- **Issues:** [GitHub Issues](https://github.com/bilalmachraa82/Abundacecoach/issues)

---

**Última atualização:** 2025-10-21  
**Versão:** 0.2.0
