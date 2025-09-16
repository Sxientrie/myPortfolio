import type React from "react";
import { memo } from "react";
import { techStack } from "../shared/lib/data/tech-stack.ts";
export const TechCarousel = memo((): React.ReactElement => {
	const extendedTechStack = [...techStack, ...techStack];
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
						key={`${tech.name}-${index}`}
						style={{ flexShrink: 0 }}
					>
						<div className="w-16 h-16 flex items-center justify-center rounded-xl bg-[oklch(5%_0_0_/_0.75)] backdrop-blur-md border border-[oklch(100%_0_0_/_0.1)] transition-all duration-300 group-hover:bg-[oklch(8%_0_0_/_0.8)] group-hover:border-[oklch(100%_0_0_/_0.3)]">
							<img
								src={tech.icon}
								alt={tech.name}
								className={`h-9 w-auto max-w-10 ${tech.invert ? "invert" : ""}`}
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
