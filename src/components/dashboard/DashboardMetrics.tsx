import React from 'react';
import { LineChart, Wallet, Target, PieChart } from 'lucide-react';
import { MetricCard } from '../metrics/MetricCard';
import { formatCurrency } from '../../utils/formatters';
import { t } from '../../utils/i18n';
import { DashboardMetrics as Metrics } from '../../types/finance';

interface DashboardMetricsProps {
  metrics: Metrics;
}

export function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title={t('totalIncome')}
        value={formatCurrency(metrics.totalIncome)}
        icon={Wallet}
        trend={{ value: 12, positive: true }}
      />
      <MetricCard
        title={t('totalExpenses')}
        value={formatCurrency(metrics.totalExpenses)}
        icon={LineChart}
        trend={{ value: 5, positive: false }}
      />
      <MetricCard title={t('balance')} value={formatCurrency(metrics.balance)} icon={PieChart} />
      <MetricCard
        title={t('goalProgress')}
        value={`${metrics.monthlyGoalProgress}%`}
        icon={Target}
      />
    </div>
  );
}
