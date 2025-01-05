export function calculatePercentageChange(previous: number, current: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export function calculateSavingsRate(income: number, expenses: number): number {
  if (income === 0) return 0;
  return Math.round(((income - expenses) / income) * 100);
}

export function calculateDebtToIncomeRatio(monthlyDebtPayments: number, monthlyIncome: number): number {
  if (monthlyIncome === 0) return 0;
  return Math.round((monthlyDebtPayments / monthlyIncome) * 100);
}