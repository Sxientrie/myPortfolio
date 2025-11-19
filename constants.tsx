import { Experience, Education, Skill, ContactInfo, Project } from './types';
import { 
  Monitor, 
  Server, 
  ChefHat, 
  Figma, 
  Github, 
  LayoutTemplate, 
  Headphones,
  Settings,
  MessageSquare,
  PenTool
} from 'lucide-react';

export const CONTACT: ContactInfo = {
  email: "jasonrico.career@gmail.com",
  linkedin: "linkedin.com/in/jaysonrico-career",
  portfolio: "sxientrie.github.io/myPortfolio"
};

export const ABOUT_TEXT = `As a technical problem-solver with experience providing customer-facing IT support, I excel at converting challenging technical problems into understandable, useful solutions. My distinct background in web development and computer science serves as an essential link between engineers and clients, enabling me to identify problems more precisely and address them quickly.`;

export const EXPERIENCE: Experience[] = [
  {
    id: 'starlite',
    company: 'Starlite IT Solution',
    role: 'Owner',
    period: 'May 2024 - Present',
    type: 'tech',
    description: [
      "Managed all aspects of sales for computer parts and accessories, ensuring product compatibility.",
      "Provided expert technical support for hardware and software issues.",
      "Effectively troubleshooting and resolving customer problems with clear communication."
    ]
  },
  {
    id: 'lenin',
    company: 'Lenin Computer Inc.',
    role: 'Tech & Customer Support Specialist',
    period: 'April 2021 - Feb 2024',
    type: 'tech',
    description: [
      "Acted as backup technical expert, translating client needs into specific hardware/software solutions.",
      "Managed full end-to-end build process, from OS installation to QA testing.",
      "Provided 1-on-1 consultations to diagnose issues and provide budget guidance."
    ]
  },
  {
    id: 'paresilog',
    company: 'Paresilog',
    role: 'Line Cook',
    period: 'Feb 2018 - March 2021',
    type: 'other',
    description: [
      "Thrived in a high-volume, fast-paced kitchen, executing precise food preparation.",
      "Independently managed the entire food line during staff shortages (Pandemic).",
      "Demonstrated resilience and operational excellence under pressure."
    ]
  }
];

export const EDUCATION: Education = {
  institution: "Southern City Colleges",
  period: "Sept. 2015 - Oct. 2017",
  details: "Completed core coursework including: Data Structures & Algorithms, Database Management, Object-Oriented Programming, and Networking Fundamentals."
};

export const SKILLS: Skill[] = [
  { name: "Workspace", category: "tool", icon: <Monitor size={14} /> },
  { name: "AnyDesk", category: "tool", icon: <Settings size={14} /> },
  { name: "TeamViewer", category: "tool", icon: <Monitor size={14} /> },
  { name: "ClickUp", category: "platform", icon: <LayoutTemplate size={14} /> },
  { name: "Canva", category: "design", icon: <PenTool size={14} /> },
  { name: "Zendesk", category: "platform", icon: <Headphones size={14} /> },
  { name: "Figma", category: "design", icon: <Figma size={14} /> },
  { name: "Git & GitHub", category: "version-control", icon: <Github size={14} /> },
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
    title: "Minimalist Portfolio",
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
      "Interactive Project Drawers"
    ]
  }
];