export const parseMarkdown = (rawContent: string) => {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	const match = frontmatterRegex.exec(rawContent);
	if (!match) {
		return { frontmatter: {}, content: rawContent };
	}
	const frontmatterString = match[1];
	const content = rawContent.slice(match[0].length).trim();
	const frontmatter: { [key: string]: any } = {};
	frontmatterString.split("\n").forEach((line) => {
		const colonIndex = line.indexOf(":");
		if (colonIndex !== -1) {
			const key = line.slice(0, colonIndex).trim();
			let value: any = line.slice(colonIndex + 1).trim();
			if (key === "tags" && value.startsWith("[") && value.endsWith("]")) {
				value = value
					.slice(1, -1)
					.split(",")
					.map((tag) => tag.trim());
			}
			frontmatter[key] = value;
		}
	});
	return { frontmatter, content };
};
