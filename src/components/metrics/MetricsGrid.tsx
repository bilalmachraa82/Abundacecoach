import React from 'react';
import { LineChart, Wallet, Target, TrendingUp } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { formatCurrency } from '../../utils/formatters';
import { t } from '../../utils/i18n';

interface MetricsGridProps {
  metrics: {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    monthlyGoalProgress: number;
  };
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const cards = [
    {
      title: t('totalIncome'),
      value: formatCurrency(metrics.totalIncome),
      icon: Wallet,
      trend: { value: 10, positive: true },
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: t('totalExpenses'),
      value: formatCurrency(metrics.totalExpenses),
      icon: LineChart,
      trend: { value: 5, positive: false },
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: t('balance'),
      value: formatCurrency(metrics.balance),
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: t('goalProgress'),
      value: `${metrics.monthlyGoalProgress}%`,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <MetricCard
          key={card.title}
          {...card}
          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
        />
      ))}
    </div>
  );
}