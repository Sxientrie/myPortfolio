/**
 * @file src/scripts/main.js
 * @version 1.1.1
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
 * - v1.1.1 (2025-08-26): Fixed critical bug where responsive.css was imported in the wrong order, breaking desktop layouts.
 * - v1.1.0 (2025-08-26): Added imports for new components and initialized testimonial carousel.
 * - v1.0.0 (2025-08-25): Initial version created during codebase refactor.
 */

// Import initialization functions from all modules.
import { initTimeline } from './modules/timeline.js';
import { initNavigation } from './modules/navigation.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initTestimonialCarousel } from './modules/testimonial-carousel.js';
import { initCarouselCloner } from './modules/carousel-cloner.js';

/**
 * Main application initializer.
 * This function is called once the DOM is fully loaded.
 */
function initializeApp() {
    try {
        // Update copyright year
        const copyrightSpan = document.getElementById('copyright-year');
        if (copyrightSpan) {
            copyrightSpan.innerHTML = `&copy; ${new Date().getFullYear()} Jayson Jamora. All Rights Reserved.`;
        }
        // Initialize core modules that are visible on page load.
        initCarouselCloner();
        initTimeline();
        initNavigation();
        initScrollAnimations();
        initTestimonialCarousel();

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