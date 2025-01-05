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
    return income.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);
  }, [transactions]);

  const sortedSources = Object.entries(incomeBySource)
    .sort(([, a], [, b]) => b - a);

  const total = sortedSources.reduce((sum, [, amount]) => sum + amount, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Income Sources</h2>
          <p className="text-sm text-gray-500">Distribution by category</p>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          <PieChart className="w-5 h-5 text-blue-500" />
        </div>
      </div>
      <div className="space-y-4">
        {sortedSources.map(([source, amount]) => {
          const percentage = (amount / total) * 100;
          return (
            <div key={source} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 capitalize">{source}</span>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-green-500 rounded-full h-2"
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