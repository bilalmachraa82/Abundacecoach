import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GrabovoiLog } from '../types/grabovoi';
import { grabovoiCodes } from '../data/grabovoiCodes';

interface GrabovoiStore {
  logs: GrabovoiLog[];
  addLog: (log: Omit<GrabovoiLog, 'id'>) => void;
  updateLog: (id: string, notes: string) => void;
  getDailyCode: () => string;
}

export const useGrabovoiStore = create<GrabovoiStore>()(
  persist(
    (set, get) => ({
      logs: [],
      addLog: log =>
        set(state => ({
          logs: [...state.logs, { ...log, id: crypto.randomUUID() }],
        })),
      updateLog: (id, notes) =>
        set(state => ({
          logs: state.logs.map(log => (log.id === id ? { ...log, notes } : log)),
        })),
      getDailyCode: () => {
        const today = new Date();
        const dayOfYear = Math.floor(
          (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
        );
        return grabovoiCodes[dayOfYear % grabovoiCodes.length].code;
      },
    }),
    {
      name: 'grabovoi-storage',
    }
  )
);
