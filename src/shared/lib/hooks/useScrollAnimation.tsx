/**
 * @file: src/shared/lib/hooks/useScrollAnimation.tsx
 *
 * @description: A hook that uses the IntersectionObserver to apply a CSS class to elements when
 *               they scroll into view, triggering a reveal animation.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This is the `useScrollAnimation` hook, the workhorse behind all those subtle "fade-in-as-you-scroll"
 * effects. It's a simple but effective piece of magic. You call the hook, it gives you back a
 * `register` function. You attach that function to any element's `ref`, and the hook takes care of
 * the rest. It uses an `IntersectionObserver` to watch the element, and the moment it peeks into
 * the viewport, the hook slaps a CSS class (`is-visible`) on it. The actual animation is handled
 * by CSS, of course. The hook doesn't care *how* it animates, only *when*.
 *
 * Architecturally, it's a lean, mean, animating machine. It can track any number of elements that
 * you register with it, storing them all in a `ref` array. It's a fire-and-forget system: register
 * your element, and the hook ensures it will animate into view exactly once. Like any well-behaved
 * hook, it diligently cleans up its observers when it's no longer needed. It's a clean abstraction
 * for a very common UI pattern.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ useScrollAnimation (hook)
 */
import { useCallback, useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
	const elementsRef = useRef<(HTMLElement | null)[]>([]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
					}
				});
			},
			{
				threshold: 0.1,
			},
		);

		const currentElements = elementsRef.current;
		currentElements.forEach((el) => {
			if (el) observer.observe(el);
		});

		return () => {
			currentElements.forEach((el) => {
				if (el) observer.unobserve(el);
			});
		};
	}, []);

	const register = useCallback((el: HTMLElement | null) => {
		if (el && !elementsRef.current.includes(el)) {
			elementsRef.current.push(el);
		}
	}, []);

	return register;
};
