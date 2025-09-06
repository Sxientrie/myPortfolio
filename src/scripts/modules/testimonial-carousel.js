/**
 * @file src/scripts/modules/testimonial-carousel.js
 * @version 0.2.0
 * @description Manages the functionality for the testimonial carousel component.
 *
 * @module Modules
 *
 * @summary This module handles the logic for the testimonial carousel, including user-triggered
 * navigation via previous/next buttons, an automatic scrolling feature, and dynamic generation
 * of slide indicators. It enhances accessibility with ARIA attributes.
 *
 * @dependencies
 * - None
 *
 * @outputs
 * - Exports the `initTestimonialCarousel` function.
 *
 * @changelog
 * - v0.2.0 (2025-09-06): Added dynamic indicators and ARIA attributes for accessibility.
 * - v0.1.0 (2025-08-26): File created to manage the new testimonial carousel.
 */

export function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) {
        // This is not an error, as the carousel may not be on every page.
        return;
    }

    const track = carousel.querySelector('.testimonial-carousel__track');
    const nextButton = carousel.querySelector('#testimonial-next');
    const prevButton = carousel.querySelector('#testimonial-prev');
    const indicatorsContainer = carousel.querySelector('.testimonial-carousel__indicators');

    if (!track || !nextButton || !prevButton || !indicatorsContainer) {
        console.warn('Testimonial carousel elements not found. Skipping initialization.');
        return;
    }

    const slides = Array.from(track.children);
    let currentIndex = 0;
    const slideCount = slides.length;
    const autoScrollDelay = 15000; // 15 seconds
    let autoScrollInterval;

    // --- Create Indicators ---
    indicatorsContainer.innerHTML = ''; // Clear any existing indicators
    for (let i = 0; i < slideCount; i++) {
        const button = document.createElement('button');
        button.classList.add('indicator-dot');
        button.setAttribute('aria-label', `Go to slide ${i + 1}`);
        button.addEventListener('click', () => {
            goToSlide(i);
            resetAutoScroll();
        });
        indicatorsContainer.appendChild(button);
    }
    const indicators = Array.from(indicatorsContainer.children);

    const updateIndicators = (newIndex) => {
        indicators.forEach((dot, index) => {
            dot.classList.toggle('is-active', index === newIndex);
        });
    };

    const updateAriaLabels = (newIndex) => {
        slides.forEach((slide, index) => {
            const isCurrent = index === newIndex;
            slide.setAttribute('aria-hidden', !isCurrent);
        });
        track.setAttribute('aria-label', `Testimonial ${newIndex + 1} of ${slideCount}`);
    };

    const goToSlide = (index) => {
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }
        track.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateIndicators(currentIndex);
        updateAriaLabels(currentIndex);
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

    // Initial setup
    goToSlide(0);
    startAutoScroll();
}