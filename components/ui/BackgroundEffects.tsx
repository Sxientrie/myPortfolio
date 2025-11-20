import React from 'react';

export const BackgroundEffects: React.FC = () => {
    return (
        <>
            {/* Background Noise Texture - Adjusted opacity for light mode */}
            <div className="fixed inset-0 bg-noise opacity-[0.03] dark:opacity-30 pointer-events-none z-0 mix-blend-overlay print:hidden" />

            {/* Static Ambient Spotlight - Bottom Right */}
            <div
                className="fixed -bottom-40 -right-40 w-[1000px] h-[1000px] bg-accent/5 dark:bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0 print:hidden"
            />
        </>
    );
};
