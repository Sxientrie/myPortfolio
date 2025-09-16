import type React from "react";
import { useEffect, useId, useState } from "react";
import { ChatController } from "../features/chat/ui/ChatController.tsx";
import { SECTIONS } from "../shared/lib/constants/sections.ts";
import { getBlogPosts } from "../shared/lib/data/blog.ts";
import { useFooterVisibility } from "../shared/lib/hooks/useFooterVisibility.tsx";
import { useIntersectionObserver } from "../shared/lib/hooks/useIntersectionObserver.tsx";
import type { BlogPost } from "../shared/lib/types/index.ts";
import { AnimatedLogo } from "../shared/ui/AnimatedLogo.tsx";
import { GlobalStyles } from "../shared/ui/GlobalStyles.tsx";
import { BlogPage } from "../widgets/BlogPage.tsx";
import { BlogPostPage } from "../widgets/BlogPostPage.tsx";
import { CtaSection } from "../widgets/CtaSection.tsx";
import { Footer } from "../widgets/Footer.tsx";
import { HeroSection } from "../widgets/HeroSection.tsx";
import { SiteHeader } from "../widgets/SiteHeader.tsx";
import { StackingSections } from "../widgets/StackingSections.tsx";
import { TestimonialsSection } from "../widgets/TestimonialsSection.tsx";
export function App(): React.ReactElement {
	const [activeSection, setActiveSection] = useState<string>("");
	const { sectionRefs, registerRef } =
		useIntersectionObserver(setActiveSection);
	const isFooterVisible = useFooterVisibility();
	const [currentPage, setCurrentPage] = useState<
		"portfolio" | "blog" | "blogPost"
	>("portfolio");
	const [currentPostSlug, setCurrentPostSlug] = useState<string | null>(null);
	const [navigationTarget, setNavigationTarget] = useState<string | null>(null);
	const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
	const [isLoadingPosts, setIsLoadingPosts] = useState(true);
	const mainContentId = useId();
	const contentBedId = useId();
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const posts = await getBlogPosts();
				setBlogPosts(posts);
			} catch (error) {
				console.error("Failed to fetch blog posts:", error);
			} finally {
				setIsLoadingPosts(false);
			}
		};
		fetchPosts();
	}, []);
	const handleNavigate = (destination: string): void => {
		const portfolioSections = [...Object.values(SECTIONS), "contact"];
		const isSection = portfolioSections.includes(destination);
		if (isSection) {
			if (currentPage !== "portfolio") {
				setCurrentPage("portfolio");
				setNavigationTarget(destination);
			} else {
				sectionRefs.current[destination]?.scrollIntoView({
					behavior: "smooth",
				});
			}
		} else if (destination === "blog") {
			if (currentPage !== "blog") {
				setCurrentPage("blog");
				setCurrentPostSlug(null);
				window.scrollTo({ top: 0, behavior: "smooth" });
			}
		} else if (destination === "portfolio") {
			if (currentPage !== "portfolio") {
				setCurrentPage("portfolio");
				setCurrentPostSlug(null);
				window.scrollTo({ top: 0, behavior: "smooth" });
			}
		} else {
			const postExists = blogPosts.some((post) => post.slug === destination);
			if (postExists) {
				setCurrentPage("blogPost");
				setCurrentPostSlug(destination);
				window.scrollTo({ top: 0, behavior: "smooth" });
			}
		}
	};
	useEffect(() => {
		if (currentPage === "portfolio" && navigationTarget) {
			const section = sectionRefs.current[navigationTarget];
			if (section) {
				setTimeout(() => {
					section.scrollIntoView({ behavior: "smooth" });
				}, 100);
			}
			setNavigationTarget(null);
		}
	}, [currentPage, navigationTarget, sectionRefs]);
	const renderPage = () => {
		switch (currentPage) {
			case "portfolio":
				return (
					<>
						<main
							id={mainContentId}
							className="w-full max-w-6xl mx-auto relative px-4"
						>
							<HeroSection
								registerRef={registerRef}
								sectionRefs={sectionRefs}
							/>
							<div
								id={contentBedId}
								className="relative z-[3] bg-[oklch(5%_0_0_/_0.85)] backdrop-blur-md rounded-[16px] overflow-hidden"
							>
								<StackingSections registerRef={registerRef} />
								<TestimonialsSection registerRef={registerRef} />
							</div>
							<CtaSection registerRef={registerRef} />
						</main>
						<Footer isVisible={isFooterVisible} />
					</>
				);
			case "blog":
				return (
					<BlogPage
						navigateTo={handleNavigate}
						posts={blogPosts}
						isLoading={isLoadingPosts}
					/>
				);
			case "blogPost": {
				const post = blogPosts.find((p) => p.slug === currentPostSlug);
				return post ? (
					<BlogPostPage post={post} navigateTo={handleNavigate} />
				) : (
					<BlogPage
						navigateTo={handleNavigate}
						posts={blogPosts}
						isLoading={isLoadingPosts}
					/>
				);
			}
			default:
				return null;
		}
	};
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
				<SiteHeader
					activeSection={activeSection}
					sectionRefs={sectionRefs}
					currentPage={currentPage}
					navigateTo={handleNavigate}
				/>
				{renderPage()}
			</div>
		</ChatController>
	);
}
