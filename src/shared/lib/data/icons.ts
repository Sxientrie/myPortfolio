/**
 * @file: src/shared/lib/data/icons.ts
 *
 * @description: A collection of SVG icon markup stored as strings in a constant object.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This file is a tiny, self-contained museum of SVG icons. It exports a single object, `icons`,
 * where each key is a semantic name and each value is a string containing the raw SVG markup for
 * that icon. This approach was likely chosen for its simplicity, avoiding the need for another
 * build tool or library to handle SVG imports. It's a bit primitive, perhaps, but it gets the job
 * done without any fuss. It's the digital equivalent of keeping your tools in a single,
 * well-organized drawer.
 *
 * @dependencies:
 * ➥ None
 *
 * @outputs:
 * ➥ icons (constant)
 */
export const icons = {
	cook: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0122 12c0 3-1 7-6.343 6.657z"></path></svg>`,
	support: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V5m0 14v-1m6-7h1M5 12H4m15 0h1M8.5 8.5l.707-.707M15.5 15.5l.707-.707M8.5 15.5l.707.707M15.5 8.5l.707.707"></path></svg>`,
	consultant: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
	developer: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>`,
};
