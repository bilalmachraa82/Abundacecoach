/**
 * Budget Form Component
 * Best Practice 2025: Accessible form with validation
 */
import { useState } from 'react';
import { X } from 'lucide-react';
import { BudgetFormData } from '../../types/budget';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface BudgetFormProps {
  onSubmit: (data: BudgetFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: BudgetFormData;
}

export function BudgetForm({ onSubmit, onCancel, initialData }: BudgetFormProps) {
  const [formData, setFormData] = useState<BudgetFormData>(
    initialData || {
      category: '',
      amount: 0,
      period: 'monthly',
      start_date: new Date(),
      notes: '',
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Alimentação',
    'Habitação',
    'Transporte',
    'Saúde',
    'Lazer',
    'Educação',
    'Vestuário',
    'Marketing',
    'Inventário',
    'Escritório',
    'Outro',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 dark:bg-gray-800">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {initialData ? 'Editar Orçamento' : 'Novo Orçamento'}
          </h2>
          <button
            onClick={onCancel}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Select */}
          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-medium">
              Categoria
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700"
              required
            >
              <option value="">Selecione uma categoria</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Valor do Orçamento (€)
            </label>
            <Input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Period */}
          <div>
            <label htmlFor="period" className="mb-2 block text-sm font-medium">
              Período
            </label>
            <select
              id="period"
              value={formData.period}
              onChange={e =>
                setFormData({
                  ...formData,
                  period: e.target.value as 'weekly' | 'monthly' | 'yearly',
                })
              }
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700"
              required
            >
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
              <option value="yearly">Anual</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label htmlFor="start_date" className="mb-2 block text-sm font-medium">
              Data de Início
            </label>
            <Input
              type="date"
              id="start_date"
              value={
                formData.start_date instanceof Date
                  ? formData.start_date.toISOString().split('T')[0]
                  : formData.start_date
              }
              onChange={e => setFormData({ ...formData, start_date: new Date(e.target.value) })}
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="mb-2 block text-sm font-medium">
              Notas (opcional)
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700"
              rows={3}
              placeholder="Adicione notas sobre este orçamento..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'A guardar...' : initialData ? 'Atualizar' : 'Criar Orçamento'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
