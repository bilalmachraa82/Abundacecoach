/**
 * Budget Card Component
 * Best Practice 2025: Accessible, responsive card with actions
 */
import { Edit2, Trash2, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';
import { BudgetWithSpending } from '../../types/budget';
import { formatCurrency } from '../../utils/formatters';

interface BudgetCardProps {
  budget: BudgetWithSpending;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function BudgetCard({ budget, onEdit, onDelete }: BudgetCardProps) {
  const getStatusColor = () => {
    switch (budget.status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'exceeded':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (budget.status) {
      case 'healthy':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'exceeded':
        return <TrendingDown className="h-5 w-5 text-red-600" />;
    }
  };

  return (
    <div className={`rounded-lg border-2 p-6 transition-all hover:shadow-lg ${getStatusColor()}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <h3 className="text-lg font-semibold">{budget.category}</h3>
          </div>
          <p className="mt-1 text-sm opacity-75">
            {budget.period === 'monthly' && 'Orçamento Mensal'}
            {budget.period === 'weekly' && 'Orçamento Semanal'}
            {budget.period === 'yearly' && 'Orçamento Anual'}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(budget.id)}
            className="rounded-lg p-2 transition-colors hover:bg-white/50"
            aria-label="Editar orçamento"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(budget.id)}
            className="rounded-lg p-2 transition-colors hover:bg-white/50"
            aria-label="Eliminar orçamento"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        {/* Progress Bar */}
        <div className="mb-2 h-3 overflow-hidden rounded-full bg-white/50">
          <div
            className={`h-full transition-all duration-500 ${
              budget.status === 'exceeded'
                ? 'bg-red-600'
                : budget.status === 'warning'
                  ? 'bg-yellow-600'
                  : 'bg-green-600'
            }`}
            style={{ width: `${Math.min(budget.percentage, 100)}%` }}
          />
        </div>

        {/* Budget Stats */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="opacity-75">Gasto</p>
            <p className="font-semibold">{formatCurrency(budget.spent)}</p>
          </div>
          <div>
            <p className="opacity-75">Orçamento</p>
            <p className="font-semibold">{formatCurrency(budget.amount)}</p>
          </div>
          <div>
            <p className="opacity-75">Restante</p>
            <p className="font-semibold">{formatCurrency(budget.remaining)}</p>
          </div>
        </div>

        <div className="mt-2 text-xs opacity-75">{budget.percentage.toFixed(1)}% utilizado</div>
      </div>

      {budget.notes && (
        <div className="mt-4 rounded-lg bg-white/30 p-3 text-sm">
          <p className="opacity-75">{budget.notes}</p>
        </div>
      )}
    </div>
  );
}
