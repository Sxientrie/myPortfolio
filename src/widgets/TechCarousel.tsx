/**
 * @file: src/widgets/TechCarousel.tsx
 *
 * @description: A perpetually scrolling carousel of tech logos, because apparently we have to prove
 *               our skills with a flashy, moving banner.
 *
 * @module: Shared.UI
 *
 * @overview:
 * This is the `TechCarousel`. Its sole purpose in this universe is to display a never-ending parade
 * of technology icons, subtly screaming "I know how to use these things." It creates the illusion
 * of infinite scrolling by the oldest trick in the book: duplicating the list of logos and
 * animating the whole container on a loop with CSS. When one set slides out of view, the identical
 * twin is right there to take its place. Simple, yet surprisingly effective at looking busy.
 *
 * Architecturally, this component is a bit of a renegade. It dynamically generates a CSS
 * animation inside a string and then injects it directly into the DOM via a `<style>` tag. Yes,
 * you read that right. It's a self-contained, if somewhat heretical, approach to styling that
 * directly contradicts the project's "Tailwind-only" philosophy. This was likely a pragmatic
 * choice to create a dynamic animation based on the number of items in the list, but it's a
 * decision that will surely make a purist weep. The component takes no props and is memoized,
 * content to live in its own little world of endless scrolling.
 *
 * @dependencies:
 * ➥ react
 * ➥ ../shared/lib/data/tech-stack.ts
 *
 * @outputs:
 * ➥ TechCarousel (component)
 */
import type React from 'react';
import { memo } from 'react';

import { techStack } from '../shared/lib/data/tech-stack.ts';

export const TechCarousel = memo((): React.ReactElement => {
	const extendedTechStack = [...techStack, ...techStack];

	/**
	 * FIXME(AI)[DOCS-001]: This component's use of an inline <style> tag is a direct violation of
	 * the project's styling architecture defined in AGENT.md. The animation logic should be
	 * refactored to use Tailwind CSS utilities if possible, or a more compliant CSS-in-JS
	 * approach if dynamic values are absolutely necessary. This is a prime candidate for a stern
	 * lecture and a refactor.
	 */
	const styles = `
        .carousel-track {
            --item-width: 120px;
            --item-count: ${techStack.length};
            width: calc(var(--item-width) * var(--item-count) * 2);
            animation: scroll 60s linear infinite;
        }
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(var(--item-width) * var(--item-count) * -1)); }
        }
        @media (max-width: 480px) {
            .carousel-track {
                --item-width: 90px;
                animation-duration: 50s;
            }
        }
    `;

	return (
		<div className="absolute bottom-[6vh] left-1/2 -translate-x-1/2 w-full max-w-6xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] z-10">
			<style>{styles}</style>
			<div className="carousel-track flex">
				{extendedTechStack.map((tech, index) => (
					<div
						className="w-[120px] md:w-[120px] flex flex-col items-center justify-center gap-3 group"
						key={index}
						style={{ flexShrink: 0 }}
					>
						<div className="w-16 h-16 flex items-center justify-center rounded-xl bg-[oklch(5%_0_0_/_0.75)] backdrop-blur-md border border-[oklch(100%_0_0_/_0.1)] transition-all duration-300 group-hover:bg-[oklch(8%_0_0_/_0.8)] group-hover:border-[oklch(100%_0_0_/_0.3)]">
							<img
								src={tech.icon}
								alt={tech.name}
								className={`h-9 w-auto max-w-10 ${tech.invert ? 'invert' : ''}`}
							/>
						</div>
						<span className="text-xs font-semibold tracking-wider text-[oklch(95%_0_0_/_0.5)] transition-colors duration-300 group-hover:text-white">
							{tech.name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
});