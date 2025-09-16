/**
 * @file: src/widgets/BlogPage.tsx
 *
 * @description: The main page component for the blog, displaying a grid of posts.
 *
 * @module: Shared.UI
 *
 * @overview:
 * This component, `BlogPage`, is the top-level container for the entire blog section. Its job is
 * straightforward: it renders a main heading and then lays out all the blog posts in a responsive
 * grid. It imports the blog content from `blogData` and maps over it, passing the data for each
 * post to a `BlogPostCard` component. It's a simple, high-level composition component that
 * assembles the blog view.
 *
 * @dependencies:
 * ➥ react
 * ➥ ../entities/blog/BlogPostCard.tsx
 * ➥ ../shared/lib/data/blog.ts
 *
 * @outputs:
 * ➥ BlogPage (component)
 */
import type React from 'react';
import { memo } from 'react';

import { BlogPostCard } from '../entities/blog/BlogPostCard.tsx';

interface BlogPageProps {
	navigateTo: (destination: string) => void;
	posts: any[];
	isLoading: boolean;
}

export const BlogPage = memo(
	({ navigateTo, posts, isLoading }: BlogPageProps): React.ReactElement => {
		return (
			<main
				id="blog-content"
				className="w-full max-w-6xl mx-auto relative px-4 py-32 animate-fade-in"
				style={{ animation: 'fade-in 0.5s ease-out forwards' }}
			>
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-[oklch(95%_0_0)] to-[oklch(75%_0_0)]">
						Thoughts & Insights
					</h1>
					<p className="text-lg text-[oklch(95%_0_0_/_0.7)] mt-2 max-w-2xl mx-auto">
						A collection of articles on software development, career insights, and
						the art of problem-solving.
					</p>
				</div>
				{isLoading ? (
					<div className="text-center text-[oklch(95%_0_0_/_0.7)]">
						Loading posts...
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{posts.map((post) => (
							<BlogPostCard
								key={post.slug}
								post={post}
								navigateTo={navigateTo}
							/>
						))}
					</div>
				)}
			</main>
		);
	},
);