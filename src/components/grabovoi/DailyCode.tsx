import React from 'react';
import { Sparkles } from 'lucide-react';
import { useGrabovoiStore } from '../../stores/grabovoiStore';
import { grabovoiCodes } from '../../data/grabovoiCodes';

export function DailyCode() {
  const { getDailyCode } = useGrabovoiStore();
  const dailyCode = getDailyCode();
  const codeInfo = grabovoiCodes.find(c => c.code === dailyCode);

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Código Grabovoi do Dia</h2>
        <div className="p-2 bg-white bg-opacity-20 rounded-lg">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="text-3xl font-mono font-bold">{dailyCode}</div>
        <div>
          <h3 className="text-xl font-medium">{codeInfo?.name}</h3>
          <p className="text-sm text-white text-opacity-90">{codeInfo?.description}</p>
        </div>
      </div>
    </div>
  );
}