/**
 * @file src/scripts/modules/page-transitions.js
 * @version 1.0.0
 * @description Handles the smooth transition between pages.
 *
 * @module Modules
 *
 * @summary This module implements a fade-in/fade-out transition effect when the user navigates
 * between pages. It fades the page to an overlay on link clicks and fades the new page in on load.
 *
 * @dependencies
 * - None
 *
 * @outputs
 * - Exports the `initPageTransitions` function.
 */

/**
 * Initializes the page transition effects.
 */
export function initPageTransitions() {
  const overlay = document.getElementById('page-overlay');
  if (!overlay) {
    console.warn('Page overlay not found. Skipping transition initialization.');
    return;
  }

  // Handle clicks on internal links
  const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]');

  internalLinks.forEach(link => {
    // Ignore links that open in a new tab or are not for page navigation
    if (link.target === '_blank' || link.getAttribute('href') === '#') {
      return;
    }

    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.href;

      // Fade in the overlay
      overlay.classList.add('is-entering');
      overlay.classList.remove('is-exiting');

      // Wait for the animation to finish, then navigate
      setTimeout(() => {
        window.location.href = href;
      }, 250); // This should match the animation duration in CSS
    });
  });
}
