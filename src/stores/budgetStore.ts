/**
 * Budget Store
 * Best Practice 2025: Zustand with Supabase persistence
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import { Budget, BudgetFormData, BudgetWithSpending } from '../types/budget';
import { logger } from '../utils/logger';

interface BudgetState {
  budgets: Budget[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchBudgets: () => Promise<void>;
  addBudget: (budget: BudgetFormData) => Promise<void>;
  updateBudget: (id: string, updates: Partial<Budget>) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
  toggleBudgetActive: (id: string) => Promise<void>;
  getBudgetWithSpending: (budgetId: string) => Promise<BudgetWithSpending | null>;
}

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set, get) => ({
      budgets: [],
      isLoading: false,
      error: null,

      fetchBudgets: async () => {
        set({ isLoading: true, error: null });
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          const { data, error } = await supabase
            .from('budgets')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) throw error;

          set({ budgets: data || [], isLoading: false });
        } catch (error) {
          logger.error('Failed to fetch budgets', error as Error);
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      addBudget: async (budgetData: BudgetFormData) => {
        set({ isLoading: true, error: null });
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          const { data, error } = await supabase
            .from('budgets')
            .insert([
              {
                ...budgetData,
                user_id: user.id,
                is_active: true,
              },
            ])
            .select()
            .single();

          if (error) throw error;

          set(state => ({
            budgets: [data, ...state.budgets],
            isLoading: false,
          }));

          logger.info('Budget added successfully', { budgetId: data.id });
        } catch (error) {
          logger.error('Failed to add budget', error as Error);
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      updateBudget: async (id: string, updates: Partial<Budget>) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase
            .from('budgets')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

          if (error) throw error;

          set(state => ({
            budgets: state.budgets.map(b => (b.id === id ? data : b)),
            isLoading: false,
          }));

          logger.info('Budget updated successfully', { budgetId: id });
        } catch (error) {
          logger.error('Failed to update budget', error as Error);
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      deleteBudget: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const { error } = await supabase.from('budgets').delete().eq('id', id);

          if (error) throw error;

          set(state => ({
            budgets: state.budgets.filter(b => b.id !== id),
            isLoading: false,
          }));

          logger.info('Budget deleted successfully', { budgetId: id });
        } catch (error) {
          logger.error('Failed to delete budget', error as Error);
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      toggleBudgetActive: async (id: string) => {
        const budget = get().budgets.find(b => b.id === id);
        if (!budget) return;

        await get().updateBudget(id, { is_active: !budget.is_active });
      },

      getBudgetWithSpending: async (budgetId: string) => {
        try {
          const budget = get().budgets.find(b => b.id === budgetId);
          if (!budget) return null;

          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          // Calculate spending for this budget's category
          const { data: transactions, error } = await supabase
            .from('transactions')
            .select('amount')
            .eq('user_id', user.id)
            .eq('type', 'expense')
            .eq('category', budget.category)
            .gte('date', budget.start_date)
            .lte('date', budget.end_date || new Date().toISOString());

          if (error) throw error;

          const spent = transactions?.reduce((sum, t) => sum + t.amount, 0) || 0;
          const remaining = budget.amount - spent;
          const percentage = (spent / budget.amount) * 100;

          let status: 'healthy' | 'warning' | 'exceeded' = 'healthy';
          if (percentage >= 100) status = 'exceeded';
          else if (percentage >= 80) status = 'warning';

          return {
            ...budget,
            spent,
            remaining,
            percentage,
            status,
          };
        } catch (error) {
          logger.error('Failed to get budget with spending', error as Error);
          return null;
        }
      },
    }),
    {
      name: 'budget-storage',
      partialize: state => ({ budgets: state.budgets }),
    }
  )
);
