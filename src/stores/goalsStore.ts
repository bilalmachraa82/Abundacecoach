import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Goal, GoalCategory } from '../types/goals';

interface GoalsState {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  updateProgress: (id: string, amount: number) => void;
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    set => ({
      goals: [],
      addGoal: goal =>
        set(state => ({
          goals: [...state.goals, { ...goal, id: crypto.randomUUID() }],
        })),
      updateGoal: (id, updates) =>
        set(state => ({
          goals: state.goals.map(goal => (goal.id === id ? { ...goal, ...updates } : goal)),
        })),
      deleteGoal: id =>
        set(state => ({
          goals: state.goals.filter(goal => goal.id !== id),
        })),
      updateProgress: (id, amount) =>
        set(state => ({
          goals: state.goals.map(goal =>
            goal.id === id ? { ...goal, current: goal.current + amount } : goal
          ),
        })),
    }),
    {
      name: 'finance-goals-storage',
    }
  )
);
