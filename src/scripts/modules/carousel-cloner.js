/**
 * @file src/scripts/modules/carousel-cloner.js
 * @description Handles the cloning of carousel items for an infinite scroll effect.
 *
 * @module Modules
 *
 * @summary This module finds a specified carousel track element and duplicates its children
 * to create a seamless looping effect.
 *
 * @dependencies
 * - None
 *
 * @outputs
 * - Exports the `initCarouselCloner` function.
 */

/**
 * Clones the children of the carousel track to create an infinite scroll effect.
 */
export function initCarouselCloner() {
    const track = document.getElementById('tech-track');
    if (track) {
        const slides = Array.from(track.children);
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            track.appendChild(clone);
        });
    }
}
