import React from 'react';
import { PiggyBank, AlertCircle } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import { LoadingState } from '../components/dashboard/LoadingState';
import { ErrorState } from '../components/dashboard/ErrorState';
import { formatCurrency } from '../utils/formatters';

const budgetCategories = [
  { category: 'Housing', budget: 2000, spent: 1800 },
  { category: 'Food', budget: 800, spent: 650 },
  { category: 'Transport', budget: 400, spent: 380 },
  { category: 'Entertainment', budget: 300, spent: 420 },
  { category: 'Utilities', budget: 500, spent: 480 },
];

export default function Budget() {
  const { loading, error } = useTransactions();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Budget Overview</h1>
        <button className="flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          <PiggyBank className="h-5 w-5" />
          <span>Adjust Budget</span>
        </button>
      </div>

      <div className="grid gap-6">
        {budgetCategories.map(({ category, budget, spent }) => {
          const percentage = (spent / budget) * 100;
          const isOverBudget = spent > budget;

          return (
            <div key={category} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{category}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {formatCurrency(spent)} of {formatCurrency(budget)}
                  </span>
                  {isOverBudget && <AlertCircle className="h-5 w-5 text-red-500" />}
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex h-2 overflow-hidden rounded bg-gray-100 text-xs">
                  <div
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                    className={`flex flex-col justify-center whitespace-nowrap text-center text-white shadow-none ${
                      isOverBudget ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                  />
                </div>
              </div>

              {isOverBudget && (
                <p className="mt-2 text-sm text-red-600">
                  You've exceeded your budget by {formatCurrency(spent - budget)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
