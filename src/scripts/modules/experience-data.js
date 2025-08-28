/**
 * @file src/scripts/modules/experience-data.js
 * @version 1.1.0
 * @description Contains the data for the experience timeline.
 *
 * @module Modules
 *
 * @summary This file exports a constant array of objects, where each object represents a single
 * item in the experience timeline. This data-centric approach allows for easy updates to the
 * timeline content without needing to modify the component's logic.
 *
 * @dependencies
 * - None
 *
 * @outputs
 * - Exports the `experienceData` array.
 *
 * @changelog
 * - v1.1.0 (2025-08-26): Updated icon colors to use the new aurora theme variables.
 * - v1.0.0 (2025-08-25): Initial version, extracted from the main application.
 */

export const experienceData = [
    { date: "Feb 2018 - March 2020", title: "Line Cook", company: "Chowtime", description: "Thrived in a high-volume, fast-paced kitchen environment, consistently meeting tight deadlines for service during peak hours.", icon: `<svg class="timeline-item__icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0122 12c0 3-1 7-6.343 6.657z"></path></svg>` },
    { date: "April 2020 - July 2022", title: "Technical and Customer Support Specialist", company: "Lenin Computer Inc.", description: "Acted as the primary escalation point for complex hardware and software issues, improving resolution time by 15%.", icon: `<svg class="timeline-item__icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V5m0 14v-1m6-7h1M5 12H4m15 0h1M8.5 8.5l.707-.707M15.5 15.5l.707-.707M8.5 15.5l.707.707M15.5 8.5l.707.707"></path></svg>` },
    { date: "September 2023 - August 2024", title: "Owner / IT Consultant", company: "Starlite IT Solution", description: "Managed all business operations, delivering end-to-end client solutions from custom PC builds to complex diagnostics.", icon: `<svg class="timeline-item__icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>` },
    { date: "January 2025 - Present", title: "Freelance Full-Stack Developer", company: "Self-Employed", description: "Developing full-stack web applications for clients using Ruby on Rails and integrating secure payment systems.", icon: `<svg class="timeline-item__icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>` }
];