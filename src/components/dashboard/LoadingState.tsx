import React from 'react';

export function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500" />
    </div>
  );
}
