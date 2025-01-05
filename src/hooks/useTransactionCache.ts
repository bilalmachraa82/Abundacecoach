import { useCallback } from 'react';
import { Transaction } from '../types/finance';
import { useTransactions } from './useTransactions';

const CACHE_KEY = 'transactions_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: Transaction[];
  timestamp: number;
}

export function useTransactionCache() {
  const { transactions: liveTransactions, ...transactionMethods } = useTransactions();

  const getCachedTransactions = useCallback(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp }: CacheEntry = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    return isExpired ? null : data;
  }, []);

  const updateCache = useCallback((transactions: Transaction[]) => {
    const cacheEntry: CacheEntry = {
      data: transactions,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
  }, []);

  const transactions = getCachedTransactions() || liveTransactions;
  if (liveTransactions.length > 0) {
    updateCache(liveTransactions);
  }

  return {
    transactions,
    ...transactionMethods,
  };
}