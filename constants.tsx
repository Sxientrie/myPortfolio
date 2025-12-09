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
export const ABOUT_TEXT = `I live in the messy overlap between code and people. Support tickets? Sure. But what I really do is translate the stuff that makes engineers' heads spin into something a normal human can actually understand. I fix bugs—when I have to—but honestly, I'm more interested in *why* they happened in the first place. My brain works like a developer's (precise, logical, maybe a little obsessive), but I can also step back and ask: what does this actually *feel* like for the person using it? That's the part most people miss. I don't just connect backend logic to frontend users. I connect the *why* to the *what*, and that makes all the difference when you're debugging a workflow or untangling a system that's been broken for weeks.`;

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
      "I co-built the analysis engine for a full-stack code comprehension tool. Serverless functions on the backend. The tricky part? Designing the prompt architecture for the Generative API—had to use responseSchema to force structured JSON output and then parse the model's 'thought stream' in real time so the UI wouldn't just sit there spinning.",
      "Wired up Wise payment gateway into a couple of Ruby on Rails apps. Clients needed a secure way to handle transactions. So I built it. Straightforward at first, but the integration turned into a bit of a rabbit hole with edge cases I didn't expect.",
      "Spent a lot of time classifying and annotating data for ML training pipelines. Tedious work—I won't lie—but you can't skip it. Garbage in, garbage out. Clean data means the model actually learns patterns instead of noise.",
      "Planned and created brand content for Facebook and Instagram. It wasn't just posting—had to actually think about what would resonate with the audience.",
      "Kept an eye on engagement metrics and responded to potential customers. Community building is messy, but if you're consistent and genuine, people stick around."
    ]
  },
  {
    id: 'starlite',
    company: 'Starlite IT Solution',
    role: 'Owner',
    period: 'Apr 2023 - Jul 2024',
    type: 'tech',
    description: [
      "I sold computer parts and accessories. Not glamorous, but the real skill was making sure everything actually worked together—RAM compatibility, PSU wattage, that kind of thing. Customers appreciated not having to deal with a return.",
      "Handled tech support for hardware and software issues. Troubleshooting is basically detective work: gather clues, isolate the problem, fix it, explain what happened. The explaining part is harder than the fixing."
    ]
  },
  {
    id: 'lenin',
    company: 'Lenin Computer Inc.',
    role: 'Technical and Customer Support Specialist',
    period: 'April 2021 - Feb 2023',
    type: 'tech',
    description: [
      "I built custom PCs from scratch. Component selection, assembly, OS install, tuning—the whole process. There's something satisfying about watching a system POST for the first time after you've put it together.",
      "Had a client once who wanted everything to look cool—RGB everywhere. I talked them into shifting budget from aesthetic upgrades to a better GPU. Their gaming performance doubled. They were happy. I prefer results over flashy lights. Always have."
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
  details: "Covered the core stuff—Data Structures & Algorithms (the hard parts), Database Management (which I actually enjoyed), OOP principles, and Networking Fundamentals. I didn't complete the degree. Life happened. But the technical foundation stuck."
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
    description: "A code analysis tool that uses Google Gemini to scan GitHub repos and spit out documentation. Fast. Built on a serverless RAG architecture because I didn't want to deal with maintaining servers.",
    tags: ["Gen API", "React", "TypeScript", "RAG"],
    type: "system",
    date: "2025.06",
    demoUrl: "https://sxientrie.github.io/Sxentrie-RAG/",
    longDescription: "Sxentrie is a web-based tool that helps developers understand GitHub repositories without reading every single file. It's basically a specialized RAG system—retrieval-augmented generation—that uses the Google Gemini model to run static analysis and generate docs on demand. The goal was speed and clarity.",
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
    description: "The site you are viewing. I built it to be fast, accessible, and stripped of anything that doesn't serve a purpose. If it loads in under a second, I did my job.",
    tags: ["React", "Tailwind", "Motion"],
    type: "dev",
    date: "2025.07",
    demoUrl: "https://sxientrie.github.io/myPortfolio/",
    longDescription: "A personal portfolio built to prove I can code and design. I wanted 'Elite Minimalism'—no clutter, no fluff. Just clean typography and the content itself. If you're reading this, it worked.",
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
  },
  {
    title: "Reddit Hawk",
    description: "A Chrome extension that monitors Reddit in real-time for freelance leads. Polls subreddits, matches keywords, and uses AI to draft replies that don't sound like a robot wrote them.",
    tags: ["Chrome Extension", "React", "GenAI", "MV3"],
    type: "system",
    date: "2025.12",
    demoUrl: "https://github.com/Sxientrie/reddit-hawk",
    longDescription: "I got tired of missing freelance gigs on Reddit because I checked r/forhire three hours too late. So I built a Chrome extension that does the checking for me. It polls subreddits every 15 seconds, flags posts that match my keywords, and pipes them into a side panel. The AI draft feature uses Google Gemini, but here's the thing—I specifically engineered the prompts to avoid sounding like ChatGPT threw up a cover letter. High burstiness, forbidden word filters, the whole Operation Chaos protocol. It's fast, it works, and it doesn't get rate-limited because it piggybacks your existing Reddit session instead of using OAuth.",
    architecture: [
      { label: "Runtime", value: "Chrome Manifest V3" },
      { label: "Frontend", value: "React 19 + TypeScript + Tailwind CSS v4" },
      { label: "Build", value: "Vite" },
      { label: "AI Engine", value: "Google Gemini 2.5 Flash" },
      { label: "Auth", value: "Session Piggybacking (No OAuth)" }
    ],
    features: [
      "Real-time polling: Checks Reddit every 15 seconds for new posts. Highlights matched keywords in titles, body text, and flairs.",
      "AI draft generator: Writes replies and DMs using LLM. But it doesn't sound like AI—burstiness constraints, forbidden lexicon filter, sensory language injection.",
      "Scoped keywords: Target specific fields with prefixes (title:, body:, flair:). Cuts down on false positives.",
      "Full-page screenshots and screen recording: Built-in tools for capturing posts and conversations. QR codes too, for some reason.",
      "Live log panel: Every async operation gets logged. No more 'why did this break?' mysteries."
    ]
  }
];
