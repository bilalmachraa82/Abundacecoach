import React from 'react';
import { t } from '../../utils/i18n';
import { User } from '@supabase/supabase-js';

interface DashboardHeaderProps {
  user: User | null;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">
        {t('welcome')}, {user?.email}
      </h1>
      <p className="text-gray-500 mt-2">{t('annualGoal')}</p>
    </header>
  );
}