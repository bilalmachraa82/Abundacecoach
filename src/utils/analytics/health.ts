import { Transaction } from '../../types/finance';
import { calculateMonthlyTrends } from './trends';
import { calculateIncomeStabilityScore, calculateExpenseManagementScore, calculateGrowthScore } from './scores';

export function calculateFinancialHealthScore(transactions: Transaction[]) {
  if (!transactions.length) {
    return getEmptyHealthScore();
  }

  const trends = calculateMonthlyTrends(transactions);
  const lastMonth = trends[trends.length - 1];

  const savingsRate = lastMonth.income > 0 
    ? (lastMonth.savings / lastMonth.income) * 100 
    : 0;

  const breakdown = [
    {
      category: 'Taxa de Poupança',
      score: Math.min(savingsRate * 2, 40),
      maxScore: 40,
      message: 'Procure poupar pelo menos 20% dos seus rendimentos'
    },
    {
      category: 'Estabilidade de Rendimentos',
      score: calculateIncomeStabilityScore(trends),
      maxScore: 20,
      message: 'Rendimentos regulares contribuem para a saúde financeira'
    },
    {
      category: 'Gestão de Despesas',
      score: calculateExpenseManagementScore(trends),
      maxScore: 20,
      message: 'Mantenha as despesas controladas e abaixo dos rendimentos'
    },
    {
      category: 'Crescimento Financeiro',
      score: calculateGrowthScore(trends),
      maxScore: 20,
      message: 'Tendência positiva em poupanças e rendimentos'
    }
  ];

  const totalScore = Math.round(
    breakdown.reduce((sum, item) => sum + item.score, 0)
  );

  return { score: totalScore, breakdown };
}

function getEmptyHealthScore() {
  return {
    score: 0,
    breakdown: [
      {
        category: 'Taxa de Poupança',
        score: 0,
        maxScore: 40,
        message: 'Comece a registar transações para calcular a sua taxa de poupança'
      },
      {
        category: 'Estabilidade de Rendimentos',
        score: 0,
        maxScore: 20,
        message: 'Rendimentos regulares contribuem para a saúde financeira'
      },
      {
        category: 'Gestão de Despesas',
        score: 0,
        maxScore: 20,
        message: 'Mantenha as despesas controladas e abaixo dos rendimentos'
      },
      {
        category: 'Crescimento Financeiro',
        score: 0,
        maxScore: 20,
        message: 'Tendência positiva em poupanças e rendimentos'
      }
    ]
  };
}