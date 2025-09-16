import { useEffect, useState } from "react";
export const useFooterVisibility = (): boolean => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	useEffect(() => {
		const handleScroll = (): void => {
			const isAtBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 5;
			setIsVisible(isAtBottom);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return isVisible;
};
