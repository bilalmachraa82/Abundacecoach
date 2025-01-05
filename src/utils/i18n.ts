import { translations } from '../i18n/pt-PT';

export function t(key: keyof typeof translations, params?: Record<string, string | number>): string {
  let text = translations[key] || key;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      text = text.replace(`{{${key}}}`, String(value));
    });
  }
  
  return text;
}

export function formatCategoryLabel(category: string): string {
  return category
    .split('_')
    .map(word => translations[word as keyof typeof translations] || word)
    .join(' ');
}