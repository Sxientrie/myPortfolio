import type React from "react";
import { memo, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useNavigation } from "../../app/contexts/NavigationContext";
import { SECTIONS } from "../shared/lib/constants/sections.ts";
import { AnimatedLogo } from "../shared/ui/AnimatedLogo.tsx";
import { AuroraButton } from "../shared/ui/AuroraButton.tsx";

const portfolioNavLinks = [
	{ type: "section", id: SECTIONS.ABOUT, label: "About" },
	{ type: "section", id: SECTIONS.EXPERIENCE, label: "Experience" },
	{ type: "section", id: SECTIONS.PROJECTS, label: "Work" },
];

const UniversalNavLink = ({
	link,
	variant,
	onClick,
}: {
	link: { type: string; id?: string; to?: string; label: string };
	variant: "desktop" | "mobile";
	onClick: (id?: string) => void;
}) => {
	const { activeSection } = useNavigation();
	const location = useLocation();

	const isPortfolioPage = location.pathname === "/";
	const isBlogView = location.pathname.startsWith("/blog");

	let isActive = false;
	if (link.type === "section") {
		isActive = activeSection === link.id && isPortfolioPage;
	} else if (link.to === "/blog") {
		isActive = isBlogView;
	} else if (link.to) {
		isActive = location.pathname === link.to;
	}

	const baseClasses = "font-medium transition-colors";
	const desktopClasses = `px-4 py-2 text-sm rounded-md ${
		isActive
			? "bg-[oklch(100%_0_0_/_0.1)] text-white"
			: "text-[oklch(95%_0_0_/_0.7)] hover:text-white hover:bg-[oklch(100%_0_0_/_0.1)]"
	}`;
	const mobileClasses = `w-full py-2 text-base text-center ${
		isActive
			? "text-[var(--color-aurora-primary)]"
			: "text-[oklch(95%_0_0_/_0.7)] hover:text-white"
	}`;

	const className = `${baseClasses} ${
		variant === "desktop" ? desktopClasses : mobileClasses
	}`;

	if (link.type === "page" && link.to) {
		return (
			<Link to={link.to} className={className} onClick={() => onClick()}>
				{link.label}
			</Link>
		);
	}

	return (
		<button onClick={() => onClick(link.id)} className={className}>
			{link.label}
		</button>
	);
};

export const SiteHeader = memo((): React.ReactElement => {
	const { sectionRefs } = useNavigation();
	const location = useLocation();
	const navigate = useNavigate();
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

	useEffect(() => {
		if (location.pathname === "/" && location.hash) {
			const sectionId = location.hash.substring(1);
			const section = sectionRefs.current[sectionId];
			setTimeout(() => {
				section?.scrollIntoView({ behavior: "smooth", block: "start" });
			}, 100);
		}
	}, [location, sectionRefs]);

	const handleNavClick = (sectionId?: string): void => {
		setIsMenuOpen(false);
		if (sectionId) {
			if (location.pathname === "/") {
				sectionRefs.current[sectionId]?.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			} else {
				navigate(`/#${sectionId}`);
			}
		}
	};

	const isPortfolioPage = location.pathname === "/";
	const navLinks = isPortfolioPage
		? portfolioNavLinks
		: [{ type: "page", to: "/", label: "Portfolio" }];

	const RenderNavLinks = ({ variant }: { variant: "desktop" | "mobile" }) => (
		<>
			{navLinks.map((link) => (
				<UniversalNavLink
					key={link.id || link.to}
					link={link}
					variant={variant}
					onClick={handleNavClick}
				/>
			))}
			<UniversalNavLink
				link={{ type: "page", to: "/blog", label: "Blog" }}
				variant={variant}
				onClick={handleNavClick}
			/>
		</>
	);

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
						handleNavClick(SECTIONS.HERO);
					}}
					className="flex items-center gap-3"
					aria-label="Go to top of page"
				>
					<AnimatedLogo />
					<span className="font-semibold text-lg">myPortfolio</span>
				</a>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center gap-4">
					<div className="flex items-center gap-1 p-1 rounded-lg bg-[oklch(100%_0_0_/_0.05)]">
						<RenderNavLinks variant="desktop" />
					</div>
					<a
						href="assets/resume/jaysonjamora-resume.pdf"
						target="_blank"
						download="jaysonjamora-resume.pdf"
						rel="noopener noreferrer"
					>
						<AuroraButton className="py-2.5 px-3 text-white hover:text-white transition-colors duration-300 group">
							<span className="transition-colors duration-300 text-[oklch(95%_0_0_/_0.7)] group-hover:text-white">
								RESUME
							</span>
						</AuroraButton>
					</a>
				</nav>

				{/* Mobile Nav Toggle */}
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
							aria-hidden="true"
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

			{/* Mobile Nav Menu */}
			{isMenuOpen && (
				<div className="md:hidden mt-2 p-4 bg-[oklch(3%_0.01_265)] border border-[oklch(100%_0_0_/_0.1)] rounded-xl">
					<nav className="flex flex-col items-center gap-4 text-center">
						<RenderNavLinks variant="mobile" />
						<a
							href="assets/resume/jaysonjamora-resume.pdf"
							target="_blank"
							download="jaysonjamora-resume.pdf"
							className="w-full"
							rel="noopener noreferrer"
						>
							<AuroraButton className="w-full py-3">RESUME</AuroraButton>
						</a>
					</nav>
				</div>
			)}
		</header>
	);
});
