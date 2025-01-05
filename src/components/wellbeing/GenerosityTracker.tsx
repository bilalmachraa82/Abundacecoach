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
      amount: amount ? Number(amount) : undefined
    });
    setDescription('');
    setImpact('');
    setAmount('');
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-rose-100 rounded-lg">
            <Heart className="w-5 h-5 text-rose-600" />
          </div>
          <h2 className="text-lg font-semibold">Registro de Generosidade</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="flex space-x-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500"
          >
            <option value="donation">Doação</option>
            <option value="volunteer">Voluntariado</option>
            <option value="support">Apoio</option>
          </select>

          {type === 'donation' && (
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Valor"
              className="w-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500"
              step="0.01"
            />
          )}
        </div>

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição da ação..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500"
        />

        <textarea
          value={impact}
          onChange={(e) => setImpact(e.target.value)}
          placeholder="Impacto gerado..."
          className="w-full h-24 px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-rose-500"
        />

        <button
          type="submit"
          className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition-colors"
        >
          <Plus className="w-4 h-4 inline-block mr-2" />
          Registrar Ação
        </button>
      </form>

      <div className="space-y-4">
        {generosityLogs.slice(0, 5).map((log) => (
          <div key={log.id} className="p-4 bg-rose-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium capitalize">{log.type}</h3>
              {log.amount && (
                <span className="text-rose-600 font-medium">
                  {formatCurrency(log.amount)}
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-2">{log.description}</p>
            <p className="text-sm text-gray-500">{log.impact}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(log.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}