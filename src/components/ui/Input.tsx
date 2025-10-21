import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: string;
}

export function Input({ icon: Icon, error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-skin-secondary">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input
          className={`input ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
