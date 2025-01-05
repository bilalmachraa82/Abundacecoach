import React from 'react';
import { Headphones, Play, CheckCircle } from 'lucide-react';
import { useWellbeingStore } from '../../stores/wellbeingStore';

export function MeditationGuide() {
  const { meditations, updateMeditationProgress } = useWellbeingStore();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Headphones className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold">Meditações Guiadas</h2>
        </div>
      </div>

      <div className="space-y-4">
        {meditations.map((meditation) => (
          <div key={meditation.id} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{meditation.title}</h3>
              <span className="text-sm text-gray-500">{meditation.duration}min</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{meditation.description}</p>
            <div className="flex items-center justify-between">
              <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700">
                <Play className="w-4 h-4" />
                <span>Iniciar</span>
              </button>
              <button
                onClick={() => updateMeditationProgress(meditation.id, !meditation.completed)}
                className={`p-2 rounded-full ${
                  meditation.completed ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}