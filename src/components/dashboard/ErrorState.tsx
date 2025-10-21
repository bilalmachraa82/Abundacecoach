import React from 'react';
import { t } from '../../utils/i18n';

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">{t('error')}</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
