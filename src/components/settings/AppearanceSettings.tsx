import React from 'react';
import { Moon, Smartphone } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

export function AppearanceSettings() {
  const { isDark, isCompact, toggleDarkMode, toggleCompactMode } = useThemeStore();

  return (
    <div className="bg-skin-card rounded-xl p-6 border border-skin-border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-skin-hover rounded-lg">
              <Moon className="w-5 h-5 text-skin-primary" />
            </div>
            <div>
              <h3 className="font-medium text-skin-primary">Dark Mode</h3>
              <p className="text-sm text-skin-secondary">Adjust the appearance for low light</p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isDark ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDark ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-skin-hover rounded-lg">
              <Smartphone className="w-5 h-5 text-skin-primary" />
            </div>
            <div>
              <h3 className="font-medium text-skin-primary">Compact Mode</h3>
              <p className="text-sm text-skin-secondary">Reduce spacing and padding</p>
            </div>
          </div>
          <button
            onClick={toggleCompactMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isCompact ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isCompact ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}