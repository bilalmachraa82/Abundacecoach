import React from 'react';
import { Target } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface GoalCardProps {
  name: string;
  target: number;
  current: number;
}

export function GoalCard({ name, target, current }: GoalCardProps) {
  const progress = Math.min((current / target) * 100, 100);
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500">Target: {formatCurrency(target)}</p>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          <Target className="w-5 h-5 text-blue-500" />
        </div>
      </div>
      
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {progress.toFixed(0)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          />
        </div>
        <p className="text-center text-sm text-gray-600">
          {formatCurrency(current)} saved of {formatCurrency(target)}
        </p>
      </div>
    </div>
  );
}