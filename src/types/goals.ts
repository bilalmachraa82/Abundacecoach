export interface Goal {
  id: string;
  name: string;
  category: GoalCategory;
  target: number;
  current: number;
  deadline: Date;
  monthlyContribution: number;
  priority: 'high' | 'medium' | 'low';
  notes?: string;
}

export type GoalCategory =
  | 'emergency_fund'
  | 'retirement'
  | 'house'
  | 'car'
  | 'travel'
  | 'education'
  | 'business'
  | 'investment'
  | 'debt_payment'
  | 'other';
