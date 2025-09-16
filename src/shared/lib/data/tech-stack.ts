/**
 * @file: src/shared/lib/data/tech-stack.ts
 *
 * @description: Defines the list of technologies and their corresponding icons for the tech stack
 *               carousel.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This file serves as the official roster of technologies for the endlessly spinning
 * `TechCarousel`. It exports a single `techStack` array, where each entry is an object containing
 * the technology's name and a URL to its icon, hosted on a CDN we can only pray will never go
 * down. Some entries have an `invert` flag, a small concession to the reality that not all logos
 * are designed to be slapped on a dark background. It's a simple, straightforward list of skills
 * to be flaunted.
 *
 * @dependencies:
 * ➥ None
 *
 * @outputs:
 * ➥ techStack (constant)
 */
export const techStack = [
	{
		name: 'HTML5',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
	},
	{
		name: 'Python',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
	},
	{
		name: 'Rails',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg',
	},
	{
		name: 'TypeScript',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
	},
	{
		name: 'React',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
	},
	{
		name: 'Next.js',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg',
		invert: true,
	},
	{
		name: 'Node.js',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg',
	},
	{
		name: 'Tailwind',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
	},
	{
		name: 'MongoDB',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg',
	},
	{
		name: 'Firebase',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain-wordmark.svg',
	},
	{
		name: 'Docker',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg',
	},
	{
		name: 'Git',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
	},
	{
		name: 'MariaDB',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original-wordmark.svg',
	},
	{
		name: 'Figma',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
	},
];