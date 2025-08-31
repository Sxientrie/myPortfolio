0/*1*
 * @file src/scripts/modules/scroll-animations.js
 * @version 1.0.1
 * @description Manages all scroll-based animations and observers.
 *
 * @module Modules
 *
 * @summary This module handles all animations that are triggered by user scrolling. It uses a
 * combination of an optimized `requestAnimationFrame` loop for continuous animations (like the
 * timeline progress) and an `IntersectionObserver` for fade-in effects on elements like project
 * cards and timeline items.
 *
 * @dependencies
 * - None
 *
 * @outputs
 * - Exports the `initScrollAnimations` function.
 *
 * @changelog
 * - v1.0.1 (2025-08-26): Refactored footer visibility check to use a constant.
 * - v1.0.0 (2025-08-25): Initial version, with updated selectors to match BEM refactoring.
 */

const SCROLL_CONFIG = {
    FOOTER_VISIBILITY_OFFSET: 5
};

let lastScrollY = window.scrollY;
let isScrollTicking = false;

/**
 * Handles animations that update on every scroll frame.
 */
function handleFrameAnimations() {
    const screenHeight = window.innerHeight;
    const viewportCenter = screenHeight / 2;

    // Animate 'About' section divider
    const aboutSection = document.getElementById('about');
    const storyDividerProgress = document.querySelector('.about__story-divider-progress');
    if (aboutSection && storyDividerProgress) {
        const aboutRect = aboutSection.getBoundingClientRect();
        const aboutProgress = (viewportCenter - aboutRect.top) / aboutRect.height;
        storyDividerProgress.style.transform = `scaleY(${Math.max(0, Math.min(1, aboutProgress))})`;
    }

    // Animate 'Experience' timeline progress bar
    const timelineContainer = document.getElementById('timeline-container');
    const timelineProgress = document.querySelector('.timeline__progress');
    if (timelineContainer && timelineProgress) {
        const timelineRect = timelineContainer.getBoundingClientRect();
        const timelineProgressVal = (viewportCenter - timelineRect.top) / timelineRect.height;
        timelineProgress.style.transform = `scaleY(${Math.max(0, Math.min(1, timelineProgressVal))})`;
    }

    // Activate timeline items based on scroll direction
    const isScrollingDown = window.scrollY > lastScrollY;
    lastScrollY = window.scrollY;

    document.querySelectorAll('.timeline-item').forEach(item => {
        const iconRect = item.querySelector('.timeline-item__icon')?.getBoundingClientRect();
        if (iconRect) {
            if (isScrollingDown) {
                if (iconRect.top < viewportCenter) item.classList.add('timeline-item--active');
            } else {
                if (iconRect.top > viewportCenter) item.classList.remove('timeline-item--active');
            }
        }
    });

    // Show/hide footer
    const footer = document.querySelector('.site-footer');
    if (footer) {
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - SCROLL_CONFIG.FOOTER_VISIBILITY_OFFSET;
        footer.classList.toggle('site-footer--visible', isAtBottom);
    }
}

/**
 * Sets up an IntersectionObserver to trigger fade-in animations for content.
 */
function setupContentObserver() {
    const contentObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Performance: stop observing once visible.
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item, .project-card').forEach(el => contentObserver.observe(el));
}

/**
 * Initializes all scroll-based animations and the main scroll event listener.
 */
export function initScrollAnimations() {
    // Optimized scroll handling using requestAnimationFrame
    window.addEventListener('scroll', () => {
        if (!isScrollTicking) {
            window.requestAnimationFrame(() => {
                handleFrameAnimations();
                isScrollTicking = false;
            });
            isScrollTicking = true;
        }
    }, { passive: true });

    setupContentObserver();
    handleFrameAnimations(); // Initial call to set correct states on load
}