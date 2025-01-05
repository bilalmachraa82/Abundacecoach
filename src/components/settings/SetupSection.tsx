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
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <RefreshCw className="w-5 h-5 text-blue-500" />
        </div>
        <h2 className="text-lg font-semibold">Initial Setup</h2>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">
          Reset your initial setup data including monthly totals and category amounts.
          This will remove all customizations and return to the setup wizard.
        </p>

        <button
          onClick={handleReset}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
        >
          Reset Setup Data
        </button>
      </div>
    </div>
  );
}