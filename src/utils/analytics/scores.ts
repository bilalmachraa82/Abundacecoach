import { MonthlyTrend } from './trends';

export function calculateIncomeStabilityScore(trends: MonthlyTrend[]): number {
  if (trends.length < 2) return 0;

  const incomes = trends.map(t => t.income);
  const avgIncome = incomes.reduce((sum, inc) => sum + inc, 0) / incomes.length;
  const variance = incomes.reduce((sum, inc) => sum + Math.pow(inc - avgIncome, 2), 0) / incomes.length;
  const stability = Math.max(0, 20 - (variance / (avgIncome * avgIncome)) * 1000);

  return Math.min(stability, 20);
}

export function calculateExpenseManagementScore(trends: MonthlyTrend[]): number {
  if (trends.length === 0) return 0;

  const expenseRatios = trends.map(t => t.income > 0 ? t.expenses / t.income : 1);
  const avgRatio = expenseRatios.reduce((sum, ratio) => sum + ratio, 0) / expenseRatios.length;
  
  return Math.max(0, Math.min(20, 20 - (avgRatio - 0.8) * 100));
}

export function calculateGrowthScore(trends: MonthlyTrend[]): number {
  if (trends.length < 2) return 0;

  const firstMonth = trends[0];
  const lastMonth = trends[trends.length - 1];
  
  const incomeGrowth = firstMonth.income > 0 
    ? (lastMonth.income - firstMonth.income) / firstMonth.income
    : 0;
  const savingsGrowth = lastMonth.savings > firstMonth.savings ? 1 : -1;

  const growthScore = (incomeGrowth * 10) + (savingsGrowth * 10);
  return Math.max(0, Math.min(growthScore, 20));
}