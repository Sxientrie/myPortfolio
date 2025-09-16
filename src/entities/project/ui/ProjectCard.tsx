import type React from "react";
import { memo } from "react";
import { Card } from "../../../shared/ui/Card.tsx";
import { ImageWithFallback } from "../../../shared/ui/ImageWithFallback.tsx";
import type { Project } from "../../../shared/types/project.ts";
interface ProjectCardProps {
	project: Project;
}
export const ProjectCard = memo(
	({ project }: ProjectCardProps): React.ReactElement => {
		return (
			<Card as="article" className="h-full">
				<div className="bg-[oklch(3%_0.01_265)] rounded-lg aspect-video mb-6 overflow-hidden flex items-center justify-center text-gray-500 flex-shrink-0">
					<ImageWithFallback
						src={project.imagePlaceholder.replace(".webp", ".png")}
						alt={`Placeholder image for the project: ${project.title}`}
						loading="lazy"
						className="w-full h-full object-cover"
						fallbackText={project.title}
					>
						<source
							media="(min-width: 768px)"
							srcSet={project.imagePlaceholder.replace(".webp", "-large.webp")}
							type="image/webp"
						/>
						<source
							srcSet={project.imagePlaceholder.replace(".webp", "-small.webp")}
							type="image/webp"
						/>
					</ImageWithFallback>
				</div>
				<div className="flex flex-col flex-grow">
					<h3 className="text-xl font-medium mb-2">{project.title}</h3>
					<p className="text-sm text-[oklch(95%_0_0_/_0.7)] leading-relaxed mb-4 flex-grow">
						{project.description}
					</p>
					<div className="flex flex-wrap gap-2 mb-6">
						{project.tech.map((tag) => (
							<span
								key={tag}
								className="bg-[oklch(100%_0_0_/_0.05)] text-[oklch(95%_0_0_/_0.5)] text-xs px-2 py-1 rounded-full"
							>
								{tag}
							</span>
						))}
					</div>
					{project.demoUrl && (
						<div className="flex mt-auto gap-6">
							<a
								href={project.demoUrl}
								target={project.demoUrl === "#" ? "_self" : "_blank"}
								rel={project.demoUrl === "#" ? "" : "noopener noreferrer"}
								className="text-sm flex items-center gap-1.5 transition-colors text-white hover:text-[var(--color-aurora-primary)]"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
									<polyline points="15 3 21 3 21 9"></polyline>
									<line x1="10" y1="14" x2="21" y2="3"></line>
								</svg>
								<span>Live Demo</span>
							</a>
						</div>
					)}
				</div>
			</Card>
		);
	},
);
