import React from 'react';

interface NavigationProps {
    activeSection: string;
    scrollToSection: (id: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, scrollToSection }) => {
    return (
        <nav className="fixed right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-end gap-6 z-40 print:hidden">
            {[
                { id: 'experience', label: 'Experience' },
                { id: 'projects', label: 'Projects' },
                { id: 'expertise', label: 'Expertise' }
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="group flex items-center gap-4 focus:outline-none"
                    aria-label={`Scroll to ${item.label}`}
                    aria-current={activeSection === item.id ? 'true' : 'false'}
                >
                    <span className={`
            text-xs font-mono uppercase tracking-widest transition-all duration-300
            ${activeSection === item.id
                            ? 'text-accent translate-x-0 opacity-100'
                            : 'text-gray-400 dark:text-gray-600 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                        }
          `}>
                        {item.label}
                    </span>
                    <div className={`
            w-1.5 h-1.5 rounded-full transition-all duration-500 border border-accent
            ${activeSection === item.id ? 'bg-accent scale-150 shadow-[0_0_10px_rgba(20,184,166,0.5)]' : 'bg-transparent scale-100 group-hover:bg-accent/50'}
          `} />
                </button>
            ))}
            {/* Vertical connecting line visual */}
            <div className="absolute right-[2.5px] top-0 bottom-0 w-px bg-gray-300 dark:bg-white/5 -z-10 transition-colors duration-500" />
        </nav>
    );
};
