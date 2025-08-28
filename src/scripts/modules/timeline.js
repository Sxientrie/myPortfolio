/**
 * @file src/scripts/modules/timeline.js
 * @version 1.1.0
 * @description Manages the population of the experience timeline.
 *
 * @module Modules
 *
 * @summary This module is responsible for dynamically generating the experience timeline. It imports
 * the timeline data from `experience-data.js` and uses it to populate the DOM with timeline items,
 * each with its own icon, date, title, company, and description.
 *
 * @dependencies
 * - ./experience-data.js (for the timeline data)
 *
 * @outputs
 * - Exports the `initTimeline` function.
 *
 * @changelog
 * - v1.1.0 (2025-08-26): Refactored to remove Tailwind classes and use BEM for compliance.
 * - v1.0.0 (2025-08-25): Initial version, with updated import paths and BEM selectors.
 */

import { experienceData } from './experience-data.js';

/**
 * Finds the timeline wrapper in the DOM and populates it with experience data.
 */
export function initTimeline() {
    const timelineWrapper = document.getElementById('timeline-items-wrapper');

    if (!timelineWrapper) {
        console.warn('Timeline wrapper element not found. Skipping timeline population.');
        return;
    }

    timelineWrapper.innerHTML = experienceData.map(item => `
        <div class="timeline-item">
            <div class="timeline-item__icon">
                <div class="timeline-item__icon-wrapper">
                    ${item.icon}
                </div>
                <svg class="timeline-item__icon-frame" viewBox="0 0 48 48">
                   <path d="M 24 2 a 22 22 0 0 1 0 44"></path>
                   <path d="M 24 2 a 22 22 0 0 0 0 44"></path>
                </svg>
            </div>
            <div class="timeline-item__content">
                <p class="timeline-item__date">${item.date}</p>
                <h3 class="timeline-item__title">${item.title}</h3>
                <p class="timeline-item__company">${item.company}</p>
                <p class="timeline-item__description">${item.description}</p>
            </div>
        </div>
    `).join('');
}