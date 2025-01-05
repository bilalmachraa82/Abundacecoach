import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RecurringTransaction } from '../types/finance';

interface RecurringStore {
  recurring: RecurringTransaction[];
  addRecurring: (transaction: Omit<RecurringTransaction, 'id'>) => void;
  updateRecurring: (id: string, updates: Partial<RecurringTransaction>) => void;
  deleteRecurring: (id: string) => void;
  getNextOccurrence: (transaction: RecurringTransaction) => Date | null;
}

export const useRecurringStore = create<RecurringStore>()(
  persist(
    (set, get) => ({
      recurring: [],
      addRecurring: (transaction) =>
        set((state) => ({
          recurring: [...state.recurring, { ...transaction, id: crypto.randomUUID() }],
        })),
      updateRecurring: (id, updates) =>
        set((state) => ({
          recurring: state.recurring.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
      deleteRecurring: (id) =>
        set((state) => ({
          recurring: state.recurring.filter((t) => t.id !== id),
        })),
      getNextOccurrence: (transaction) => {
        const today = new Date();
        const lastProcessed = transaction.lastProcessed
          ? new Date(transaction.lastProcessed)
          : new Date(transaction.startDate);

        switch (transaction.frequency) {
          case 'daily':
            lastProcessed.setDate(lastProcessed.getDate() + 1);
            break;
          case 'weekly':
            lastProcessed.setDate(lastProcessed.getDate() + 7);
            break;
          case 'monthly':
            lastProcessed.setMonth(lastProcessed.getMonth() + 1);
            break;
          case 'yearly':
            lastProcessed.setFullYear(lastProcessed.getFullYear() + 1);
            break;
        }

        return lastProcessed > today ? lastProcessed : null;
      },
    }),
    {
      name: 'recurring-transactions',
    }
  )
);