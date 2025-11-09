export interface GrabovoiCode {
  code: string;
  name: string;
  description: string;
  category: GrabovoiCategory;
}

export type GrabovoiCategory = 'prosperity' | 'financial_harmony' | 'wellbeing' | 'relationships';

export interface GrabovoiLog {
  id: string;
  code: string;
  intention: string;
  date: Date;
  notes?: string;
}
