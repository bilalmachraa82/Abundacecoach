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
      
      <main className="md:ml-64 min-h-screen pb-16 md:pb-8">
        {showPeriodSelector && (
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PeriodSelector />
            </div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}