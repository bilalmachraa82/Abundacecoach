import { useCallback, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Transaction } from '../types/finance';
import { useAuth } from '../components/auth/AuthProvider';

const CACHE_KEY = 'transactions_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const getCachedTransactions = useCallback(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  }, []);

  const updateCache = useCallback((data: Transaction[]) => {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  }, []);

  const fetchTransactions = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Try to get cached data first
      const cached = getCachedTransactions();
      if (cached) {
        setTransactions(cached);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (fetchError) throw fetchError;

      const parsedData =
        data?.map(t => ({
          ...t,
          date: new Date(t.date),
        })) || [];

      setTransactions(parsedData);
      updateCache(parsedData);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, [user, getCachedTransactions, updateCache]);

  const addTransaction = useCallback(
    async (transaction: Omit<Transaction, 'id'>) => {
      if (!user) return;

      try {
        const { data, error: insertError } = await supabase
          .from('transactions')
          .insert([
            {
              ...transaction,
              user_id: user.id,
              date: transaction.date.toISOString(),
            },
          ])
          .select()
          .single();

        if (insertError) throw insertError;

        const newTransaction = {
          ...data,
          date: new Date(data.date),
        };

        setTransactions(prev => {
          const updated = [newTransaction, ...prev];
          updateCache(updated);
          return updated;
        });
      } catch (e) {
        setError(e as Error);
      }
    },
    [user, updateCache]
  );

  useEffect(() => {
    if (user) {
      fetchTransactions();
    } else {
      setTransactions([]);
    }
  }, [user, fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    addTransaction,
    refetch: fetchTransactions,
  };
}
