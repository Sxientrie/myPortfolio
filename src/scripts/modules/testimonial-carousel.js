/**
 * @file src/scripts/modules/testimonial-carousel.js
 * @version 0.1.0
 * @description Manages the functionality for the testimonial carousel component.
 *
 * @module Modules
 *
 * @summary This module handles the logic for the testimonial carousel, including user-triggered
 * navigation via previous/next buttons and an automatic scrolling feature. It ensures the carousel
 * cycles through slides correctly and resets its auto-scroll timer on user interaction.
 *
 * @dependencies
 * - None
 *
 * @outputs
 * - Exports the `initTestimonialCarousel` function.
 *
 * @changelog
 * - v0.1.0 (2025-08-26): File created to manage the new testimonial carousel.
 */

export function initTestimonialCarousel() {
    const track = document.querySelector('.testimonial-carousel__track');
    const nextButton = document.getElementById('testimonial-next');
    const prevButton = document.getElementById('testimonial-prev');

    if (!track || !nextButton || !prevButton) {
        console.warn('Testimonial carousel elements not found. Skipping initialization.');
        return;
    }

    const slides = Array.from(track.children);
    let currentIndex = 0;
    const slideCount = slides.length;
    const autoScrollDelay = 15000; // 15 seconds
    let autoScrollInterval;

    const goToSlide = (index) => {
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        currentIndex = index;
    };

    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, autoScrollDelay);
    };

    const resetAutoScroll = () => {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    };

    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoScroll();
    });

    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoScroll();
    });

    startAutoScroll(); // Initial start
}