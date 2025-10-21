import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { MetricsGrid } from '../components/metrics/MetricsGrid';
import { LoadingState } from '../components/dashboard/LoadingState';
import { ErrorState } from '../components/dashboard/ErrorState';
import { CashFlowChart } from '../components/charts/CashFlowChart';
import { ExpenseBreakdown } from '../components/charts/ExpenseBreakdown';
import { MonthlyReport } from '../components/analytics/MonthlyReport';
import { WeeklyMetrics } from '../components/dashboard/metrics/WeeklyMetrics';
import { IncomeSourceChart } from '../components/dashboard/charts/IncomeSourceChart';
import { SavingsGoal } from '../components/dashboard/goals/SavingsGoal';
import { DailyQuote } from '../components/dashboard/DailyQuote';
import { FinancialCoach } from '../components/ai/FinancialCoach';

export default function Dashboard() {
  const { transactions, loading, error } = useTransactions();

  const metrics = React.useMemo(
    () => ({
      totalIncome: transactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : 0), 0),
      totalExpenses: transactions.reduce(
        (sum, t) => sum + (t.type === 'expense' ? t.amount : 0),
        0
      ),
      balance: transactions.reduce(
        (sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount),
        0
      ),
      monthlyGoalProgress: 75,
    }),
    [transactions]
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <div className="space-y-6">
      <DailyQuote />
      <MetricsGrid metrics={metrics} />

      <FinancialCoach />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CashFlowChart transactions={transactions} />
        <ExpenseBreakdown transactions={transactions} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <IncomeSourceChart transactions={transactions} />
        <MonthlyReport transactions={transactions} />
        <SavingsGoal target={5000} current={3750} />
      </div>
    </div>
  );
}
