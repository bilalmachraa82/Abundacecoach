import { useState } from 'react';
import { useTransactions } from './useTransactions';
import { getFinancialAdvice, analyzeSpendingPatterns } from '../services/ai';
import { calculateSavingsRate } from '../utils/calculations';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function useAICoach() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { transactions } = useTransactions();

  const sendMessage = async (content: string) => {
    try {
      setLoading(true);
      setMessages(prev => [...prev, { role: 'user', content }]);

      const monthlyIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const monthlyExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const savingsRate = calculateSavingsRate(monthlyIncome, monthlyExpenses);

      const response = await getFinancialAdvice(content, {
        transactions,
        savingsRate,
        monthlyIncome,
        monthlyExpenses
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('AI processing failed:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const analyzeSpending = async () => {
    try {
      setLoading(true);
      const analysis = await analyzeSpendingPatterns(transactions);
      setMessages(prev => [...prev, { role: 'assistant', content: analysis }]);
    } catch (error) {
      console.error('Spending analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    analyzeSpending,
    loading
  };
}