import { addMonths, format, differenceInMonths } from 'date-fns';

export function calculateGoalDate(
  currentAmount: number,
  targetAmount: number,
  monthlySavings: number
): Date {
  const remaining = targetAmount - currentAmount;
  const monthsNeeded = Math.ceil(remaining / monthlySavings);
  return addMonths(new Date(), monthsNeeded);
}

export function formatGoalDate(date: Date): string {
  return format(date, 'MMMM yyyy');
}

export function getGoalInsight(goal: { name: string; target: number; current: number }): string {
  const monthlySavings = 500; // This could be calculated from actual savings rate
  const projectedDate = calculateGoalDate(goal.current, goal.target, monthlySavings);

  // Ensure the date is always in the future
  const today = new Date();
  if (differenceInMonths(projectedDate, today) <= 0) {
    const newDate = addMonths(today, 3); // Default to 3 months if current date is passed
    return `Adjust your ${goal.name.toLowerCase()} goal target or savings rate. Current projection: ${formatGoalDate(newDate)}`;
  }

  return `You're on track to reach your ${goal.name.toLowerCase()} goal by ${formatGoalDate(projectedDate)}. Keep up the good work!`;
}
