import React, { useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import { useWellbeingStore } from '../../stores/wellbeingStore';
import { formatCurrency } from '../../utils/formatters';

export function GenerosityTracker() {
  const [type, setType] = useState<'donation' | 'volunteer' | 'support'>('donation');
  const [description, setDescription] = useState('');
  const [impact, setImpact] = useState('');
  const [amount, setAmount] = useState('');
  const { generosityLogs, addGenerosityLog } = useWellbeingStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGenerosityLog({
      date: new Date(),
      type,
      description,
      impact,
      amount: amount ? Number(amount) : undefined,
    });
    setDescription('');
    setImpact('');
    setAmount('');
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-rose-100 p-2">
            <Heart className="h-5 w-5 text-rose-600" />
          </div>
          <h2 className="text-lg font-semibold">Registro de Generosidade</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <select
            value={type}
            onChange={e => setType(e.target.value as any)}
            className="flex-1 rounded-lg border px-4 py-2 focus:ring-2 focus:ring-rose-500"
          >
            <option value="donation">Doação</option>
            <option value="volunteer">Voluntariado</option>
            <option value="support">Apoio</option>
          </select>

          {type === 'donation' && (
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Valor"
              className="w-32 rounded-lg border px-4 py-2 focus:ring-2 focus:ring-rose-500"
              step="0.01"
            />
          )}
        </div>

        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Descrição da ação..."
          className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-rose-500"
        />

        <textarea
          value={impact}
          onChange={e => setImpact(e.target.value)}
          placeholder="Impacto gerado..."
          className="h-24 w-full resize-none rounded-lg border px-4 py-2 focus:ring-2 focus:ring-rose-500"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-rose-500 px-4 py-2 text-white transition-colors hover:bg-rose-600"
        >
          <Plus className="mr-2 inline-block h-4 w-4" />
          Registrar Ação
        </button>
      </form>

      <div className="space-y-4">
        {generosityLogs.slice(0, 5).map(log => (
          <div key={log.id} className="rounded-lg bg-rose-50 p-4">
            <div className="mb-2 flex items-start justify-between">
              <h3 className="font-medium capitalize">{log.type}</h3>
              {log.amount && (
                <span className="font-medium text-rose-600">{formatCurrency(log.amount)}</span>
              )}
            </div>
            <p className="mb-2 text-gray-600">{log.description}</p>
            <p className="text-sm text-gray-500">{log.impact}</p>
            <p className="mt-2 text-xs text-gray-400">{new Date(log.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
