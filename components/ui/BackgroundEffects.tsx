import React from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';

/**
 * Renders background visual layers including a dynamic spotlight and noise texture.
 * Moves the spotlight based on mouse position to create depth.
 */
export const BackgroundEffects: React.FC = () => {
    const { x, y } = useMousePosition();

    const moveX = x * 0.05;
    const moveY = y * 0.05;

    return (
        <>
            <div
                className="fixed -bottom-[600px] -right-[600px] w-[1200px] h-[1200px] bg-accent/[0.05] rounded-full blur-[120px] pointer-events-none z-0 print:hidden transition-transform duration-1000 ease-out"
                style={{
                    transform: `translate(${moveX}px, ${moveY}px)`
                }}
            />
            <div className="fixed inset-0 bg-noise opacity-[0.05] pointer-events-none z-0 mix-blend-overlay print:hidden" />
        </>
    );
};
