import React from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../config/categories';
import { t, formatCategoryLabel } from '../../utils/i18n';

interface CategorySelectProps {
  type: 'income' | 'expense';
  value: string;
  onChange: (category: string) => void;
}

export function CategorySelect({ type, value, onChange }: CategorySelectProps) {
  if (type === 'income') {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <optgroup label={t('business')}>
          {Object.entries(INCOME_CATEGORIES.BUSINESS).map(([key, value]) => (
            <option key={value} value={value}>
              {t(key.toLowerCase() as keyof typeof translations)}
            </option>
          ))}
        </optgroup>
      </select>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      {Object.entries(EXPENSE_CATEGORIES).map(([groupKey, group]) => (
        <optgroup key={groupKey} label={t(groupKey.toLowerCase())}>
          {Object.entries(group).map(([categoryKey, category]) => {
            if (typeof category === 'string') {
              return (
                <option key={category} value={category}>
                  {formatCategoryLabel(category)}
                </option>
              );
            }
            return Object.entries(category).map(([subKey, value]) => {
              if (typeof value === 'string') {
                return (
                  <option key={value} value={value}>
                    {formatCategoryLabel(value)}
                  </option>
                );
              }
              return null;
            });
          })}
        </optgroup>
      ))}
    </select>
  );
}