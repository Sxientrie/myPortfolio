/**
 * @file: src/widgets/HeroSection.tsx
 *
 * @description: The hero section of the portfolio, featuring a headline, call-to-action buttons,
 *               and a scrolling tech stack carousel.
 *
 * @module: Shared.UI
 *
 * @overview:
 * This is the `HeroSection`, the grand opening statement of the portfolio. It's the first thing a
 * user sees, so it's designed to make an impact. It displays a bold headline and a brief bio,
 * followed by two primary calls-to-action: one to open the interactive chat ("Ask Me Anything") and
 * another to scroll down to the contact form ("Get In Touch").
 *
 * Architecturally, it's a "smart" component that needs to interact with other parts of the
 * application. It uses the `registerRef` prop to announce its presence to the `IntersectionObserver`
 * so the main navigation can track it. It also taps into the `ChatContext` to get the `openChat`
 * function, allowing it to trigger the chat panel without being directly coupled to it. The "Get In
 * Touch" button uses the `sectionRefs` prop to smoothly scroll the user to the contact section,
 * demonstrating a need to be aware of the page's overall structure. It also composes the
 * `TechCarousel` component at the bottom, adding a dynamic visual element to the page fold.
 *
 * @dependencies:
 * ➥ react
 * ➥ ../features/chat/ChatContext.tsx
 * ➥ ../shared/lib/constants/sections.ts
 * ➥ ../shared/ui/AuroraButton.tsx
 * ➥ ./TechCarousel.tsx
 *
 * @outputs:
 * ➥ HeroSection (component)
 */
import type React from 'react';
import { memo, useContext } from 'react';

import { ChatContext } from '../features/chat/ChatContext.tsx';
import { SECTIONS } from '../shared/lib/constants/sections.ts';
import { AuroraButton } from '../shared/ui/AuroraButton.tsx';
import { ImageWithFallback } from '../shared/ui/ImageWithFallback.tsx';
import { TechCarousel } from './TechCarousel.tsx';

interface HeroSectionProps {
	registerRef: (name: string, el: HTMLElement | null) => void;
	sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
}

export const HeroSection = memo(
	({ registerRef, sectionRefs }: HeroSectionProps): React.ReactElement => {
		const chatContext = useContext(ChatContext);

		const handleScrollToContact = (): void => {
			// Find the contact section by its ID and scroll to it.
			const contactSection = sectionRefs.current['contact'];
			if (contactSection) {
				contactSection.scrollIntoView({ behavior: 'smooth' });
			}
		};

		return (
			<section
				id={SECTIONS.HERO}
				ref={(el) => registerRef(SECTIONS.HERO, el)}
				className="min-h-screen flex flex-col pt-28 md:justify-center md:pt-0 relative"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
					<div className="relative z-[2] p-4 text-center md:text-left">
						<h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-[oklch(95%_0_0)] to-[oklch(75%_0_0)]">
							Jayson Jamora
						</h1>
						<p className="text-lg md:text-xl max-w-3xl mx-auto md:mx-0 mb-8 text-[oklch(95%_0_0_/_0.7)]">
							Finding the Pulse in the Problem
						</p>
						<p className="max-w-xl mx-auto md:mx-0 text-[oklch(95%_0_0_/_0.7)] text-base leading-relaxed font-light mb-8">
							Some careers are built on best practices. Mine was built on
							finding a steady pulse in the middle of a storm. From kitchens
							to code, the job has always been the same: listen past the
							panic, find the real problem, and build something that genuinely
							helps.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
							<button
								onClick={handleScrollToContact}
								className="bg-transparent border border-[oklch(100%_0_0_/_0.2)] rounded-lg px-5 py-3 text-sm font-medium tracking-widest uppercase text-white transition-all duration-300 hover:bg-[oklch(100%_0_0_/_0.1)]"
							>
								Get In Touch
							</button>
							<AuroraButton
								className="px-5 py-3"
								onClick={() => {
									if (chatContext) {
										chatContext.openChat();
									}
								}}
							>
								LET'S CHAT
							</AuroraButton>
						</div>
					</div>
					<div className="hidden md:flex justify-center items-center p-4">
						<div className="rounded-2xl max-w-md w-full overflow-hidden">
							<ImageWithFallback
								src="assets/images/hero-image.png"
								alt="An illustration of a career journey from chef to IT to developer."
								className="w-full h-full object-cover"
								loading="lazy"
								fallbackText="Hero Image"
							>
								<source
									media="(min-width: 768px)"
									srcSet="assets/images/hero-image-large.webp"
									type="image/webp"
								/>
								<source
									srcSet="assets/images/hero-image-small.webp"
									type="image/webp"
								/>
							</ImageWithFallback>
						</div>
					</div>
				</div>
				<TechCarousel />
			</section>
		);
	},
);