/**
 * @file: src/shared/lib/hooks/useScrollProgress.tsx
 *
 * @description: A hook that tracks the scroll progress within a container and applies it as a
 *               vertical scale transform to a target element.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This is the `useScrollProgress` hook, another specialized tool for scroll-based animations. Its
 * job is to watch a container element and calculate how far the user has scrolled through it. It
 * then takes this progress, a number between 0 and 1, and applies it as a `scaleY` transform to a
 * different element, effectively making it "grow" or "shrink" vertically as the user scrolls. This
 * is the magic behind the animated timeline that draws itself.
 *
 * Architecturally, it's a responsible citizen of the front-end world. It wisely uses
 * `requestAnimationFrame` to ensure its DOM manipulations don't thrash the layout on every single
 * scroll event, a performance optimization that separates the pros from the amateurs. Like its
 * cousins, it directly manipulates the DOM for performance reasons and is careful to clean up its
 * event listeners when it's done. It's a focused, performant hook for creating a specific type of
 * scroll-driven animation.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ useScrollProgress (hook)
 */

/**
 * FIXME[COMPILATION-002]: The file was using React-specific types like `React.RefObject`
 * without importing the `React` namespace, causing a TypeScript error. This was
 * corrected by adding `import type React`.
 */
import type React from 'react';
import { useEffect } from 'react';

export const useScrollProgress = (
	containerRef: React.RefObject<HTMLElement>,
	progressRef: React.RefObject<HTMLElement>,
): void => {
	useEffect(() => {
		const container = containerRef.current;
		const progressElement = progressRef.current;
		if (!container || !progressElement) return;

		let isTicking = false;

		const handleScroll = (): void => {
			const { top, height } = container.getBoundingClientRect();
			const viewportCenter = window.innerHeight / 2;
			const progress = (viewportCenter - top) / height;
			const clampedProgress = Math.max(0, Math.min(1, progress));

			progressElement.style.transform = `scaleY(${clampedProgress})`;
			isTicking = false;
		};

		const onScroll = (): void => {
			if (!isTicking) {
				window.requestAnimationFrame(handleScroll);
				isTicking = true;
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [containerRef, progressRef]);
};