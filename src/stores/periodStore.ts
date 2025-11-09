import { create } from 'zustand';

type Period = 'week' | 'month' | 'year';

interface PeriodStore {
  period: Period;
  setPeriod: (period: Period) => void;
}

export const usePeriodStore = create<PeriodStore>(set => ({
  period: 'month',
  setPeriod: period => set({ period }),
}));
