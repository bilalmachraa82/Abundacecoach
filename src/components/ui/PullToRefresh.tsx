import React, { useRef, useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      touchStart.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart.current === 0) return;

    const pullDistance = e.touches[0].clientY - touchStart.current;
    if (pullDistance > 0) {
      setPullProgress(Math.min(pullDistance / 100, 1));
      e.preventDefault();
    }
  };

  const handleTouchEnd = async () => {
    if (pullProgress >= 1 && !refreshing) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
    touchStart.current = 0;
    setPullProgress(0);
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="min-h-full"
    >
      <div
        className="-mt-16 flex h-16 items-center justify-center transition-transform"
        style={{ transform: `translateY(${pullProgress * 64}px)` }}
      >
        <RefreshCw
          className={`h-6 w-6 text-gray-400 transition-transform ${
            refreshing ? 'animate-spin' : `rotate-${Math.floor(pullProgress * 360)}deg`
          }`}
        />
      </div>
      {children}
    </div>
  );
}
