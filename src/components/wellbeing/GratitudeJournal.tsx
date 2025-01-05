import React, { useState } from 'react';
import { Heart, PenTool } from 'lucide-react';
import { useWellbeingStore } from '../../stores/wellbeingStore';

export function GratitudeJournal() {
  const [entry, setEntry] = useState('');
  const [category, setCategory] = useState<'financial' | 'personal' | 'professional' | 'health'>('financial');
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
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-pink-100 rounded-lg">
            <Heart className="w-5 h-5 text-pink-600" />
          </div>
          <h2 className="text-lg font-semibold">Diário da Gratidão</h2>
        </div>
        <PenTool className="w-5 h-5 text-gray-400" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Por que você está grato hoje?"
          className="w-full h-32 px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <div className="flex space-x-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            <option value="financial">Financeiro</option>
            <option value="personal">Pessoal</option>
            <option value="professional">Profissional</option>
            <option value="health">Saúde</option>
          </select>

          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setMood(value as 1 | 2 | 3 | 4 | 5)}
                className={`w-8 h-8 rounded-full ${
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
          className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Registrar Gratidão
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {gratitudeEntries.slice(0, 3).map((entry) => (
          <div key={entry.id} className="p-4 bg-pink-50 rounded-lg">
            <p className="text-gray-600">{entry.content}</p>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{new Date(entry.date).toLocaleDateString()}</span>
              <span className="capitalize">{entry.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}