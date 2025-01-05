import React, { useState } from 'react';
import { Target, Plus } from 'lucide-react';
import { useWellbeingStore } from '../../stores/wellbeingStore';

export function ManifestationTracker() {
  const [goal, setGoal] = useState('');
  const [visualization, setVisualization] = useState('');
  const { manifestations, addManifestationEntry, updateManifestationProgress } = useWellbeingStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addManifestationEntry({
      goal,
      visualizations: [visualization],
      targetDate: new Date(),
      progress: 0,
      milestones: []
    });
    setGoal('');
    setVisualization('');
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Target className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold">Manifestações</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Seu objetivo..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
        />
        <textarea
          value={visualization}
          onChange={(e) => setVisualization(e.target.value)}
          placeholder="Visualização detalhada..."
          className="w-full h-24 px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          <Plus className="w-4 h-4 inline-block mr-2" />
          Adicionar Manifestação
        </button>
      </form>

      <div className="space-y-4">
        {manifestations.map((manifestation) => (
          <div key={manifestation.id} className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">{manifestation.goal}</h3>
            <div className="space-y-2 mb-4">
              {manifestation.visualizations.map((vis, index) => (
                <p key={index} className="text-sm text-gray-600">{vis}</p>
              ))}
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    Progresso
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">
                    {manifestation.progress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div
                  style={{ width: `${manifestation.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}