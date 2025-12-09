import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Renders background visual layers including a dynamic spotlight and noise texture.
 * Moves the spotlight based on mouse position to create depth using direct DOM manipulation.
 */
export const BackgroundEffects: React.FC = () => {
    // Hardware-accelerated mouse tracking without React re-renders
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for premium feel
    const springConfig = { damping: 50, stiffness: 400 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Update motion values directly - NO STATE UPDATES triggered
            // We apply a slight factor to create the parallax feel
            mouseX.set(e.clientX * 0.05);
            mouseY.set(e.clientY * 0.05);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <>
            <motion.div
                className="fixed -bottom-[600px] -right-[600px] w-[1200px] h-[1200px] bg-accent/[0.05] rounded-full blur-[120px] pointer-events-none z-0 print:hidden"
                style={{
                    x: springX,
                    y: springY,
                }}
            />
            <div className="fixed inset-0 bg-noise opacity-[0.05] pointer-events-none z-0 mix-blend-overlay print:hidden" />
        </>
    );
};
