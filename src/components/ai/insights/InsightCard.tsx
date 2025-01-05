import React from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { Transaction } from '../../../types/finance';
import { formatCurrency } from '../../../utils/formatters';
import { t } from '../../../utils/i18n';

interface InsightCardProps {
  transactions: Transaction[];
}

export function InsightCard({ transactions }: InsightCardProps) {
  const insights = React.useMemo(() => {
    const monthlyIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const savingsRate = monthlyIncome > 0 
      ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100
      : 0;

    return [
      {
        title: t('monthlyOverview'),
        message: `${t('income')}: ${formatCurrency(monthlyIncome)} | ${t('expenses')}: ${formatCurrency(monthlyExpenses)}`,
        icon: TrendingUp,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        title: t('savingsRate'),
        message: t('currentSavingsRate', { rate: savingsRate.toFixed(1) }),
        icon: AlertCircle,
        color: savingsRate >= 20 ? 'text-green-600' : 'text-yellow-600',
        bgColor: savingsRate >= 20 ? 'bg-green-50' : 'bg-yellow-50'
      }
    ];
  }, [transactions]);

  return (
    <>
      {insights.map((insight, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`p-2 rounded-lg ${insight.bgColor}`}>
              <insight.icon className={`w-5 h-5 ${insight.color}`} />
            </div>
            <h3 className="font-medium text-gray-900">{insight.title}</h3>
          </div>
          <p className="text-gray-600">{insight.message}</p>
        </div>
      ))}
    </>
  );
}