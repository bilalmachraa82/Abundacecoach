import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { TransactionList } from '../components/transactions/TransactionList';
import { TransactionForm } from '../components/transactions/TransactionForm';
import { LoadingState } from '../components/dashboard/LoadingState';
import { ErrorState } from '../components/dashboard/ErrorState';

export default function Transactions() {
  const { transactions, loading, error, addTransaction } = useTransactions();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <div className="space-y-6">
      <TransactionForm onSubmit={addTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  );
}