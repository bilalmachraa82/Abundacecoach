import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { GoalCard } from '../components/goals/GoalCard';
import { AddGoalModal } from '../components/goals/AddGoalModal';
import { useGoalsStore } from '../stores/goalsStore';

export default function Goals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { goals, addGoal } = useGoalsStore();

  const handleAddGoal = (goalData: {
    name: string;
    target: number;
    category: string;
    deadline: Date;
  }) => {
    addGoal({
      ...goalData,
      current: 0,
      monthlyContribution: goalData.target / 12, // Simple default
      priority: 'medium',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Financial Goals</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Target className="w-5 h-5" />
          <span>Add New Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            name={goal.name}
            target={goal.target}
            current={goal.current}
          />
        ))}
      </div>

      <AddGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddGoal}
      />
    </div>
  );
}