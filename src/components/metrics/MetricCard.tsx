import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  color?: string;
  bgColor?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color = 'text-blue-600',
  bgColor = 'bg-blue-50',
  className = '',
}: MetricCardProps) {
  return (
    <div className={className}>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className={`rounded-lg p-2 ${bgColor}`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        {trend && (
          <div
            className={`flex items-center space-x-1 rounded-full px-2 py-1 text-sm ${
              trend.positive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            <span>{trend.positive ? '↑' : '↓'}</span>
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
