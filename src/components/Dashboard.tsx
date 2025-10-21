import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { DashboardMetrics } from './dashboard/DashboardMetrics';
import { LoadingState } from './dashboard/LoadingState';
import { ErrorState } from './dashboard/ErrorState';
import { TransactionForm } from './transactions/TransactionForm';
import { TransactionList } from './transactions/TransactionList';
import { CashFlowChart } from './charts/CashFlowChart';
import { ExpenseBreakdown } from './charts/ExpenseBreakdown';
import { MonthlyReport } from './analytics/MonthlyReport';
import { WeeklyMetrics } from './dashboard/metrics/WeeklyMetrics';
import { IncomeSourceChart } from './dashboard/charts/IncomeSourceChart';
import { SavingsGoal } from './dashboard/goals/SavingsGoal';
import { DailyQuote } from './dashboard/DailyQuote';
import { t } from '../utils/i18n';

export default function Dashboard() {
  const { transactions, loading, error, addTransaction } = useTransactions();

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

  const today = new Date();
  const formattedDate = today.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="mb-4 bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold capitalize text-gray-900">{formattedDate}</h1>
      </header>

      <div className="space-y-4 px-4 pb-20 md:pb-8">
        <DailyQuote />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DashboardMetrics metrics={metrics} />
          <WeeklyMetrics transactions={transactions} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CashFlowChart transactions={transactions} />
          <ExpenseBreakdown transactions={transactions} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <IncomeSourceChart transactions={transactions} />
          <MonthlyReport transactions={transactions} />
          <SavingsGoal target={5000} current={3750} />
        </div>

        <div className="space-y-4">
          <TransactionForm onSubmit={addTransaction} />
          <TransactionList transactions={transactions} />
        </div>
      </div>

      {/* Fixed Add Transaction Button for Mobile */}
      <button
        onClick={() =>
          document.getElementById('transaction-form')?.scrollIntoView({ behavior: 'smooth' })
        }
        className="fixed bottom-4 right-4 rounded-full bg-blue-500 p-4 text-white shadow-lg transition-colors hover:bg-blue-600 md:hidden"
        aria-label="Add Transaction"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
