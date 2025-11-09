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
      date: new Date(),
    });
    setIntention('');
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-lg bg-purple-100 p-2">
          <BookMarked className="h-5 w-5 text-purple-600" />
        </div>
        <span className="font-mono text-lg font-bold text-purple-600">{code.code}</span>
      </div>

      <h3 className="mb-2 text-lg font-semibold">{code.name}</h3>
      <p className="mb-4 text-sm text-gray-600">{code.description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Sua intenção..."
          value={intention}
          onChange={e => setIntention(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
        >
          Registrar Uso
        </button>
      </form>
    </div>
  );
}
