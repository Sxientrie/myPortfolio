import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', glow = false }) => {
  return (
    <div 
      className={`
        relative 
        bg-white/70 dark:bg-charcoal/60 
        backdrop-blur-md 
        border border-gray-200 dark:border-white/5 
        p-6 rounded-xl overflow-hidden transition-all duration-500 group
        hover:border-accent/30 dark:hover:border-white/10 
        hover:bg-white dark:hover:bg-white/[0.02]
        shadow-sm dark:shadow-none
        ${className}
      `}
    >
      {glow && (
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};