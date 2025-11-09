import React from 'react';
import { Transaction } from '../../../types/finance';
import { PieChart } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface IncomeSourceChartProps {
  transactions: Transaction[];
}

export function IncomeSourceChart({ transactions }: IncomeSourceChartProps) {
  const incomeBySource = React.useMemo(() => {
    const income = transactions.filter(t => t.type === 'income');
    return income.reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [transactions]);

  const sortedSources = Object.entries(incomeBySource).sort(([, a], [, b]) => b - a);

  const total = sortedSources.reduce((sum, [, amount]) => sum + amount, 0);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Income Sources</h2>
          <p className="text-sm text-gray-500">Distribution by category</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-2">
          <PieChart className="h-5 w-5 text-blue-500" />
        </div>
      </div>
      <div className="space-y-4">
        {sortedSources.map(([source, amount]) => {
          const percentage = (amount / total) * 100;
          return (
            <div key={source} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="capitalize text-gray-600">{source}</span>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{percentage.toFixed(1)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
