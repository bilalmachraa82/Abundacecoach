import React, { useState } from 'react';
import { Brain, Camera } from 'lucide-react';
import { t } from '../../utils/i18n';
import { OCRScanner } from './scanner/OCRScanner';
import { AIChat } from './chat/AIChat';
import { useTransactions } from '../../hooks/useTransactions';
import { InsightCard } from './insights/InsightCard';

export function FinancialCoach() {
  const { transactions, addTransaction } = useTransactions();
  const [showScanner, setShowScanner] = useState(false);

  const handleScanComplete = (data: { amount: number; description: string; category?: string }) => {
    addTransaction({
      type: 'expense',
      amount: data.amount,
      description: data.description,
      category: data.category || 'other',
      date: new Date()
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold">{t('aiCoach')}</h2>
        </div>
        <button
          onClick={() => setShowScanner(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Camera className="w-5 h-5" />
          <span>{t('scanReceipt')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <InsightCard transactions={transactions} />
        </div>
        <AIChat />
      </div>

      {showScanner && (
        <OCRScanner
          onClose={() => setShowScanner(false)}
          onScanComplete={handleScanComplete}
        />
      )}
    </div>
  );
}