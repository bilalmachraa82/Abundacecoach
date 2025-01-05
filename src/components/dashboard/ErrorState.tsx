import React from 'react';
import { t } from '../../utils/i18n';

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('error')}</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}