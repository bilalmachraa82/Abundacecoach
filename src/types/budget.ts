/**
 * Budget Types
 * Best Practice 2025: Fully typed database models
 */

export interface Budget {
  id: string;
  user_id: string;
  category: string;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  start_date: Date;
  end_date?: Date;
  is_active: boolean;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface BudgetAlert {
  id: string;
  user_id: string;
  budget_id: string;
  alert_type: 'warning' | 'exceeded' | 'approaching';
  threshold_percentage: number;
  triggered_at: Date;
  is_read: boolean;
}

export interface UserSettings {
  id: string;
  user_id: string;
  theme: 'light' | 'dark';
  compact_mode: boolean;
  language: string;
  currency: string;
  notifications_enabled: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  budget_alerts: boolean;
  goal_reminders: boolean;
  weekly_report: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface BudgetFormData {
  category: string;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  start_date: Date;
  end_date?: Date;
  notes?: string;
}

export interface BudgetWithSpending extends Budget {
  spent: number;
  remaining: number;
  percentage: number;
  status: 'healthy' | 'warning' | 'exceeded';
}
