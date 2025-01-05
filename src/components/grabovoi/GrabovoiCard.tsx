import React, { useState } from 'react';
import { GrabovoiCode } from '../../types/grabovoi';
import { useGrabovoiStore } from '../../stores/grabovoiStore';
import { BookMarked } from 'lucide-react';

interface GrabovoiCardProps {
  code: GrabovoiCode;
}

export function GrabovoiCard({ code }: GrabovoiCardProps) {
  const [intention, setIntention] = useState('');
  const { addLog } = useGrabovoiStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLog({
      code: code.code,
      intention,
      date: new Date()
    });
    setIntention('');
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <BookMarked className="w-5 h-5 text-purple-600" />
        </div>
        <span className="text-lg font-mono font-bold text-purple-600">{code.code}</span>
      </div>

      <h3 className="text-lg font-semibold mb-2">{code.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{code.description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Sua intenção..."
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Registrar Uso
        </button>
      </form>
    </div>
  );
}