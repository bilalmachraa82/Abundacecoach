import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (goal: { name: string; target: number; category: string; deadline: Date }) => void;
}

export function AddGoalModal({ isOpen, onClose, onSubmit }: AddGoalModalProps) {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [category, setCategory] = useState('emergency_fund');
  const [deadline, setDeadline] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      target: Number(target),
      category,
      deadline: new Date(deadline),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add New Goal</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Goal Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Target Amount</label>
            <input
              type="number"
              value={target}
              onChange={e => setTarget(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              required
              min="0"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            >
              <option value="emergency_fund">Emergency Fund</option>
              <option value="retirement">Retirement</option>
              <option value="house">House</option>
              <option value="car">Car</option>
              <option value="travel">Travel</option>
              <option value="education">Education</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Target Date</label>
            <input
              type="date"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Create Goal
          </button>
        </form>
      </div>
    </div>
  );
}
