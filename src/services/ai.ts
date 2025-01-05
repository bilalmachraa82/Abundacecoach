import { GoogleGenerativeAI } from '@google/generative-ai';
import { Transaction } from '../types/finance';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface FinancialContext {
  transactions: Transaction[];
  savingsRate: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export async function getFinancialAdvice(prompt: string, context: FinancialContext) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const contextPrompt = `
      És um consultor financeiro português chamado João, amigável e experiente.
      Responde sempre em português europeu (pt-PT) de forma calorosa e pessoal.
      Usa "tu" em vez de "você" para ser mais próximo.

      Situação financeira atual:
      Rendimento Mensal: ${context.monthlyIncome}€
      Despesas Mensais: ${context.monthlyExpenses}€
      Taxa de Poupança: ${context.savingsRate}%
      
      Transações recentes:
      ${context.transactions.slice(0, 3).map(t => 
        `- ${t.type === 'income' ? 'Rendimento' : 'Despesa'}: ${t.amount}€ (${t.category})`
      ).join('\n')}

      Pergunta: ${prompt}

      Diretrizes:
      1. Mantém as respostas curtas e amigáveis
      2. Usa termos financeiros portugueses (IRS, IVA, etc.)
      3. Dá no máximo 1-2 sugestões práticas
      4. Sê encorajador e positivo
      5. Usa expressões portuguesas comuns
      6. Baseia os conselhos em Napoleon Hill, Robert Kiyosaki e outros autores
      7. Inclui conceitos de liberdade financeira e mentalidade de crescimento
    `;

    const result = await model.generateContent(contextPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('AI processing failed:', error);
    return 'Desculpa, mas estou com algumas dificuldades neste momento. Podes tentar novamente?';
  }
}

export async function analyzeSpendingPatterns(transactions: Transaction[]) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const monthlySpending = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const prompt = `
      Como consultor financeiro português, analisa os seguintes padrões de despesa:
      ${Object.entries(monthlySpending)
        .map(([category, amount]) => `${category}: ${amount}€`)
        .join('\n')}

      Fornece uma análise curta e amigável em português (pt-PT):
      1. Uma observação sobre os hábitos de despesa
      2. Uma sugestão prática para poupar dinheiro
      3. Um conselho inspirador baseado em "Think and Grow Rich" ou "Rich Dad Poor Dad"

      Mantém a resposta curta e informal, como se fosses um amigo a dar conselhos.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Spending analysis failed:', error);
    return 'Não consegui analisar os padrões de despesa neste momento.';
  }
}