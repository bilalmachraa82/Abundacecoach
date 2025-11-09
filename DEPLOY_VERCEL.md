# 🚀 Deploy Vercel - AbundanceCoach

Guia completo para fazer deploy do projeto no Vercel.

## 📋 Pré-requisitos

Antes de começar, garante que tens:

1. ✅ Conta no [Vercel](https://vercel.com) (grátis)
2. ✅ Projeto no GitHub com todos os commits pushed
3. ✅ Credenciais do Supabase
4. ✅ API Key do Google Gemini
5. ⚠️ API Key do Anthropic Claude (opcional)

---

## 🎯 Método 1: Deploy via Dashboard (Recomendado)

### Passo 1: Importar Projeto

1. Vai para https://vercel.com/dashboard
2. Clica em **"Add New Project"**
3. Seleciona **"Import Git Repository"**
4. Escolhe o repositório: `bilalmachraa82/Abundacecoach`
5. Clica em **"Import"**

### Passo 2: Configurar Projeto

Na tela de configuração:

**Framework Preset:** Vite
**Root Directory:** `./` (deixa padrão)
**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

### Passo 3: Variáveis de Ambiente

Clica em **"Environment Variables"** e adiciona:

#### ⚠️ OBRIGATÓRIAS:

```env
VITE_SUPABASE_URL
Valor: https://seu-projeto.supabase.co
```

```env
VITE_SUPABASE_ANON_KEY
Valor: sua-chave-anon-key-do-supabase
```

```env
VITE_GEMINI_API_KEY
Valor: sua-chave-api-do-gemini
```

#### ✨ OPCIONAL (Para análises avançadas com Claude):

```env
VITE_ANTHROPIC_API_KEY
Valor: sua-chave-api-do-anthropic
```

**IMPORTANTE:** Marca todas as variáveis para **Production**, **Preview** e **Development**

### Passo 4: Deploy

1. Clica em **"Deploy"**
2. Aguarda o build (2-3 minutos)
3. 🎉 Site online!

---

## 🎯 Método 2: Deploy via CLI (Avançado)

### Instalação do Vercel CLI

```bash
npm install -g vercel
```

### Login

```bash
vercel login
```

### Deploy

```bash
# Deploy para preview
vercel

# Deploy para produção
vercel --prod
```

### Configurar Variáveis de Ambiente via CLI

```bash
# Supabase URL
vercel env add VITE_SUPABASE_URL

# Supabase Anon Key
vercel env add VITE_SUPABASE_ANON_KEY

# Gemini API Key
vercel env add VITE_GEMINI_API_KEY

# Anthropic API Key (opcional)
vercel env add VITE_ANTHROPIC_API_KEY
```

Quando perguntado, seleciona: **Production, Preview, Development**

---

## 🔍 Como Obter as Credenciais

### 1. Supabase

1. Vai para: https://supabase.com/dashboard
2. Seleciona o teu projeto
3. Vai em **Settings → API**
4. Copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

### 2. Google Gemini

1. Vai para: https://makersuite.google.com/app/apikey
2. Clica em **"Create API Key"**
3. Copia a chave → `VITE_GEMINI_API_KEY`

### 3. Anthropic Claude (Opcional)

1. Vai para: https://console.anthropic.com/settings/keys
2. Clica em **"Create Key"**
3. Copia a chave → `VITE_ANTHROPIC_API_KEY`

---

## ✅ Verificar Deploy

### 1. Build bem-sucedido

```
✓ Building...
✓ Deploying...
✓ Ready!
```

### 2. Testar funcionalidades

- [ ] Site carrega
- [ ] Login funciona
- [ ] Dashboard mostra dados
- [ ] AI Coach responde (streaming)
- [ ] Feng Shui Advisor funciona
- [ ] PWA installable
- [ ] Service Worker ativo

### 3. Verificar Console

Abre DevTools (F12) e verifica:

- ✅ Sem erros de environment variables
- ✅ Supabase conectado
- ✅ AI SDK funcionando

---

## 🔄 Configurações Automáticas

O Vercel automaticamente:

- ✅ Rebuilda quando fazes push para o GitHub
- ✅ Cria preview para cada Pull Request
- ✅ Usa edge network global (CDN)
- ✅ Configura HTTPS automático
- ✅ Comprime assets
- ✅ Ativa HTTP/2

---

## 🐛 Troubleshooting

### Erro: "Environment variable not found"

**Solução:**

1. Vai em **Settings → Environment Variables**
2. Verifica se todas as 3 obrigatórias estão configuradas
3. Clica em **Redeploy** após adicionar

### Erro: "Build failed"

**Solução:**

```bash
# Testa build localmente
npm run build

# Se funcionar localmente, verifica logs no Vercel
```

### Erro: "404 on page refresh"

**Solução:** O arquivo `vercel.json` já tem a configuração de rewrite. Se ainda acontecer, verifica se o arquivo está no repositório.

### PWA não instala

**Solução:**

1. Verifica se `manifest.json` existe em `/public`
2. Verifica se `sw.js` existe em `/public`
3. HTTPS é obrigatório (Vercel já fornece)

---

## 🚀 Domains Custom (Opcional)

### Adicionar domínio próprio:

1. Vai em **Settings → Domains**
2. Clica em **"Add Domain"**
3. Adiciona teu domínio (ex: `abundancecoach.com`)
4. Configura DNS conforme instruções

**O Vercel fornece SSL/HTTPS automático!**

---

## 📊 Monitoramento

### Analytics (Grátis no Vercel)

- Vai em **Analytics** no dashboard
- Vê visitantes, performance, Web Vitals

### Speed Insights

```bash
npm install @vercel/speed-insights
```

```typescript
// src/main.tsx
import { injectSpeedInsights } from '@vercel/speed-insights';
injectSpeedInsights();
```

---

## 💰 Custos

**Vercel Hobby (Grátis):**

- ✅ 100GB bandwidth/mês
- ✅ Builds ilimitados
- ✅ Edge Network global
- ✅ Automatic HTTPS
- ✅ Preview deployments

**Gemini API:**

- Gemini 2.0 Flash: **€0.075 / 1M tokens**
- ~3.000 conversas/mês = **€3-5/mês**

**Anthropic Claude (Opcional):**

- Claude 3.7 Sonnet: **€3 / 1M tokens**
- Só usa para análises complexas = **€5-10/mês**

**Total estimado:** €0 (Vercel) + €3-5 (Gemini) = **€3-5/mês** 🎉

---

## 🎯 Próximos Passos Após Deploy

1. ✅ Testar todas as funcionalidades
2. ✅ Configurar domínio custom (opcional)
3. ✅ Ativar Analytics
4. ✅ Fazer backup do Supabase
5. ✅ Configurar alertas de custos da API
6. ✅ Partilhar com utilizadores! 🚀

---

## 📞 Suporte

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Vite Docs:** https://vitejs.dev

**Pronto para produção! 🚀**
