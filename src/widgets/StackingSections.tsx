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
									src="assets/images/aboutme-image.png"
									alt="An illustration of a career journey from chef to IT to developer."
									className="w-full h-full object-cover"
									fallbackText="About Me"
								>
									<source
										media="(min-width: 768px)"
										srcSet="assets/images/aboutme-image-large.webp"
										type="image/webp"
									/>
									<source
										srcSet="assets/images/aboutme-image-small.webp"
										type="image/webp"
									/>
								</ImageWithFallback>
							</div>
						</div>
						<div className="md:pl-12">
							<h2 className="text-3xl font-medium tracking-tighter mb-4">
								ME, MYSELF & I:
							</h2>
							<div className="space-y-4 text-[oklch(95%_0_0_/_0.7)] text-base leading-relaxed font-light">
								<p>
									There's a unique sense of calm to be found in the middle of a
									storm. It's a feeling discovered in the heat of a chaotic
									kitchen and in being a steady voice for someone whose
									business, and a piece of their world, just collapsed. A career
									built on finding clarity when everything feels like it's
									falling apart.
								</p>
								<p>
									The journey to becoming a developer wasn't a straight line,
									but the twists and turns have made all the difference. Intense
									moments in the kitchen taught precision and focus, even when
									it felt like everything was burning down. Working in IT
									revealed how to listen beyond the panic in someone's voice to
									gently uncover the real problem underneath.
								</p>
								<p>
									All of that heart and experience is now channeled into
									creating applications that just feel right—the kind that are
									dependable. The joy from launching a seamless app is the same
									warmth felt when a frantic client is told that everything is
									going to be okay. It’s all about creating things that
									genuinely help people and give them back a little of their
									precious time and peace of mind.
								</p>
								<p>
									If you’re facing a challenge that feels overwhelming and could
									use a fresh set of eyes, please connect. Some of the most
									wonderful solutions start with nothing more than a good cup
									over the air coffee and a real colaboration.
								</p>
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
