import { useState, useCallback } from 'react';
import { Transaction } from '../types/finance';

interface ConversationContext {
  recentTransactions: Transaction[];
  commonCategories: string[];
  savingsRate: number;
  lastAdvice?: string;
}

export function useAIMemory() {
  const [context, setContext] = useState<ConversationContext>({
    recentTransactions: [],
    commonCategories: [],
    savingsRate: 0,
  });

  const updateContext = useCallback((transactions: Transaction[]) => {
    // Update context with recent transaction patterns
    const recentTransactions = transactions.slice(-5);
    
    // Calculate common categories
    const categoryCount = transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const commonCategories = Object.entries(categoryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category);

    // Calculate savings rate
    const income = transactions.reduce((sum, t) => 
      sum + (t.type === 'income' ? t.amount : 0), 0);
    const expenses = transactions.reduce((sum, t) => 
      sum + (t.type === 'expense' ? t.amount : 0), 0);
    const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

    setContext({
      recentTransactions,
      commonCategories,
      savingsRate,
    });
  }, []);

  const recordAdvice = useCallback((advice: string) => {
    setContext(prev => ({ ...prev, lastAdvice: advice }));
  }, []);

  return {
    context,
    updateContext,
    recordAdvice,
  };
}