/**
 * Budget Page
 * Best Practice 2025: Fully functional budget management
 */
import { BudgetList } from '../components/budget/BudgetList';

export default function Budget() {
  return (
    <div className="space-y-6 p-6">
      <BudgetList />
    </div>
  );
}
