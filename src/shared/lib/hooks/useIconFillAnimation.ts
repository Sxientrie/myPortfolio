import type React from "react";
import { useEffect } from "react";
export const useIconFillAnimation = (
	gradientRef: React.RefObject<SVGLinearGradientElement>,
): void => {
	useEffect(() => {
		const gradient = gradientRef.current;
		if (!gradient) return;
		let isTicking = false;
		const stops = gradient.querySelectorAll("stop");
		if (stops.length < 2) return;
		stops.forEach((stop) => {
			stop.setAttribute("offset", "0%");
		});
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
			const animationZoneHeight = height;
			const triggerStart = viewportCenter + animationZoneHeight / 2;
			const _triggerEnd = viewportCenter - animationZoneHeight / 2;
			const progress = (triggerStart - elementCenter) / animationZoneHeight;
			const clampedProgress = Math.max(0, Math.min(1, progress));
			const offset = `${clampedProgress * 100}%`;
			stops[0].setAttribute("offset", offset);
			stops[1].setAttribute("offset", offset);
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
	}, [gradientRef]);
};
