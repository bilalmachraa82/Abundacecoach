import React from 'react';
import { Transaction } from '../../types/finance';
import { formatCurrency } from '../../utils/formatters';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {transactions.map(transaction => (
          <div
            key={transaction.id}
            className="flex items-center justify-between px-6 py-4 transition-colors duration-150 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`h-2 w-2 rounded-full ${
                  transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`text-sm font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString('pt-PT')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
