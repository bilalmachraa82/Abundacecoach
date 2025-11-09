import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabViewProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function TabView({ tabs, defaultTab }: TabViewProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  return (
    <div>
      <div className="hide-scrollbar mb-4 flex space-x-2 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 transition-colors ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="fade-in">{tabs.find(tab => tab.id === activeTab)?.content}</div>
    </div>
  );
}
