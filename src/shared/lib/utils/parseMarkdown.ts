/**
 * @file: src/shared/lib/utils/parseMarkdown.ts
 *
 * @description: A utility function to parse markdown files with frontmatter.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This is a small but mighty utility whose one job is to dissect a markdown file. It assumes the
 * file starts with a YAML frontmatter block (fenced by '---'). It surgically extracts this
 * frontmatter, parses it from a simple key: value format into a JavaScript object, and returns it
 * along with the rest of the file's content. It's the critical piece that allows us to embed
 * structured metadata directly into our content files.
 *
 * @dependencies:
 * ➥ None
 *
 * @outputs:
 * ➥ parseMarkdown (function)
 */

export const parseMarkdown = (rawContent: string) => {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	const match = frontmatterRegex.exec(rawContent);

	if (!match) {
		return { frontmatter: {}, content: rawContent };
	}

	const frontmatterString = match[1];
	const content = rawContent.slice(match[0].length).trim();
	const frontmatter: { [key: string]: any } = {};

	frontmatterString.split('\n').forEach((line) => {
		const colonIndex = line.indexOf(':');
		if (colonIndex !== -1) {
			const key = line.slice(0, colonIndex).trim();
			let value: any = line.slice(colonIndex + 1).trim();

			// Basic type conversion for tags array
			if (key === 'tags' && value.startsWith('[') && value.endsWith(']')) {
				value = value.slice(1, -1).split(',').map(tag => tag.trim());
			}

			frontmatter[key] = value;
		}
	});

	return { frontmatter, content };
};
