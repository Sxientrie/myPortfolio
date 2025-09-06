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
    { date: "Feb 2018 - March 2020", title: "Line Cook", company: "Chowtime", description: "Thrived in a high-volume, fast-paced kitchen environment, consistently meeting tight deadlines for service during peak hours.", icon: "cook" },
    { date: "April 2020 - July 2022", title: "Technical and Customer Support Specialist", company: "Lenin Computer Inc.", description: "Acted as the primary escalation point for complex hardware and software issues, improving resolution time by 15%.", icon: "support" },
    { date: "September 2023 - August 2024", title: "Owner / IT Consultant", company: "Starlite IT Solution", description: "Managed all business operations, delivering end-to-end client solutions from custom PC builds to complex diagnostics.", icon: "consultant" },
    { date: "January 2025 - Present", title: "Freelance Full-Stack Developer", company: "Self-Employed", description: "Developing full-stack web applications for clients using Ruby on Rails and integrating secure payment systems.", icon: "developer" }
];