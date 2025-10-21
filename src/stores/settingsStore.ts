/**
 * User Settings Store
 * Best Practice 2025: Synced with Supabase, cached locally
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import { UserSettings } from '../types/budget';
import { logger } from '../utils/logger';

interface SettingsState {
  settings: UserSettings | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchSettings: () => Promise<void>;
  updateSettings: (updates: Partial<UserSettings>) => Promise<void>;
  initializeSettings: () => Promise<void>;
}

const defaultSettings: Omit<UserSettings, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
  theme: 'light',
  compact_mode: false,
  language: 'pt-PT',
  currency: 'EUR',
  notifications_enabled: true,
  email_notifications: true,
  push_notifications: false,
  budget_alerts: true,
  goal_reminders: true,
  weekly_report: true,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      settings: null,
      isLoading: false,
      error: null,

      fetchSettings: async () => {
        set({ isLoading: true, error: null });
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          const { data, error } = await supabase
            .from('user_settings')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (error) {
            // Settings don't exist yet, create them
            if (error.code === 'PGRST116') {
              await useSettingsStore.getState().initializeSettings();
              return;
            }
            throw error;
          }

          set({ settings: data, isLoading: false });
          logger.info('Settings fetched successfully');
        } catch (error) {
          logger.error('Failed to fetch settings', error as Error);
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      updateSettings: async (updates: Partial<UserSettings>) => {
        set({ isLoading: true, error: null });
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          const { data, error } = await supabase
            .from('user_settings')
            .update(updates)
            .eq('user_id', user.id)
            .select()
            .single();

          if (error) throw error;

          set({ settings: data, isLoading: false });
          logger.info('Settings updated successfully', { updates });
        } catch (error) {
          logger.error('Failed to update settings', error as Error);
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      initializeSettings: async () => {
        set({ isLoading: true, error: null });
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          const { data, error } = await supabase
            .from('user_settings')
            .insert([
              {
                user_id: user.id,
                ...defaultSettings,
              },
            ])
            .select()
            .single();

          if (error) throw error;

          set({ settings: data, isLoading: false });
          logger.info('Settings initialized successfully');
        } catch (error) {
          logger.error('Failed to initialize settings', error as Error);
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: 'settings-storage',
      partialize: state => ({ settings: state.settings }),
    }
  )
);
