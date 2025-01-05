import React, { useState } from 'react';
import { useSetupStore } from '../stores/setupStore';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters';

export default function Setup() {
  const { 
    monthlyData, 
    categoryAmounts, 
    updateMonthlyData, 
    updateCategoryAmounts, 
    setInitialized 
  } = useSetupStore();
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  
  const handleMonthlyDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleCategoryDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInitialized(true);
    navigate('/');
  };

  if (currentStep === 1) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Setup Monthly Data for 2024</h1>
        <form onSubmit={handleMonthlyDataSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Income Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Monthly Income</h2>
              {Object.entries(monthlyData.income).map(([month, amount]) => (
                <div key={month} className="flex items-center space-x-2">
                  <label className="w-20 capitalize">{month}:</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      const newData = {
                        ...monthlyData,
                        income: {
                          ...monthlyData.income,
                          [month]: Number(e.target.value)
                        }
                      };
                      updateMonthlyData(newData);
                    }}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              ))}
            </div>

            {/* Expenses Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Monthly Expenses</h2>
              {Object.entries(monthlyData.expenses).map(([month, amount]) => (
                <div key={month} className="flex items-center space-x-2">
                  <label className="w-20 capitalize">{month}:</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      const newData = {
                        ...monthlyData,
                        expenses: {
                          ...monthlyData.expenses,
                          [month]: Number(e.target.value)
                        }
                      };
                      updateMonthlyData(newData);
                    }}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Next: Category Breakdown
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Setup Average Monthly Category Amounts</h1>
      <form onSubmit={handleCategoryDataSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Income Categories */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Income Sources</h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter the average monthly amount for each income source in 2024
            </p>
            {Object.entries(categoryAmounts.income).map(([category, amount]) => (
              <div key={category} className="flex items-center space-x-2">
                <label className="w-24 capitalize">{category}:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    const newData = {
                      ...categoryAmounts,
                      income: {
                        ...categoryAmounts.income,
                        [category]: Number(e.target.value)
                      }
                    };
                    updateCategoryAmounts(newData);
                  }}
                  className="w-full px-3 py-2 border rounded"
                  min="0"
                />
              </div>
            ))}
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Total Monthly Income: {formatCurrency(
                  Object.values(categoryAmounts.income).reduce((a, b) => a + b, 0)
                )}
              </p>
            </div>
          </div>

          {/* Expense Categories */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Expense Categories</h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter the average monthly amount for each expense category in 2024
            </p>
            {Object.entries(categoryAmounts.expenses).map(([category, amount]) => (
              <div key={category} className="flex items-center space-x-2">
                <label className="w-24 capitalize">{category}:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    const newData = {
                      ...categoryAmounts,
                      expenses: {
                        ...categoryAmounts.expenses,
                        [category]: Number(e.target.value)
                      }
                    };
                    updateCategoryAmounts(newData);
                  }}
                  className="w-full px-3 py-2 border rounded"
                  min="0"
                />
              </div>
            ))}
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Total Monthly Expenses: {formatCurrency(
                  Object.values(categoryAmounts.expenses).reduce((a, b) => a + b, 0)
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Complete Setup
          </button>
        </div>
      </form>
    </div>
  );
}