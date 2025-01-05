import React from 'react';
import { Activity } from 'lucide-react';
import { Transaction } from '../../types/finance';
import { calculateFinancialHealthScore } from '../../utils/analytics';
import { t } from '../../utils/i18n';

interface FinancialHealthScoreProps {
  transactions: Transaction[];
}

export function FinancialHealthScore({ transactions }: FinancialHealthScoreProps) {
  const { score, breakdown } = React.useMemo(() => 
    calculateFinancialHealthScore(transactions), [transactions]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="bg-skin-card rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-skin-primary">Pontuação de Saúde Financeira</h2>
          <p className="text-sm text-skin-secondary">Indicador geral de bem-estar financeiro</p>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          <Activity className="w-5 h-5 text-blue-500" />
        </div>
      </div>

      <div className="text-center mb-6">
        <div className={`text-4xl font-bold ${getScoreColor(score || 0)} mb-2`}>
          {score || 0}
        </div>
        <div className="text-sm text-skin-secondary">
          de 100 pontos
        </div>
      </div>

      <div className="space-y-4">
        {breakdown.map(({ category, score, maxScore, message }) => (
          <div key={category}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-skin-secondary">{category}</span>
              <span className="font-medium text-skin-primary">{Math.round(score)}/{maxScore}</span>
            </div>
            <div className="w-full bg-skin-hover rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getScoreBackground(score)}`}
                style={{ width: `${(score / maxScore) * 100}%` }}
              />
            </div>
            <p className="text-xs text-skin-secondary mt-1">
              {category === 'Taxa de Poupança' 
                ? t('currentSavingsRate', { rate: score.toFixed(1) })
                : message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}