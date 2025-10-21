import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  GratitudeEntry,
  Affirmation,
  Meditation,
  FengShuiTip,
  ManifestationEntry,
  GenerosityLog,
} from '../types/wellbeing';

interface WellbeingState {
  gratitudeEntries: GratitudeEntry[];
  affirmations: Affirmation[];
  meditations: Meditation[];
  fengShuiTips: FengShuiTip[];
  manifestations: ManifestationEntry[];
  generosityLogs: GenerosityLog[];
  addGratitudeEntry: (entry: Omit<GratitudeEntry, 'id'>) => void;
  addAffirmation: (affirmation: Omit<Affirmation, 'id'>) => void;
  updateMeditationProgress: (id: string, completed: boolean) => void;
  addManifestationEntry: (entry: Omit<ManifestationEntry, 'id'>) => void;
  updateManifestationProgress: (id: string, progress: number) => void;
  addGenerosityLog: (log: Omit<GenerosityLog, 'id'>) => void;
}

export const useWellbeingStore = create<WellbeingState>()(
  persist(
    set => ({
      gratitudeEntries: [],
      affirmations: [],
      meditations: [],
      fengShuiTips: [],
      manifestations: [],
      generosityLogs: [],

      addGratitudeEntry: entry =>
        set(state => ({
          gratitudeEntries: [{ ...entry, id: crypto.randomUUID() }, ...state.gratitudeEntries],
        })),

      addAffirmation: affirmation =>
        set(state => ({
          affirmations: [{ ...affirmation, id: crypto.randomUUID() }, ...state.affirmations],
        })),

      updateMeditationProgress: (id, completed) =>
        set(state => ({
          meditations: state.meditations.map(m => (m.id === id ? { ...m, completed } : m)),
        })),

      addManifestationEntry: entry =>
        set(state => ({
          manifestations: [{ ...entry, id: crypto.randomUUID() }, ...state.manifestations],
        })),

      updateManifestationProgress: (id, progress) =>
        set(state => ({
          manifestations: state.manifestations.map(m => (m.id === id ? { ...m, progress } : m)),
        })),

      addGenerosityLog: log =>
        set(state => ({
          generosityLogs: [{ ...log, id: crypto.randomUUID() }, ...state.generosityLogs],
        })),
    }),
    {
      name: 'wellbeing-storage',
    }
  )
);
