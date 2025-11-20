import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
    isDark: boolean;
    toggleTheme: () => void;
    isScrolled: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme, isScrolled }) => {
    return (
        <button
            onClick={toggleTheme}
            className={`
        fixed top-6 right-6 z-50 p-2.5 rounded-lg 
        bg-white/80 dark:bg-white/5 backdrop-blur-md 
        border border-gray-200 dark:border-white/10 shadow-sm 
        hover:border-accent/50 dark:hover:border-white/30 
        transition-all duration-500 ease-in-out print:hidden
        ${isScrolled ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}
      `}
            aria-label="Toggle Theme"
        >
            {isDark ? (
                <Sun size={18} className="text-yellow-500" />
            ) : (
                <Moon size={18} className="text-indigo-500" />
            )}
        </button>
    );
};
