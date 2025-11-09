/**
 * React Hook for AI Streaming
 * Best Practice 2025: Streaming AI responses for better UX
 */
import { useState, useCallback } from 'react';
import { streamFinancialAdvice, streamFengShuiAdvice } from '../services/aiService';
import { Transaction } from '../types/finance';
import { logger } from '../utils/logger';

interface FinancialContext {
  transactions: Transaction[];
  savingsRate: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export function useFinancialAIStream() {
  const [streamedResponse, setStreamedResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const streamAdvice = useCallback(async (prompt: string, context: FinancialContext) => {
    setIsStreaming(true);
    setError(null);
    setStreamedResponse('');

    try {
      const stream = await streamFinancialAdvice(prompt, context);

      // Read the stream
      for await (const chunk of stream.textStream) {
        setStreamedResponse(prev => prev + chunk);
      }

      setIsStreaming(false);
    } catch (err) {
      logger.error('Financial AI streaming failed', err as Error);
      setError('Erro ao processar a resposta. Tenta novamente.');
      setIsStreaming(false);
    }
  }, []);

  const reset = useCallback(() => {
    setStreamedResponse('');
    setError(null);
    setIsStreaming(false);
  }, []);

  return {
    streamedResponse,
    isStreaming,
    error,
    streamAdvice,
    reset,
  };
}

export function useFengShuiAIStream() {
  const [streamedResponse, setStreamedResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const streamAdvice = useCallback(async (prompt: string) => {
    setIsStreaming(true);
    setError(null);
    setStreamedResponse('');

    try {
      const stream = await streamFengShuiAdvice(prompt);

      // Read the stream
      for await (const chunk of stream.textStream) {
        setStreamedResponse(prev => prev + chunk);
      }

      setIsStreaming(false);
    } catch (err) {
      logger.error('Feng Shui AI streaming failed', err as Error);
      setError('Erro ao processar a resposta. Tenta novamente.');
      setIsStreaming(false);
    }
  }, []);

  const reset = useCallback(() => {
    setStreamedResponse('');
    setError(null);
    setIsStreaming(false);
  }, []);

  return {
    streamedResponse,
    isStreaming,
    error,
    streamAdvice,
    reset,
  };
}
