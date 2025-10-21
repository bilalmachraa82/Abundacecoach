import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="border-3 h-8 w-8 animate-spin rounded-full border-indigo-600 border-t-transparent" />
    </div>
  );
}
