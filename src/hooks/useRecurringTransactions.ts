import { useEffect } from 'react';
import { useRecurringStore } from '../stores/recurringStore';
import { useTransactions } from './useTransactions';

export function useRecurringTransactions() {
  const { recurring, getNextOccurrence, updateRecurring } = useRecurringStore();
  const { addTransaction } = useTransactions();

  useEffect(() => {
    // Process recurring transactions daily
    const processRecurring = () => {
      const today = new Date();

      recurring.forEach((transaction) => {
        const nextOccurrence = getNextOccurrence(transaction);
        
        if (nextOccurrence && nextOccurrence <= today) {
          // Create the transaction
          addTransaction({
            description: transaction.description,
            amount: transaction.amount,
            type: transaction.type,
            category: transaction.category,
            date: nextOccurrence,
            recurringId: transaction.id,
            splits: transaction.splits,
          });

          // Update the last processed date
          updateRecurring(transaction.id, { lastProcessed: nextOccurrence });
        }
      });
    };

    // Process immediately and set up daily check
    processRecurring();
    const interval = setInterval(processRecurring, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [recurring, addTransaction, getNextOccurrence, updateRecurring]);

  return {
    recurring,
    ...useRecurringStore(),
  };
}