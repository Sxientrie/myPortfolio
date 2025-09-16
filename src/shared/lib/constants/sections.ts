/**
 * @file: src/shared/lib/constants/sections.ts
 *
 * @description: Defines a constant mapping of section names to their corresponding HTML IDs.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This file is the single source of truth for all the section IDs used throughout the application.
 * It's a simple mapping that prevents the chaos of "magic strings," where a typo in a section ID
 * could lead to hours of debugging. Instead of scattering strings like `"hero"` and `"about"` all
 * over the codebase, we import them from this one, sacred object. It's a small, boring, but
 * utterly essential piece of architectural sanity.
 *
 * @dependencies:
 * ➥ None
 *
 * @outputs:
 * ➥ SECTIONS (constant)
 */
export const SECTIONS: { [key: string]: string } = {
	HERO: 'hero',
	ABOUT: 'about',
	EXPERIENCE: 'experience',
	PROJECTS: 'projects',
	TESTIMONIALS: 'testimonials',
};
