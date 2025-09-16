/**
 * @file: src/shared/lib/hooks/useScrollPathAnimation.tsx
 *
 * @description: A hook that animates the drawing of an SVG path based on the scroll position within
 *               a container.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This hook, `useScrollPathAnimation`, is a highly specialized piece of equipment. It exists for
 * one reason: to create that slick effect where an SVG line appears to draw itself as you scroll.
 * It works by employing the classic `stroke-dasharray` and `stroke-dashoffset` trick. It measures
 * the total length of an SVG path, makes the dash pattern equal to that length, and then uses the
 * scroll position to gradually reduce the offset, revealing the line in a smooth, controlled
 * manner.
 *
 * Architecturally, it's a prime example of a well-contained side effect. It takes refs to the SVG
 * path and a container element, and then proceeds to manipulate the path's style directly. This is
 * a deliberate dip into imperative DOM manipulation, a necessary evil for creating high-performance,
 * scroll-linked animations that would be foolish to attempt with React state. It's even got a
 * `try-catch` block with a `setTimeout` retry for getting the path length, a battle-scarred
 * acknowledgment that browsers don't always have DOM elements ready when you need them. It's a
 * focused, powerful tool for a very specific visual effect.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ useScrollPathAnimation (hook)
 */

/**
 * FIXME[COMPILATION-002]: The file was using React-specific types like `React.RefObject`
 * without importing the `React` namespace, causing a TypeScript error. This was
 * corrected by adding `import type React`.
 */
import type React from 'react';
import { useEffect } from 'react';

export const useScrollPathAnimation = (
	pathRef: React.RefObject<SVGPathElement>,
	containerRef: React.RefObject<HTMLElement>,
): void => {
	/**
	 * FIXME(AI)[RELIABILITY-001]: The original implementation lacked a robust check for the path's
	 * existence before attempting to measure it.
	 */
	useEffect(() => {
		const path = pathRef.current;
		const container = containerRef.current;
		if (!path || !container) return;

		let pathLength = 0;
		try {
			pathLength = path.getTotalLength();
		} catch (e) {
			console.warn('Could not get path length, retrying...', e);
			setTimeout(() => {
				try {
					pathLength = path.getTotalLength();
					path.style.strokeDasharray = `${pathLength} ${pathLength}`;
					path.style.strokeDashoffset = `${pathLength}`;
				} catch (e2) {
					console.error('Failed to get path length on retry.', e2);
				}
			}, 100);
		}

		path.style.strokeDasharray = `${pathLength} ${pathLength}`;
		path.style.strokeDashoffset = `${pathLength}`;

		const handleScroll = (): void => {
			if (!container) return;
			const { top, height } = container.getBoundingClientRect();
			const scrollPercent = Math.max(
				0,
				Math.min(1, (window.innerHeight - top) / (window.innerHeight + height)),
			);
			const drawLength = pathLength * scrollPercent;
			path.style.strokeDashoffset = `${pathLength - drawLength}`;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [pathRef, containerRef]);
};