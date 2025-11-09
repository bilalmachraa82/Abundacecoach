import React from 'react';
import { Calendar } from 'lucide-react';
import { usePeriodStore } from '../../stores/periodStore';

const periods = [
  { id: 'week', label: 'Weekly' },
  { id: 'month', label: 'Monthly' },
  { id: 'year', label: 'Yearly' },
] as const;

export function PeriodSelector() {
  const { period, setPeriod } = usePeriodStore();

  return (
    <div className="flex items-center space-x-4 py-4">
      <div className="rounded-lg bg-blue-50 p-2">
        <Calendar className="h-5 w-5 text-blue-500" />
      </div>

      <div className="flex rounded-lg border border-gray-200 p-1">
        {periods.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setPeriod(id)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              period === id ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
