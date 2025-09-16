import { icons } from "./icons.ts";
type ExperienceItem = {
	date: string;
	title: string;
	company: string;
	description: string;
	iconKey: keyof typeof icons;
};
export const experienceData: ExperienceItem[] = (
	[
		{
			date: "Feb 2018 - March 2020",
			title: "Line Cook",
			company: "Chowtime",
			description:
				"Thrived in a high-volume, fast-paced kitchen environment, consistently meeting tight deadlines for service during peak hours.",
			iconKey: "cook",
		},
		{
			date: "April 2020 - July 2022",
			title: "Technical and Customer Support Specialist",
			company: "Lenin Computer Inc.",
			description:
				"Acted as the primary escalation point for complex hardware and software issues, improving resolution time by 15%.",
			iconKey: "support",
		},
		{
			date: "September 2023 - August 2024",
			title: "Owner / IT Consultant",
			company: "Starlite IT Solution",
			description:
				"Managed all business operations, delivering end-to-end client solutions from custom PC builds to complex diagnostics.",
			iconKey: "consultant",
		},
		{
			date: "January 2025 - Present",
			title: "Freelance Full-Stack Developer",
			company: "Self-Employed",
			description:
				"Developing full-stack web applications for clients using Ruby on Rails and integrating secure payment systems.",
			iconKey: "developer",
		},
	] as ExperienceItem[]
).reverse();
