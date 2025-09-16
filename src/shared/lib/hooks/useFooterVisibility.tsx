/**
 * @file: src/shared/lib/hooks/useFooterVisibility.tsx
 *
 * @description: A custom hook that detects if the user has scrolled to the bottom of the page.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This is the `useFooterVisibility` hook. Its entire existence is dedicated to one simple, yet
 * surprisingly important question: "Has the user reached the bottom of the page yet?" It attaches
 * a scroll event listener to the window and, on every scroll event, performs the sacred
 * calculation to determine if the user's viewport is within a few pixels of the document's end.
 * It then returns a simple boolean (`true` or `false`) to let the consuming component know
 * whether it's time to reveal the footer.
 *
 * Architecturally, it's a model of a good, self-contained hook. It encapsulates its own state
 * (`isVisible`) and manages its own side effects (the event listener). Crucially, it remembers to
 * clean up after itself by removing the event listener when the component that called it unmounts,
 * thus preventing the digital ghosts of memory leaks from haunting the application. It's a small,
 * focused piece of logic, perfectly abstracted for reuse.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ useFooterVisibility (hook)
 */
import { useEffect, useState } from 'react';

export const useFooterVisibility = (): boolean => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = (): void => {
			const isAtBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 5;
			setIsVisible(isAtBottom);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll(); // Check on initial render

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return isVisible;
};
