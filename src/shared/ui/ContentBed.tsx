import React from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface ContentBedProps {
  children: React.ReactNode;
  className?: string;
}

export const ContentBed: React.FC<ContentBedProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'relative z-[3] bg-[oklch(5%_0_0_/_0.85)] backdrop-blur-md rounded-[16px] overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
};
