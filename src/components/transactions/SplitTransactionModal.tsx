import React, { useState } from 'react';
import { X, Plus, Trash } from 'lucide-react';
import { SplitDetail } from '../../types/finance';
import { formatCurrency } from '../../utils/formatters';
import { CategorySelect } from './CategorySelect';

interface SplitTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSplit: (splits: SplitDetail[]) => void;
  totalAmount: number;
}

export function SplitTransactionModal({
  isOpen,
  onClose,
  onSplit,
  totalAmount,
}: SplitTransactionModalProps) {
  const [splits, setSplits] = useState<SplitDetail[]>([{ category: '', amount: 0, percentage: 0 }]);

  const updateSplit = (index: number, updates: Partial<SplitDetail>) => {
    const newSplits = [...splits];
    newSplits[index] = { ...newSplits[index], ...updates };

    // Recalculate percentages
    const total = newSplits.reduce((sum, split) => sum + split.amount, 0);
    newSplits.forEach(split => {
      split.percentage = (split.amount / total) * 100;
    });

    setSplits(newSplits);
  };

  const addSplit = () => {
    setSplits([...splits, { category: '', amount: 0, percentage: 0 }]);
  };

  const removeSplit = (index: number) => {
    setSplits(splits.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSplit(splits);
    onClose();
  };

  if (!isOpen) return null;

  const remainingAmount = totalAmount - splits.reduce((sum, split) => sum + split.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Split Transaction</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4 flex justify-between text-sm text-gray-600">
            <span>Total Amount: {formatCurrency(totalAmount)}</span>
            <span>Remaining: {formatCurrency(remainingAmount)}</span>
          </div>

          {splits.map((split, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CategorySelect
                type="expense"
                value={split.category}
                onChange={category => updateSplit(index, { category })}
              />
              <input
                type="number"
                value={split.amount}
                onChange={e => updateSplit(index, { amount: Number(e.target.value) })}
                className="w-24 rounded border px-2 py-1"
                min="0"
                max={totalAmount}
                step="0.01"
              />
              <span className="w-16 text-sm text-gray-500">{split.percentage.toFixed(1)}%</span>
              {splits.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSplit(index)}
                  className="rounded p-1 text-red-500 hover:bg-red-50"
                >
                  <Trash className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addSplit}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
          >
            <Plus className="h-4 w-4" />
            <span>Add Split</span>
          </button>

          <button
            type="submit"
            disabled={remainingAmount !== 0}
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            Split Transaction
          </button>
        </form>
      </div>
    </div>
  );
}
