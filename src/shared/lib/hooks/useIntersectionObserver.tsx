import { useCallback, useEffect, useRef } from "react";
type SetActiveSection = (sectionId: string) => void;
export const useIntersectionObserver = (setActiveSection: SetActiveSection) => {
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
			{ root: null, rootMargin: "0px", threshold: 0.3 },
		);
		const currentRefs = Object.values(sectionRefs.current);
		currentRefs.forEach((section) => {
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
