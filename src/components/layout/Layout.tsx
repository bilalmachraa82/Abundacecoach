import React from 'react';
import { Navigation } from './Navigation';
import { PeriodSelector } from '../filters/PeriodSelector';

interface LayoutProps {
  children: React.ReactNode;
  showPeriodSelector?: boolean;
}

export function Layout({ children, showPeriodSelector = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="min-h-screen pb-16 md:ml-64 md:pb-8">
        {showPeriodSelector && (
          <div className="border-b bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <PeriodSelector />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
