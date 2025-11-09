import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { AppearanceSettings } from './AppearanceSettings';
import { SetupSection } from './SetupSection';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="rounded-lg bg-skin-hover p-2">
          <SettingsIcon className="h-6 w-6 text-skin-primary" />
        </div>
        <h1 className="text-2xl font-bold text-skin-primary">Settings</h1>
      </div>

      <AppearanceSettings />
      <SetupSection />
    </div>
  );
}
