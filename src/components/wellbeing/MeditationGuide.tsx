import React from 'react';
import { Headphones, Play, CheckCircle } from 'lucide-react';
import { useWellbeingStore } from '../../stores/wellbeingStore';

export function MeditationGuide() {
  const { meditations, updateMeditationProgress } = useWellbeingStore();

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-indigo-100 p-2">
            <Headphones className="h-5 w-5 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold">Meditações Guiadas</h2>
        </div>
      </div>

      <div className="space-y-4">
        {meditations.map(meditation => (
          <div key={meditation.id} className="rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium">{meditation.title}</h3>
              <span className="text-sm text-gray-500">{meditation.duration}min</span>
            </div>
            <p className="mb-4 text-sm text-gray-600">{meditation.description}</p>
            <div className="flex items-center justify-between">
              <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700">
                <Play className="h-4 w-4" />
                <span>Iniciar</span>
              </button>
              <button
                onClick={() => updateMeditationProgress(meditation.id, !meditation.completed)}
                className={`rounded-full p-2 ${
                  meditation.completed ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                <CheckCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
