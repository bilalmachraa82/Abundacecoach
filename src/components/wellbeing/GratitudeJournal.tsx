import React, { useState } from 'react';
import { Heart, PenTool } from 'lucide-react';
import { useWellbeingStore } from '../../stores/wellbeingStore';

export function GratitudeJournal() {
  const [entry, setEntry] = useState('');
  const [category, setCategory] = useState<'financial' | 'personal' | 'professional' | 'health'>(
    'financial'
  );
  const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5>(5);
  const { addGratitudeEntry, gratitudeEntries } = useWellbeingStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGratitudeEntry({
      date: new Date(),
      content: entry,
      category,
      mood,
    });
    setEntry('');
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-pink-100 p-2">
            <Heart className="h-5 w-5 text-pink-600" />
          </div>
          <h2 className="text-lg font-semibold">Diário da Gratidão</h2>
        </div>
        <PenTool className="h-5 w-5 text-gray-400" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={entry}
          onChange={e => setEntry(e.target.value)}
          placeholder="Por que você está grato hoje?"
          className="h-32 w-full resize-none rounded-lg border px-4 py-2 focus:ring-2 focus:ring-pink-500"
          required
        />

        <div className="flex space-x-4">
          <select
            value={category}
            onChange={e => setCategory(e.target.value as any)}
            className="rounded-lg border px-4 py-2 focus:ring-2 focus:ring-pink-500"
          >
            <option value="financial">Financeiro</option>
            <option value="personal">Pessoal</option>
            <option value="professional">Profissional</option>
            <option value="health">Saúde</option>
          </select>

          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map(value => (
              <button
                key={value}
                type="button"
                onClick={() => setMood(value as 1 | 2 | 3 | 4 | 5)}
                className={`h-8 w-8 rounded-full ${
                  mood === value ? 'bg-pink-500 text-white' : 'bg-gray-100'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-pink-500 px-4 py-2 text-white transition-colors hover:bg-pink-600"
        >
          Registrar Gratidão
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {gratitudeEntries.slice(0, 3).map(entry => (
          <div key={entry.id} className="rounded-lg bg-pink-50 p-4">
            <p className="text-gray-600">{entry.content}</p>
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>{new Date(entry.date).toLocaleDateString()}</span>
              <span className="capitalize">{entry.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
