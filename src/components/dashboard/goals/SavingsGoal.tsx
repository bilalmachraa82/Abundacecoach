import React from 'react';
import { Target } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface SavingsGoalProps {
  target: number;
  current: number;
}

export function SavingsGoal({ target, current }: SavingsGoalProps) {
  const progress = Math.min((current / target) * 100, 100);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Monthly Savings Goal</h2>
          <p className="text-sm text-gray-500">Target: {formatCurrency(target)}</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-2">
          <Target className="h-5 w-5 text-blue-500" />
        </div>
      </div>

      <div className="relative pt-1">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <span className="inline-block rounded-full bg-blue-200 px-2 py-1 text-xs font-semibold uppercase text-blue-600">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="inline-block text-xs font-semibold text-blue-600">
              {progress.toFixed(0)}%
            </span>
          </div>
        </div>
        <div className="mb-4 flex h-2 overflow-hidden rounded bg-blue-200 text-xs">
          <div
            style={{ width: `${progress}%` }}
            className="flex flex-col justify-center whitespace-nowrap bg-blue-500 text-center text-white shadow-none"
          />
        </div>
        <p className="text-center text-sm text-gray-600">
          {formatCurrency(current)} saved of {formatCurrency(target)}
        </p>
      </div>
    </div>
  );
}
