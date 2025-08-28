/**
 * @file src/scripts/main.js
 * @version 1.2.0
 * @description This file is the entry point that initializes all other modules and imports all styles.
 *
 * @module Root
 *
 * @summary As the main entry point for the application's JavaScript, this file is responsible for
 * importing all necessary CSS files in the correct order and then initializing all JavaScript
 * modules. It ensures that styles are loaded before scripts attempt to manipulate the DOM and
 * provides a centralized location for managing application startup.
 *
 * @dependencies
 * - All CSS files in /src/styles/
 * - All module initialization functions in /src/scripts/modules/
 *
 * @outputs
 * - A fully initialized and styled single-page application.
 *
 * @changelog
 * - v1.2.0 (2025-08-28): Implemented smooth page transitions.
 * - v1.1.1 (2025-08-26): Fixed critical bug where responsive.css was imported in the wrong order, breaking desktop layouts.
 * - v1.1.0 (2025-08-26): Added imports for new components and initialized testimonial carousel.
 * - v1.0.0 (2025-08-25): Initial version created during codebase refactor.
 */

// Import initialization functions from all modules.
import { initTimeline } from './modules/timeline.js';
import { initNavigation } from './modules/navigation.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initTestimonialCarousel } from './modules/testimonial-carousel.js';

/**
 * Handles smooth page transitions.
 */
function initPageTransitions() {
    // On page load, fade out the overlay
    document.body.classList.add('is-loaded');

    // On link click, fade in overlay before navigating
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');

        // Check if it's a valid, local, non-hash link
        if (link && link.href && link.target !== '_blank' && link.href.startsWith(window.location.origin) && !link.href.includes('#')) {
            e.preventDefault();
            const destination = link.href;

            document.body.classList.remove('is-loaded');

            setTimeout(() => {
                window.location.href = destination;
            }, 500); // Match transition duration
        }
    });
}


/**
 * Main application initializer.
 * This function is called once the DOM is fully loaded.
 */
function initializeApp() {
    try {
        // Initialize all modules
        initTimeline();
        initNavigation();
        initScrollAnimations();
        initTestimonialCarousel();
        initPageTransitions();

        // Lazy-load the chat panel module only when the user interacts with it.
        const chatTrigger = document.getElementById('chat-trigger');
        if (chatTrigger) {
            chatTrigger.addEventListener('click', async () => {
                try {
                    const { initChatPanel } = await import('./modules/chat-panel.js');
                    initChatPanel();
                } catch (error) {
                    console.error("Failed to load chat panel module:", error);
                }
            }, { once: true }); // The { once: true } option ensures this runs only once.
        }

    } catch (error) {
        console.error("An error occurred during app initialization:", error);
    }
}

// Run the application once the DOM is ready.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}