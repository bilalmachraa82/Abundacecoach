import React, { useState } from 'react';
import { Transaction } from '../../types/finance';
import { PlusCircle } from 'lucide-react';
import { CategorySelect } from './CategorySelect';
import { getIncomeCategories } from '../../utils/categoryUtils';
import { t } from '../../utils/i18n';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<string>('pruvit');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date: new Date(),
      description,
      amount: Number(amount),
      category,
      type,
    });
    setDescription('');
    setAmount('');
  };

  const handleTypeChange = (newType: 'income' | 'expense') => {
    setType(newType);
    setCategory(newType === 'income' ? getIncomeCategories()[0] : 'mortgage');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{t('addTransaction')}</h2>
        <div className="rounded-lg bg-blue-50 p-2">
          <PlusCircle className="h-5 w-5 text-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{t('type')}</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="type"
                  value="income"
                  checked={type === 'income'}
                  onChange={e => handleTypeChange(e.target.value as 'income' | 'expense')}
                />
                <span className="ml-2">{t('income')}</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="type"
                  value="expense"
                  checked={type === 'expense'}
                  onChange={e => handleTypeChange(e.target.value as 'income' | 'expense')}
                />
                <span className="ml-2">{t('expense')}</span>
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {t('description')}
            </label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{t('amount')}</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{t('category')}</label>
            <CategorySelect type={type} value={category} onChange={setCategory} />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600"
        >
          {t('add')}
        </button>
      </div>
    </form>
  );
}
