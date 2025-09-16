import { parseMarkdown } from "../utils/parseMarkdown.ts";
const postFilenames = [
	"sxentrie-the-ai-code-navigator.md",
	"the-no-code-tech-stack.md",
];
export const getBlogPosts = async () => {
	const posts = await Promise.all(
		postFilenames.map(async (filename) => {
			try {
				const postUrl = new URL(`../../../posts/${filename}`, import.meta.url)
					.href;
				const response = await fetch(postUrl);
				if (!response.ok) {
					throw new Error(
						`Failed to fetch ${filename}: ${response.statusText}`,
					);
				}
				const rawContent = await response.text();
				const { frontmatter, content } = parseMarkdown(rawContent);
				return { ...frontmatter, content, slug: filename.replace(".md", "") };
			} catch (error) {
				console.error(`Error processing ${filename}:`, error);
				return null;
			}
		}),
	);
	return posts
		.filter(Boolean)
		.sort(
			(a, b) =>
				new Date((b as any).date).getTime() -
				new Date((a as any).date).getTime(),
		);
};
