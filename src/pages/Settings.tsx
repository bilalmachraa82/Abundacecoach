import React from 'react';
import { Settings as SettingsIcon, Moon, Bell, Lock, Languages, Upload } from 'lucide-react';
import { SetupSection } from '../components/settings/SetupSection';
import { BankStatementUpload } from '../components/import/BankStatementUpload';

const settingsSections = [
  {
    title: 'Import Data',
    icon: Upload,
    component: BankStatementUpload,
  },
  {
    title: 'Appearance',
    icon: Moon,
    options: [
      { id: 'theme', label: 'Dark Mode', type: 'toggle', value: false },
      { id: 'compact', label: 'Compact View', type: 'toggle', value: false },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    options: [
      { id: 'email', label: 'Email Notifications', type: 'toggle', value: true },
      { id: 'push', label: 'Push Notifications', type: 'toggle', value: true },
      {
        id: 'frequency',
        label: 'Frequency',
        type: 'select',
        value: 'daily',
        choices: ['daily', 'weekly', 'monthly'],
      },
    ],
  },
  {
    title: 'Security',
    icon: Lock,
    options: [
      { id: '2fa', label: 'Two-Factor Authentication', type: 'toggle', value: false },
      {
        id: 'session',
        label: 'Session Timeout',
        type: 'select',
        value: '30min',
        choices: ['15min', '30min', '1hour', '4hours'],
      },
    ],
  },
  {
    title: 'Language & Region',
    icon: Languages,
    options: [
      {
        id: 'language',
        label: 'Language',
        type: 'select',
        value: 'pt-PT',
        choices: ['en-US', 'pt-PT', 'es-ES', 'fr-FR'],
      },
      {
        id: 'currency',
        label: 'Currency',
        type: 'select',
        value: 'EUR',
        choices: ['EUR', 'USD', 'GBP'],
      },
    ],
  },
];

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="rounded-lg bg-blue-50 p-2">
          <SettingsIcon className="h-6 w-6 text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <SetupSection />

      <div className="space-y-6">
        {settingsSections.map(section => (
          <div key={section.title} className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center space-x-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <section.icon className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-lg font-semibold">{section.title}</h2>
            </div>

            {section.component ? (
              <section.component />
            ) : (
              <div className="space-y-4">
                {section.options?.map(({ id, label, type, value, choices }) => (
                  <div key={id} className="flex items-center justify-between">
                    <span className="text-gray-700">{label}</span>
                    {type === 'toggle' ? (
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          value ? 'bg-blue-500' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    ) : (
                      <select className="form-select rounded-md border-gray-300 text-sm">
                        {choices?.map(choice => (
                          <option key={choice} value={choice}>
                            {choice}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
