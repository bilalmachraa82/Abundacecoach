import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { CashFlowChart } from '../components/charts/CashFlowChart';
import { ExpenseBreakdown } from '../components/charts/ExpenseBreakdown';
import { PredictiveChart } from '../components/analytics/PredictiveChart';
import { FinancialHealthScore } from '../components/analytics/FinancialHealthScore';
import { LoadingState } from '../components/dashboard/LoadingState';
import { ErrorState } from '../components/dashboard/ErrorState';
import { usePeriodStore } from '../stores/periodStore';

export default function Analytics() {
  const { transactions, loading, error } = useTransactions();
  const { period } = usePeriodStore();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Financial Analytics - {period}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FinancialHealthScore transactions={transactions} />
        <PredictiveChart transactions={transactions} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CashFlowChart transactions={transactions} />
        <ExpenseBreakdown transactions={transactions} />
      </div>
    </div>
  );
}