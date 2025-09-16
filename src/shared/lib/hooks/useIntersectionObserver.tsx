/**
 * @file: src/shared/lib/hooks/useIntersectionObserver.tsx
 *
 * @description: A custom hook that encapsulates the logic for observing multiple page sections and
 *               identifying the currently active one.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This hook, `useIntersectionObserver`, is the all-seeing eye of the application. It's a
 * sophisticated piece of machinery that leverages the browser's `IntersectionObserver` API to watch
 * multiple sections of the page simultaneously. Its mission is to figure out which section the user
 * is currently looking at and report back by calling the `setActiveSection` callback. This is how
 * the header navigation magically highlights the correct link as you scroll.
 *
 * Architecturally, it's doing some heavy lifting. It maintains an internal `ref` that acts as a
 * registry for all the DOM elements that want to be watched. It then returns a `registerRef`
 * function—a callback ref, for those in the know—that components can use to sign themselves up for
 * observation. The core logic lives inside a `useEffect`, which sets up the observer and,
 * crucially, cleans up after itself when it's done. It's a beautifully self-contained system that
 * decouples the components being observed from the component that needs to know the result.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ useIntersectionObserver (hook)
 */
import { useCallback, useEffect, useRef } from 'react';

type SetActiveSection = (sectionId: string) => void;

export const useIntersectionObserver = (
	setActiveSection: SetActiveSection,
) => {
	const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

	const registerRef = useCallback((name: string, el: HTMLElement | null) => {
		if (el) {
			sectionRefs.current[name] = el;
		}
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ root: null, rootMargin: '0px', threshold: 0.3 },
		);

		const currentRefs = Object.values(sectionRefs.current);
		currentRefs.forEach((section) => {
			/**
			 * FIXME[TYPESAFETY-001]: The value from `Object.values` was of type `unknown`,
			 * causing a TypeScript error. An `instanceof HTMLElement` check was added as a
			 * type guard to ensure safety before observing the element.
			 */
			if (section instanceof HTMLElement) observer.observe(section);
		});

		return () => {
			currentRefs.forEach((section) => {
				if (section instanceof HTMLElement) observer.unobserve(section);
			});
		};
	}, [setActiveSection]);

	return { sectionRefs, registerRef };
};