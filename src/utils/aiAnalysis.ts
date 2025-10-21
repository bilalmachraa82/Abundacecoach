import { Transaction } from '../types/finance';
import { calculateSavingsRate, calculateDebtToIncomeRatio } from './calculations';

export async function analyzeTransactions(transactions: Transaction[]) {
  // Calculate key financial metrics
  const monthlyIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const savingsRate = calculateSavingsRate(monthlyIncome, monthlyExpenses);

  // Generate insights
  const insights = [];

  if (savingsRate < 20) {
    insights.push(
      'Your savings rate is below the recommended 20%. Consider reducing non-essential expenses.'
    );
  }

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      },
      {} as Record<string, number>
    );

  const topExpenses = Object.entries(expensesByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  insights.push(
    `Your top spending categories are: ${topExpenses
      .map(([category, amount]) => `${category} (${amount}€)`)
      .join(', ')}`
  );

  return insights.join('\n');
}
