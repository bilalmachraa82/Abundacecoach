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
  className = ''
}: MetricCardProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500 font-medium">{title}</span>
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${
            trend.positive 
              ? 'text-green-700 bg-green-50' 
              : 'text-red-700 bg-red-50'
          }`}>
            <span>{trend.positive ? '↑' : '↓'}</span>
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
    </div>
  );
}