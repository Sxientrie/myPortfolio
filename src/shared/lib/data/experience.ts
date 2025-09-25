import { icons } from "./icons.ts";
type ExperienceItem = {
	date: string;
	title: string;
	company: string;
	description: string;
	iconKey: keyof typeof icons;
};
export const experienceData: ExperienceItem[] = [
	{
		date: "January 2025 - Present",
		title: "Freelance WEB Developer",
		company: "Freelance",
		description:
			"Co-Engineered the core analysis engine for a full-stack code comprehension tool using serverless functions; designed a multi-layered prompt architecture for the Generative API that utilized responseSchema to enforce structured JSON output and processed the model's \"thought stream\" for real-time Ul updates. Integrated the Wise payment gateway into custom web applications built with Ruby on Rails to provide clients with secure payment systems.",
		iconKey: "developer",
	},
	{
		date: "Apr 2023 - Jul 2024",
		title: "Owner",
		company: "Starlite IT Solution",
		description:
			"Managed all aspects of the sales of computer parts and accessories, ensuring product compatibility and providing technical guidance to drive customer satisfaction and repeat business. Provided expert technical support for a wide range of hardware and software issues, effectively troubleshooting and resolving customer problems with clear communication.",
		iconKey: "consultant",
	},
	{
		date: "April 2021 - Feb 2023",
		title: "Technical and Customer Support Specialist",
		company: "Lenin Computer Inc.",
		description:
			"Specialized in the end-to-end process of custom PC building, from initial component selection and assembly to OS installation and performance tuning. Enhanced customer satisfaction by providing personalized consultations, such as re-allocating a client's budget from aesthetic components to a superior GPU to meet their specific gaming performance goals.",
		iconKey: "support",
	},
	{
		date: "Feb 2018 - March 2021",
		title: "Line Cook",
		company: "PARESILOG",
		description:
			"Thrived in a high-volume, fast-paced kitchen, consistently executing precise food preparation to meet tight service deadlines and maintain quality during peak hours. Independently managed the entire food line during staff shortages (Pandemic), ensuring uninterrupted service and high standards while single-handedly meeting the full volume of customer orders.",
		iconKey: "cook",
	},
] as ExperienceItem[];