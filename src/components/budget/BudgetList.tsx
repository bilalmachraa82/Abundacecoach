/**
 * Budget List Component
 * Best Practice 2025: Optimized list with loading states
 */
import { useEffect, useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { useBudgetStore } from '../../stores/budgetStore';
import { BudgetCard } from './BudgetCard';
import { BudgetForm } from './BudgetForm';
import { BudgetFormData, BudgetWithSpending } from '../../types/budget';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function BudgetList() {
  const { budgets, isLoading, fetchBudgets, addBudget, deleteBudget } = useBudgetStore();
  const [showForm, setShowForm] = useState(false);
  const [budgetsWithSpending, setBudgetsWithSpending] = useState<BudgetWithSpending[]>([]);
  const [loadingSpending, setLoadingSpending] = useState(false);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  useEffect(() => {
    const loadSpendingData = async () => {
      if (budgets.length === 0) return;

      setLoadingSpending(true);
      const budgetStore = useBudgetStore.getState();
      const budgetsData = await Promise.all(
        budgets
          .filter(b => b.is_active)
          .map(async budget => {
            const withSpending = await budgetStore.getBudgetWithSpending(budget.id);
            return withSpending;
          })
      );

      setBudgetsWithSpending(budgetsData.filter(Boolean) as BudgetWithSpending[]);
      setLoadingSpending(false);
    };

    loadSpendingData();
  }, [budgets]);

  const handleAddBudget = async (data: BudgetFormData) => {
    await addBudget(data);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem a certeza que deseja eliminar este orçamento?')) {
      await deleteBudget(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Orçamentos</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Gerencie os seus orçamentos mensais
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-5 w-5" />
          Novo Orçamento
        </Button>
      </div>

      {/* Budget Cards */}
      {loadingSpending ? (
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : budgetsWithSpending.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-600">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum orçamento criado</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Comece a criar orçamentos para gerir melhor as suas finanças
          </p>
          <Button onClick={() => setShowForm(true)} className="mt-4">
            <Plus className="mr-2 h-5 w-5" />
            Criar Primeiro Orçamento
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {budgetsWithSpending.map(budget => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onEdit={id => console.log('Edit', id)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Budget Form Modal */}
      {showForm && <BudgetForm onSubmit={handleAddBudget} onCancel={() => setShowForm(false)} />}
    </div>
  );
}
