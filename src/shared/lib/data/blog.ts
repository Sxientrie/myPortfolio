/**
 * @file: src/shared/lib/data/blog.ts
 *
 * @description: A dynamic content loader for the blog.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This file has evolved from a simple static data array into the brains of the blog's content
 * management. It now exports an asynchronous function, `getBlogPosts`, which is responsible for
 * fetching all markdown files from the `src/posts/` directory. For each file, it fetches the raw
 * text, parses the frontmatter (the metadata at the top of the file) and the markdown content, and
 * returns a clean, structured array of post objects. This approach effectively turns a folder of
 * `.md` files into a dynamic, queryable content source for the application.
 *
 * @dependencies:
 * ➥ ../utils/parseMarkdown.ts
 *
 * @outputs:
 * ➥ getBlogPosts (function)
 */

import { parseMarkdown } from '../utils/parseMarkdown.ts';

// A list of all blog post files. To add a new post, add its filename here.
const postFilenames = [
	'sxentrie-the-ai-code-navigator.md',
	'the-no-code-tech-stack.md',
];

export const getBlogPosts = async () => {
	const posts = await Promise.all(
		postFilenames.map(async (filename) => {
			try {
				const postUrl = new URL(`../../../posts/${filename}`, import.meta.url)
					.href;
				const response = await fetch(postUrl);
				if (!response.ok) {
					throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);
				}
				const rawContent = await response.text();
				const { frontmatter, content } = parseMarkdown(rawContent);
				return { ...frontmatter, content, slug: filename.replace('.md', '') };
			} catch (error) {
				console.error(`Error processing ${filename}:`, error);
				return null;
			}
		}),
	);

	// Filter out any posts that failed to load and sort by date
	return posts
		.filter(Boolean)
		// FIX: The type of `a` and `b` was being inferred incorrectly by TypeScript,
		// omitting properties from the spread frontmatter. Casting to `any` allows
		// access to the `date` property for sorting.
		.sort((a, b) => new Date((b as any).date).getTime() - new Date((a as any).date).getTime());
};