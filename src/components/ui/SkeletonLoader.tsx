import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  className?: string;
}

export function SkeletonLoader({ count = 1, className = 'h-20' }: SkeletonLoaderProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton ${className}`} />
      ))}
    </div>
  );
}
