import { Transaction } from '../../types/finance';
import { subMonths, startOfMonth, endOfMonth, format } from 'date-fns';

export interface MonthlyTrend {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export function calculateMonthlyTrends(transactions: Transaction[]): MonthlyTrend[] {
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return {
      start: startOfMonth(date),
      end: endOfMonth(date),
      month: format(date, 'MMM'),
    };
  }).reverse();

  return last6Months.map(({ start, end, month }) => {
    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date >= start && date <= end;
    });

    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month,
      income,
      expenses,
      savings: income - expenses,
    };
  });
}

export function predictNextMonth(trends: MonthlyTrend[]): MonthlyTrend {
  if (trends.length === 0) {
    return { month: 'Next', income: 0, expenses: 0, savings: 0 };
  }

  const income = trends.reduce((sum, t) => sum + t.income, 0) / trends.length;
  const expenses = trends.reduce((sum, t) => sum + t.expenses, 0) / trends.length;

  const predictedIncome = income * 1.02;
  const predictedExpenses = expenses * 0.98;

  return {
    month: 'Next',
    income: Math.round(predictedIncome),
    expenses: Math.round(predictedExpenses),
    savings: Math.round(predictedIncome - predictedExpenses),
  };
}
