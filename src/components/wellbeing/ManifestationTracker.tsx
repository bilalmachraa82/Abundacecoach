import React, { useState } from 'react';
import { Target, Plus } from 'lucide-react';
import { useWellbeingStore } from '../../stores/wellbeingStore';

export function ManifestationTracker() {
  const [goal, setGoal] = useState('');
  const [visualization, setVisualization] = useState('');
  const { manifestations, addManifestationEntry, updateManifestationProgress } =
    useWellbeingStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addManifestationEntry({
      goal,
      visualizations: [visualization],
      targetDate: new Date(),
      progress: 0,
      milestones: [],
    });
    setGoal('');
    setVisualization('');
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-green-100 p-2">
            <Target className="h-5 w-5 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold">Manifestações</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          value={goal}
          onChange={e => setGoal(e.target.value)}
          placeholder="Seu objetivo..."
          className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-green-500"
        />
        <textarea
          value={visualization}
          onChange={e => setVisualization(e.target.value)}
          placeholder="Visualização detalhada..."
          className="h-24 w-full resize-none rounded-lg border px-4 py-2 focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
        >
          <Plus className="mr-2 inline-block h-4 w-4" />
          Adicionar Manifestação
        </button>
      </form>

      <div className="space-y-4">
        {manifestations.map(manifestation => (
          <div key={manifestation.id} className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">{manifestation.goal}</h3>
            <div className="mb-4 space-y-2">
              {manifestation.visualizations.map((vis, index) => (
                <p key={index} className="text-sm text-gray-600">
                  {vis}
                </p>
              ))}
            </div>
            <div className="relative pt-1">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <span className="inline-block rounded-full bg-green-200 px-2 py-1 text-xs font-semibold uppercase text-green-600">
                    Progresso
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-block text-xs font-semibold text-green-600">
                    {manifestation.progress}%
                  </span>
                </div>
              </div>
              <div className="mb-4 flex h-2 overflow-hidden rounded bg-green-200 text-xs">
                <div
                  style={{ width: `${manifestation.progress}%` }}
                  className="flex flex-col justify-center whitespace-nowrap bg-green-500 text-center text-white shadow-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
