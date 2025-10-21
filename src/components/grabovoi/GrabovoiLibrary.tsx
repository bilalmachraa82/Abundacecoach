import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { grabovoiCodes } from '../../data/grabovoiCodes';
import { GrabovoiCard } from './GrabovoiCard';
import { GrabovoiCategory } from '../../types/grabovoi';

export function GrabovoiLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<GrabovoiCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredCodes = grabovoiCodes.filter(
    code =>
      (selectedCategory === 'all' || code.category === selectedCategory) &&
      (code.name.toLowerCase().includes(search.toLowerCase()) || code.code.includes(search))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-purple-100 p-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold">Biblioteca de Códigos Grabovoi</h2>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar códigos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value as GrabovoiCategory | 'all')}
          className="rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">Todas as Categorias</option>
          <option value="prosperity">Prosperidade</option>
          <option value="financial_harmony">Harmonia Financeira</option>
          <option value="wellbeing">Bem-Estar</option>
          <option value="relationships">Relacionamentos</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCodes.map(code => (
          <GrabovoiCard key={code.code} code={code} />
        ))}
      </div>
    </div>
  );
}
