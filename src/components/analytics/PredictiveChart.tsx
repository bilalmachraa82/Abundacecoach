import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '../../types/finance';
import { calculateMonthlyTrends, predictNextMonth } from '../../utils/analytics';
import { formatCurrency } from '../../utils/formatters';
import { TrendingUp } from 'lucide-react';

interface PredictiveChartProps {
  transactions: Transaction[];
}

export function PredictiveChart({ transactions }: PredictiveChartProps) {
  const trends = calculateMonthlyTrends(transactions);
  const prediction = predictNextMonth(trends);
  
  const data = [
    ...trends,
    {
      month: 'Predicted',
      income: prediction.income,
      expenses: prediction.expenses,
      savings: prediction.savings,
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Financial Forecast</h2>
          <p className="text-sm text-gray-500">Predicted next month's figures</p>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          <TrendingUp className="w-5 h-5 text-blue-500" />
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              labelStyle={{ color: '#374151' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#EF4444" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="savings" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">Predicted Income</p>
          <p className="text-lg font-semibold text-green-600">
            {formatCurrency(prediction.income)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Predicted Expenses</p>
          <p className="text-lg font-semibold text-red-600">
            {formatCurrency(prediction.expenses)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Predicted Savings</p>
          <p className="text-lg font-semibold text-blue-600">
            {formatCurrency(prediction.savings)}
          </p>
        </div>
      </div>
    </div>
  );
}