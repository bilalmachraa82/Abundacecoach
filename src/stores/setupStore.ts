import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { monthlyTotals2024, categoryAmounts } from '../data/initialData';

interface SetupState {
  isInitialized: boolean;
  setInitialized: (value: boolean) => void;
  monthlyData: typeof monthlyTotals2024;
  categoryAmounts: typeof categoryAmounts;
  updateMonthlyData: (data: typeof monthlyTotals2024) => void;
  updateCategoryAmounts: (data: typeof categoryAmounts) => void;
  resetData: () => void;
}

export const useSetupStore = create<SetupState>()(
  persist(
    set => ({
      isInitialized: false,
      monthlyData: monthlyTotals2024,
      categoryAmounts,
      setInitialized: value => set({ isInitialized: value }),
      updateMonthlyData: data => set({ monthlyData: data }),
      updateCategoryAmounts: data => set({ categoryAmounts: data }),
      resetData: () =>
        set({
          monthlyData: monthlyTotals2024,
          categoryAmounts,
          isInitialized: false,
        }),
    }),
    {
      name: 'finance-setup-storage',
    }
  )
);
