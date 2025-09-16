import { useCallback, useEffect, useRef } from "react";
export const useScrollAnimation = () => {
	const elementsRef = useRef<(HTMLElement | null)[]>([]);
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
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
