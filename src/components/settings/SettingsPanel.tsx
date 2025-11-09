/**
 * Settings Panel Component
 * Best Practice 2025: Functional settings with Supabase sync
 */
import { useEffect, useState } from 'react';
import { Save, Bell, Globe, Palette, Shield } from 'lucide-react';
import { useSettingsStore } from '../../stores/settingsStore';
import { useThemeStore } from '../../stores/themeStore';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function SettingsPanel() {
  const { settings, isLoading, fetchSettings, updateSettings, initializeSettings } =
    useSettingsStore();
  const { isDark, toggleDarkMode } = useThemeStore();
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      await fetchSettings();
      // If no settings exist, initialize them
      if (!settings) {
        await initializeSettings();
      }
    };
    loadSettings();
  }, [fetchSettings, initializeSettings, settings]);

  const handleToggle = async (key: keyof typeof settings, value: boolean) => {
    if (!settings) return;

    // Special handling for theme
    if (key === 'theme') {
      toggleDarkMode();
      await updateSettings({ theme: isDark ? 'light' : 'dark' });
      return;
    }

    // Update other settings
    await updateSettings({ [key]: value });
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Settings are already saved on toggle, but we can force a sync
      await fetchSettings();
      setHasChanges(false);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !settings) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Definições</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Configure as suas preferências</p>
        </div>
        {hasChanges && (
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-5 w-5" />
            {isSaving ? 'A guardar...' : 'Guardar Alterações'}
          </Button>
        )}
      </div>

      {/* Appearance */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="mb-4 flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Aparência</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Modo Escuro</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ativar tema escuro para reduzir fadiga ocular
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.theme === 'dark'}
                onChange={e => handleToggle('theme', e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Modo Compacto</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Interface mais compacta com menos espaçamento
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.compact_mode}
                onChange={e => handleToggle('compact_mode', e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Notificações</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificações Ativadas</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receber notificações gerais
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.notifications_enabled}
                onChange={e => handleToggle('notifications_enabled', e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receber notificações por email
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.email_notifications}
                onChange={e => handleToggle('email_notifications', e.target.checked)}
                disabled={!settings.notifications_enabled}
                className="peer sr-only disabled:cursor-not-allowed"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 peer-disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications (PWA)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Notificações push no navegador
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.push_notifications}
                onChange={e => handleToggle('push_notifications', e.target.checked)}
                disabled={!settings.notifications_enabled}
                className="peer sr-only disabled:cursor-not-allowed"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 peer-disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de Orçamento</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Avisos quando se aproxima do limite
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.budget_alerts}
                onChange={e => handleToggle('budget_alerts', e.target.checked)}
                disabled={!settings.notifications_enabled}
                className="peer sr-only disabled:cursor-not-allowed"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 peer-disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Lembretes de Objetivos</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Lembretes para contribuir para objetivos
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.goal_reminders}
                onChange={e => handleToggle('goal_reminders', e.target.checked)}
                disabled={!settings.notifications_enabled}
                className="peer sr-only disabled:cursor-not-allowed"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 peer-disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Relatório Semanal</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Resumo semanal das suas finanças
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.weekly_report}
                onChange={e => handleToggle('weekly_report', e.target.checked)}
                disabled={!settings.notifications_enabled}
                className="peer sr-only disabled:cursor-not-allowed"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 peer-disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Localization */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Localização</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Idioma</label>
            <select
              value={settings.language}
              onChange={e => updateSettings({ language: e.target.value })}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="pt-PT">Português (Portugal)</option>
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Moeda</label>
            <select
              value={settings.currency}
              onChange={e => updateSettings({ currency: e.target.value })}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="EUR">Euro (€)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="GBP">British Pound (£)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
