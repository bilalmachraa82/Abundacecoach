import React from 'react';
import { Sparkles } from 'lucide-react';
import { useGrabovoiStore } from '../../stores/grabovoiStore';
import { grabovoiCodes } from '../../data/grabovoiCodes';

export function DailyCode() {
  const { getDailyCode } = useGrabovoiStore();
  const dailyCode = getDailyCode();
  const codeInfo = grabovoiCodes.find(c => c.code === dailyCode);

  return (
    <div className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Código Grabovoi do Dia</h2>
        <div className="rounded-lg bg-white bg-opacity-20 p-2">
          <Sparkles className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-4 text-center">
        <div className="font-mono text-3xl font-bold">{dailyCode}</div>
        <div>
          <h3 className="text-xl font-medium">{codeInfo?.name}</h3>
          <p className="text-sm text-white text-opacity-90">{codeInfo?.description}</p>
        </div>
      </div>
    </div>
  );
}
