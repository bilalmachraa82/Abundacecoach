import React from 'react';
import { PieChart } from 'lucide-react';
import { Transaction } from '../../types/finance';
import { formatCurrency } from '../../utils/formatters';
import { t } from '../../utils/i18n';
import { getCategoryGroup } from '../../utils/categoryUtils';

interface ExpenseBreakdownProps {
  transactions: Transaction[];
}

export function ExpenseBreakdown({ transactions }: ExpenseBreakdownProps) {
  const expensesByCategory = React.useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const groups = expenses.reduce(
      (acc, t) => {
        const group = getCategoryGroup(t.category);
        acc[group] = (acc[group] || 0) + t.amount;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(groups)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  }, [transactions]);

  const total = expensesByCategory.reduce((sum, [, amount]) => sum + amount, 0);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{t('expenseBreakdown')}</h2>
          <p className="text-sm text-gray-500">{t('expenseBreakdownDescription')}</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-2">
          <PieChart className="h-5 w-5 text-blue-500" />
        </div>
      </div>
      <div className="space-y-4">
        {expensesByCategory.map(([category, amount]) => {
          const percentage = (amount / total) * 100;
          return (
            <div key={category} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t(category.toLowerCase())}</span>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: `${percentage}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
