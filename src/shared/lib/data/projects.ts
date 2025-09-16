/**
 * @file: src/shared/lib/data/projects.ts
 *
 * @description: Contains the static data for the "Featured Work" section.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This file is the canonical list of featured projects, the evidence of work actually done. It
 * exports a single array, `projectsData`, where each object represents a project to be showcased
 * in the portfolio. The data is typed with the `Project` interface, a small but appreciated
 * gesture towards maintaining order and preventing chaos. By keeping the data here, separate from
 * the `ProjectCard` component that renders it, we can easily add, remove, or modify projects
 * without touching the presentation logic. It's a clean separation of concerns.
 *
 * TODO(AI)[DOCS-001]: The `githubUrl` for each project is currently a placeholder ('#'). These
 * should be updated with the actual repository URLs.
 *
 * @dependencies:
 * ➥ ../types/project
 *
 * @outputs:
 * ➥ projectsData (constant)
 */
import type { Project } from '../../types/project.ts';

export const projectsData: Project[] = [
	{
		imagePlaceholder: 'src/assets/images/project_conversational_portfolio.webp',
		title: 'myPortfolio',
		description:
			'An interactive portfolio powered by the Gemini API to create a more engaging and memorable user experience. This is the very site you are viewing.',
		tech: ['React', 'TypeScript', 'Gemini API', 'Tailwind'],
		demoUrl: '#',
	},
	{
		imagePlaceholder: 'src/assets/images/project_ai_agent.webp',
		title: 'Sxentrie',
		description:
			'An AI-powered RAG suite that provides instant code comprehension for GitHub repositories, accelerating developer onboarding and code reviews.',
		tech: ['React', 'TypeScript', 'Vite', 'Gemini API'],
		demoUrl: 'https://sxientrie.github.io/Sxentrie-RAG/',
	},
	{
		imagePlaceholder: 'src/assets/images/project_automation_hub.webp',
		title: 'Workflow Automation Hub',
		description:
			'A centralized system using n8n to automate repetitive tasks and streamline development workflows.',
		tech: ['n8n', 'Docker', 'Node.js', 'APIs'],
	},
];