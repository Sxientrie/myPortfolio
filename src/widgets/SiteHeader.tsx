import type React from "react";
import { memo, useEffect, useState } from "react";
import { SECTIONS } from "../shared/lib/constants/sections.ts";
import { AnimatedLogo } from "../shared/ui/AnimatedLogo.tsx";
import { AuroraButton } from "../shared/ui/AuroraButton.tsx";
interface SiteHeaderProps {
	activeSection: string;
	sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
	currentPage: "portfolio" | "blog" | "blogPost";
	navigateTo: (destination: string) => void;
}
const portfolioNavLinks = [
	{ id: SECTIONS.ABOUT, label: "About" },
	{ id: SECTIONS.EXPERIENCE, label: "Experience" },
	{ id: SECTIONS.PROJECTS, label: "Work" },
];
export const SiteHeader = memo(
	({
		activeSection,
		navigateTo,
		currentPage,
	}: SiteHeaderProps): React.ReactElement => {
		const [isScrolled, setIsScrolled] = useState(false);
		const [isMenuOpen, setIsMenuOpen] = useState(false);
		useEffect(() => {
			const handleScroll = (): void => {
				setIsScrolled(window.scrollY > 50);
			};
			window.addEventListener("scroll", handleScroll);
			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		}, []);
		const handleNavClick = (destination: string): void => {
			navigateTo(destination);
			setIsMenuOpen(false);
		};
		const currentSection = activeSection === SECTIONS.HERO ? "" : activeSection;
		const isBlogView = currentPage === "blog" || currentPage === "blogPost";
		const mainNavLinks =
			currentPage === "portfolio"
				? portfolioNavLinks
				: [{ id: "portfolio", label: "Portfolio" }];
		return (
			<header
				className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-300`}
			>
				<div
					className={`flex justify-between items-center p-2 pl-4 rounded-xl transition-all duration-300 ${
						isScrolled || isMenuOpen
							? "bg-[oklch(3%_0.01_265_/_0.8)] backdrop-blur-md border border-[oklch(100%_0_0_/_0.1)]"
							: "bg-transparent border border-transparent"
					}`}
				>
					<a
						href="#hero"
						onClick={(e) => {
							e.preventDefault();
							handleNavClick("hero");
						}}
						className="flex items-center gap-3"
						aria-label="Go to top of page"
					>
						<AnimatedLogo />
						<span className="font-semibold text-lg">myPortfolio</span>
					</a>
					<nav className="hidden md:flex items-center gap-4">
						<div className="flex items-center gap-1 p-1 rounded-lg bg-[oklch(100%_0_0_/_0.05)]">
							{mainNavLinks.map((link) => (
								<button
									key={link.id}
									onClick={() => handleNavClick(link.id)}
									className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
										currentSection === link.id && currentPage === "portfolio"
											? "bg-[oklch(100%_0_0_/_0.1)] text-white"
											: "text-[oklch(95%_0_0_/_0.7)] hover:text-white hover:bg-[oklch(100%_0_0_/_0.1)]"
									}`}
								>
									{link.label}
								</button>
							))}
							<button
								key="blog"
								onClick={() => handleNavClick("blog")}
								className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
									isBlogView
										? "bg-[oklch(100%_0_0_/_0.1)] text-white"
										: "text-[oklch(95%_0_0_/_0.7)] hover:text-white hover:bg-[oklch(100%_0_0_/_0.1)]"
								}`}
							>
								Blog
							</button>
						</div>
						<a
							href="/assets/resume/jaysonjamora-resume.pdf"
							target="_blank"
							download="jaysonjamora-resume.pdf"
						>
							<AuroraButton className="py-2.5 px-3 text-white hover:text-white transition-colors duration-300 group">
								<span className="transition-colors duration-300 text-[oklch(95%_0_0_/_0.7)] group-hover:text-white">
									RESUME
								</span>
							</AuroraButton>
						</a>
					</nav>
					<div className="md:hidden">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="p-2"
							aria-label="Toggle menu"
							aria-expanded={isMenuOpen}
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path
									d="M3 6h18"
									className={`transform transition duration-300 ease-in-out origin-center ${
										isMenuOpen ? "rotate-45 translate-y-[6px]" : ""
									}`}
								/>
								<path
									d="M3 12h18"
									className={`transform transition duration-300 ease-in-out ${
										isMenuOpen ? "opacity-0" : "opacity-100"
									}`}
								/>
								<path
									d="M3 18h18"
									className={`transform transition duration-300 ease-in-out origin-center ${
										isMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
									}`}
								/>
							</svg>
						</button>
					</div>
				</div>
				{isMenuOpen && (
					<div className="md:hidden mt-2 p-4 bg-[oklch(3%_0.01_265)] border border-[oklch(100%_0_0_/_0.1)] rounded-xl">
						<nav className="flex flex-col items-center gap-4">
							{mainNavLinks.map((link) => (
								<button
									key={link.id}
									onClick={() => handleNavClick(link.id)}
									className={`text-base font-medium transition-colors w-full py-2 ${
										currentSection === link.id && currentPage === "portfolio"
											? "text-[var(--color-aurora-primary)]"
											: "text-[oklch(95%_0_0_/_0.7)] hover:text-white"
									}`}
								>
									{link.label}
								</button>
							))}
							<button
								key="blog-mobile"
								onClick={() => handleNavClick("blog")}
								className={`text-base font-medium transition-colors w-full py-2 ${
									isBlogView
										? "text-[var(--color-aurora-primary)]"
										: "text-[oklch(95%_0_0_/_0.7)] hover:text-white"
								}`}
							>
								Blog
							</button>
							<a
								href="/assets/resume/jaysonjamora-resume.pdf"
								target="_blank"
								download="jaysonjamora-resume.pdf"
								className="w-full"
							>
								<AuroraButton className="w-full py-3">RESUME</AuroraButton>
							</a>
						</nav>
					</div>
				)}
			</header>
		);
	},
);
