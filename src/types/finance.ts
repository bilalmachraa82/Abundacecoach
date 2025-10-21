// Existing imports...

export interface SplitDetail {
  category: string;
  amount: number;
  percentage: number;
}

export interface RecurringTransaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate?: Date;
  lastProcessed?: Date;
  splits?: SplitDetail[];
}

// Update Transaction interface
export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  splits?: SplitDetail[];
  recurringId?: string;
}
