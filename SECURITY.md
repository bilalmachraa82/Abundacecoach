# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please do the following:

1. **Do NOT** create a public GitHub issue
2. Email the security team at: [your-security-email@example.com]
3. Include as much information as possible:
   - Type of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We aim to respond to security reports within 48 hours.

## Security Best Practices

This project follows modern security best practices:

### Environment Variables

- ✅ All sensitive credentials are in `.env` (never committed)
- ✅ Environment variable validation at startup
- ✅ Type-safe configuration with TypeScript
- ✅ Separate configs for dev/staging/production

### Dependencies

- ✅ Regular `npm audit` checks in CI/CD
- ✅ Automated dependency updates via Dependabot
- ✅ Lock file committed to prevent supply chain attacks
- ✅ Pre-commit hooks prevent insecure code

### Code Quality

- ✅ TypeScript strict mode enabled
- ✅ ESLint security rules enforced
- ✅ Automated testing (unit + integration)
- ✅ Code coverage reporting

### API Security

- ✅ Row-Level Security (RLS) on Supabase
- ✅ JWT-based authentication
- ✅ HTTPS-only connections
- ✅ CORS properly configured

### Build & Deployment

- ✅ Environment secrets managed via GitHub Secrets
- ✅ Build artifacts scanned for vulnerabilities
- ✅ Automated security audits in CI/CD
- ✅ Production builds are optimized and minified

## Known Security Considerations

### Client-Side Environment Variables

⚠️ **Important**: Any `VITE_*` environment variable is **bundled into the client-side code** and is **publicly accessible**.

**Never store sensitive secrets in VITE\_ variables:**

- ❌ Private API keys
- ❌ Database credentials
- ❌ Secret tokens

**Safe to use VITE\_ for:**

- ✅ Public API endpoints
- ✅ Public anonymous keys (like Supabase anon key)
- ✅ Feature flags
- ✅ Public configuration

### Supabase Anonymous Key

The `VITE_SUPABASE_ANON_KEY` is intentionally public and protected by:

- Row-Level Security (RLS) policies
- User authentication requirements
- Database-level permissions

### Third-Party Services

This application uses:

- **Supabase**: PostgreSQL database with built-in auth
- **Google Gemini AI**: For financial advice generation
- **Tesseract.js**: Client-side OCR (no data sent to servers)

All external API calls are logged and monitored.

## Security Updates

We monitor security advisories from:

- npm security advisories
- GitHub Security Advisories
- Snyk vulnerability database
- CVE database

## Compliance

This project aims to comply with:

- GDPR (data protection)
- WCAG 2.2 (accessibility)
- OWASP Top 10 (web security)

## Contact

For security concerns, contact: [your-email@example.com]

Last updated: 2025-10-21
