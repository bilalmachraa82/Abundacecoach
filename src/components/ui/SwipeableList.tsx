import React, { useRef, useState } from 'react';

interface SwipeableListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onSwipeLeft?: (item: T) => void;
  onSwipeRight?: (item: T) => void;
}

export function SwipeableList<T>({ 
  items, 
  renderItem, 
  onSwipeLeft, 
  onSwipeRight 
}: SwipeableListProps<T>) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStart = useRef<number>(0);
  const currentOffset = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    touchStart.current = e.touches[0].clientX;
    setActiveIndex(index);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (activeIndex === null) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStart.current;
    currentOffset.current = diff;

    const element = e.currentTarget as HTMLElement;
    element.style.transform = `translateX(${diff}px)`;
  };

  const handleTouchEnd = (e: React.TouchEvent, item: T) => {
    const element = e.currentTarget as HTMLElement;
    element.style.transform = '';
    
    if (Math.abs(currentOffset.current) > 100) {
      if (currentOffset.current > 0 && onSwipeRight) {
        onSwipeRight(item);
      } else if (currentOffset.current < 0 && onSwipeLeft) {
        onSwipeLeft(item);
      }
    }

    setActiveIndex(null);
    currentOffset.current = 0;
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          onTouchStart={(e) => handleTouchStart(e, index)}
          onTouchMove={handleTouchMove}
          onTouchEnd={(e) => handleTouchEnd(e, item)}
          className="transition-transform duration-200 ease-out"
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}