/**
 * AI Coach Hook - Enhanced with Streaming (2025)
 * Uses Vercel AI SDK for better UX and performance
 */
import { useState } from 'react';
import { useTransactions } from './useTransactions';
import { streamFinancialAdvice, analyzeSpendingPatterns } from '../services/aiService';
import { calculateSavingsRate } from '../utils/calculations';
import { logger } from '../utils/logger';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
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

      // Add empty assistant message that will be filled with streaming
      const messageIndex = messages.length + 1;
      setMessages(prev => [...prev, { role: 'assistant', content: '', isStreaming: true }]);

      const stream = await streamFinancialAdvice(content, {
        transactions,
        savingsRate,
        monthlyIncome,
        monthlyExpenses,
      });

      // Stream the response
      let fullResponse = '';
      for await (const chunk of stream.textStream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[messageIndex] = {
            role: 'assistant',
            content: fullResponse,
            isStreaming: true,
          };
          return newMessages;
        });
      }

      // Mark streaming as complete
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[messageIndex] = {
          role: 'assistant',
          content: fullResponse,
          isStreaming: false,
        };
        return newMessages;
      });
    } catch (error) {
      logger.error('AI processing failed', error as Error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Desculpa, mas estou com algumas dificuldades. Podes tentar novamente?',
        },
      ]);
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
      logger.error('Spending analysis failed', error as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    analyzeSpending,
    loading,
  };
}
