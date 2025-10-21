import React from 'react';
import { Transaction } from '../../../types/finance';
import { MetricCard } from '../../metrics/MetricCard';
import { formatCurrency } from '../../../utils/formatters';
import { calculatePercentageChange } from '../../../utils/calculations';
import { Wallet } from 'lucide-react';

interface WeeklyMetricsProps {
  transactions: Transaction[];
}

export function WeeklyMetrics({ transactions }: WeeklyMetricsProps) {
  const thisWeek = React.useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    return transactions.filter(t => new Date(t.date) >= startOfWeek);
  }, [transactions]);

  const lastWeek = React.useMemo(() => {
    const now = new Date();
    const startOfLastWeek = new Date(now.setDate(now.getDate() - now.getDay() - 7));
    const endOfLastWeek = new Date(now.setDate(now.getDate() + 6));
    return transactions.filter(t => {
      const date = new Date(t.date);
      return date >= startOfLastWeek && date <= endOfLastWeek;
    });
  }, [transactions]);

  const metrics = {
    income: thisWeek.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : 0), 0),
    expenses: thisWeek.reduce((sum, t) => sum + (t.type === 'expense' ? t.amount : 0), 0),
    lastWeekIncome: lastWeek.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : 0), 0),
    lastWeekExpenses: lastWeek.reduce((sum, t) => sum + (t.type === 'expense' ? t.amount : 0), 0),
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <MetricCard
        title="Weekly Income"
        value={formatCurrency(metrics.income)}
        icon={Wallet}
        trend={{
          value: calculatePercentageChange(metrics.lastWeekIncome, metrics.income),
          positive: metrics.income >= metrics.lastWeekIncome,
        }}
      />
      <MetricCard
        title="Weekly Expenses"
        value={formatCurrency(metrics.expenses)}
        icon={Wallet}
        trend={{
          value: calculatePercentageChange(metrics.lastWeekExpenses, metrics.expenses),
          positive: metrics.expenses <= metrics.lastWeekExpenses,
        }}
      />
    </div>
  );
}
