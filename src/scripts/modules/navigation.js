/**
 * @file src/scripts/modules/navigation.js
 * @version 1.1.0
 * @description Manages all navigation functionality, including desktop, mobile, and scroll-spying.
 *
 * @module Modules
 *
 * @summary This module initializes all navigation features. It handles click events for both desktop
 * and mobile navigation buttons to enable smooth scrolling to sections. It also manages the mobile
 * navigation menu's toggle functionality and uses an IntersectionObserver to highlight the active
 * navigation link based on the user's scroll position.
 *
 * @dependencies
 * - None
 *
 * @outputs
 * - Exports the `initNavigation` function.
 *
 * @changelog
 * - v1.1.0 (2025-08-26): Added support for Testimonials link and improved ARIA handling for mobile menu.
 * - v1.0.0 (2025-08-25): Initial version, with updated selectors to match BEM refactoring.
 */

export function initNavigation() {
    const allSections = document.querySelectorAll('.layout__section');
    const navButtons = document.querySelectorAll('.site-header__nav-button');
    const mobileNavButtons = document.querySelectorAll('.mobile-nav__button');
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileNavMenu = document.querySelector('.mobile-nav');

    if (!allSections.length || !navButtons.length || !mobileNavButtons.length || !hamburgerButton || !mobileNavMenu) {
        console.warn('Navigation elements not found. Skipping navigation initialization.');
        return;
    }

    // --- Desktop navigation clicks ---
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Mobile menu ---
    hamburgerButton.addEventListener('click', () => {
        const isExpanded = mobileNavMenu.classList.toggle('mobile-nav--open');
        hamburgerButton.setAttribute('aria-expanded', isExpanded);
    });

    mobileNavButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                mobileNavMenu.classList.remove('mobile-nav--open'); // Close menu after click
                hamburgerButton.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- Intersection Observer for active nav link ---
    const navObserver = new IntersectionObserver((entries) => {
        // Find the last intersecting section in the active zone.
        const intersectingSections = entries.filter(entry => entry.isIntersecting);
        const activeEntry = intersectingSections[intersectingSections.length - 1];

        if (activeEntry) {
            const activeSectionId = activeEntry.target.id;
            // Update all buttons based on the single active section.
            navButtons.forEach(btn => {
                const href = btn.getAttribute('href');
                if (href && href.startsWith('#')) {
                    btn.classList.toggle('active', href === `#${activeSectionId}`);
                }
            });
        }
    }, {
        root: null,
        rootMargin: '0px 0px -80% 0px', // Keeps the same "active zone"
        threshold: 0
    });

    allSections.forEach(section => {
        if (section.id) { // Only observe sections with an ID
            navObserver.observe(section);
        }
    });
}