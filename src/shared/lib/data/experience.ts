/**
 * @file: src/shared/lib/data/experience.ts
 *
 * @description: Contains the static data for the professional experience timeline.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This file is little more than a glorified shopping list of a professional career. It exports a
 * single constant, `experienceData`, which is an array of objects, each one a snapshot of a past
 * job. The data is hard-coded here to decouple it from the components that render it. Note that
 * the array is defined chronologically and then immediately reversed, because displaying
 * experience from "most recent" to "least recent" is apparently the law. It's a simple,
 * unceremonious collection of data.
 *
 * @dependencies:
 * ➥ None
 *
 * @outputs:
 * ➥ experienceData (constant)
 */
import { icons } from './icons.ts';

type ExperienceItem = {
	date: string;
	title: string;
	company: string;
	description: string;
	iconKey: keyof typeof icons;
};

// FIX: TypeScript was inferring `iconKey` as `string` because the contextual type from
// `experienceData` was not being applied to the array literal before the `.reverse()`
// method call. Casting the array literal to `ExperienceItem[]` explicitly solves this.
export const experienceData: ExperienceItem[] = ([
	{
		date: 'Feb 2018 - March 2020',
		title: 'Line Cook',
		company: 'Chowtime',
		description:
			'Thrived in a high-volume, fast-paced kitchen environment, consistently meeting tight deadlines for service during peak hours.',
		iconKey: 'cook',
	},
	{
		date: 'April 2020 - July 2022',
		title: 'Technical and Customer Support Specialist',
		company: 'Lenin Computer Inc.',
		description:
			'Acted as the primary escalation point for complex hardware and software issues, improving resolution time by 15%.',
		iconKey: 'support',
	},
	{
		date: 'September 2023 - August 2024',
		title: 'Owner / IT Consultant',
		company: 'Starlite IT Solution',
		description:
			'Managed all business operations, delivering end-to-end client solutions from custom PC builds to complex diagnostics.',
		iconKey: 'consultant',
	},
	{
		date: 'January 2025 - Present',
		title: 'Freelance Full-Stack Developer',
		company: 'Self-Employed',
		description:
			'Developing full-stack web applications for clients using Ruby on Rails and integrating secure payment systems.',
		iconKey: 'developer',
	},
] as ExperienceItem[]).reverse();
