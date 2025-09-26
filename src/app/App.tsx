import React from "react";
import { Route, Routes } from "react-router-dom";
import { NavigationProvider } from "./contexts/NavigationContext.tsx";
import { ChatController } from "../features/chat/ui/ChatController.tsx";
import { useFooterVisibility } from "../shared/lib/hooks/useFooterVisibility.tsx";
import { AnimatedLogo } from "../shared/ui/AnimatedLogo.tsx";
import { GlobalStyles } from "../shared/ui/GlobalStyles.tsx";
import { BlogPage } from "../widgets/BlogPage.tsx";
import { BlogPostPage } from "../widgets/BlogPostPage.tsx";
import { CtaSection } from "../widgets/CtaSection.tsx";
import { Footer } from "../widgets/Footer.tsx";
import { HeroSection } from "../widgets/HeroSection.tsx";
import { SiteHeader } from "../widgets/SiteHeader.tsx";
import { StackingSections } from "../widgets/StackingSections.tsx";

function PortfolioPage(): React.ReactElement {
	const isFooterVisible = useFooterVisibility();
	return (
		<>
			<main
				id="main-content"
				className="w-full max-w-6xl mx-auto relative px-4"
			>
				<HeroSection />
				<div
					id="content-bed"
					className="relative z-[3] bg-[oklch(5%_0_0_/_0.85)] backdrop-blur-md rounded-[16px] overflow-hidden"
				>
					<StackingSections />
				</div>
				<CtaSection />
			</main>
			<Footer isVisible={isFooterVisible} />
		</>
	);
}

function AppContent(): React.ReactElement {
	return (
		<ChatController>
			<div className="bg-[oklch(3%_0.01_265)] text-[oklch(95%_0_0)] w-full min-h-screen relative overflow-x-hidden font-sans">
				<GlobalStyles />
				<div className="fixed -top-[15.18rem] -left-[15.18rem] opacity-5 z-0 pointer-events-none">
					<AnimatedLogo className="w-[60.72rem] h-[60.72rem] blur-sm" />
				</div>
				<div className="right-aurora fixed z-[1] top-1/2 right-0 w-[120vw] h-[300vh] bg-[radial-gradient(ellipse_at_center_right,oklch(65%_0.15_190_/_0.2)_0%,oklch(58%_0.17_200_/_0.15)_25%,oklch(50%_0.19_210_/_0.05)_50%,transparent_70%)] blur-[150px] pointer-events-none"></div>
				<div className="left-aurora fixed z-[1] top-1/2 left-0 w-[120vw] h-[300vh] bg-[radial-gradient(ellipse_at_center_left,oklch(65%_0.15_190_/_0.2)_0%,oklch(58%_0.17_200_/_0.15)_25%,oklch(50%_0.19_210_/_0.05)_50%,transparent_70%)] blur-[150px] pointer-events-none"></div>
				<div className="top-shader fixed top-0 left-0 right-0 h-[120px] bg-gradient-to-b from-[oklch(3%_0.01_265)] to-transparent pointer-events-none z-[6]"></div>
				<div className="bottom-shader fixed bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-[oklch(3%_0.01_265)] to-transparent pointer-events-none z-[6]"></div>
				<SiteHeader />
				<Routes>
					<Route path="/" element={<PortfolioPage />} />
					<Route path="/blog" element={<BlogPage />} />
					<Route path="/blog/:slug" element={<BlogPostPage />} />
				</Routes>
			</div>
		</ChatController>
	);
}

export function App(): React.ReactElement {
	return (
		<NavigationProvider>
			<AppContent />
		</NavigationProvider>
	);
}