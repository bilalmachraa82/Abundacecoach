import React from 'react';
import { LineChart } from 'lucide-react';
import { Transaction } from '../../types/finance';
import { formatCurrency } from '../../utils/formatters';
import { t } from '../../utils/i18n';

interface CashFlowChartProps {
  transactions: Transaction[];
}

export function CashFlowChart({ transactions }: CashFlowChartProps) {
  const monthlyData = React.useMemo(() => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toLocaleString('pt-PT', { month: 'short' });
    }).reverse();

    const data = last6Months.map(month => {
      const monthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate.toLocaleString('pt-PT', { month: 'short' }) === month;
      });

      return {
        month,
        income: monthTransactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : 0), 0),
        expenses: monthTransactions.reduce((sum, t) => sum + (t.type === 'expense' ? t.amount : 0), 0),
      };
    });

    return data;
  }, [transactions]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{t('cashFlow')}</h2>
          <p className="text-sm text-gray-500">{t('cashFlowDescription')}</p>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          <LineChart className="w-5 h-5 text-blue-500" />
        </div>
      </div>
      <div className="h-64">
        <div className="flex h-full items-end space-x-4">
          {monthlyData.map(({ month, income, expenses }) => (
            <div key={month} className="flex-1 flex flex-col items-center">
              <div className="w-full space-y-1">
                <div 
                  className="bg-green-500 rounded-t"
                  style={{ height: `${(income / 10000) * 100}px` }}
                />
                <div 
                  className="bg-red-500 rounded-t"
                  style={{ height: `${(expenses / 10000) * 100}px` }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-600">{month}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}