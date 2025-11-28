import React from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';

export const BackgroundEffects: React.FC = () => {
    const { x, y } = useMousePosition();

    // Magnetic Repulsion Logic:
    // As the cursor moves towards the bottom-right (increasing x and y),
    // push the spotlight further away (positive translation).
    // Using a factor of 0.05 for a subtle effect.
    const moveX = x * 0.05;
    const moveY = y * 0.05;

    return (
        <>
            {/* Static Ambient Spotlight - Moved to Bottom Right & Increased Size */}
            <div
                className="fixed -bottom-[600px] -right-[600px] w-[1200px] h-[1200px] bg-accent/[0.05] rounded-full blur-[120px] pointer-events-none z-0 print:hidden transition-transform duration-1000 ease-out"
                style={{
                    transform: `translate(${moveX}px, ${moveY}px)`
                }}
            />

            {/* Background Noise Texture - Overlays the gradient */}
            <div className="fixed inset-0 bg-noise opacity-[0.05] pointer-events-none z-0 mix-blend-overlay print:hidden" />
        </>
    );
};