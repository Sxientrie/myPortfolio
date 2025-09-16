/**
 * @file: src/shared/lib/hooks/useLocalStorage.ts
 *
 * @description: A hook that mirrors React's `useState` but with the added "feature" of persisting
 *               the state to the browser's `localStorage`.
 *
 * @module: Shared.Core
 *
 * @overview:
 * Behold, the `useLocalStorage` hook, a classic tool from the "I don't want to lose this state on
 * page refresh" toolbox. It's a clever imposter that presents itself with the exact same API as
 * `React.useState` but secretly squirrels the state away in the browser's `localStorage`. This
 * means the state survives page reloads, browser crashes, and probably the apocalypse.
 *
 * Architecturally, it's a fine piece of engineering. It uses the lazy initializer form of
 * `useState` to read from `localStorage` only once, preventing unnecessary disk reads on every
 * render. It employs a `useEffect` to dutifully write back to `localStorage` any time the state
 * changes. It's generic, so it can handle whatever JSON-serializable data you throw at it, and
 * it's paranoid enough to wrap its `localStorage` calls in `try...catch` blocks, because you never
 * know when a user's browser is going to decide to have a bad day. It's a perfect, drop-in
 * replacement for `useState` for when you need a little more permanence in your life.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ useLocalStorage (hook)
 */
/**
 * FIXME[COMPILATION-002]: The file was using React-specific types like `React.Dispatch`
 * without importing the `React` namespace, causing a TypeScript error. This was
 * corrected by adding `import type React`.
 */
import type React from 'react';
import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(
	key: string,
	initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(storedValue));
		} catch (error) {
			console.error(`Error setting localStorage key "${key}":`, error);
		}
	}, [key, storedValue]);

	return [storedValue, setStoredValue];
};