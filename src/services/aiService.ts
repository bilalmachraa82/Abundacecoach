/**
 * Unified AI Service
 * Best Practice 2025: Multi-model support with Vercel AI SDK
 * Uses Gemini for fast responses and Claude for complex analysis
 */
import { generateText, streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';
import { config } from '../config/env';
import { logger } from '../utils/logger';
import { withRateLimit } from '../utils/rateLimiter';
import { Transaction } from '../types/finance';

/**
 * AI Models Configuration
 * Gemini 2.0 Flash: Fast, cost-effective, excellent for Portuguese
 * Claude 3.7 Sonnet: Advanced reasoning, better for complex analysis
 */
const MODELS = {
  gemini: google('gemini-2.0-flash-exp', {
    // Prompt caching enabled for system prompts
    usePromptCache: true,
  }),
  claude: config.hasAnthropic
    ? anthropic('claude-3-7-sonnet-20250219', {
        cacheControl: true,
      })
    : null,
} as const;

interface FinancialContext {
  transactions: Transaction[];
  savingsRate: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

/**
 * System prompt for financial advisor (cached for cost reduction)
 */
const FINANCIAL_ADVISOR_SYSTEM = {
  role: 'system' as const,
  content: `És um consultor financeiro português chamado João, amigável e experiente.
Responde sempre em português europeu (pt-PT) de forma calorosa e pessoal.
Usa "tu" em vez de "você" para ser mais próximo.

Diretrizes:
1. Mantém as respostas curtas e amigáveis (máximo 3-4 frases)
2. Usa termos financeiros portugueses (IRS, IVA, etc.)
3. Dá no máximo 1-2 sugestões práticas
4. Sê encorajador e positivo
5. Usa expressões portuguesas comuns
6. Baseia os conselhos em Napoleon Hill, Robert Kiyosaki e outros autores
7. Inclui conceitos de liberdade financeira e mentalidade de crescimento`,
  experimental_providerMetadata: {
    anthropic: { cacheControl: { type: 'ephemeral' } },
  },
};

/**
 * Get financial advice with streaming support
 * Uses Gemini 2.0 Flash for fast, cost-effective responses
 */
export async function getFinancialAdvice(prompt: string, context: FinancialContext) {
  try {
    return await withRateLimit('AI_QUERY', 'financial-advice', async () => {
      const contextPrompt = `
        Situação financeira atual:
        Rendimento Mensal: ${context.monthlyIncome}€
        Despesas Mensais: ${context.monthlyExpenses}€
        Taxa de Poupança: ${context.savingsRate}%

        Transações recentes:
        ${context.transactions
          .slice(0, 3)
          .map(
            t => `- ${t.type === 'income' ? 'Rendimento' : 'Despesa'}: ${t.amount}€ (${t.category})`
          )
          .join('\n')}

        Pergunta: ${prompt}
      `;

      const result = await generateText({
        model: MODELS.gemini,
        messages: [FINANCIAL_ADVISOR_SYSTEM, { role: 'user', content: contextPrompt }],
        temperature: 0.7,
        maxTokens: 300,
      });

      return result.text;
    });
  } catch (error) {
    logger.error('AI financial advice failed', error as Error, {
      prompt,
      contextSummary: 'financial advice',
    });
    return 'Desculpa, mas estou com algumas dificuldades neste momento. Podes tentar novamente?';
  }
}

/**
 * Stream financial advice for better UX
 * Responses appear progressively
 */
export async function streamFinancialAdvice(prompt: string, context: FinancialContext) {
  try {
    const contextPrompt = `
      Situação financeira atual:
      Rendimento Mensal: ${context.monthlyIncome}€
      Despesas Mensais: ${context.monthlyExpenses}€
      Taxa de Poupança: ${context.savingsRate}%

      Transações recentes:
      ${context.transactions
        .slice(0, 3)
        .map(
          t => `- ${t.type === 'income' ? 'Rendimento' : 'Despesa'}: ${t.amount}€ (${t.category})`
        )
        .join('\n')}

      Pergunta: ${prompt}
    `;

    return streamText({
      model: MODELS.gemini,
      messages: [FINANCIAL_ADVISOR_SYSTEM, { role: 'user', content: contextPrompt }],
      temperature: 0.7,
      maxTokens: 300,
    });
  } catch (error) {
    logger.error('AI financial advice streaming failed', error as Error, { prompt });
    throw error;
  }
}

/**
 * Analyze spending patterns with advanced reasoning
 * Uses Claude 3.7 Sonnet if available, otherwise Gemini
 */
export async function analyzeSpendingPatterns(transactions: Transaction[]) {
  try {
    const monthlySpending = transactions
      .filter(t => t.type === 'expense')
      .reduce(
        (acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + t.amount;
          return acc;
        },
        {} as Record<string, number>
      );

    const prompt = `
      Como consultor financeiro português, analisa os seguintes padrões de despesa:
      ${Object.entries(monthlySpending)
        .map(([category, amount]) => `${category}: ${amount}€`)
        .join('\n')}

      Fornece uma análise detalhada em português (pt-PT):
      1. Identifica padrões e tendências nos gastos
      2. Sugere 2-3 áreas específicas para otimização
      3. Calcula potencial de poupança mensal
      4. Dá um conselho inspirador baseado em "Think and Grow Rich" ou "Rich Dad Poor Dad"

      Mantém a resposta estruturada mas amigável.
    `;

    // Use Claude for better reasoning if available, otherwise Gemini
    const model = MODELS.claude || MODELS.gemini;

    const result = await generateText({
      model,
      messages: [FINANCIAL_ADVISOR_SYSTEM, { role: 'user', content: prompt }],
      temperature: 0.5, // Lower temperature for more analytical response
      maxTokens: 500,
    });

    logger.info('Spending analysis completed', {
      model: MODELS.claude ? 'claude' : 'gemini',
      categoriesAnalyzed: Object.keys(monthlySpending).length,
    });

    return result.text;
  } catch (error) {
    logger.error('Spending analysis failed', error as Error, {
      transactionCount: transactions.length,
    });
    return 'Não consegui analisar os padrões de despesa neste momento.';
  }
}

/**
 * System prompt for Feng Shui advisor
 */
const FENG_SHUI_SYSTEM = {
  role: 'system' as const,
  content: `És um Mestre em Feng Shui português chamado João.
Manténs um tom amigável e pessoal, como se fosses um amigo próximo dando conselhos.

Diretrizes:
1. Respostas curtas e diretas (máximo 3 frases)
2. Uma sugestão prática por vez
3. Termina com uma pergunta curta e relevante
4. Usa "tu" e linguagem informal
5. Evita introduções ou explicações longas
6. Foca em ações simples e imediatas

Conhecimentos integrados:
- Feng Shui e Ba Gua
- Códigos Grabovoi
- Cristais e pedras
- Afformações (Noah St. John)
- Lei da Atração`,
  experimental_providerMetadata: {
    anthropic: { cacheControl: { type: 'ephemeral' } },
  },
};

/**
 * Get Feng Shui advice with streaming
 */
export async function getFengShuiAdvice(prompt: string) {
  try {
    return await withRateLimit('AI_QUERY', 'feng-shui-advice', async () => {
      const result = await generateText({
        model: MODELS.gemini,
        messages: [FENG_SHUI_SYSTEM, { role: 'user', content: prompt }],
        temperature: 0.8, // Higher temperature for creative responses
        maxTokens: 200,
      });

      return result.text;
    });
  } catch (error) {
    logger.error('Feng Shui AI processing failed', error as Error, { prompt });
    return 'Ups, tive um pequeno problema. Podemos tentar de novo?';
  }
}

/**
 * Stream Feng Shui advice for better UX
 */
export async function streamFengShuiAdvice(prompt: string) {
  try {
    return streamText({
      model: MODELS.gemini,
      messages: [FENG_SHUI_SYSTEM, { role: 'user', content: prompt }],
      temperature: 0.8,
      maxTokens: 200,
    });
  } catch (error) {
    logger.error('Feng Shui AI streaming failed', error as Error, { prompt });
    throw error;
  }
}

/**
 * Check if advanced analysis (Claude) is available
 */
export function hasAdvancedAnalysis(): boolean {
  return MODELS.claude !== null;
}
