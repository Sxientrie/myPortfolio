/**
 * @file: src/shared/lib/hooks/useIconFillAnimation.ts
 *
 * @description: A hook that creates a top-to-bottom 'fill' effect on an SVG element by animating a
 *               linear gradient's color stops based on scroll position.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This hook is a piece of specialized machinery for creating a dynamic 'fill' animation on an SVG
 * element as it scrolls through the center of the viewport. It's the magic behind the timeline
 * icons that appear to fill with color as you scroll past them.
 *
 * The hook targets an SVG `<linearGradient>` element via a ref. It then attaches a scroll listener
 * that calculates the position of the SVG relative to the vertical center of the screen. This
 * scroll progress is then used to directly manipulate the 'offset' attribute of the gradient's
 * color stops, creating the illusion of a color wipe that moves downwards. To keep things buttery
 * smooth, all DOM manipulations are wrapped in a `requestAnimationFrame` call. It's a
 * self-contained and performant solution for a highly specific and delightful UI animation.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ useIconFillAnimation (hook)
 */
import type React from 'react';
import { useEffect } from 'react';

export const useIconFillAnimation = (
	gradientRef: React.RefObject<SVGLinearGradientElement>,
): void => {
	useEffect(() => {
		const gradient = gradientRef.current;
		if (!gradient) return;

		let isTicking = false;
		const stops = gradient.querySelectorAll('stop');
		if (stops.length < 2) return;

		// Initialize stops to be at the very top.
		stops.forEach((stop) => stop.setAttribute('offset', '0%'));

		const handleScroll = (): void => {
			if (!gradient.ownerSVGElement) {
				isTicking = false;
				return;
			}
			const { top, height } = gradient.ownerSVGElement.getBoundingClientRect();
			if (height === 0) {
				isTicking = false;
				return;
			}
			const elementCenter = top + height / 2;

			const viewportCenter = window.innerHeight / 2;
			// The animation zone is now the height of the icon itself, making the
			// trigger much more precise.
			const animationZoneHeight = height;

			const triggerStart = viewportCenter + animationZoneHeight / 2;
			const triggerEnd = viewportCenter - animationZoneHeight / 2;

			const progress = (triggerStart - elementCenter) / animationZoneHeight;
			const clampedProgress = Math.max(0, Math.min(1, progress));

			// Animate stop offsets together to create a downward fill effect
			const offset = `${clampedProgress * 100}%`;
			stops[0].setAttribute('offset', offset);
			stops[1].setAttribute('offset', offset);

			isTicking = false;
		};

		const onScroll = (): void => {
			if (!isTicking) {
				window.requestAnimationFrame(handleScroll);
				isTicking = true;
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		handleScroll(); // Initial check

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [gradientRef]);
};
