import type React from "react";
import { memo, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Link, Navigate, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { useNavigation } from "../../app/contexts/NavigationContext";
import { ImageWithFallback } from "../shared/ui/ImageWithFallback.tsx";

export const BlogPostPage = memo((): React.ReactElement => {
	const { slug } = useParams<{ slug: string }>();
	const { blogPosts, isLoadingPosts } = useNavigation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [slug]);

	if (isLoadingPosts) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				Loading post...
			</div>
		);
	}

	const post = blogPosts.find((p) => p.slug === slug);

	if (!post) {
		return <Navigate to="/blog" replace />;
	}

	return (
		<main
			id="blog-post-content"
			className="w-full max-w-4xl mx-auto relative px-4 py-32 animate-fade-in"
		>
			<div className="mb-8">
				<Link
					to="/blog"
					className="flex items-center gap-2 text-[oklch(95%_0_0_/_0.7)] hover:text-white transition-colors"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M15 18l-6-6 6-6" />
					</svg>
					Back to Blog
				</Link>
			</div>
			<article>
				<header className="mb-8">
					<h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-[oklch(95%_0_0)] to-[oklch(75%_0_0)]">
						{post.title}
					</h1>
					<p className="text-sm text-[oklch(95%_0_0_/_0.5)]">{post.date}</p>
				</header>
				<div className="bg-[oklch(3%_0.01_265)] rounded-lg aspect-[16/9] mb-8 overflow-hidden">
					<ImageWithFallback
						src={post.imagePlaceholder?.replace(".webp", ".png")}
						alt={`Header image for ${post.title}`}
						className="w-full h-full object-cover"
						fallbackText={post.title}
					/>
				</div>
				<div className="prose prose-lg prose-invert max-w-none">
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{post.content}
					</ReactMarkdown>
				</div>
				<footer className="mt-12 pt-8 border-t border-[oklch(100%_0_0_/_0.1)]">
					<div className="flex flex-wrap gap-2">
						{post.tags?.map((tag) => (
							<span
								key={tag}
								className="bg-[oklch(100%_0_0_/_0.05)] text-[oklch(95%_0_0_/_0.5)] text-xs px-2 py-1 rounded-full"
							>
								{tag}
							</span>
						))}
					</div>
				</footer>
			</article>
		</main>
	);
});
