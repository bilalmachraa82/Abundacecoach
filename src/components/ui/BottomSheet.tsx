import React, { useEffect, useRef } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fade-in fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div ref={sheetRef} className="bottom-sheet slide-up" style={{ maxHeight: '90vh' }}>
        <div className="bottom-sheet-handle" />
        <div className="overflow-y-auto px-4 pb-6">{children}</div>
      </div>
    </>
  );
}
