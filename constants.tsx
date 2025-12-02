import { Experience, Education, Skill, ContactInfo, Project } from './types';

/**
 * Static contact details for the sidebar.
 * Used to populate email and social links.
 */
export const CONTACT: ContactInfo = {
  email: "jasonrico.career@gmail.com",
  linkedin: "linkedin.com/in/jaysonrico-career",
  portfolio: "sxientrie.github.io/myPortfolio"
};

/**
 * Biographical text displayed in the sidebar.
 * Sets the tone for the professional overview.
 */
export const ABOUT_TEXT = `I operate where deep technical logic meets human creativity. I don't just answer support tickets; I also turn complicated engineering problems into simple, understandable solutions. I don't just fix the bug right away; I also see the bigger picture because my work combines the accuracy of a developer with the flexibility of a creative. I connect the code on the backend to the person on the other side of the screen, whether I'm figuring out what went wrong with a system or improving a user's workflow.`;

/**
 * Employment history data.
 * Renders the timeline of professional roles.
 */
export const EXPERIENCE: Experience[] = [
  {
    id: 'freelance',
    company: 'Freelance',
    role: 'Generalist',
    period: 'Jan 2025 - Present',
    type: 'tech',
    description: [
      "Co-Engineered the core analysis framework for a full-stack code comprehension tool using serverless functions; designed a multi-layered prompt architecture for the Generative API that utilized responseSchema to enforce structured JSON output and processed the model's 'thought stream' for real-time UI updates.",
      "Integrated the Wise payment gateway into custom web applications built with Ruby on Rails to provide clients with secure payment systems.",
      "Executed rigorous data classification and annotation for machine learning training pipelines, ensuring the integrity of synthetic datasets used for model optimization and pattern recognition.",
      "Curated and planned brand content for all Facebook and IG.",
      "Monitored audience engagement and responded to potential Customers, fostering community growth and customer loyalty."
    ]
  },
  {
    id: 'starlite',
    company: 'Starlite IT Solution',
    role: 'Owner',
    period: 'Apr 2023 - Jul 2024',
    type: 'tech',
    description: [
      "Managed all aspects of the sales of computer parts and accessories, ensuring product compatibility and providing technical guidance to drive customer satisfaction and repeat business.",
      "Provided expert technical support for a wide range of hardware and software issues, effectively troubleshooting and resolving customer problems with clear communication."
    ]
  },
  {
    id: 'lenin',
    company: 'Lenin Computer Inc.',
    role: 'Technical and Customer Support Specialist',
    period: 'April 2021 - Feb 2023',
    type: 'tech',
    description: [
      "Specialized in the end-to-end process of custom PC building, from initial component selection and assembly to OS installation and performance tuning.",
      "Enhanced customer satisfaction by providing personalized consultations, such as re-allocating a client's budget from aesthetic components to a superior GPU to meet their specific gaming performance goals."
    ]
  }
];

/**
 * Educational background data.
 * Displays formal training details.
 */
export const EDUCATION: Education = {
  institution: "Southern City Colleges",
  period: "Sept. 2015 - Oct. 2017",
  details: "Completed core coursework including: Data Structures & Algorithms, Database Management, Object-Oriented Programming, and Networking Fundamentals."
};

/**
 * Technical skills inventory.
 * Populates the skills grid with icons and categories.
 */
export const SKILLS: Skill[] = [
  { name: "React", category: "framework", icon: "code" },
  { name: "Git & GitHub", category: "version-control", icon: "github" },
  { name: "Figma", category: "design", icon: "figma" },
  { name: "Canva", category: "design", icon: "pen-tool" },
  { name: "DaVinci Resolve", category: "design", icon: "video" },
  { name: "ClickUp", category: "platform", icon: "layout-template" },
  { name: "Zendesk", category: "platform", icon: "headphones" },
  { name: "Google Workspace", category: "tool", icon: "monitor" },
  { name: "AnyDesk", category: "tool", icon: "settings" },
  { name: "TeamViewer", category: "tool", icon: "monitor" },
];

/**
 * Spoken languages proficiency.
 * Listed in the sidebar for context.
 */
export const LANGUAGES = [
  { lang: "English", level: "B2" },
  { lang: "Spanish", level: "A1" }
];

/**
 * Portfolio projects showcase.
 * Drives the project cards and detail drawers.
 */
export const PROJECTS: Project[] = [
  {
    title: "Sxentrie RAG System",
    description: "A sophisticated code analysis tool leveraging Google Gemini to provide rapid insights into GitHub repositories. Features automated documentation generation and deep static analysis using a serverless RAG architecture.",
    tags: ["Gen API", "React", "TypeScript", "RAG"],
    type: "system",
    date: "2024.02",
    demoUrl: "https://sxientrie.github.io/Sxentrie-RAG/",
    longDescription: "Sxentrie is a sophisticated web-based code comprehension and analysis tool designed to provide developers with rapid insights into GitHub repositories. It functions as a specialized Retrieval-Augmented Generation (RAG) system, leveraging the Google Gemini large language model to perform static analysis and generate documentation.",
    architecture: [
      { label: "Frontend", value: "React 19, TypeScript, Vite, Native ES Modules (No-Build)" },
      { label: "Backend", value: "Serverless TypeScript Functions (Security Proxy)" },
      { label: "AI Engine", value: "Google Gemini API (Flash & Pro Models)" },
      { label: "Patterns", value: "Domain-Driven Design (DDD), Colocated State (Context/useReducer)" }
    ],
    features: [
      "Deep Static Analysis: Identifies bugs, vulnerabilities, and performance bottlenecks.",
      "Automated Documentation: Generates technical docs and file overviews on demand.",
      "Multi-Model Intelligence: Toggles between Gemini Flash (Speed) and Gemini Pro (Reasoning).",
      "Secure Proxying: Serverless middleware handles authentication and API interactions."
    ]
  },
  {
    title: "myPortfolio",
    description: "The site you are viewing. A performance-optimized, accessible React application designed to showcase technical identity.",
    tags: ["React", "Tailwind", "Motion"],
    type: "dev",
    date: "2024.01",
    demoUrl: "https://sxientrie.github.io/myPortfolio/",
    longDescription: "A bespoke personal portfolio designed to bridge the gap between Technical Support and Frontend Engineering. Built with a focus on 'Elite Minimalism', removing all unnecessary clutter to focus purely on content and typography.",
    architecture: [
      { label: "Framework", value: "React 19 + Vite" },
      { label: "Styling", value: "Tailwind CSS (Utility-First)" },
      { label: "Performance", value: "0 Runtime Animations (CSS transitions only)" },
      { label: "Theming", value: "Dark/Light mode with Class Strategy" }
    ],
    features: [
      "Responsive 12-Column Grid Layout",
      "Glassmorphism UI with Performance Optimizations",
      "Print-Friendly Stylesheet",
    ]
  }
];
