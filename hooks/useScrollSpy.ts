import { useState, useEffect } from 'react';

/**
 * Tracks the active section based on scroll position.
 * Optimized with requestAnimationFrame to prevent scroll jank.
 * 
 * @param sections List of section IDs to track
 * @param offset Multiplier for viewport height offset (default 0.3)
 * @returns The ID of the currently active section
 */
export const useScrollSpy = (sections: string[], offset: number = 0.3) => {
    const [activeSection, setActiveSection] = useState(sections[0]);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPosition = window.scrollY + window.innerHeight * offset;

                    let current = sections[0];
                    for (const section of sections) {
                        const el = document.getElementById(section);
                        if (el && el.offsetTop <= scrollPosition) {
                            current = section;
                        }
                    }
                    setActiveSection(current);
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections, offset]);

    return activeSection;
};
