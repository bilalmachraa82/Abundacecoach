import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useSetupStore } from '../../stores/setupStore';
import { useNavigate } from 'react-router-dom';

export function SetupSection() {
  const { resetData } = useSetupStore();
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all setup data? This cannot be undone.')) {
      resetData();
      navigate('/setup');
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center space-x-3">
        <div className="rounded-lg bg-blue-50 p-2">
          <RefreshCw className="h-5 w-5 text-blue-500" />
        </div>
        <h2 className="text-lg font-semibold">Initial Setup</h2>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">
          Reset your initial setup data including monthly totals and category amounts. This will
          remove all customizations and return to the setup wizard.
        </p>

        <button
          onClick={handleReset}
          className="w-full rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
        >
          Reset Setup Data
        </button>
      </div>
    </div>
  );
}
