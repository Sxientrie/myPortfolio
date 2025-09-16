import type React from "react";
import { memo } from "react";
import { Card } from "../../shared/ui/Card.tsx";
import { ImageWithFallback } from "../../shared/ui/ImageWithFallback.tsx";
interface BlogPostCardProps {
	post: {
		imagePlaceholder: string;
		title: string;
		excerpt: string;
		tags: string[];
		date: string;
		slug: string;
	};
	navigateTo: (destination: string) => void;
}
export const BlogPostCard = memo(
	({ post, navigateTo }: BlogPostCardProps): React.ReactElement => {
		return (
			<Card
				as="div"
				role="button"
				tabIndex={0}
				onClick={() => navigateTo(post.slug)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						navigateTo(post.slug);
					}
				}}
				className="cursor-pointer group"
			>
				<div className="bg-[oklch(3%_0.01_265)] rounded-lg aspect-video mb-6 overflow-hidden flex items-center justify-center text-gray-500 flex-shrink-0">
					<ImageWithFallback
						src={post.imagePlaceholder?.replace(".webp", ".png")}
						alt={`Placeholder image for the blog post: ${post.title}`}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
						fallbackText={post.title}
					/>
				</div>
				<div className="flex flex-col flex-grow">
					<p className="text-xs text-[oklch(95%_0_0_/_0.5)] mb-2">
						{post.date}
					</p>
					<h3 className="text-xl font-medium mb-2 group-hover:text-[var(--color-aurora-primary)] transition-colors">
						{post.title}
					</h3>
					<p className="text-sm text-[oklch(95%_0_0_/_0.7)] leading-relaxed mb-4 flex-grow">
						{post.excerpt}
					</p>
					<div className="flex flex-wrap gap-2 mt-auto">
						{post.tags?.map((tag) => (
							<span
								key={tag}
								className="bg-[oklch(100%_0_0_/_0.05)] text-[oklch(95%_0_0_/_0.5)] text-xs px-2 py-1 rounded-full"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</Card>
		);
	},
);
