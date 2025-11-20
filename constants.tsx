import { Experience, Education, Skill, ContactInfo, Project } from './types';

export const CONTACT: ContactInfo = {
  email: "jasonrico.career@gmail.com",
  linkedin: "linkedin.com/in/jaysonrico-career",
  portfolio: "sxientrie.github.io/myPortfolio"
};

export const ABOUT_TEXT = `As a technical problem-solver with experience providing customer-facing IT support, I excel at converting challenging technical problems into understandable, useful solutions. My distinct background in web development and computer science serves as an essential link between engineers and clients, enabling me to identify problems more precisely and address them quickly.`;

export const EXPERIENCE: Experience[] = [
  {
    id: 'virtual-assistance',
    company: 'Virtual Assistance',
    role: 'Social Media Manager - Intern',
    period: 'May 2025 - Aug 2025',
    type: 'other',
    description: [
      "Curated and planned brand content for all Facebook and IG.",
      "Monitored audience engagement and responded to potential Customers, fostering community growth and customer loyalty.",
      "Analyzed performance metrics to find the best times to post and boost organic reach."
    ]
  },
  {
    id: 'starlite',
    company: 'Starlite IT Solution',
    role: 'Owner',
    period: 'May 2024 – Feb 2025',
    type: 'tech',
    description: [
      "Managed all aspects of sales for computer parts and accessories, ensuring product compatibility.",
      "Offered professional technical assistance for software and hardware problems.",
      "Clearly communicating while troubleshooting and resolving customer issues."
    ]
  },
  {
    id: 'lenin',
    company: 'Lenin Computers, Inc.',
    role: 'Technical and Customer Support',
    period: 'April 2021 – February 2024',
    type: 'tech',
    description: [
      "Served as a secondary technical specialist, converting client requirements into particular software and hardware solutions.",
      "Oversaw the entire build process, from QA testing to OS installation.",
      "Offered one-on-one consultations to identify problems and offer financial advice."
    ]
  }
];

export const EDUCATION: Education = {
  institution: "Southern City Colleges",
  period: "Sept. 2015 - Oct. 2017",
  details: "Completed core coursework including: Data Structures & Algorithms, Database Management, Object-Oriented Programming, and Networking Fundamentals."
};

export const SKILLS: Skill[] = [
  { name: "Google Workspace", category: "tool", icon: "monitor" },
  { name: "AnyDesk", category: "tool", icon: "settings" },
  { name: "TeamViewer", category: "tool", icon: "monitor" },
  { name: "ClickUp", category: "platform", icon: "layout-template" },
  { name: "Canva", category: "design", icon: "pen-tool" },
  { name: "Zendesk", category: "platform", icon: "headphones" },
  { name: "Figma", category: "design", icon: "figma" },
  { name: "Git & GitHub", category: "version-control", icon: "github" },
];

export const LANGUAGES = [
  { lang: "English", level: "B2" },
  { lang: "Spanish", level: "A1" }
];

export const PROJECTS: Project[] = [
  {
    title: "Sxentrie RAG System",
    description: "A sophisticated code analysis tool leveraging Google Gemini to provide rapid insights into GitHub repositories. Features automated documentation generation and deep static analysis using a serverless RAG architecture.",
    tags: ["Google Gemini", "React 19", "TypeScript", "RAG"],
    type: "system",
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
    tags: ["React", "Tailwind", "Framer Motion"],
    type: "dev",
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