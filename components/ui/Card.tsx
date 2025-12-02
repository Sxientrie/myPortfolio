import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

/**
 * A container with glassmorphism effects, borders, and hover states.
 * Wraps content in a styled box with optional glow effects.
 */
export const Card: React.FC<CardProps> = ({ children, className = '', glow = false }) => {
  return (
    <div 
      className={`
        relative 
        bg-zinc-950/60
        backdrop-blur-md 
        border border-zinc-800/60
        shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02),inset_0_4px_8px_rgba(0,0,0,0.4)]
        p-6 rounded-xl overflow-hidden transition-all duration-300 group
        hover:border-zinc-700/50
        hover:bg-zinc-950/80
        hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),inset_0_8px_16px_rgba(0,0,0,0.5)]
        ${className}
      `}
    >
      {glow && (
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
