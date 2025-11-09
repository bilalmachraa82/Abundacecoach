import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../config/categories';

export function getCategoryLabel(category: string): string {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getIncomeCategories(): string[] {
  return Object.values(INCOME_CATEGORIES.BUSINESS);
}

export function getExpenseCategories(): string[] {
  const flattenCategories = (obj: object): string[] => {
    return Object.values(obj).reduce((acc: string[], val) => {
      if (typeof val === 'string') {
        return [...acc, val];
      }
      return [...acc, ...flattenCategories(val)];
    }, []);
  };

  return flattenCategories(EXPENSE_CATEGORIES);
}

export function getCategoryGroup(category: string): string {
  // Find the top-level group for a given category
  for (const [group, categories] of Object.entries(EXPENSE_CATEGORIES)) {
    if (JSON.stringify(categories).includes(category)) {
      return group;
    }
  }
  return 'Other';
}
