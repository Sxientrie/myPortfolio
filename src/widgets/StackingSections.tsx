import type React from "react";
import { memo, useRef } from "react";
import { AnimatedTimelineLine } from "../entities/experience/ui/AnimatedTimelineLine.tsx";
import { TimelineItem } from "../entities/experience/ui/TimelineItem.tsx";
import { ProjectCard } from "../entities/project/ui/ProjectCard.tsx";
import { SECTIONS } from "../shared/lib/constants/sections.ts";
import { experienceData } from "../shared/lib/data/experience.ts";
import { projectsData } from "../shared/lib/data/projects.ts";
import { ImageWithFallback } from "../shared/ui/ImageWithFallback.tsx";
interface StackingSectionsProps {
	registerRef: (name: string, el: HTMLElement | null) => void;
}
const BrushStrokeFilter = memo(() => (
	<svg
		style={{
			position: "absolute",
			width: 0,
			height: 0,
			pointerEvents: "none",
		}}
	>
		<defs>
			<filter id="brush-stroke">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.04 0.08"
					numOctaves="3"
					result="turbulence"
				/>
				<feDisplacementMap
					in2="turbulence"
					in="SourceGraphic"
					scale="5"
					xChannelSelector="R"
					yChannelSelector="G"
					result="displacement"
				/>
			</filter>
		</defs>
	</svg>
));
export const StackingSections = memo(
	({ registerRef }: StackingSectionsProps): React.ReactElement => {
		const aboutContainerRef = useRef<HTMLDivElement>(null);
		const experienceContainerRef = useRef<HTMLDivElement>(null);
		return (
			<>
				<BrushStrokeFilter />
				<section
					id={SECTIONS.ABOUT}
					className="py-16 md:py-24 px-4 md:px-8"
					ref={(el) => registerRef(SECTIONS.ABOUT, el)}
				>
					<div
						ref={aboutContainerRef}
						className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-center relative"
					>
						<AnimatedTimelineLine
							containerRef={aboutContainerRef}
							className="hidden md:block left-1/2 -translate-x-1/2"
						/>
						<div className="md:pr-12 flex justify-center">
							<div className="rounded-2xl shadow-lg max-w-sm w-full overflow-hidden">
								<ImageWithFallback
									src="/assets/images/aboutme_image.png"
									alt="An illustration of a career journey from chef to IT to developer."
									className="w-full h-full object-cover"
									loading="lazy"
									fallbackText="About Me"
								>
									<source
										media="(min-width: 768px)"
										srcSet="/assets/images/aboutme-image-large.webp"
										type="image/webp"
									/>
									<source
										srcSet="/assets/images/aboutme-image-small.webp"
										type="image/webp"
									/>
								</ImageWithFallback>
							</div>
						</div>
						<div className="md:pl-12">
							<h2 className="text-3xl font-medium tracking-tighter mb-4">
								ME, MYSELF & I: The Calm in the Code.
							</h2>
							<div className="space-y-4 text-[oklch(95%_0_0_/_0.7)] text-base leading-relaxed font-light">
								<p>I've built my career on finding clarity in the middle of a storm. It’s a skill learned in the heat of a chaotic kitchen and honed as the steady voice for a client whose business—and a piece of their world—just collapsed. It's about being the calm when everything feels like it's falling apart.</p>
								<p>My journey to becoming a developer wasn't a straight line, but the detours made all the difference. The high-pressure kitchen taught me precision and focus under fire. My time in IT taught me to listen past the panic to gently uncover the real problem underneath.</p>
								<p>Today, I channel all of that experience into building applications that just feel right. My workflow is modern and strategic; I architect the logic and direct AI to handle the boilerplate code. This allows me to bypass the noise and focus entirely on what truly matters: solving the core problem and ensuring the final product is seamless, intuitive, and dependable.</p>
								<p>The joy I get from launching a flawless app is the same warmth I feel when a frantic client finally exhales, knowing everything is going to be okay. My work is about creating things that genuinely help people, giving them back their precious time and peace of mind.</p>
								<p>If you're facing a challenge that feels overwhelming and need a partner to find the clarity within it, I'd love to connect. Some of the best solutions begin with nothing more than a conversation (and maybe some virtual coffee).</p>
							</div>
						</div>
					</div>
				</section>
				<section
					id={SECTIONS.EXPERIENCE}
					className="py-16 md:py-24 px-4 md:px-8"
					ref={(el) => {
						registerRef(SECTIONS.EXPERIENCE, el);
					}}
				>
					<div
						ref={experienceContainerRef}
						className="relative max-w-4xl mx-auto"
					>
						<AnimatedTimelineLine
							containerRef={experienceContainerRef}
							className="left-6 md:left-1/2 -translate-x-1/2"
						/>
						<div className="relative space-y-24">
							{experienceData.map((item, index) => (
								<TimelineItem
									key={index}
									item={item}
									isLeft={index % 2 === 0}
								/>
							))}
						</div>
					</div>
				</section>
				<section
					id={SECTIONS.PROJECTS}
					className="py-16 md:py-24 px-4 md:px-8"
					ref={(el) => registerRef(SECTIONS.PROJECTS, el)}
				>
					<div className="text-center mb-12">
						<h2 className="text-3xl font-medium tracking-tighter">
							Featured Work
						</h2>
						<p className="text-lg text-[oklch(95%_0_0_/_0.7)] mt-2">
							A few selected projects. Want to see more? Just ask.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projectsData.map((project, index) => (
							<ProjectCard key={index} project={project} />
						))}
					</div>
				</section>
			</>
		);
	},
);
