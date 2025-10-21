import React from 'react';
import { t } from '../utils/i18n';
import { FinancialCoach } from '../components/ai/FinancialCoach';

export default function AICoach() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t('aiCoach')}</h1>
      <FinancialCoach />
    </div>
  );
}
