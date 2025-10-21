import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { CategorySelect } from './CategorySelect';

interface RecurringTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    startDate: Date;
    endDate?: Date;
  }) => void;
}

export function RecurringTransactionModal({
  isOpen,
  onClose,
  onSubmit,
}: RecurringTransactionModalProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      description,
      amount: Number(amount),
      type,
      category,
      frequency,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Recurring Transaction</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="income"
                  checked={type === 'income'}
                  onChange={e => setType(e.target.value as 'income' | 'expense')}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Income</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="expense"
                  checked={type === 'expense'}
                  onChange={e => setType(e.target.value as 'income' | 'expense')}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Expense</span>
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
            <CategorySelect type={type} value={category} onChange={setCategory} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Frequency</label>
            <select
              value={frequency}
              onChange={e => setFrequency(e.target.value as any)}
              className="w-full rounded-md border px-3 py-2"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              End Date (Optional)
            </label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Create Recurring Transaction
          </button>
        </form>
      </div>
    </div>
  );
}
