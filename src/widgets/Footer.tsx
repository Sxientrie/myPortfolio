import type React from "react";
import { memo } from "react";
interface FooterProps {
	isVisible: boolean;
}
export const Footer = memo(({ isVisible }: FooterProps): React.ReactElement => {
	const currentYear = new Date().getFullYear();
	return (
		<footer
			className={`p-4 px-8 flex justify-center items-center text-center text-[oklch(95%_0_0_/_0.5)] bg-[oklch(7%_0.02_265)] border-t border-[oklch(100%_0_0_/_0.05)] transition-opacity duration-500 ease-in-out relative z-[7] text-xs ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
		>
			<p className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
				<span>&copy; {currentYear} Jayson Jamora. All Rights Reserved.</span>
				<span className="hidden md:inline text-[oklch(95%_0_0_/_0.5)]">|</span>
				<span>Built with React & lots of coffee.</span>
			</p>
		</footer>
	);
});
