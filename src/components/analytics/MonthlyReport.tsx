import React, { useMemo } from 'react';
import { Transaction } from '../../types/finance';
import { formatCurrency } from '../../utils/formatters';
import { t } from '../../utils/i18n';

interface MonthlyReportProps {
  transactions: Transaction[];
}

export function MonthlyReport({ transactions }: MonthlyReportProps) {
  const stats = useMemo(() => {
    const now = new Date();
    const thisMonth = transactions.filter(t => 
      new Date(t.date).getMonth() === now.getMonth() &&
      new Date(t.date).getFullYear() === now.getFullYear()
    );

    return {
      income: thisMonth.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : 0), 0),
      expenses: thisMonth.reduce((sum, t) => sum + (t.type === 'expense' ? t.amount : 0), 0),
      topCategories: Object.entries(
        thisMonth.reduce((acc, t) => ({
          ...acc,
          [t.category]: (acc[t.category] || 0) + t.amount
        }), {} as Record<string, number>)
      ).sort(([, a], [, b]) => b - a).slice(0, 5)
    };
  }, [transactions]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('monthlyReport')}</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">{t('monthlyIncome')}</p>
            <p className="text-lg font-medium text-green-600">{formatCurrency(stats.income)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('monthlyExpenses')}</p>
            <p className="text-lg font-medium text-red-600">{formatCurrency(stats.expenses)}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">{t('topCategories')}</h3>
          <div className="space-y-2">
            {stats.topCategories.map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t(category)}</span>
                <span className="text-sm font-medium">{formatCurrency(amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}