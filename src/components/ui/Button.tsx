import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
  loading?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  icon: Icon,
  loading,
  className = '',
  ...props 
}: ButtonProps) {
  const baseClass = variant === 'primary' ? 'button-primary' : 'button-secondary';

  return (
    <button 
      className={`${baseClass} ${className} flex items-center justify-center space-x-2`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon && (
        <Icon className="w-5 h-5" />
      )}
      {children && <span>{children}</span>}
    </button>
  );
}