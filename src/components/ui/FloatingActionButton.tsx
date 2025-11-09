import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FABProps {
  icon: LucideIcon;
  onClick: () => void;
  label: string;
}

export function FloatingActionButton({ icon: Icon, onClick, label }: FABProps) {
  return (
    <button onClick={onClick} className="fab" aria-label={label}>
      <Icon className="h-6 w-6" />
    </button>
  );
}
