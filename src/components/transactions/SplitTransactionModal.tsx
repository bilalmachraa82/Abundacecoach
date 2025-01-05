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
  const [splits, setSplits] = useState<SplitDetail[]>([
    { category: '', amount: 0, percentage: 0 },
  ]);

  const updateSplit = (index: number, updates: Partial<SplitDetail>) => {
    const newSplits = [...splits];
    newSplits[index] = { ...newSplits[index], ...updates };

    // Recalculate percentages
    const total = newSplits.reduce((sum, split) => sum + split.amount, 0);
    newSplits.forEach((split) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Split Transaction</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>Total Amount: {formatCurrency(totalAmount)}</span>
            <span>Remaining: {formatCurrency(remainingAmount)}</span>
          </div>

          {splits.map((split, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CategorySelect
                type="expense"
                value={split.category}
                onChange={(category) => updateSplit(index, { category })}
              />
              <input
                type="number"
                value={split.amount}
                onChange={(e) => updateSplit(index, { amount: Number(e.target.value) })}
                className="w-24 px-2 py-1 border rounded"
                min="0"
                max={totalAmount}
                step="0.01"
              />
              <span className="text-sm text-gray-500 w-16">
                {split.percentage.toFixed(1)}%
              </span>
              {splits.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSplit(index)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addSplit}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
          >
            <Plus className="w-4 h-4" />
            <span>Add Split</span>
          </button>

          <button
            type="submit"
            disabled={remainingAmount !== 0}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            Split Transaction
          </button>
        </form>
      </div>
    </div>
  );
}