import type React from "react";
import { useEffect } from "react";
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
		window.addEventListener("scroll", onScroll, { passive: true });
		handleScroll();
		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, [containerRef, progressRef]);
};
